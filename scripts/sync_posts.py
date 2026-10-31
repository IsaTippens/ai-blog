import io
import json
import os
import re
import sys

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

FOLDER_ID = "1Tyxz30DHCj0LDw6tK4kYJkOFB2ca2OzL"
POSTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "posts")
GOOGLE_DOC_MIME = "application/vnd.google-apps.document"

# When Drive converts an uploaded .md into a Google Doc, the frontmatter's `---` fences become
# horizontal rules and its lines are merged into one paragraph. The plain-text export still
# holds the quoted values verbatim, so the fields can be recovered from that paragraph.
MERGED_FRONTMATTER_RE = re.compile(
    r'title:\s*(".*?")\s+date:\s*(".*?")\s+summary:\s*(".*?")\s+categories:\s*(\[.*?\])', re.S
)
HORIZONTAL_RULE_RE = re.compile(r"^\s*(?:-{3,}|\*{3,}|_{3,})\s*$")


def list_posts(service):
    """List every .md file in the folder, following pagination."""
    query = f"'{FOLDER_ID}' in parents and name contains '.md' and trashed = false"
    files = []
    page_token = None
    while True:
        results = service.files().list(
            q=query,
            fields="nextPageToken, files(id, name, mimeType, modifiedTime, createdTime)",
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


def download(service, request):
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    # Docs exports prepend a BOM and use CRLF line endings.
    return fh.getvalue().decode("utf-8-sig").replace("\r\n", "\n")


def export_doc(service, file_id, mime_type):
    return download(service, service.files().export_media(fileId=file_id, mimeType=mime_type))


def strip_converted_frontmatter(markdown):
    """Drop the mangled frontmatter (rule, merged field paragraph, rule) from a Docs markdown export."""
    lines = markdown.split("\n")
    start = next((i for i, line in enumerate(lines) if "title" in line and "categories" in line), None)
    if start is None:
        raise ValueError("frontmatter paragraph not found in markdown export")
    rest = lines[start + 1:]
    while rest and (not rest[0].strip() or HORIZONTAL_RULE_RE.match(rest[0])):
        rest.pop(0)
    return "\n".join(rest)


def fetch_content(service, file_info):
    """Return the file's markdown as text.

    - Uploaded .md files are binary blobs and are downloaded as-is.
    - Google Docs whose body is raw markdown text are exported as plain text, which keeps
      the source (frontmatter, #, *, _) literally.
    - Google Docs converted from markdown have their frontmatter rebuilt from the plain-text
      export and their body taken from the markdown export, which restores the formatting.
    """
    if file_info["mimeType"] != GOOGLE_DOC_MIME:
        return download(service, service.files().get_media(fileId=file_info["id"]))

    plain = export_doc(service, file_info["id"], "text/plain")
    if plain.lstrip().startswith("---"):
        return plain

    match = MERGED_FRONTMATTER_RE.search(plain)
    if not match:
        return plain  # Rejected by the frontmatter check in main().

    title, date, summary, categories = match.groups()
    body = strip_converted_frontmatter(export_doc(service, file_info["id"], "text/markdown"))
    return (
        f"---\ntitle: {title}\ndate: {date}\nsummary: {summary}\ncategories: {categories}\n---\n\n{body}"
    )


def stamp_filed(content, created_time):
    """Record when the agent filed the post to Drive as `filed:`, unless the post already says."""
    lines = content.split("\n")
    start = next(i for i, line in enumerate(lines) if line.strip() == "---")
    end = next((i for i in range(start + 1, len(lines)) if lines[i].strip() == "---"), None)
    if end is None or any(line.startswith("filed:") for line in lines[start + 1:end]):
        return content
    lines.insert(end, f'filed: "{created_time}"')
    return "\n".join(lines)


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

        if file_info.get("createdTime"):
            content = stamp_filed(content, file_info["createdTime"])

        with open(os.path.join(POSTS_DIR, name), "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"Saved {name}")

    if failed:
        print(f"ERROR: {len(failed)} post(s) failed to sync: {', '.join(failed)}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
