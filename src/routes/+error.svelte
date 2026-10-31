<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} · TECH_LOG // SYSTEM_OUT</title>
</svelte:head>

<section class="fault">
  <h1 class="fault-title">ERR_{$page.status} // {$page.status === 404 ? 'No digest at this address' : 'Console fault'}</h1>
  <p class="fault-detail">
    {$page.error?.message ?? 'Something went wrong while loading this page.'}
    {#if $page.status === 404}
      The link may be mistyped, or the post was renamed when it was re-filed.
    {/if}
  </p>
  <a href="/" class="fault-action">OPEN_LATEST_DIGESTS</a>
</section>

<style>
  .fault {
    max-width: 60ch;
    padding: 40px;
    background-color: var(--bg-surface);
    border: 1px solid var(--hairline);
  }

  .fault-title {
    margin: 0 0 16px;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .fault-detail {
    color: var(--text-dim);
  }

  .fault-action {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    border: 1px solid var(--hairline-strong);
    background-color: var(--bg-base);
    transition: color 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }

  .fault-action:hover {
    color: var(--glow-lime);
    border-color: var(--glow-lime);
    box-shadow: 0 0 10px var(--glow-lime-dim);
  }

  @media (max-width: 640px) {
    .fault {
      padding: 20px;
    }
  }
</style>
