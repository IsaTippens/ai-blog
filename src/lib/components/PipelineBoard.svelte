<script>
  import { onMount } from 'svelte';
  import { LAYOUTS, STAGE_ORDER, CYCLE, buildStages, buildSchedule } from '$lib/pipeline.js';

  /** Facts about the newest digest from `latestRun()`, or null. */
  export let run = null;

  $: stages = buildStages(run);
  $: schedule = buildSchedule(run);
  $: liveSegs = new Set(schedule.segs.map((s) => s.id));

  // ── Selection and keyboard ────────────────────
  // The board is one tab stop; arrow keys walk the stages in pipeline order.
  let activeNode = null;
  let focusIndex = 0;

  function select(id) {
    activeNode = id;
  }

  function onKey(event, index) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (event.key in keys) next = (index + keys[event.key] + STAGE_ORDER.length) % STAGE_ORDER.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = STAGE_ORDER.length - 1;
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(STAGE_ORDER[index]);
      return;
    }
    if (next === null) return;
    event.preventDefault();
    focusIndex = next;
    event.currentTarget.ownerSVGElement.querySelector(`[data-stage="${STAGE_ORDER[next]}"]`)?.focus();
  }

  function onPointerEnter(event, id) {
    if (event.pointerType === 'mouse') select(id);
  }

  function onPointerLeave(event) {
    if (event.pointerType === 'mouse') select(null);
  }

  // ── Run replay ─────────────────────────────────
  // One packet leaves the trigger, splits at the planner, waits at the deep read, merges and
  // lands on this page. Traces burn lime behind each packet and decay once it has passed.
  let panel;
  let boards = {};
  let hot = new Set();
  let logLine = '';
  let parked = false;
  let reduced = false;

  onMount(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 640px)');
    reduced = motion.matches;
    const onMotion = () => {
      reduced = motion.matches;
      if (reduced) still();
    };
    motion.addEventListener('change', onMotion);

    const observer = new IntersectionObserver(([entry]) => (parked = !entry.isIntersecting));
    observer.observe(panel);

    let t = 0;
    let last = performance.now();
    let frame = 0;
    let board = null;
    let traces = [];

    function bind() {
      board = boards[compact.matches ? 'tall' : 'wide'];
      traces = [...board.querySelectorAll('[data-seg]')].map((burn) => {
        const seg = schedule.segs.find((s) => s.id === burn.dataset.seg);
        const len = burn.getTotalLength();
        burn.style.strokeDasharray = `${len}`;
        return { seg, burn, len, packet: board.querySelector(`[data-packet="${burn.dataset.seg}"]`) };
      }).filter((tr) => tr.seg);
    }

    function paint() {
      let lastHot = null;
      const nowHot = new Set();
      for (const id of STAGE_ORDER) {
        const window = schedule.heat[id];
        if (window && t >= window[0] && t <= window[1]) {
          nowHot.add(id);
          lastHot = id;
        }
      }
      const key = [...nowHot].join();
      if (key !== [...hot].join()) hot = nowHot;
      // Between hops the log keeps naming the stage the packet just left; it idles after the run lands.
      if (lastHot) {
        const line = `${stages[lastHot].title}  ${stages[lastHot].log}`;
        if (line !== logLine) logLine = line;
      } else if (t > (schedule.heat.page?.[1] ?? CYCLE)) {
        logLine = 'idle // next run on schedule';
      }

      for (const { seg, burn, len, packet } of traces) {
        const p = Math.min(1, Math.max(0, (t - seg.start) / seg.dur));
        burn.style.strokeDashoffset = `${len * (1 - p)}`;
        burn.classList.toggle('is-spent', t > seg.start + seg.dur + 500);
        burn.classList.remove('is-still');
        if (p > 0 && p < 1) {
          const pt = burn.getPointAtLength(len * p);
          packet.setAttribute('cx', pt.x);
          packet.setAttribute('cy', pt.y);
          packet.classList.add('is-moving');
        } else {
          packet.classList.remove('is-moving');
        }
      }
    }

    function tick(now) {
      const dt = Math.min(64, now - last);
      last = now;
      if (!parked && !activeNode && !reduced) {
        t += dt;
        if (t >= CYCLE) {
          t = 0;
          for (const tr of traces) tr.burn.classList.add('is-resetting');
          paint();
          board.getBoundingClientRect();
          for (const tr of traces) tr.burn.classList.remove('is-resetting');
        }
        paint();
      }
      frame = requestAnimationFrame(tick);
    }

    const onLayout = () => {
      bind();
      if (reduced) still();
      else paint();
    };

    // Reduced motion: the whole route drawn at rest, no packets, no lit stage.
    function still() {
      for (const { burn, packet } of traces) {
        burn.style.strokeDashoffset = '0';
        burn.classList.remove('is-spent');
        burn.classList.add('is-still');
        packet.classList.remove('is-moving');
      }
      hot = new Set();
      logLine = 'replay held still // reduced motion';
    }

    compact.addEventListener('change', onLayout);
    bind();
    if (reduced) still();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', onMotion);
      compact.removeEventListener('change', onLayout);
    };
  });

  $: focused = activeNode ? stages[activeNode] : null;
