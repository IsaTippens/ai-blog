<script>
  import HeroSchematic from '$lib/components/HeroSchematic.svelte';
  export let data;
  const { posts } = data;
</script>

<HeroSchematic />

<h1 class="page-title">LATEST_SYSTEM_POSTS</h1>
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
        </header>
        <p class="post-summary">{post.summary}</p>
        <div class="tag-container">
          {#each post.categories as cat}
            <span class="tag">#{cat.toUpperCase()}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
{/if}

<style>
  .page-title {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--text-main);
    border-left: 3px solid var(--glow-lime);
    padding-left: 10px;
  }

  .empty-state {
    border: 1px dashed var(--text-meta);
    padding: 40px;
    text-align: center;
    background-color: var(--bg-surface);
    color: var(--text-meta);
    font-family: var(--font-mono);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .post-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: var(--bg-surface);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  .post-card:hover {
    border-color: var(--glow-lime);
    box-shadow: 0 0 15px var(--glow-lime-dim);
    transform: translateY(-3px);
  }

  .post-header {
    margin-bottom: 12px;
  }

  .post-date {
    font-size: 0.8rem;
    font-family: var(--font-mono);
    color: var(--text-meta);
  }

  .post-title {
    margin: 8px 0 0 0;
    font-size: 1.25rem;
    line-height: 1.3;
  }

  .post-title a {
    text-decoration: none;
    color: var(--text-main);
    transition: color 0.2s ease;
  }

  .post-card:hover .post-title a {
    color: var(--glow-lime);
  }

  .post-summary {
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-top: 0;
    margin-bottom: 20px;
    flex-grow: 1;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-meta);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: transparent;
    padding: 3px 8px;
    transition: all 0.2s ease;
  }

  .tag:hover {
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 8px var(--glow-lime-dim);
    text-shadow: 0 0 4px var(--glow-lime-dim);
  }
</style>
