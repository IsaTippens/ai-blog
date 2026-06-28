<script>
  import '../app.css';
</script>

<div class="app-container">
  <header class="header">
    <div class="logo">
      <a href="/">TECH_LOG // SYSTEM_OUT</a>
    </div>
    <nav class="nav">
      <a href="/">INDEX</a>
      <a href="/about">ABOUT</a>
    </nav>
  </header>

  <main class="main-content">
    <slot />
  </main>

  <footer class="footer">
    <p>© 2026 ISA TIPPENS. ALL RIGHTS RESERVED. RUNNING ON SVELTEKIT & CLOUDFLARE PAGES.</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: #f6f6f6;
    color: #121212;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    padding: 0;
  }

  .app-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #121212;
    padding-bottom: 15px;
    margin-bottom: 40px;
  }

  .logo a {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    color: #121212;
    letter-spacing: -0.5px;
  }

  .nav a {
    text-decoration: none;
    color: #121212;
    font-weight: bold;
    margin-left: 20px;
    border: 1px solid transparent;
    padding: 4px 8px;
  }

  .nav a:hover {
    border: 1px solid #121212;
    background-color: #121212;
    color: #f6f6f6;
  }

  .main-content {
    flex: 1;
    margin-bottom: 60px;
  }

  .footer {
    border-top: 1px solid #121212;
    padding-top: 15px;
    font-size: 0.8rem;
    color: #666;
    text-align: center;
    letter-spacing: 0.5px;
  }
</style>
