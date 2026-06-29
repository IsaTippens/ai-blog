import { parseFrontMatter } from '$lib/parser.js';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  const postFiles = import.meta.glob('../../../../posts/*.md', { eager: true, query: '?raw' });

  // Find key that ends with /posts/${slug}.md
  const postKey = Object.keys(postFiles).find(key => key.endsWith(`/posts/${slug}.md`));

  if (!postKey) {
    throw error(404, `Post [${slug}] not found`);
  }

  const file = postFiles[postKey];
  const { data, content } = parseFrontMatter(file.default);
  const htmlContent = marked(content);

  return {
    post: {
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      categories: data.categories || [],
      html: htmlContent
    }
  };
}
