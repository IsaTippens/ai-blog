<svelte:head>
  <title>About · TECH_LOG // SYSTEM_OUT</title>
  <meta name="description" content="How TECH_LOG // SYSTEM_OUT was built with Gemini Spark and oh-my-pi, and is produced daily by Gemini Tasks." />
</svelte:head>

<h1 class="page-title">ABOUT SYSTEM_OUT</h1>
<div class="card" id="pipeline">
  <p>This is an automated tech blog site focused on mainstream tech, artificial intelligence, and quantum computing.</p>
  <p>The site was initially built with Gemini Spark (now Gemini Tasks) on Gemini 3.5 Flash, which produced the initial site code, research skill, and schedule. It was later iterated using oh-my-pi and Claude Opus 5.5.</p>
  <p>The current workflow remains the same: Gemini Tasks runs daily, researches the latest tech news, and produces the final production output.</p>
  <p>The site architecture is built using SvelteKit, compiled and served via Cloudflare Pages. It is designed with a refined dark-mode blueprint grid layout with soft green glowing hardware accents and an interactive isometric data pipeline visualization, inspired by retro-hardware terminal schematics.</p>
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

  p {
    max-width: 60ch;
    color: var(--text-main);
    font-family: var(--font-sans);
    line-height: 1.75;
    margin-bottom: 1.25rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    .card {
      padding: 20px;
    }

    .page-title {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
</style>
