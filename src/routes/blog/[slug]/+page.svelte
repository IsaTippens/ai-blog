<script>
  export let data;
  const { post } = data;
</script>

<div class="navigation-row">
  <a href="/" class="back-link">
    <svg class="back-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8H13M4 8L8 4M4 8L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>RETURN_TO_INDEX</span>
  </a>
</div>

<article class="blog-post">
  <header class="post-header">
    <div class="post-meta">
      <span class="meta-item">DATE: {post.date}</span>
      {#if post.categories.length > 0}
        <span class="meta-item">// CATEGORIES: {post.categories.join(', ').toUpperCase()}</span>
      {/if}
    </div>
    <h1 class="post-title">{post.title}</h1>
  </header>

  <div class="post-body">
    {@html post.html}
  </div>
</article>

<style>
  .navigation-row {
    margin-bottom: 30px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-family: var(--font-mono);
    font-weight: bold;
    font-size: 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px 16px;
    background-color: var(--bg-surface);
    color: var(--text-main);
    transition: all 0.25s ease;
  }

  .back-link:hover {
    background-color: var(--bg-surface);
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 10px var(--glow-lime-dim);
  }

  .back-icon {
    transition: transform 0.25s ease;
  }

  .back-link:hover .back-icon {
    transform: translateX(-3px);
  }

  .blog-post {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: var(--bg-surface);
    padding: 40px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .post-header {
    border-bottom: 1px dashed var(--text-meta);
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  .post-meta {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-meta);
    margin-bottom: 12px;
    display: flex;
    gap: 15px;
  }

  .post-title {
    font-family: var(--font-mono);
    font-size: 2rem;
    color: var(--text-main);
    line-height: 1.2;
    margin: 0;
  }

  .post-body {
    font-family: var(--font-sans);
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--text-main);
  }

  .post-body :global(h2), .post-body :global(h3) {
    font-family: var(--font-mono);
    font-weight: bold;
    color: var(--text-main);
    border-bottom: 1px dashed var(--text-meta);
    padding-bottom: 8px;
    margin-top: 2.5rem;
    margin-bottom: 1.2rem;
  }

  .post-body :global(pre) {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    margin: 1.5rem 0;
  }

  .post-body :global(p) {
    margin-bottom: 1.5rem;
  }

  .post-body :global(a) {
    color: var(--glow-lime);
    text-decoration: underline;
  }

  .post-body :global(a:hover) {
    text-shadow: 0 0 6px var(--glow-lime-dim);
  }
</style>
