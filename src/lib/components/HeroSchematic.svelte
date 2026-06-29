<script>
  let activeNode = null;
  function selectNode(node) {
    activeNode = node;
  }
</script>

<div class="schematic-panel">
  <div class="panel-header">
    <div class="panel-title">SYS_PIPELINE // DATA_FLOW_DIAGRAM</div>
    <div class="panel-status">STATUS: MONITOR_ACTIVE</div>
  </div>
  <div class="viewport">
    <div class="isometric-grid">
      <svg viewBox="0 0 600 320" class="schematic-svg">
        <!-- Grid pattern inside SVG for technical blueprint look -->
        <g stroke="rgba(57, 255, 20, 0.05)" stroke-width="1">
          {#each Array(13) as _, i}
            <line x1={i * 50} y1="0" x2={i * 50} y2="320" />
          {/each}
          {#each Array(7) as _, i}
            <line x1="0" y1={i * 50} x2="600" y2={i * 50} />
          {/each}
        </g>
        
        <!-- Connection Flow Lines -->
        <path class="flow-line flow-active" d="M 180 70 H 205 V 160 H 230" />
        <path class="flow-line flow-active" d="M 370 160 H 395 V 250 H 420" />
        
        <!-- Crawler Node -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g class="node" on:mouseover={() => selectNode('CRAWLER')} on:mouseout={() => selectNode(null)} role="button" tabindex="0">
          <!-- Outer border -->
          <rect x="40" y="40" width="140" height="60" rx="2" class="node-rect" />
          <!-- Header block -->
          <rect x="40" y="40" width="140" height="20" rx="2" class="node-header" />
          <text x="48" y="54" class="node-title">01_CRAWLER.EXE</text>
          <text x="48" y="85" class="node-body">IN: RSS_FEEDS</text>
        </g>

        <!-- Parser Node -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g class="node" on:mouseover={() => selectNode('PARSER')} on:mouseout={() => selectNode(null)} role="button" tabindex="0">
          <rect x="230" y="130" width="140" height="60" rx="2" class="node-rect" />
          <rect x="230" y="130" width="140" height="20" rx="2" class="node-header" />
          <text x="238" y="144" class="node-title">02_PARSER.SYS</text>
          <text x="238" y="175" class="node-body">PROC: LLM_PARSE</text>
        </g>

        <!-- Static Gen Node -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g class="node" on:mouseover={() => selectNode('STATIC_GEN')} on:mouseout={() => selectNode(null)} role="button" tabindex="0">
          <rect x="420" y="220" width="140" height="60" rx="2" class="node-rect" />
          <rect x="420" y="220" width="140" height="20" rx="2" class="node-header" />
          <text x="428" y="234" class="node-title">03_STATIC.GEN</text>
          <text x="428" y="265" class="node-body">OUT: SVELTEKIT</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="panel-footer">
    <div class="active-node-info">
      {#if activeNode === 'CRAWLER'}
        <span class="pulse">></span> AGENT_RUNNING: Scanning web APIs & tech news portals...
      {:else if activeNode === 'PARSER'}
        <span class="pulse">></span> AGENT_RUNNING: Rewriting news feeds with AI synthesis...
      {:else if activeNode === 'STATIC_GEN'}
        <span class="pulse">></span> AGENT_RUNNING: Rendering static pages & updating route directories...
      {:else}
        <span class="meta-idle">> PIPELINE STATUS: ACTIVE // AWAITING NODE SELECTION_</span>
      {/if}
    </div>
  </div>
</div>

<style>
  .schematic-panel {
    border: 1px solid var(--text-meta);
    background-color: var(--bg-surface);
    padding: 15px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    margin-bottom: 2rem;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed var(--text-meta);
    padding-bottom: 8px;
    margin-bottom: 15px;
    color: var(--text-meta);
  }

  .panel-title {
    font-weight: bold;
    color: var(--text-main);
  }

  .panel-status {
    color: var(--glow-lime);
    text-shadow: 0 0 6px var(--glow-lime-dim);
  }

  .viewport {
    height: 260px;
    position: relative;
    overflow: hidden;
    background: #090909;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 800px;
  }

  .isometric-grid {
    width: 600px;
    height: 320px;
    transform: rotateX(55deg) rotateZ(-30deg) scale(0.95);
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .isometric-grid:hover {
    transform: rotateX(50deg) rotateZ(-25deg) scale(1.02);
  }

  .schematic-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .flow-line {
    fill: none;
    stroke: var(--text-meta);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.3;
    transition: stroke 0.3s, stroke-width 0.3s, opacity 0.3s;
  }

  .flow-active {
    stroke: var(--glow-lime);
    stroke-width: 1.5;
    stroke-dasharray: 6 6;
    animation: flow-dash 15s linear infinite;
    opacity: 0.8;
  }

  @keyframes flow-dash {
    to {
      stroke-dashoffset: -300;
    }
  }

  .node {
    cursor: pointer;
  }

  .node-rect {
    fill: var(--bg-base);
    stroke: var(--text-meta);
    stroke-width: 1.5;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .node-header {
    fill: #222;
    stroke: var(--text-meta);
    stroke-width: 1.5;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .node:hover .node-rect {
    stroke: var(--glow-lime);
    fill: #161a14;
    filter: drop-shadow(0 0 6px var(--glow-lime-dim));
  }

  .node:hover .node-header {
    fill: var(--glow-lime);
    stroke: var(--glow-lime);
  }

  .node:hover .node-title {
    fill: #000;
    font-weight: bold;
  }

  .node:hover .node-body {
    fill: var(--text-main);
  }

  .node-title {
    fill: var(--text-meta);
    font-size: 10px;
    font-family: var(--font-mono);
    font-weight: bold;
    transition: fill 0.25s;
  }

  .node-body {
    fill: var(--text-meta);
    font-size: 10px;
    font-family: var(--font-mono);
    transition: fill 0.25s;
  }

  .panel-footer {
    margin-top: 15px;
    border-top: 1px dashed var(--text-meta);
    padding-top: 10px;
    min-height: 30px;
  }

  .active-node-info {
    color: var(--text-main);
  }

  .pulse {
    color: var(--glow-lime);
    animation: pulse-glow 1.5s infinite;
  }

  .meta-idle {
    color: var(--text-meta);
  }

  @keyframes pulse-glow {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
</style>
