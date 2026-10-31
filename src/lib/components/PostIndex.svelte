<script>
  import HeroSchematic from '$lib/components/HeroSchematic.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  /** Output of `pagePosts()` in `$lib/posts.js`. */
  export let data;

  $: ({ posts, page, pageCount, total, start } = data);
  $: newest = posts[0]?.date;
  $: oldest = posts[posts.length - 1]?.date;
</script>

<svelte:head>
  {#if page === 1}
    <title>TECH_LOG // SYSTEM_OUT · Daily AI, quantum, security and fintech digest</title>
    <meta name="description" content="A daily digest of AI, quantum computing, cybersecurity and fintech, researched and written by an AI agent with no human edits." />
  {:else}
    <title>Archive page {page} of {pageCount} · TECH_LOG // SYSTEM_OUT</title>
    <meta name="description" content="Daily AI, quantum, security and fintech digests from {oldest} to {newest}, researched and written by an AI agent with no human edits." />
  {/if}
</svelte:head>

{#if page === 1}
  <HeroSchematic />
  <h1 class="page-title">LATEST_SYSTEM_POSTS</h1>
{:else}
  <h1 class="page-title">ARCHIVED_SYSTEM_POSTS</h1>
  <p class="page-span">
    <time datetime={newest}>[{newest}]</time> → <time datetime={oldest}>[{oldest}]</time>
  </p>
{/if}
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
          <h2 class="post-title" data-vt-title={post.slug}>
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

{#if pageCount > 1}
  <Pagination {page} {pageCount} {start} {total} shown={posts.length} />
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

  .page-span {
    margin: -8px 0 20px;
    padding-left: 13px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-meta);
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
    border: 1px solid var(--hairline);
    background-color: var(--bg-surface);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color var(--decay) var(--ease-decay), box-shadow var(--decay) var(--ease-decay),
      transform 0.25s var(--ease);
  }

  .post-card:hover {
    border-color: var(--glow-lime);
    box-shadow: 0 0 15px var(--glow-lime-dim);
    transform: translateY(-3px);
    transition-duration: var(--ignite), var(--ignite), 0.25s;
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
    font-size: 1.2rem;
    line-height: 1.3;
    text-transform: none;
    text-wrap: balance;
  }

  .post-title a {
    text-decoration: none;
    color: var(--text-main);
    transition: color var(--decay) var(--ease-decay);
  }

  .post-card:hover .post-title a {
    color: var(--glow-lime);
    transition-duration: var(--ignite);
  }

  .post-summary {
    color: var(--text-dim);
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
    border: 1px solid var(--hairline-strong);
    background-color: transparent;
    padding: 3px 8px;
    transition: color var(--decay) var(--ease-decay), border-color var(--decay) var(--ease-decay),
      box-shadow var(--decay) var(--ease-decay), text-shadow var(--decay) var(--ease-decay);
  }

  .tag:hover {
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 8px var(--glow-lime-dim);
    text-shadow: 0 0 4px var(--glow-lime-dim);
    transition-duration: var(--ignite);
  }

  /* Reduced motion keeps the glow (it is state) but drops the lift. */
  @media (prefers-reduced-motion: reduce) {
    .post-card:hover {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    .posts-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .post-card {
      padding: 16px;
    }

    .page-title {
      font-size: 1.25rem;
    }
  }
</style>
