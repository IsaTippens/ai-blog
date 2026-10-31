# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Daily briefing readers.** Professionals across AI, quantum computing, cybersecurity, and fintech who return to catch up on what happened today and want the signal fast.
- **Showcase audience.** Peers, collaborators, and recruiters evaluating the automated research-agent pipeline itself; the posts are evidence of what the system produces.
- **The owner (Isa Tippens).** Reads the site as a personal daily briefing and archive.

## Product Purpose

TECH_LOG // SYSTEM_OUT is a fully automated tech blog. Every day a background research agent scans the landscape, extracts the most significant events, and publishes one digest post. Success means a reader leaves each post knowing the day's important moves across all covered domains, with a source for every claim, and the showcase audience comes away convinced the pipeline produces work worth reading.

## Positioning

- **Cross-domain synthesis.** One daily read that connects AI, quantum computing, cybersecurity, and fintech, which other outlets cover separately.
- **Fully automated, openly.** The agent-written, zero-human-authoring pipeline is the point and is visible, not hidden.
- **Sourced density.** Every claim links to its source inline; high information per minute, no filler.

## Operating Context

- Posts are written by the research agent, saved as Markdown in a Google Drive folder, and pulled into `posts/` by `scripts/sync_posts.py`, run hourly by `.github/workflows/sync-posts.yml`, which commits to `main`.
- Cloudflare Pages builds and serves the site on push.
- Readers move between the index (`/`, newest 12 posts with date, title, summary, category tags; older pages at `/page/N`), individual posts (`/blog/[slug]`), and `/about`.

## Capabilities and Constraints

- Stack: SvelteKit 2 / Svelte 5, Vite, `gray-matter` + `marked` for Markdown, `@sveltejs/adapter-cloudflare`.
- Post frontmatter today: `title`, `date`, `summary`, `categories`. The user said the post format is not binding and can change.
- Typical post structure: a `SYSTEM_OUT: DAILY RECON DIGEST // <date>` H1, an overview paragraph, roman-numeral H2 sections separated by horizontal rules, numbered H3 stories, and inline source links.
- Categories seen: `ai`, `quantum`, `cybersecurity`, `fintech`, plus occasional ad-hoc tags.
- Archive: about 130 posts, one per day, starting 2026-06-29. Volume grows daily with no human curation.
- Undecided: search, filtering by category, archive navigation, RSS/email delivery.

## Brand Commitments

- Site name **TECH_LOG // SYSTEM_OUT** and its terminal-style voice (`SYSTEM_OUT`, `DAILY RECON DIGEST`) are binding.
- **AI authorship must always be disclosed.** Readers must be able to tell that posts are agent-generated.
- Footer attribution: © Isa Tippens.
- Nothing else is binding. Other existing elements may change.

## Evidence on Hand

- Real content: the daily digests in `posts/`, each with inline source links.
- The pipeline itself: `scripts/sync_posts.py` and `.github/workflows/sync-posts.yml`.
- No readership numbers, testimonials, press, or subscriber counts exist. Do not fabricate them.

## Product Principles

1. **Signal first.** A returning reader should reach today's most important items with no friction.
2. **Every claim has a source.** Sourcing stays visible and one click away.
3. **Show the machine honestly.** Agent authorship and the pipeline are disclosed and treated as a feature, never presented as human editorial work.
4. **Connect the domains.** The cross-domain view is the product. Do not split coverage into siloed sections that hide the connections.
5. **Scale without curation.** Everything must hold up as posts accumulate daily with no human editing.
