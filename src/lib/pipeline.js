/**
 * The research pipeline behind every digest, as drawn by the index schematic.
 * Stage names are generic by design: they describe what each step does, not which service runs it.
 */

export const LANES = ['hw', 'ai', 'qc', 'sec', 'fin'];

const LANE_MATCH = {
  hw: /hardware|mainstream|chip|semiconductor/,
  ai: /^ai$|machine-learning|llm/,
  qc: /quantum/,
  sec: /security|cyber/,
  fin: /fintech|defi|finance|crypto|payments/
};

const EXTRACTS = {
  hw: 'node · bandwidth · price',
  ai: 'bench · tokens · evals',
  qc: 'qubits · fidelity · QEC',
  sec: 'CVE · CVSS · versions',
  fin: 'volume · standard · rules'
};

/** Lanes the newest run actually covered, from its categories; all lanes when unknown. */
export function activeLanes(run) {
  if (!run?.categories?.length) return [...LANES];
  const cats = run.categories.map((c) => c.toLowerCase());
  const hit = LANES.filter((lane) => cats.some((c) => LANE_MATCH[lane].test(c)));
  return hit.length ? hit : [...LANES];
}

function filedTime(run) {
  if (!run?.filed) return '';
  const d = new Date(run.filed);
  return Number.isNaN(d.getTime()) ? '' : `${d.toISOString().slice(11, 16)} UTC`;
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 'S'}`;

/** Stage copy. `lines` are the chip's readout; `about` explains the stage; `log` is the run-log line. */
export function buildStages(run) {
  const lanes = activeLanes(run);
  const r = run ?? {};
  const known = Boolean(run);
  const slug = r.slug ? `${r.slug}.md` : 'digest.md';
  const shortSlug = slug.length > 22 ? `${slug.slice(0, 20)}…` : slug;

  const laneStage = (lane, name) => ({
    id: lane,
    title: `02_SEARCH // ${name}`,
    short: name,
    lines: [lanes.includes(lane) ? 'IN THIS RUN' : 'QUIET THIS RUN'],
    about: `Date-bounded web search for the ${name} domain, fired in parallel with every other lane.${
      known ? (lanes.includes(lane) ? ' The newest digest drew stories from this lane.' : ' The newest digest carried nothing from this lane.') : ''
    }`,
    log: `fan-out: ${name} lane searching`,
    idle: !lanes.includes(lane)
  });

  return {
    trigger: {
      id: 'trigger',
      title: '00_CRON.TRIGGER',
      short: 'CRON',
      lines: ['DAILY', filedTime(run) ? `FILED ${filedTime(run)}` : r.date ? `RUN ${r.date}` : 'SCHEDULED'],
      about: 'A schedule wakes the research agent once a day. No human starts the run.',
      log: 'scheduled trigger fired'
    },
    planner: {
      id: 'planner',
      title: '01_QUERY.PLAN',
      short: 'PLAN',
      lines: [plural(lanes.length, 'DOMAIN'), r.date ? `WINDOW ${r.date}` : 'DATE-BOUNDED'],
      about: 'Writes date-bounded queries for every domain, then fans them out in parallel, alongside a video search for the top headlines and image metadata from the results.',
      log: `planning ${plural(lanes.length, 'domain').toLowerCase()} + video + image`
    },
    video: {
      id: 'video',
      title: '02_VIDEO.INDEX',
      short: 'VID',
      lines: [known ? plural(r.videos, 'VIDEO REF') : 'KEYNOTES · DEMOS'],
      about: 'Searches a video index for keynotes, demos and technical breakdowns of the top stories.',
      log: 'fan-out: video index searching'
    },
    hw: laneStage('hw', 'HW'),
    ai: laneStage('ai', 'AI'),
    qc: laneStage('qc', 'QC'),
    sec: laneStage('sec', 'SEC'),
    fin: laneStage('fin', 'FIN'),
    image: {
      id: 'image',
      title: '02_IMAGE.META',
      short: 'IMG',
      lines: [known ? plural(r.images, 'IMAGE') : 'DIAGRAMS · PRESS'],
      about: 'Lifts image and diagram URLs straight from search-result metadata, next to each article link.',
      log: 'fan-out: image metadata collected'
    },
    read: {
      id: 'read',
      title: '03_DEEP.READ',
      short: 'READ',
      lines: ['FULL TEXT, NO SNIPPETS', known ? plural(r.sources, 'SOURCE') : 'PARALLEL FETCH', known ? plural(r.domains, 'DOMAIN') : ''],
      about: 'Opens every selected article in full, in parallel. Search snippets drop the numbers that matter, so they are never trusted on their own.',
      log: known ? `deep-reading ${r.sources} sources across ${r.domains} domains` : 'deep-reading full articles'
    },
    extract: {
      id: 'extract',
      title: '04_METRIC.EXTRACT',
      short: 'EXTRACT',
      lines: known ? [plural(r.tables, 'TABLE')] : [],
      rows: LANES.map((lane) => ({ lane, text: EXTRACTS[lane], idle: !lanes.includes(lane) })),
      about: 'Pulls hard figures per domain: process node, bandwidth and price for hardware; benchmarks, token pricing and evals for AI; qubit counts, fidelities and error-correction codes for quantum; CVE IDs, CVSS scores and affected versions for security; volumes, standards and rules for fintech.',
      log: 'extracting metrics per domain'
    },
    synth: {
      id: 'synth',
      title: '05_SYNTH.MD',
      short: 'SYNTH',
      lines: known
        ? [`${r.stories} ${r.stories === 1 ? 'STORY' : 'STORIES'} · ${plural(r.sections, 'SECTION')}`, `~${r.readMinutes} MIN READ`]
        : ['FRONTMATTER · SECTIONS', 'TABLES · LINKS'],
      about: 'Writes the digest in Markdown: frontmatter, an executive intro that ties the domains together, a section per domain, comparison tables, and inline source, image and video links.',
      log: known ? `writing ${r.stories} stories in ${r.sections} sections` : 'writing the digest'
    },
    drop: {
      id: 'drop',
      title: '06_CLOUD.DROP',
      short: 'DROP',
      lines: [shortSlug],
      about: 'Uploads the finished .md file to a shared cloud folder. Just the file: no archives, no rebuilds.',
      log: `uploading ${slug}`
    },
    sync: {
      id: 'sync',
      title: '07_REPO.SYNC',
      short: 'SYNC',
      lines: ['HOURLY', 'STAMP · MEDIA · COMMIT'],
      about: 'An hourly job pulls new files into the site repository, stamps when each was filed, moves embedded images out to static files, and commits.',
      log: 'hourly sync: stamp, extract media, commit'
    },
    build: {
      id: 'build',
      title: '08_EDGE.BUILD',
      short: 'BUILD',
      lines: ['STATIC RENDER'],
      about: 'The commit triggers a static build that is deployed to the edge.',
      log: 'building and deploying to the edge'
    },
    page: {
      id: 'page',
      title: '09_THIS.PAGE',
      short: 'PAGE',
      lines: [r.date ? `LIVE ${r.date}` : 'LIVE'],
      about: 'The site you are reading. The newest digest sits at the top of the index.',
      log: known ? `published ${r.date}` : 'published'
    }
  };
}

