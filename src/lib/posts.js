import { Marked } from 'marked';
import { parseFrontMatter } from '$lib/parser.js';

const postFiles = import.meta.glob('../../posts/*.md', { eager: true, query: '?raw' });

const WORDS_PER_MINUTE = 230;
export const POSTS_PER_PAGE = 12;

/** Every post's frontmatter, newest first. */
export function listPosts() {
  const posts = Object.entries(postFiles).map(([path, file]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data } = parseFrontMatter(file.default);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      categories: data.categories || []
    };
  });
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return posts;
}

/** One index page (1-based), newest first, or undefined when the page doesn't exist. Page 1 always exists. */
export function pagePosts(page) {
  const all = listPosts();
  const pageCount = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return undefined;
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    page,
    pageCount,
    total: all.length,
    start
  };
}

/** Raw file for a slug, or undefined. */
export function readPost(slug) {
  const key = Object.keys(postFiles).find((k) => k.endsWith(`/posts/${slug}.md`));
  return key ? parseFrontMatter(postFiles[key].default) : undefined;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function domainOf(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

const SOURCE_ARROW =
  '<svg class="src-arrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2h5v5M8 2L2.5 7.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/></svg>';

function escapeAttr(value) {
  return String(value).replace(/&(?!(?:[a-z]+|#\d+);)/gi, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Width/height encoded in synced media filenames (`<hash>-<w>x<h>.<ext>`, see scripts/post_media.py). */
function mediaSize(href) {
  const match = /-(\d+)x(\d+)\.\w+$/.exec(href);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

/**
 * Render a post body.
 * - Drops the leading `# SYSTEM_OUT: DAILY RECON DIGEST` heading: the page owns the only <h1>.
 * - Gives h2/h3 stable ids and returns them as an outline.
 * - Tags each external link with its destination domain.
 * - Wraps tables in a keyboard-scrollable region and loads images lazily; the page CSS keeps
 *   both inside the reading column.
 */
export function renderPost(content) {
  const marked = new Marked();
  const tokens = marked.lexer(content);
  const leadIndex = tokens.findIndex((t) => t.type !== 'space');
  if (leadIndex !== -1 && tokens[leadIndex].type === 'heading' && tokens[leadIndex].depth === 1) {
    tokens.splice(leadIndex, 1);
  }

  const outline = [];
  const usedIds = new Set();
  const sources = [];
  let tableCount = 0;

  marked.use({
    renderer: {
      heading(text, level, raw) {
        // Remaining h1s (if any) render one level down so the page keeps a single h1.
        const depth = Math.max(level, 2);
        const base = slugify(raw) || 'section';
        let id = base;
        for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
        usedIds.add(id);
        if (depth === 2) outline.push({ id, text: raw, stories: [] });
        else if (depth === 3) {
          if (outline.length === 0) outline.push({ id: null, text: null, stories: [] });
          outline[outline.length - 1].stories.push({ id, text: raw });
        }
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link(href, title, text) {
        const domain = /^https?:/i.test(href) ? domainOf(href) : null;
        if (!domain) return false;
        let safeHref;
        try {
          safeHref = encodeURI(href).replace(/%25/g, '%').replace(/"/g, '%22');
        } catch {
          return false;
        }
        sources.push(domain);
        const titleAttr = title ? ` title="${title}"` : '';
        return `<a href="${safeHref}"${titleAttr} class="src-link">${text}<span class="src-domain">${SOURCE_ARROW}${domain}</span></a>`;
      },
      table(header, body) {
        tableCount += 1;
        return `<div class="table-scroll" role="region" tabindex="0" aria-label="Table ${tableCount}, scrolls horizontally"><table>\n<thead>\n${header}</thead>\n${body ? `<tbody>${body}</tbody>` : ''}</table></div>\n`;
      },
      image(href, title, text) {
        let src;
        try {
          src = encodeURI(href).replace(/%25/g, '%').replace(/"/g, '%22');
        } catch {
          return false;
        }
        const alt = escapeAttr(text);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
        const size = href.startsWith('/post-media/') ? mediaSize(href) : null;
        const sizeAttr = size ? ` width="${size.width}" height="${size.height}"` : '';
        return `<img src="${src}" alt="${alt}"${titleAttr}${sizeAttr} loading="lazy" decoding="async">`;
      }
    }
  });

  const html = marked.parser(tokens);
  const words = content
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/[#*_`>\\[\]-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    html,
    outline: outline.filter((s) => s.id || s.stories.length),
    stats: {
      sources: sources.length,
      domains: new Set(sources).size,
      readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE))
    }
  };
}
