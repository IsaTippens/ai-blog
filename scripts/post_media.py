"""Move images embedded in posts as base64 data URIs out into static files.

Google Docs markdown exports inline every image as a data URI, which made a single post's page
several megabytes (SvelteKit also serialises the rendered HTML for hydration, so it ships twice).
Each image is written once to static/post-media/<slug>/<hash>-<width>x<height>.<ext> and the post
references that path instead. The size in the filename lets the site reserve the image's space
before it loads.

Run directly to migrate posts already in posts/:  python scripts/post_media.py
"""

import base64
import hashlib
import os
import re
import struct
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(ROOT, "posts")
MEDIA_DIR = os.path.join(ROOT, "static", "post-media")
MEDIA_URL = "/post-media"

DATA_URI_RE = re.compile(r"<?data:image/(png|jpe?g|gif|webp);base64,([A-Za-z0-9+/=]+)>?")
EXTENSIONS = {"png": "png", "jpeg": "jpg", "jpg": "jpg", "gif": "gif", "webp": "webp"}


def image_size(data, ext):
    """(width, height) for PNG, JPEG, GIF, and WebP bytes, or None if unreadable."""
    try:
        if ext == "png" and data[:8] == b"\x89PNG\r\n\x1a\n":
            return struct.unpack(">II", data[16:24])
        if ext == "gif" and data[:4] == b"GIF8":
            return struct.unpack("<HH", data[6:10])
        if ext == "webp" and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
            chunk = data[12:16]
            if chunk == b"VP8X":
                w = int.from_bytes(data[24:27], "little") + 1
                h = int.from_bytes(data[27:30], "little") + 1
                return w, h
            if chunk == b"VP8 ":
                w, h = struct.unpack("<HH", data[26:30])
                return w & 0x3FFF, h & 0x3FFF
            if chunk == b"VP8L":
                bits = int.from_bytes(data[21:25], "little")
                return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
        if ext == "jpg" and data[:2] == b"\xff\xd8":
            i = 2
            while i + 9 < len(data):
                if data[i] != 0xFF:
                    i += 1
                    continue
                marker = data[i + 1]
                if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                    h, w = struct.unpack(">HH", data[i + 5:i + 9])
                    return w, h
                i += 2 + struct.unpack(">H", data[i + 2:i + 4])[0]
    except (struct.error, IndexError):
        return None
    return None


def extract_embedded_images(slug, content):
    """Write the post's data-URI images to static files; return content that links to them."""
    target_dir = os.path.join(MEDIA_DIR, slug)
    kept = set()

    def replace(match):
        ext = EXTENSIONS[match.group(1)]
        data = base64.b64decode(match.group(2))
        digest = hashlib.sha1(data).hexdigest()[:12]
        size = image_size(data, ext)
        name = f"{digest}-{size[0]}x{size[1]}.{ext}" if size else f"{digest}.{ext}"
        os.makedirs(target_dir, exist_ok=True)
        path = os.path.join(target_dir, name)
        if not os.path.exists(path):
            with open(path, "wb") as f:
                f.write(data)
        kept.add(name)
        return f"{MEDIA_URL}/{slug}/{name}"

    content = DATA_URI_RE.sub(replace, content)
    kept.update(re.findall(rf"{re.escape(MEDIA_URL)}/{re.escape(slug)}/([\w.-]+)", content))

    # Drop files from earlier versions of this post that it no longer references.
    if os.path.isdir(target_dir):
        for name in os.listdir(target_dir):
            if name not in kept:
                os.remove(os.path.join(target_dir, name))
        if not os.listdir(target_dir):
            os.rmdir(target_dir)
    return content


def main():
    changed = 0
    for name in sorted(os.listdir(POSTS_DIR)):
        if not name.endswith(".md"):
            continue
        path = os.path.join(POSTS_DIR, name)
        with open(path, encoding="utf-8") as f:
            content = f.read()
        updated = extract_embedded_images(name[:-3], content)
        if updated != content:
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(updated)
            changed += 1
            print(f"Extracted images from {name}")
    print(f"{changed} post(s) updated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