/** Stage boxes and the traces between them, in board units, for each layout. */
const fanOrder = ['video', ...LANES, 'image'];

function wideLayout() {
  const laneY = { hw: 96, ai: 148, qc: 200, sec: 252, fin: 304 };
  const boxes = {
    trigger: { x: 20, y: 200, w: 110, h: 56 },
    planner: { x: 165, y: 190, w: 135, h: 76 },
    video: { x: 345, y: 30, w: 140, h: 40 },
    ...Object.fromEntries(LANES.map((l) => [l, { x: 345, y: laneY[l], w: 140, h: 40 }])),
    image: { x: 345, y: 370, w: 140, h: 40 },
    read: { x: 525, y: 96, w: 125, h: 248 },
    extract: { x: 690, y: 76, w: 205, h: 288 },
    synth: { x: 710, y: 450, w: 185, h: 84 },
    drop: { x: 515, y: 460, w: 150, h: 64 },
    sync: { x: 320, y: 450, w: 160, h: 84 },
    build: { x: 165, y: 460, w: 120, h: 64 },
    page: { x: 20, y: 460, w: 110, h: 64 }
  };
  const cy = (id) => boxes[id].y + boxes[id].h / 2;
  const paths = {
    tp: 'M130 228 H165',
    ...Object.fromEntries(fanOrder.map((id) => [`p-${id}`, `M300 228 H322 V${cy(id)} H345`])),
    ...Object.fromEntries(LANES.map((l) => [`r-${l}`, `M485 ${cy(l)} H525`])),
    ...Object.fromEntries(LANES.map((l) => [`x-${l}`, `M650 ${cy(l)} H690`])),
    'v-s': 'M485 50 H912 V492 H895',
    'i-s': 'M485 390 H690 V470 H710',
    xs: 'M802 364 V450',
    sd: 'M710 510 H665',
    dy: 'M515 492 H480',
    yb: 'M320 492 H285',
    bp: 'M165 492 H130'
  };
  return { width: 920, height: 560, boxes, paths, compact: false };
}

