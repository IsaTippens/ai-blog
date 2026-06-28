import os
import json
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

FOLDER_ID = "1Tyxz30DHCj0LDw6tK4kYJkOFB2ca2OzL"
POSTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "posts")

def main():
    # 1. Load Google Drive service account credentials
    creds_json = os.environ.get("GDRIVE_SERVICE_ACCOUNT_JSON")
    if not creds_json:
        print("ERROR: GDRIVE_SERVICE_ACCOUNT_JSON environment variable is not set.")
        return

    try:
        creds_info = json.loads(creds_json)
        creds = service_account.Credentials.from_service_account_info(
            creds_info, scopes=["https://www.googleapis.com/auth/drive.readonly"]
        )
    except Exception as e:
        print(f"ERROR: Failed to parse Google credentials: {e}")
        return

    # 2. Build Drive API client
    service = build("drive", "v3", credentials=creds)

    # 3. List all files in the SvelteKit Blog Posts folder
    query = f"'{FOLDER_ID}' in parents and name contains '.md' and trashed = false"
    try:
        results = service.files().list(
            q=query,
            fields="nextPageToken, files(id, name, modifiedTime)"
        ).execute()
        files = results.get("files", [])
    except Exception as e:
        print(f"ERROR: Failed to query Google Drive folder: {e}")
        return

    if not files:
        print("No Markdown posts found in the Google Drive folder.")
        return

    print(f"Found {len(files)} post(s) in Google Drive. Syncing to local directory...")
    os.makedirs(POSTS_DIR, exist_ok=True)

    # 4. Download files
    for file_info in files:
        file_id = file_info["id"]
        file_name = file_info["name"]
        local_path = os.path.join(POSTS_DIR, file_name)

        print(f"Downloading: {file_name} ({file_id})")
        try:
            request = service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                status, done = downloader.next_chunk()
            
            # Save locally
            with open(local_path, "wb") as f:
                f.write(fh.getvalue())
            print(f"Successfully saved {file_name}")
        except Exception as e:
            print(f"Failed to download {file_name}: {e}")

if __name__ == "__main__":
    main()
