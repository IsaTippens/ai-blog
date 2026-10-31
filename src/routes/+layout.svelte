<script>
  import '../app.css';
  import { onNavigate } from '$app/navigation';

  // The digest title is the one object that survives navigation: the card or older/newer link
  // the reader chose becomes the article heading (and back). Only that pair gets a transition
  // name, so the browser captures one element instead of every card on the index.
  const TITLE = 'digest-title';

  function tagTitle(slug) {
    if (!slug) return null;
    const el = document.querySelector(`[data-vt-title="${CSS.escape(slug)}"]`);
    el?.style.setProperty('view-transition-name', TITLE);
    return el;
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

    // Going to a digest, the pair is that digest; leaving one for the index, it is the one we left.
    const key = navigation.to?.params?.slug ?? navigation.from?.params?.slug;
    const outgoing = tagTitle(key);

    return new Promise((resolve) => {
      const transition = document.startViewTransition(async () => {
        outgoing?.style.removeProperty('view-transition-name');
        resolve();
        await navigation.complete;
        const incoming = tagTitle(key);
        transition.finished.finally(() => incoming?.style.removeProperty('view-transition-name'));
      });
    });
  });
</script>

<a href="#main" class="skip-link">SKIP_TO_CONTENT</a>

<div class="app-container">
  <header class="header">
    <div class="logo">
      <a href="/">
        <svg class="logo-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="10" height="10" stroke="var(--glow-lime)" stroke-width="1.5"/>
          <rect x="8" y="8" width="4" height="4" fill="var(--glow-lime)"/>
          <path d="M2 7H5M2 10H5M2 13H5M15 7H18M15 10H18M15 13H18M7 2V5M10 2V5M13 2V5M7 15V18M10 15V18M13 15V18" stroke="var(--glow-lime)" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
        <span>TECH_LOG // SYSTEM_OUT</span>
      </a>
    </div>
    <nav class="nav">
      <a href="/">INDEX</a>
      <a href="/about">ABOUT</a>
    </nav>
  </header>

  <main class="main-content" id="main" tabindex="-1">
    <slot />
  </main>

  <footer class="footer">
    <p>© 2026 ISA TIPPENS. ALL RIGHTS RESERVED. RUNNING ON SVELTEKIT & CLOUDFLARE PAGES.</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: var(--bg-base);
    color: var(--text-main);
    font-family: var(--font-sans);
    margin: 0;
    padding: 0;
  }

  .skip-link {
    position: absolute;
    left: 16px;
    top: -100px;
    z-index: 10;
    padding: 10px 16px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--bg-base);
    background-color: var(--glow-lime);
  }

  .skip-link:focus {
    top: 16px;
  }

  .app-container {
    max-width: 1000px;
    width: 100%;
    min-width: 0;
    margin: 0 auto;
    padding: 40px 20px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 30px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    border-bottom: 1px dashed var(--text-meta);
    padding-bottom: 20px;
  }

  .logo a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--text-main);
    letter-spacing: -0.5px;
  }

  .logo-icon {
    filter: drop-shadow(0 0 4px var(--glow-lime-dim));
  }

  .nav a {
    text-decoration: none;
    color: var(--text-main);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: bold;
    margin-left: 20px;
    border: 1px solid transparent;
    padding: 6px 12px;
    transition: color var(--decay) var(--ease-decay), border-color var(--decay) var(--ease-decay),
      box-shadow var(--decay) var(--ease-decay), text-shadow var(--decay) var(--ease-decay);
  }

  .nav a:hover {
    color: var(--glow-lime);
    text-shadow: 0 0 8px var(--glow-lime-dim);
    border-color: var(--glow-lime);
    box-shadow: 0 0 10px var(--glow-lime-dim);
    transition-duration: var(--ignite);
  }

  .main-content {
    outline: none;
    margin-bottom: 40px;
    width: 100%;
    min-width: 0;
  }

  .footer {
    border-top: 1px dashed var(--text-meta);
    padding-top: 20px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-meta);
    text-align: center;
    letter-spacing: 0.5px;
  }

  @media (max-width: 640px) {
    .app-container {
      padding: 20px 15px;
      gap: 20px;
    }

    .header {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
      text-align: center;
      padding-bottom: 15px;
    }

    .logo a {
      font-size: 1rem;
    }

    .nav {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .nav a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      margin-left: 5px;
      margin-right: 5px;
      font-size: 0.8rem;
      padding: 0 12px;
    }
  }
</style>
