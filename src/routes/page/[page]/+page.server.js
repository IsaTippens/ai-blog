import { error, redirect } from '@sveltejs/kit';
import { pagePosts } from '$lib/posts.js';

export function load({ params }) {
  if (!/^\d+$/.test(params.page)) {
    throw error(404, `"${params.page}" is not a page number.`);
  }

  const page = Number(params.page);
  // Page 1 lives at the index; `/page/02` style addresses collapse to one canonical URL.
  if (page === 1) throw redirect(308, '/');
  if (params.page !== String(page)) throw redirect(308, `/page/${page}`);

  const data = pagePosts(page);
  if (!data) {
    throw error(404, `The archive has no page ${page}.`);
  }
  return data;
}
