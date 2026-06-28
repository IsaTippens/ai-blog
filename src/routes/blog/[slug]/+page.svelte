<script>
  export let data;
  const { post } = data;
</script>

<div class="navigation-row">
  <a href="/" class="back-link">← RETURN_TO_INDEX</a>
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
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    border: 1px solid #121212;
    padding: 6px 12px;
    background-color: #ffffff;
    box-shadow: 2px 2px 0px 0px #000;
  }

  .back-link:hover {
    background-color: #121212;
    color: #f6f6f6;
  }

  .blog-post {
    border: 2px solid #121212;
    background-color: #ffffff;
    padding: 40px;
    box-shadow: 6px 6px 0px 0px #000;
  }

  .post-header {
    border-bottom: 2px dashed #121212;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  .post-meta {
    font-size: 0.85rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
  }

  .post-title {
    font-size: 2.2rem;
    line-height: 1.2;
    margin: 0;
  }

  .post-body {
    font-family: Arial, Helvetica, sans-serif; /* Cleaner reading font for actual paragraph content */
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a1a1a;
  }

  .post-body :global(h2), .post-body :global(h3) {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    color: #121212;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 5px;
    margin-top: 2rem;
  }

  .post-body :global(pre) {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95rem;
  }
</style>
