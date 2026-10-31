<script>
  /** Current page, 1-based. */
  export let page;
  export let pageCount;
  /** Index of the first post on this page, and the archive size. */
  export let start;
  export let shown;
  export let total;

  $: width = Math.max(2, String(pageCount).length);
  $: items = pageItems(page, pageCount);

  const href = (p) => (p === 1 ? '/' : `/page/${p}`);
  const pad = (p) => String(p).padStart(width, '0');

  // First, last, and the current page with its neighbours; a gap of one page shows that page instead of an ellipsis.
  function pageItems(current, count) {
    const keep = new Set([1, count, current - 1, current, current + 1]);
    const out = [];
    let prev = 0;
    for (let p = 1; p <= count; p++) {
      if (!keep.has(p)) continue;
      if (p - prev === 2) out.push(p - 1);
      else if (p - prev > 2) out.push(null);
      out.push(p);
      prev = p;
    }
    return out;
  }
</script>

<nav class="pager" aria-label="Archive pages">
  <div class="pager-row">
    {#if page > 1}
      <a class="pager-step pager-step--newer" href={href(page - 1)} rel="prev">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 8H13M4 8L8 4M4 8L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        NEWER
      </a>
    {:else}
      <span class="pager-step pager-step--newer" aria-disabled="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 8H13M4 8L8 4M4 8L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        NEWER
      </span>
    {/if}

    <ol class="pager-pages">
      {#each items as item}
        <li>
          {#if item === null}
            <span class="pager-gap" aria-hidden="true">…</span>
          {:else if item === page}
            <a class="pager-num" href={href(item)} aria-current="page" aria-label="Page {item}, current">{pad(item)}</a>
          {:else}
            <a class="pager-num" href={href(item)} aria-label="Page {item}">{pad(item)}</a>
          {/if}
        </li>
      {/each}
    </ol>

    {#if page < pageCount}
      <a class="pager-step pager-step--older" href={href(page + 1)} rel="next">
        OLDER
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12 8H3M12 8L8 4M12 8L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    {:else}
      <span class="pager-step pager-step--older" aria-disabled="true">
        OLDER
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12 8H3M12 8L8 4M12 8L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    {/if}
  </div>

  <p class="pager-readout">
    PAGE {pad(page)} / {pad(pageCount)} // POSTS {start + 1}–{start + shown} OF {total}
  </p>
</nav>

<style>
  .pager {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px dashed var(--text-meta);
  }

  .pager-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
  }

  .pager-step {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 16px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-main);
    background-color: var(--bg-surface);
    border: 1px solid var(--hairline-strong);
    transition: color 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }

  .pager-step svg {
    transition: transform 0.25s var(--ease);
  }

  a.pager-step:hover {
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 10px var(--glow-lime-dim);
  }

  a.pager-step--newer:hover svg {
    transform: translateX(-3px);
  }

  a.pager-step--older:hover svg {
    transform: translateX(3px);
  }

  .pager-step[aria-disabled='true'] {
    color: var(--text-meta);
    background-color: transparent;
    border-color: var(--hairline);
    border-style: dashed;
  }

  .pager-pages {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pager-num,
  .pager-gap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0 6px;
    box-sizing: border-box;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .pager-num {
    color: var(--text-dim);
    border: 1px solid transparent;
    transition: color 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }

  .pager-num:hover {
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 8px var(--glow-lime-dim);
  }

  .pager-num[aria-current='page'] {
    font-weight: 700;
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    background-color: var(--bg-base);
  }

  .pager-gap {
    color: var(--text-meta);
  }

  .pager-readout {
    margin: 16px 0 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    text-align: center;
    color: var(--text-meta);
  }

  @media (prefers-reduced-motion: reduce) {
    .pager-step,
    .pager-step svg,
    .pager-num {
      transition: none;
    }

    a.pager-step:hover svg {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    .pager {
      margin-top: 32px;
    }

    .pager-row {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .pager-pages {
      grid-column: 1 / -1;
      grid-row: 1;
      gap: 2px;
    }

    /* Ellipses aren't targets; narrowing them keeps the seven-slot strip on one line at 320px. */
    .pager-gap {
      min-width: 20px;
      padding: 0;
    }

    .pager-step {
      justify-content: center;
    }
  }
</style>
