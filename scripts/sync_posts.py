import io
import json
import os
import sys

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

FOLDER_ID = "1Tyxz30DHCj0LDw6tK4kYJkOFB2ca2OzL"
POSTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "posts")
GOOGLE_DOC_MIME = "application/vnd.google-apps.document"


def list_posts(service):
    """List every .md file in the folder, following pagination."""
    query = f"'{FOLDER_ID}' in parents and name contains '.md' and trashed = false"
    files = []
    page_token = None
    while True:
        results = service.files().list(
            q=query,
            fields="nextPageToken, files(id, name, mimeType, modifiedTime)",
            pageSize=1000,
            pageToken=page_token,
        ).execute()
        files.extend(results.get("files", []))
        page_token = results.get("nextPageToken")
        if not page_token:
            return files


def latest_per_name(files):
    """Drive allows duplicate names; keep only the most recently modified file per name."""
    latest = {}
    for f in files:
        current = latest.get(f["name"])
        if current is None or f["modifiedTime"] > current["modifiedTime"]:
            latest[f["name"]] = f
    return list(latest.values())


def fetch_content(service, file_info):
    """Return the file's markdown as text.

    Uploaded .md files are binary blobs and are downloaded as-is. Files converted to
    native Google Docs cannot be downloaded with get_media; they are exported as plain
    text, which preserves the markdown source (frontmatter, #, *, _) literally.
    """
    if file_info["mimeType"] == GOOGLE_DOC_MIME:
        request = service.files().export_media(fileId=file_info["id"], mimeType="text/plain")
    else:
        request = service.files().get_media(fileId=file_info["id"])

    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()

    # Docs plain-text export prepends a BOM and uses CRLF line endings.
    text = fh.getvalue().decode("utf-8-sig")
    return text.replace("\r\n", "\n")


def main():
    creds_json = os.environ.get("GDRIVE_SERVICE_ACCOUNT_JSON")
    if not creds_json:
        print("ERROR: GDRIVE_SERVICE_ACCOUNT_JSON environment variable is not set.")
        return 1

    try:
        creds = service_account.Credentials.from_service_account_info(
            json.loads(creds_json), scopes=["https://www.googleapis.com/auth/drive.readonly"]
        )
    except Exception as e:
        print(f"ERROR: Failed to parse Google credentials: {e}")
        return 1

    service = build("drive", "v3", credentials=creds)

    try:
        files = list_posts(service)
    except Exception as e:
        print(f"ERROR: Failed to query Google Drive folder: {e}")
        return 1

    if not files:
        print("No Markdown posts found in the Google Drive folder.")
        return 0

    posts = latest_per_name(files)
    print(f"Found {len(files)} file(s), {len(posts)} unique post(s) in Google Drive. Syncing...")
    os.makedirs(POSTS_DIR, exist_ok=True)

    failed = []
    for file_info in posts:
        name = file_info["name"]
        print(f"Downloading: {name} ({file_info['id']}, {file_info['mimeType']})")
        try:
            content = fetch_content(service, file_info)
        except Exception as e:
            print(f"ERROR: Failed to download {name}: {e}")
            failed.append(name)
            continue

        # Posts are parsed with gray-matter; never overwrite a post with content lacking frontmatter.
        if not content.lstrip().startswith("---"):
            print(f"ERROR: {name} has no frontmatter after download; skipping. Starts with: {content[:150]!r}")
            failed.append(name)
            continue

        with open(os.path.join(POSTS_DIR, name), "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"Saved {name}")

    if failed:
        print(f"ERROR: {len(failed)} post(s) failed to sync: {', '.join(failed)}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
