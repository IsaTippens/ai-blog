<script>
  import PipelineBoard from '$lib/components/PipelineBoard.svelte';
  export let data;
</script>

<svelte:head>
  <title>About · TECH_LOG // SYSTEM_OUT</title>
  <meta name="description" content="How TECH_LOG // SYSTEM_OUT was built with Gemini Spark and oh-my-pi, and is produced daily by Gemini Tasks." />
</svelte:head>

<h1 class="page-title">ABOUT SYSTEM_OUT</h1>
<div class="card">
  <p class="lead">This is an automated tech blog site focused on mainstream tech, artificial intelligence, and quantum computing.</p>
</div>

<div class="pipeline" id="pipeline">
  <PipelineBoard run={data.run} />
</div>

<div class="card card--after">
  <section class="entry">
    <h2 class="entry-label">ORIGIN</h2>
    <p>The site was initially built with Gemini Spark (now Gemini Tasks) on Gemini 3.5 Flash, which produced the initial site code, research skill, and schedule. It was later iterated using oh-my-pi and Claude Opus 5.5.</p>
  </section>
  <section class="entry">
    <h2 class="entry-label">WORKFLOW</h2>
    <p>The current workflow remains the same: Gemini Tasks runs daily, researches the latest tech news, and produces the final production output.</p>
  </section>
  <section class="entry">
    <h2 class="entry-label">ARCHITECTURE</h2>
    <p>The site architecture is built using SvelteKit, compiled and served via Cloudflare Pages. It is designed with a refined dark-mode blueprint grid layout with soft green glowing hardware accents and an interactive isometric data pipeline visualization, inspired by retro-hardware terminal schematics.</p>
  </section>
  <p class="credit">Prompted by <a href="https://isatippens.com" class="author-link">Isa Tippens</a>.</p>
</div>

<style>
  .page-title {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--text-main);
    border-left: 3px solid var(--glow-lime);
    padding-left: 10px;
  }

  .card {
    border: 1px solid var(--hairline);
    background-color: var(--bg-surface);
    padding: 30px;
    margin-top: 20px;
    box-shadow: var(--shadow-settle);
  }

  .card--after {
    margin-top: 28px;
    padding-top: 8px;
    padding-bottom: 24px;
  }

  p {
    margin: 0;
    color: var(--text-main);
    font-family: var(--font-sans);
  }

  /* Standfirst: the one sentence that says what this is. */
  .lead {
    max-width: 46ch;
    font-size: 1.25rem;
    line-height: 1.5;
    text-wrap: balance;
  }

  /* Each topic is a labelled row: the mono label is what a skimming eye lands on. */
  .entry {
    display: grid;
    grid-template-columns: 9.5rem minmax(0, 62ch);
    column-gap: 24px;
    padding: 22px 0;
    border-bottom: 1px dashed var(--hairline-strong);
  }

  .entry-label {
    margin: 0;
    padding-top: 0.3em;
    font-size: 0.8rem;
    line-height: 1.4;
    letter-spacing: 0.06em;
    color: var(--text-dim);
  }

  .entry p {
    font-size: 1.0625rem;
    line-height: 1.7;
    text-wrap: pretty;
  }

  .credit {
    padding-top: 18px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    color: var(--text-meta);
  }

  .author-link {
    color: var(--text-main);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--phosphor-underline);
    text-underline-offset: 0.22em;
    transition: color var(--decay) var(--ease-decay), text-decoration-color var(--decay) var(--ease-decay);
  }

  .author-link:hover {
    color: var(--glow-lime);
    text-decoration-color: currentColor;
    transition-duration: var(--ignite);
  }

  .pipeline {
    margin-top: 28px;
    scroll-margin-top: 24px;
  }

  @media (max-width: 640px) {
    .card {
      padding: 20px;
    }

    .card--after {
      padding-top: 4px;
      padding-bottom: 18px;
    }

    .page-title {
      font-size: 1.25rem;
    }

    .lead {
      font-size: 1.125rem;
    }

    .entry {
      grid-template-columns: minmax(0, 1fr);
      row-gap: 6px;
      padding: 18px 0;
    }

    .entry-label {
      padding-top: 0;
    }

    .entry p {
      font-size: 1rem;
    }
  }
</style>
