---
name: TECH_LOG // SYSTEM_OUT
description: A night-shift console where a research agent files the day's tech briefing.
colors:
  console-black: "#111111"
  panel-graphite: "#1E1E1E"
  grid-dot: "#2A2A2A"
  readout-white: "#E0E0E0"
  readout-dim: "#B0B0B0"
  silkscreen-gray: "#888888"
  phosphor-lime: "#39FF14"
  phosphor-haze: "rgba(57, 255, 20, 0.3)"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  hairline: "3px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.readout-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  nav-link-hover:
    textColor: "{colors.phosphor-lime}"
  back-link:
    backgroundColor: "{colors.panel-graphite}"
    textColor: "{colors.readout-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  back-link-hover:
    textColor: "{colors.phosphor-lime}"
  post-card:
    backgroundColor: "{colors.panel-graphite}"
    textColor: "{colors.readout-white}"
    rounded: "{rounded.none}"
    padding: "24px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.silkscreen-gray}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  tag-hover:
    textColor: "{colors.phosphor-lime}"
  code-inline:
    backgroundColor: "{colors.panel-graphite}"
    textColor: "{colors.phosphor-lime}"
    rounded: "{rounded.hairline}"
    padding: "2px 6px"
  schematic-panel:
    backgroundColor: "{colors.panel-graphite}"
    textColor: "{colors.readout-white}"
    rounded: "{rounded.none}"
    padding: "15px"
---

# Design System: TECH_LOG // SYSTEM_OUT

## Overview

**Creative North Star: "The Night-Shift Console"**

An operator's terminal left running overnight. While you slept, the agent filed its report, and the console shows it as soft readout text on graphite panels over a dark drafting board. The single phosphor-lime accent marks where something is live or where your hand is. The mood is technical, nocturnal, and precise, with a deliberate retro-hardware wink: SNAKE_CASE labels, `//` separators, `.EXE`/`.SYS` node names, and a pipeline schematic tilted into isometric space.

Density is moderate. Structure speaks in monospace uppercase and prose speaks in a quiet sans. Panels are square and sit on a 24px dot grid, separated by hairline borders and dashed rules like silkscreen on a circuit board. Nothing is rounded beyond a hairline on inline code. Depth comes from tone, not lift: a panel is lighter than the board it sits on, and it wakes up with a lime border and glow only when touched.

The playfulness lives in labels and the schematic, never in effects. This system rejects hacker-movie cliché: no Matrix rain, no scanlines, no glitch distortion, and no wall-to-wall green-on-black.

**Key Characteristics:**
- One accent, Phosphor Lime, used as a signal for links, hover, focus, and live status.
- Monospace uppercase for structure (headings, labels, nav, meta) and Inter for reading.
- Square corners, 1px hairline borders, dashed dividers.
- Tonal panels on a dotted console-black board.
- Retro-hardware copy voice in labels (`RETURN_TO_INDEX`, `SYS_PIPELINE // DATA_FLOW_DIAGRAM`).

## Colors

A near-monochrome graphite palette with a single phosphor accent.

