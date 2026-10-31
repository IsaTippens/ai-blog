import { pagePosts } from '$lib/posts.js';

export function load() {
  return pagePosts(1);
}
