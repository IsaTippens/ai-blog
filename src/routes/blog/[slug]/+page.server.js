import { error } from '@sveltejs/kit';
import { listPosts, readPost, renderPost } from '$lib/posts.js';

export function load({ params }) {
  const { slug } = params;
  const file = readPost(slug);
  if (!file) {
    throw error(404, `No digest is filed under "${slug}".`);
  }

  const { data, content } = file;
  const { html, outline, stats } = renderPost(content);

  const posts = listPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const pick = (p) => (p ? { slug: p.slug, title: p.title, date: p.date } : null);

  return {
    post: {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      categories: data.categories || [],
      // Optional pipeline fields; rendered only when the sync or the agent supplies them.
      filed: data.filed || '',
      agent: data.agent || '',
      model: data.model || '',
      html,
      outline,
      stats
    },
    newer: pick(posts[index - 1]),
    older: pick(posts[index + 1])
  };
}