### Primary
- **Phosphor Lime** (#39FF14): the only chromatic color. Used for links in post bodies, hover and active states on nav, cards, tags and the back link, inline code text, the logo mark, heading accent bars (`border-left: 3px`), schematic flow lines, and the `STATUS` readout.
- **Phosphor Haze** (rgba(57, 255, 20, 0.3)): the glow companion to Phosphor Lime. Used only in `box-shadow`, `text-shadow`, and `drop-shadow` halos around lime elements.

### Neutral
- **Console Black** (#111111): the page board behind everything.
- **Grid Dot** (#2A2A2A): the 1px dots of the 24px blueprint grid painted on the board.
- **Panel Graphite** (#1E1E1E): surfaces for post cards, the article panel, the schematic panel, code blocks, and the back link.
- **Readout White** (#E0E0E0): primary text, headings, and nav at rest.
- **Readout Dim** (#B0B0B0): secondary prose, including card summaries, the article standfirst, the end-of-digest note, and error detail.
- **Silkscreen Gray** (#888888): meta text (dates, categories, footer), dashed dividers, idle borders, and schematic strokes.

Hairline borders use translucent white (`rgba(255, 255, 255, 0.1)` on panels, `0.15` on tags, the back link, and inset modules) instead of a fixed gray, so they read as etched edges on any surface.

Browser surfaces carry the palette: text selection is Console Black on Phosphor Lime, and keyboard focus is a 2px Phosphor Lime outline with a 3px offset.

### Named Rules
**The One Phosphor Rule.** Phosphor Lime is the only hue in the system. No second accent, no gradients, and no lime fills behind body text.

**The Signal, Not Paint Rule.** Lime marks something live or interactive. Inactive structure stays in grays.

## Typography

**Display Font:** JetBrains Mono (with monospace)
**Body Font:** Inter (with sans-serif)
**Label/Mono Font:** JetBrains Mono

**Character:** The console speaks in JetBrains Mono, bold and uppercase with tight tracking, like labels silkscreened onto hardware. Prose speaks in Inter at a generous 1.75 leading, so long digests stay readable under the console chrome.

### Hierarchy
- **Display** (700, `clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem)`, 1.15): the article's single `<h1>`, uppercase, balanced wrap, max 24em.
- **Headline** (700, 1.5rem, 1.3): page titles (`LATEST_SYSTEM_POSTS`, `ABOUT SYSTEM_OUT`), always paired with a 3px Phosphor Lime left bar. Drops to 1.25rem at ≤640px.
- **Title** (700, 1.25rem, 1.3): post-card titles on the index. In-article section heads (`h2`) are mono uppercase at 1.15rem; story heads (`h3`) are mono 600 at 1.05rem in the case they were written in, because long uppercase headlines read slowly.
- **Body** (400, 1.0625rem, 1.7): article prose, capped at 68ch. 1rem at ≤640px. The standfirst under the title is 1.125rem in Readout Dim; card summaries are 0.9rem.
- **Label** (400–700, 0.7–0.9rem, mono): nav (0.9rem bold), dates and meta (0.8rem), readout rows and outline entries (0.72–0.78rem), tags (0.7rem, uppercase, `#` prefix), footer (0.75rem, 0.5px tracking).

### Named Rules
**The Silkscreen Rule.** Every structural string (headings, nav, labels, meta, tags) is monospace. Inter appears only in running prose.

**The Machine Label Rule.** Interface labels use the console's dialect: uppercase SNAKE_CASE and `//` separators. Prose stays plain English.

## Layout

A single centered column, max 1000px wide, with 40px/20px outer padding (20px/15px at ≤640px). The shell is a three-row grid (header, main, footer) at a minimum of 100vh with a 30px gap. The header and footer are separated from content by 1px dashed Silkscreen Gray rules.

The index renders post cards in an auto-fit grid (`minmax(300px, 1fr)`, 24px gap), which collapses to one column with a 16px gap at ≤640px. The article page is one full-width panel with 40px padding (20px on mobile). The isometric schematic sits above the index list in a fixed-height viewport (260px, then 180px at ≤640px, then 140px at ≤480px).

Spacing follows an informal 8/12/16/24/40 rhythm. Breakpoints are 640px and 480px.

## Elevation & Depth

Depth is tonal. Panel Graphite surfaces sit on Console Black, edged with translucent hairlines. Soft, dark ambient shadows (`0 4px 20px rgba(0,0,0,0.3–0.4)`) only settle the panels onto the board; they never imply stacking. The lime glow is a state signal, not elevation: it appears on hover and focus, on the live status readout, and on the logo mark.

### Shadow Vocabulary
- **Panel settle** (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)`; the schematic uses `0.4`): resting shadow under index cards, the about card, and the schematic. The article panel is flat so the reading surface carries no chrome.
- **Phosphor halo, small** (`box-shadow: 0 0 8px–10px rgba(57, 255, 20, 0.3)`): hover on nav links, tags, and the back link.
- **Phosphor halo, card** (`box-shadow: 0 0 15px rgba(57, 255, 20, 0.3)`): hover on post cards, together with `translateY(-3px)`.
- **Text glow** (`text-shadow: 0 0 4px–8px rgba(57, 255, 20, 0.3)`): lime text in an active or live state.

### Named Rules
**The Wake-on-Touch Rule.** Panels are quiet at rest. The lime border and halo appear only in response to interaction or live status.

**The Inset Module Rule.** Instrument-like modules inside a panel (the run readout, the compact outline, the digest links) drop back to Console Black with a 0.15 hairline and no shadow. They read as recessed into the panel, never raised above it.

## Shapes

Square by default. Panels, cards, buttons, tags, and nav links have 0 radius. The only exception is inline code, with a 3px hairline radius, plus 2px corners on the SVG schematic nodes. Edges are 1px solid hairlines, and section dividers are 1px dashed. Iconography is drawn in 1.2–1.5px strokes with round caps, in the vocabulary of chip pins and wiring (see the logo mark).

## Components

### Navigation
**Character:** silkscreen labels that light up under the cursor.
- **Style:** mono 0.9rem bold, Readout White, 6px 12px padding, transparent 1px border.
- **Hover:** text turns Phosphor Lime with a text glow; the border turns lime with a small phosphor halo; 0.25s ease.
- **Mobile:** the header stacks and centers; links shrink to 0.8rem.

### Chips (tags)
- **Style:** mono 0.7rem uppercase with a `#` prefix, Silkscreen Gray text, 1px `rgba(255,255,255,0.15)` border, transparent background, 3px 8px padding, square.
- **State:** on hover, the text and border turn lime with a small halo. Tags are not links today.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** Panel Graphite.
- **Shadow Strategy:** panel settle at rest; phosphor card halo and a 3px lift on hover (see Elevation & Depth).
- **Border:** 1px `rgba(255,255,255,0.1)`; lime on hover.
- **Internal Padding:** 24px on post cards (16px mobile), 40px on the article panel (20px mobile), 30px on the about card.

### Back link (button-like)
- **Shape:** square, 1px `rgba(255,255,255,0.15)` border, Panel Graphite fill, 8px 16px padding.
- **Content:** a 16px arrow icon plus a mono 0.85rem bold label (`RETURN_TO_INDEX`).
- **Hover:** lime text, border, and halo; the arrow nudges 3px left.

### Code
- **Inline:** Phosphor Lime mono on Panel Graphite with a 3px radius and a hairline border.
- **Block:** Panel Graphite with a 1px Silkscreen Gray border and 15px padding; it scrolls horizontally.

### Source links
- **Style:** Readout White text with a 1px Phosphor Lime underline at 45% opacity, offset 0.22em.
- **Destination tag:** every external link ends with its domain in mono 0.72em Silkscreen Gray, preceded by a drawn 10px out-arrow. It is not underlined.
- **Hover:** text, underline, and domain turn full Phosphor Lime.

### Run readout (signature component)
The article's provenance plate, inset under the title. A bar reads `SYSTEM_OUT // DAILY RECON DIGEST` with a `HOW_THIS_IS_MADE` link to `/about#pipeline`. Below it is a two-column definition list of mono label/value rows (8.5rem label column): `AUTHOR` (full width, with a lime-outlined `AI-GENERATED` tag), `MODEL`, `HUMAN_EDITS`, `DIGEST_DATE`, `FILED`, `SOURCES`, `READ_TIME`, `CHANNELS`. Rows render only from real data: frontmatter fields or counts computed from the post. It collapses to one column at ≤640px.

### Outline
- **Desktop (≥960px):** a sticky 13rem rail beside the prose. Sections are mono 0.72rem bold; stories are mono 0.72rem Silkscreen Gray, clamped to two lines, hanging from a 1px hairline. The current section turns lime; the current story turns Readout White, and its stretch of the hairline turns lime with a soft halo.
- **Mobile:** a collapsible inset module (`CONTENTS · N SECTIONS · N STORIES`) with a 44px summary row and unclamped entries.

### Digest footer
A dashed rule, a `// END_OF_DIGEST` line that restates the AI authorship and source tally, then older/newer digest links as inset modules (direction, date, title), and a `BACK_TO_TOP` link.

### Pipeline Schematic (signature component)
An isometric SVG diagram of the agent pipeline (`01_CRAWLER.EXE` → `02_PARSER.SYS` → `03_STATIC.GEN`) inside a framed panel with a mono header (`SYS_PIPELINE // DATA_FLOW_DIAGRAM`), a lime `STATUS` readout, and a footer console line. The viewport is near-black (#090909), tilted with `rotateX(55deg) rotateZ(-30deg)`, and overlaid with a faint lime grid. Flow lines are dashed lime and crawl at a 15s linear loop. Hovering a node fills its header strip lime and prints an `AGENT_RUNNING:` line with a pulsing `>` prompt.

## Do's and Don'ts

### Do:
- **Do** keep Phosphor Lime (#39FF14) as the single accent and reserve it for links, interaction, and live status.
- **Do** set structure in JetBrains Mono and prose in Inter at 1.7 leading, capped at 68ch.
- **Do** derive provenance from real data (frontmatter or counts from the post) and say plainly on every post that an AI agent wrote it.
- **Do** keep corners square; the only radius is the 3px on inline code.
- **Do** separate regions with 1px dashed Silkscreen Gray rules and edge panels with translucent white hairlines.
- **Do** keep panels quiet at rest and let them wake with a lime border and halo on hover and focus.
- **Do** write interface labels in the console dialect (`SNAKE_CASE`, `//`, `[YYYY-MM-DD]`).

### Don't:
- **Don't** use hacker-movie cliché: no Matrix rain, scanlines, glitch effects, or green-on-black overload.
- **Don't** introduce a second accent hue, gradients, or rounded corners.
- **Don't** apply the phosphor glow to elements at rest that aren't the logo or a live status.
- **Don't** set long-form prose in monospace.
