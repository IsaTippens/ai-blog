import { latestRun } from '$lib/posts.js';

export function load() {
  return { run: latestRun() };
}
