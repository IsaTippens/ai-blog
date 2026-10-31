import { listPosts } from '$lib/posts.js';

export function load() {
  return { posts: listPosts() };
}
