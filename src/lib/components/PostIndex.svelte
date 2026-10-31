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
        <div class="card-plate">
          <div class="card-face">
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
          </div>
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

  /* ── Ribbon of slanted cards ───────────────────
     Each row is one band cut at a shared angle. Every card but the last in a row reaches
     --slant past its column, so its right cut runs parallel to the next card's left cut with a
     constant --cut gap. The outer ends of a row stay straight so the band sits on the page grid. */
  .posts-grid {
    --slant: 36px;
    --cut: 10px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: var(--cut);
    row-gap: 28px;
  }

  .post-card {
    --left: var(--slant);
    --right: var(--slant);
    --top: 0px;
    --bottom: 0px;
    display: flex;
    min-width: 0;
    margin-right: calc(-1 * var(--slant));
    /* The box overhangs into the cut gap; only the clipped plate takes the pointer. */
    pointer-events: none;
    transition: filter var(--decay) var(--ease-decay);
  }

  .post-card:nth-child(3n + 1) {
    --left: 0px;
  }

  .post-card:nth-child(3n),
  .post-card:last-child {
    --right: 0px;
    margin-right: 0;
  }

  /* The plate is the border colour; the face sits 1px inside it. Both share one cut shape. */
  .card-plate,
  .card-face {
    clip-path: polygon(
      var(--left) var(--top),
      100% 0,
      calc(100% - var(--right)) calc(100% - var(--bottom)),
      0 100%
    );
  }

  .card-plate {
    display: flex;
    flex: 1;
    padding: 1px;
    pointer-events: auto;
    background-color: var(--hairline-strong);
    transition: background-color var(--decay) var(--ease-decay);
  }

  .card-face {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(22px + var(--top)) calc(18px + var(--right)) calc(22px + var(--bottom)) calc(18px + var(--left));
    background-color: var(--bg-surface);
  }

  .post-card:hover,
  .post-card:focus-within {
    filter: drop-shadow(0 0 10px var(--glow-lime-dim));
    transition-duration: var(--ignite);
  }

  .post-card:hover .card-plate,
  .post-card:focus-within .card-plate {
    background-color: var(--glow-lime);
    transition-duration: var(--ignite);
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

  /* The whole face is the link target; the lit plate is its focus indicator. */
  .post-title a::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .post-title a:focus-visible {
    outline: none;
  }

  .post-card:hover .post-title a,
  .post-card:focus-within .post-title a {
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
    padding: 3px 8px;
  }

  @media (max-width: 899px) {
    .posts-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .post-card:nth-child(n) {
      --left: var(--slant);
      --right: var(--slant);
      margin-right: calc(-1 * var(--slant));
    }

    .post-card:nth-child(2n + 1) {
      --left: 0px;
    }

    .post-card:nth-child(2n),
    .post-card:last-child {
      --right: 0px;
      margin-right: 0;
    }
  }

  /* One column: the band runs down the page and the cuts become the cards' tops and bottoms. */
  @media (max-width: 640px) {
    .posts-grid {
      --slant: 18px;
      grid-template-columns: minmax(0, 1fr);
      row-gap: var(--cut);
    }

    .post-card:nth-child(n) {
      --left: 0px;
      --right: 0px;
      --top: var(--slant);
      --bottom: var(--slant);
      margin-right: 0;
      margin-bottom: calc(-1 * var(--slant));
    }

    .post-card:first-child {
      --top: 0px;
    }

    .post-card:last-child {
      --bottom: 0px;
      margin-bottom: 0;
    }

    .card-face {
      padding-left: 16px;
      padding-right: 16px;
    }

    .page-title {
      font-size: 1.25rem;
    }
  }
</style>
