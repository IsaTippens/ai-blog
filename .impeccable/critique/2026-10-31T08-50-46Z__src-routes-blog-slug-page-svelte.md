---
target: blog post page
total_score: 16
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/home/isati/dev/ai-blog/src/routes/blog/[slug]/+page.svelte"
target_fingerprint: "sha256:c2c72f812522dcae3365a090bb38109e123df2f4e7286f7b1c570903207873e7"
target_path: /home/isati/dev/ai-blog/src/routes/blog/[slug]/+page.svelte
timestamp: 2026-10-31T08-50-46Z
slug: src-routes-blog-slug-page-svelte
---
Method: dual-agent (A: CritiqueA · B: CritiqueB)

Target: src/routes/blog/[slug]/+page.svelte (Read mode). Checked live at 1440 and 390 on two posts: meta-muse-glimmer-openai-cyber-and-qci-nhanced-fab and hello-world.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | `<title>` is empty (no `<svelte:head>`); no position marker across 10 stories; no "generated at". |
| 2 | Match System / Real World | 3 | Prose is plain; the date appears twice in two formats. |
| 3 | User Control and Freedom | 2 | The article ends in a dead end: no previous/next day, no back-to-top. |
| 4 | Consistency and Standards | 2 | Two `<h1>`s; h2 and h3 styled alike; browser-default `<hr>` next to dashed rules. |
| 5 | Error Prevention | 2 | Source links hide their destination; some go to aggregators. |
| 6 | Recognition Rather Than Recall | 1 | No TOC or section cue on a 6410px mobile page. |
| 7 | Flexibility and Efficiency | 1 | Headings have empty `id`s, so no deep links; no skip link, no prev/next, no RSS. |
| 8 | Aesthetic and Minimalist Design | 2 | Card, shadow, 14 all-caps headings and 104–174-character neon links compete with the prose. |
| 9 | Error Recovery | 1 | 404 is the stock SvelteKit page. |
| 10 | Help and Documentation | 1 | How a post was made is explained only on /about. |
| **Total** | | **16/40** | **Poor** |

## Design Specificity Verdict

LLM: the console look has been adopted but not put to work. Mono uppercase, lime, dot grid and SNAKE_CASE could belong to any dev-tool site. Nothing on the page is real system output: run time, source count, the agent, or "unedited". The North Star (The Night-Shift Console) is the right world; the post page shows the costume but not the console's actual readout.

Deterministic scan: the source scan returned 0 findings, but regex-only on .svelte, so element rules didn't run. Live-URL scan found 17: line-length ×11 (all body paragraphs, ~103–110 chars/line at 1440), unbalanced-heading ×5 (body h1, h3 #3/#4/#6/#7), straggler ×1. hello-world: 1 straggler. app.css: overused-font (Inter). The scan agrees with the LLM on line length and heading problems. Stragglers depend on the article text and are advisory. The Inter finding conflicts with the newly confirmed DESIGN.md, so it is treated as a false positive.

## Priority Issues

[P0] No AI-authorship disclosure on the post. PRODUCT.md makes it binding; `.post-meta` shows only date and categories. Fix: a provenance line in the meta (agent, unedited, source count, generated time, linked to /about), plus an end-of-transmission block with the same facts. Extend the frontmatter if needed. Commands: clarify, shape.

[P1] Inverted hierarchy and duplicate H1. The markdown `# SYSTEM_OUT: DAILY RECON DIGEST // …` renders larger than `.post-title` (33.6 vs 32px desktop, 32 vs 24px mobile) at line-height 1.75. Fix: demote it to a kicker above the title, keep one date, set heading line-height to 1.15–1.25, make h2 visibly a section divider, style `hr` as the dashed rule. Command: typeset.

[P1] No navigation in a long digest. 14 headings with empty `id`s, no TOC, no prev/next day. Fix: heading anchors, a sticky I–IV TOC on wide screens and a collapsible one on mobile, a prev/next-day footer. Commands: layout, shape.

[P1] Line length and the heavy card. The prose column is 878px (~108 chars/line) at 1440. Fix: max-width ~68ch on prose; flatten `.blog-post` (40px padding, shadow) and use the space for the TOC rail. Commands: layout, distill.

[P2] Source links swamp the prose. 104–174-character lime underlined runs; the destination is hidden. Fix: shorter link text or a mono domain chip `↗ domain.com`, a dimmer underline with full lime on hover, an optional numbered SOURCES log at the end. Commands: quieter, clarify.

## Persona Red Flags

Alex (power user): no anchors or TOC, empty tab title, no prev/next.
Sam (accessibility): two h1s, no skip link, default focus ring, meta #888 on #1E1E1E at 4.70:1 (just passes), links rely only on the underline (lime vs text 1.03:1 in brightness).
Casey (mobile): first story ~1.9 screens down; nav targets 34.5px, back link 39.75px; the only exit is at the top.
Morgan (daily briefing reader): the frontmatter `summary` is never shown; nothing ranks the day's biggest moves.
Priya (showcase evaluator): nothing on the post shows the machine; the 404 is the framework default.

## Minor Observations

- No meta description or OG tags; shared links unfurl blank.
- Categories are plain text, not links; mobile meta wraps with a hanging `//`.
- 14 all-caps mono headlines slow down reading of long story titles.
- `transition: all`; dead `background-color` on `.back-link:hover`; reading time (~3 min) not shown.
- hello-world lists use the browser default indent; `pre` border is the default gray.

## Questions to Consider

- Why doesn't the console show real system output (run time, source count, agent/model, diff from yesterday)?
- Should the digest open with a 10-line scannable manifest instead of a 124-word overview?
- The edge is cross-domain synthesis, yet sections are siloed by domain and styled the same; what would showing the links between stories look like?