</script>

<section class="schematic-panel" class:is-parked={parked} bind:this={panel} aria-labelledby="pipeline-title">
  <div class="panel-header">
    <div class="panel-title" id="pipeline-title">SYS_PIPELINE // FULL_ARCHITECTURE</div>
    <div class="panel-status">{run?.date ? `REPLAY // RUN ${run.date}` : 'REPLAY // LAST RUN'}</div>
  </div>

  <div class="viewport">
    {#each Object.entries(LAYOUTS) as [name, layout]}
      <div class="board board--{name}">
        <svg
          viewBox="0 0 {layout.width} {layout.height}"
          class="schematic-svg"
          role="group"
          aria-label="Research pipeline, {STAGE_ORDER.length} stages. Use arrow keys to move between stages."
          bind:this={boards[name]}
        >
          <defs>
            <pattern id="grid-{name}" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" class="board-grid" />
            </pattern>
          </defs>
          <rect width={layout.width} height={layout.height} fill="url(#grid-{name})" />

          {#each Object.entries(layout.paths) as [id, d]}
            <path {d} class="trace" class:is-dead={!liveSegs.has(id)} />
            {#if liveSegs.has(id)}
              <path {d} class="burn" data-seg={id} />
            {/if}
          {/each}

          {#each STAGE_ORDER as id, index}
            {@const box = layout.boxes[id]}
            {@const stage = stages[id]}
            {@const narrow = layout.compact && box.w < 60}
            <g
              class="node"
              class:is-hot={hot.has(id)}
              class:is-active={activeNode === id}
              class:is-idle={stage.idle}
              data-stage={id}
              role="button"
              tabindex={focusIndex === index ? 0 : -1}
              aria-pressed={activeNode === id}
              aria-label="{stage.title}. {stage.about}"
              on:pointerenter={(e) => onPointerEnter(e, id)}
              on:pointerleave={onPointerLeave}
              on:click={() => select(id)}
              on:keydown={(e) => onKey(e, index)}
              on:focus={() => {
                focusIndex = index;
                select(id);
              }}
              on:blur={() => select(null)}
            >
              <rect x={box.x} y={box.y} width={box.w} height={box.h} class="node-rect" />
              <rect x={box.x} y={box.y} width={box.w} height={narrow ? box.h : layout.compact ? 18 : 20} class="node-header" />
              <text
                x={narrow ? box.x + box.w / 2 : box.x + 7}
                y={narrow ? box.y + box.h / 2 + 4 : box.y + (layout.compact ? 13 : 14)}
                class="node-title"
                text-anchor={narrow ? 'middle' : 'start'}
              >
                {narrow ? stage.short : stage.title}
              </text>
              {#if !narrow}
                {#if stage.rows && !layout.compact}
                  {#each stage.rows as row}
                    {@const laneBox = layout.boxes[row.lane]}
                    <text x={box.x + 10} y={laneBox.y + laneBox.h / 2 + 4} class="node-body" class:is-dim={row.idle}>
                      {row.lane.toUpperCase().padEnd(4, ' ')} {row.text}
                    </text>
                  {/each}
                  {#each stage.lines as line, i}
                    <text x={box.x + 10} y={box.y + box.h - 10 - i * 14} class="node-body is-dim">{line}</text>
                  {/each}
                {:else if stage.rows}
                  <text x={box.x + 8} y={box.y + 33} class="node-body">HW · AI · QC · SEC · FIN</text>
                  <text x={box.x + 8} y={box.y + 49} class="node-body is-dim">{stage.lines[0] ?? ''}</text>
                {:else}
                  {#each stage.lines.slice(0, layout.compact ? 1 : 3) as line, i}
                    <text x={box.x + 7} y={box.y + (layout.compact ? 31 : 36) + i * 14} class="node-body">{line}</text>
                  {/each}
                {/if}
              {/if}
            </g>
          {/each}

          {#each Object.keys(layout.paths) as id}
            {#if liveSegs.has(id)}
              <circle r={layout.compact ? 3 : 4} class="packet" data-packet={id} cx="-20" cy="-20" />
            {/if}
          {/each}
        </svg>
      </div>
    {/each}
  </div>

  <div class="panel-footer">
    <div class="readout" aria-live="polite">
      {#if focused}
        <p class="readout-title"><span class="pulse">&gt;</span> {focused.title}</p>
        <p class="readout-about">{focused.about}</p>
        {#if activeNode === 'page' && run?.slug}
          <a class="readout-link" href="/blog/{run.slug}">OPEN_LATEST_DIGEST</a>
        {/if}
      {/if}
    </div>
    {#if !focused}
      <p class="run-log" aria-hidden="true"><span class="pulse">&gt;</span> {logLine || 'replaying the last run'}</p>
      <p class="hint">Hover, tap or tab into a stage to pause the replay and read what it does.</p>
    {/if}
  </div>
</section>

<style>
  .schematic-panel {
    border: 1px solid var(--text-meta);
    background-color: var(--bg-surface);
    padding: 15px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    margin-bottom: 0;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    border-bottom: 1px dashed var(--text-meta);
    padding-bottom: 8px;
    margin-bottom: 15px;
    color: var(--text-meta);
  }

  .panel-title {
    margin: 0;
    font-size: inherit;
    font-weight: 700;
    letter-spacing: 0;
    color: var(--text-main);
  }

  .panel-status {
    color: var(--glow-lime);
    text-shadow: 0 0 6px var(--glow-lime-dim);
    font-variant-numeric: tabular-nums;
  }

  /* ── Board ─────────────────────────────────── */
  .viewport {
    position: relative;
    overflow: hidden;
    background: var(--viewport-black);
    border: 1px solid var(--hairline-faint);
  }

  .board--wide {
    height: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1400px;
  }

  .board--wide .schematic-svg {
    width: 920px;
    height: 560px;
    flex: none;
    transform: translateY(-14px) rotateX(40deg) rotateZ(-14deg) scale(0.8);
    transform-origin: 50% 50%;
  }

  .board--tall {
    display: none;
    padding: 10px 6px;
  }

  .board--tall .schematic-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .schematic-svg {
    overflow: visible;
  }

  .board-grid {
    stroke: var(--phosphor-faint);
    stroke-width: 1;
  }

  .trace {
    fill: none;
    stroke: var(--hairline-strong);
    stroke-width: 1.5;
    stroke-linejoin: round;
  }

  .trace.is-dead {
    stroke: var(--hairline-faint);
    stroke-dasharray: 3 5;
  }

  /* The burn is the trace lit behind a packet; it decays once the packet has passed. */
  .burn {
    fill: none;
    stroke: var(--glow-lime);
    stroke-width: 1.5;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 3px var(--glow-lime-dim));
    transition: opacity 1400ms var(--ease-decay);
  }

  .burn:global(.is-spent) {
    opacity: 0.22;
  }

  .burn:global(.is-resetting) {
    transition: none;
    opacity: 0;
  }

  .burn:global(.is-still) {
    opacity: 0.5;
    filter: none;
  }

  .packet {
    fill: var(--glow-lime);
    filter: drop-shadow(0 0 4px var(--glow-lime));
    opacity: 0;
  }

  .packet:global(.is-moving) {
    opacity: 1;
  }

  /* ── Stage chips ───────────────────────────── */
  .node {
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .node-rect {
    fill: var(--bg-base);
    stroke: var(--text-meta);
    stroke-width: 1.2;
    transition: stroke var(--decay) var(--ease-decay), fill var(--decay) var(--ease-decay),
      filter var(--decay) var(--ease-decay);
  }

  .node-header {
    fill: var(--node-plate);
    stroke: var(--text-meta);
    stroke-width: 1.2;
    transition: stroke var(--decay) var(--ease-decay), fill var(--decay) var(--ease-decay);
  }

  .node-title {
    fill: var(--text-main);
    font-size: 11px;
    font-family: var(--font-mono);
    font-weight: 700;
    transition: fill var(--decay) var(--ease-decay);
  }

  .node-body {
    fill: var(--text-meta);
    font-size: 10px;
    font-family: var(--font-mono);
    white-space: pre;
    transition: fill var(--decay) var(--ease-decay);
  }

  .node-body.is-dim {
    fill: var(--text-meta);
    opacity: 0.6;
  }

  .node.is-idle .node-rect,
  .node.is-idle .node-header {
    stroke: var(--hairline-strong);
    stroke-dasharray: 3 3;
  }

  .node.is-idle .node-title {
    fill: var(--text-meta);
  }

  /* Hot: a packet is at this stage. Active: the reader picked it. */
  .node.is-hot .node-rect,
  .node.is-active .node-rect {
    stroke: var(--glow-lime);
    fill: var(--node-plate-active);
    filter: drop-shadow(0 0 6px var(--glow-lime-dim));
    transition-duration: var(--ignite);
  }

  .node.is-hot .node-header,
  .node.is-active .node-header {
    fill: var(--glow-lime);
    stroke: var(--glow-lime);
    transition-duration: var(--ignite);
  }

  .node.is-hot .node-title,
  .node.is-active .node-title {
    fill: var(--bg-base);
    transition-duration: var(--ignite);
  }

  .node.is-hot .node-body,
  .node.is-active .node-body {
    fill: var(--text-main);
    transition-duration: var(--ignite);
  }

  /* ── Readout ───────────────────────────────── */
  .panel-footer {
    margin-top: 15px;
    border-top: 1px dashed var(--text-meta);
    padding-top: 10px;
    min-height: 4.6rem;
  }

  .readout p,
  .panel-footer p {
    margin: 0;
  }

  .readout-title {
    color: var(--text-main);
    font-weight: 700;
  }

  .readout-about {
    max-width: 78ch;
    margin-top: 4px !important;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-dim);
  }

  .readout-link {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    margin-top: 6px;
    color: var(--glow-lime);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .run-log {
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hint {
    margin-top: 4px !important;
    color: var(--text-meta);
  }

  .pulse {
    color: var(--glow-lime);
    animation: pulse-glow 1.5s infinite;
  }

  @keyframes pulse-glow {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }

  .is-parked .pulse {
    animation-play-state: paused;
  }

  @media (max-width: 960px) {
    .board--wide .schematic-svg {
      transform: rotateX(40deg) rotateZ(-14deg) scale(0.66);
    }

    .board--wide {
      height: 360px;
    }
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

    .board--wide {
      display: none;
    }

    .board--tall {
      display: block;
    }

    .run-log {
      white-space: normal;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pulse {
      animation: none;
      opacity: 1;
    }

    .node-rect,
    .node-header,
    .node-title,
    .node-body,
    .burn {
      transition: none;
    }
  }
</style>
