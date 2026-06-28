<script>
  export let data;
  const { posts } = data;
</script>

<h1>LATEST_SYSTEM_POSTS</h1>

{#if posts.length === 0}
  <div class="empty-state">
    <p>NO POSTS FOUND IN ROOT_DIR [/posts/].</p>
  </div>
{:else}
  <div class="posts-grid">
    {#each posts as post}
      <article class="post-card">
        <header class="post-header">
          <span class="post-date">[{post.date}]</span>
          <h2 class="post-title">
            <a href="/blog/{post.slug || post.title.toLowerCase().replace(/ /g, '-')}">{post.title}</a>
          </h2>
        </p>
        <p class="post-summary">{post.summary}</p>
        <div class="tag-container">
          {#each post.categories as cat}
            <span class="tag">#{cat.toUpperCase()}</span>
          {/import}
        </div>
      </article>
    {/each}
  </div>
{/if}

<style>
  .empty-state {
    border: 2px dashed #121212;
    padding: 40px;
    text-align: center;
    background-color: #ffffff;
  }

  .posts-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .post-card {
    border: 2px solid #121212;
    background-color: #fff;
    padding: 24px;
    box-shadow: 4px 4px 0px 0px #000;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .post-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px #000;
  }

  .post-header {
    margin-bottom: 10px;
  }

  .post-date {
    font-size: 0.85rem;
    font-weight: bold;
    color: #666;
  }

  .post-title {
    margin: 5px 0 0 0;
    font-size: 1.4rem;
  }

  .post-title a {
    text-decoration: none;
    color: #121212;
  }

  .post-title a:hover {
    text-decoration: underline;
  }

  .post-summary {
    color: #333;
    font-size: 0.95rem;
    margin-bottom: 15px;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    font-size: 0.75rem;
    background-color: #121212;
    color: #f6f6f6;
    padding: 2px 6px;
    font-weight: bold;
  }
</style>
