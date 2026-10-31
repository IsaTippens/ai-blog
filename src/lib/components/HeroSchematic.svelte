<script>
  import { onMount } from 'svelte';

  // The flow loop is decoration; it runs only while the panel is on screen.
  let panel;
  let parked = false;
  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      parked = !entry.isIntersecting;
    });
    observer.observe(panel);
    return () => observer.disconnect();
  });

  let activeNode = null;
  function selectNode(node) {
    activeNode = node;
  }
  // Hover is only a shortcut: tap, click, focus and Enter/Space all show the node readout.
  function onNodeKey(event, node) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectNode(node);
    }
  }
  function onPointerEnter(event, node) {
    if (event.pointerType === 'mouse') selectNode(node);
  }
  function onPointerLeave(event) {
    if (event.pointerType === 'mouse') selectNode(null);
  }
</script>

<div class="schematic-panel" class:is-parked={parked} bind:this={panel}>
  <div class="panel-header">
    <div class="panel-title">SYS_PIPELINE // DATA_FLOW_DIAGRAM</div>
    <div class="panel-status">STATUS: MONITOR_ACTIVE</div>
  </div>
  <div class="viewport">
    <div class="isometric-grid">
      <svg viewBox="0 0 600 320" class="schematic-svg">
        <!-- Grid pattern inside SVG for technical blueprint look -->
        <g style="stroke: var(--phosphor-faint)" stroke-width="1">
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
        <g class="node" class:is-active={activeNode === 'CRAWLER'} role="button" tabindex="0" aria-pressed={activeNode === 'CRAWLER'} aria-label="01_CRAWLER.EXE, input RSS_FEEDS"
          on:pointerenter={(e) => onPointerEnter(e, 'CRAWLER')} on:pointerleave={onPointerLeave}
          on:click={() => selectNode('CRAWLER')} on:keydown={(e) => onNodeKey(e, 'CRAWLER')}
          on:focus={() => selectNode('CRAWLER')} on:blur={() => selectNode(null)}>
          <!-- Outer border -->
          <rect x="40" y="40" width="140" height="60" rx="2" class="node-rect" />
          <!-- Header block -->
          <rect x="40" y="40" width="140" height="20" rx="2" class="node-header" />
          <text x="48" y="54" class="node-title">01_CRAWLER.EXE</text>
          <text x="48" y="85" class="node-body">IN: RSS_FEEDS</text>
        </g>

        <!-- Parser Node -->
        <g class="node" class:is-active={activeNode === 'PARSER'} role="button" tabindex="0" aria-pressed={activeNode === 'PARSER'} aria-label="02_PARSER.SYS, process LLM_PARSE"
          on:pointerenter={(e) => onPointerEnter(e, 'PARSER')} on:pointerleave={onPointerLeave}
          on:click={() => selectNode('PARSER')} on:keydown={(e) => onNodeKey(e, 'PARSER')}
          on:focus={() => selectNode('PARSER')} on:blur={() => selectNode(null)}>
          <rect x="230" y="130" width="140" height="60" rx="2" class="node-rect" />
          <rect x="230" y="130" width="140" height="20" rx="2" class="node-header" />
          <text x="238" y="144" class="node-title">02_PARSER.SYS</text>
          <text x="238" y="175" class="node-body">PROC: LLM_PARSE</text>
        </g>

        <!-- Static Gen Node -->
        <g class="node" class:is-active={activeNode === 'STATIC_GEN'} role="button" tabindex="0" aria-pressed={activeNode === 'STATIC_GEN'} aria-label="03_STATIC.GEN, output SVELTEKIT"
          on:pointerenter={(e) => onPointerEnter(e, 'STATIC_GEN')} on:pointerleave={onPointerLeave}
          on:click={() => selectNode('STATIC_GEN')} on:keydown={(e) => onNodeKey(e, 'STATIC_GEN')}
          on:focus={() => selectNode('STATIC_GEN')} on:blur={() => selectNode(null)}>
          <rect x="420" y="220" width="140" height="60" rx="2" class="node-rect" />
          <rect x="420" y="220" width="140" height="20" rx="2" class="node-header" />
          <text x="428" y="234" class="node-title">03_STATIC.GEN</text>
          <text x="428" y="265" class="node-body">OUT: SVELTEKIT</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="panel-footer" aria-live="polite">
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
    background: var(--viewport-black);
    border: 1px solid var(--hairline-faint);
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 800px;
  }

  .isometric-grid {
    position: absolute;
    width: 600px;
    height: 320px;
    transform: rotateX(55deg) rotateZ(-30deg) scale(0.95);
    transform-style: preserve-3d;
    transition: transform 0.5s var(--ease);
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

  .is-parked .flow-active,
  .is-parked .pulse {
    animation-play-state: paused;
  }

  @keyframes flow-dash {
    to {
      stroke-dashoffset: -300;
    }
  }

  .node {
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .node-rect {
    fill: var(--bg-base);
    stroke: var(--text-meta);
    stroke-width: 1.5;
    transition: stroke var(--decay) var(--ease-decay), fill var(--decay) var(--ease-decay),
      filter var(--decay) var(--ease-decay);
  }

  .node-header {
    fill: var(--node-plate);
    stroke: var(--text-meta);
    stroke-width: 1.5;
    transition: stroke var(--decay) var(--ease-decay), fill var(--decay) var(--ease-decay);
  }

  .node.is-active .node-rect {
    stroke: var(--glow-lime);
    fill: var(--node-plate-active);
    filter: drop-shadow(0 0 6px var(--glow-lime-dim));
    transition-duration: var(--ignite);
  }

  .node.is-active .node-header {
    fill: var(--glow-lime);
    stroke: var(--glow-lime);
    transition-duration: var(--ignite);
  }

  .node.is-active .node-title {
    fill: var(--bg-base);
    font-weight: bold;
    transition-duration: var(--ignite);
  }

  .node.is-active .node-body {
    fill: var(--text-main);
    transition-duration: var(--ignite);
  }

  .node-title {
    fill: var(--text-meta);
    font-size: 10px;
    font-family: var(--font-mono);
    font-weight: bold;
    transition: fill var(--decay) var(--ease-decay);
  }

  .node-body {
    fill: var(--text-meta);
    font-size: 10px;
    font-family: var(--font-mono);
    transition: fill var(--decay) var(--ease-decay);
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

  @media (max-width: 640px) {
    .schematic-panel {
      padding: 10px;
    }

    .panel-header {
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
    }

    .viewport {
      height: 180px;
    }

    .isometric-grid {
      transform: rotateX(55deg) rotateZ(-30deg) scale(0.6);
      transform-origin: center;
    }

    .isometric-grid:hover {
      transform: rotateX(50deg) rotateZ(-25deg) scale(0.62);
    }
  }

  @media (max-width: 480px) {
    .viewport {
      height: 140px;
    }

    .isometric-grid {
      transform: rotateX(55deg) rotateZ(-30deg) scale(0.48);
      transform-origin: center;
    }

    .isometric-grid:hover {
      transform: rotateX(50deg) rotateZ(-25deg) scale(0.5);
    }
  }

  /* Motion is decoration here: with reduced motion the diagram holds still and state changes cut. */
  @media (prefers-reduced-motion: reduce) {
    .flow-active,
    .pulse {
      animation: none;
    }

    .pulse {
      opacity: 1;
    }

    .isometric-grid,
    .node-rect,
    .node-header,
    .node-title,
    .node-body {
      transition: none;
    }
  }
</style>