function tallLayout() {
  const fanX = Object.fromEntries(fanOrder.map((id, i) => [id, 4 + i * 48]));
  const boxes = {
    trigger: { x: 110, y: 8, w: 120, h: 36 },
    planner: { x: 95, y: 66, w: 150, h: 44 },
    ...Object.fromEntries(fanOrder.map((id) => [id, { x: fanX[id], y: 136, w: 44, h: 36 }])),
    read: { x: 52, y: 206, w: 236, h: 40 },
    extract: { x: 52, y: 270, w: 236, h: 62 },
    synth: { x: 95, y: 362, w: 150, h: 48 },
    drop: { x: 95, y: 440, w: 150, h: 38 },
    sync: { x: 95, y: 506, w: 150, h: 48 },
    build: { x: 95, y: 582, w: 150, h: 38 },
    page: { x: 110, y: 646, w: 120, h: 36 }
  };
  const cx = (id) => boxes[id].x + boxes[id].w / 2;
  const paths = {
    tp: 'M170 44 V66',
    ...Object.fromEntries(fanOrder.map((id) => [`p-${id}`, `M170 110 V122 H${cx(id)} V136`])),
    ...Object.fromEntries(LANES.map((l) => [`r-${l}`, `M${cx(l)} 172 V206`])),
    ...Object.fromEntries(LANES.map((l) => [`x-${l}`, `M${cx(l)} 246 V270`])),
    'v-s': 'M26 172 V386 H95',
    'i-s': 'M314 172 V386 H245',
    xs: 'M170 332 V362',
    sd: 'M170 410 V440',
    dy: 'M170 478 V506',
    yb: 'M170 554 V582',
    bp: 'M170 620 V646'
  };
  return { width: 340, height: 690, boxes, paths, compact: true };
}

export const LAYOUTS = { wide: wideLayout(), tall: tallLayout() };

export const STAGE_ORDER = ['trigger', 'planner', ...fanOrder, 'read', 'extract', 'synth', 'drop', 'sync', 'build', 'page'];

/** One run, in milliseconds: when each packet leaves and how long the trace takes. */
export const CYCLE = 12000;

export function buildSchedule(run) {
  const lanes = activeLanes(run);
  const fan = ['video', ...lanes, 'image'];
  const segs = [
    { id: 'tp', from: 'trigger', to: 'planner', start: 300, dur: 500 },
    ...fan.map((id) => ({ id: `p-${id}`, from: 'planner', to: id, start: 1300, dur: 550 })),
    ...lanes.map((l) => ({ id: `r-${l}`, from: l, to: 'read', start: 2050, dur: 350 })),
    { id: 'v-s', from: 'video', to: 'synth', start: 2050, dur: 2300 },
    { id: 'i-s', from: 'image', to: 'synth', start: 2050, dur: 2300 },
    ...lanes.map((l) => ({ id: `x-${l}`, from: 'read', to: 'extract', start: 3200, dur: 350 })),
    { id: 'xs', from: 'extract', to: 'synth', start: 3950, dur: 400 },
    { id: 'sd', from: 'synth', to: 'drop', start: 5250, dur: 450 },
    { id: 'dy', from: 'drop', to: 'sync', start: 6100, dur: 450 },
    { id: 'yb', from: 'sync', to: 'build', start: 7700, dur: 450 },
    { id: 'bp', from: 'build', to: 'page', start: 8600, dur: 400 }
  ];

  // A stage is lit from its first arrival until its last departure; the endpoints bracket the run.
  const heat = {};
  for (const id of STAGE_ORDER) {
    const arrivals = segs.filter((s) => s.to === id).map((s) => s.start + s.dur);
    const departures = segs.filter((s) => s.from === id).map((s) => s.start);
    if (!arrivals.length && !departures.length) continue;
    heat[id] = [
      arrivals.length ? Math.min(...arrivals) : 0,
      departures.length ? Math.max(...departures) : CYCLE - 1200
    ];
  }
  return { segs, heat };
}
