---
title: "CrowdStrike $43.9B Zscaler Deal, GPT-6 Proteins, & Lux 40-Qubit"
date: "2026-11-25"
summary: "CrowdStrike agrees to acquire Zscaler for $43.9B as CISA adds three KEVs, OpenAI demonstrates intrinsic GPT-6.2 protein design, AMD and Xanadu simulate 40-qubit CFD on Lux, and South Korea unveils its bank-led won stablecoin bill."
categories: ["cybersecurity", "ai", "quantum", "fintech"]
filed: "2026-11-25T03:19:06.575Z"
---

# CrowdStrike \$43.9B Zscaler Deal, GPT-6 Proteins, & Lux 40-Qubit

Between November 24 and 25, 2026, enterprise security consolidated at historic scale, frontier AI models demonstrated wet-lab molecular design capabilities alongside stark limits on recursive self-improvement, aerospace and quantum teams pushed 40-qubit fluid dynamics onto national supercomputers, and financial regulators codified new third-party and stablecoin rules.

## Cybersecurity & Mainstream Tech: CrowdStrike's \$43.9B Zscaler Acquisition, CISA KEVs, and Fujitsu \+ OpenAI

Endpoint security leader CrowdStrike agreed to acquire cloud zero-trust pioneer Zscaler in an all-stock transaction valued at approximately **\$43.9 billion**, reports [CISO Series](https://cisoseries.com/cybersecurity-news-november-24-2026/) and [FinTech Global](https://fintech.global/2026/11/24/navis-mater-raises-sek-12-6m-for-ai-agent-organisations/) (see video coverage from [B.C. Begley](http://www.youtube.com/watch?v=GWjMhvtm5Aw) and [Token Talk](http://www.youtube.com/watch?v=NBTkQdYNCJg)). Approved by both boards and targeted to close in the second half of CrowdStrike's fiscal 2028 pending shareholder and regulatory sign-off, the combination pairs endpoint telemetry with inline zero-trust network inspection, with Zscaler CEO Jay Chaudhry slated to join CrowdStrike's board.

In operational cyber defense, [Fujitsu Limited](https://global.fujitsu/en-global/pr/news/2026/11/25-01) expanded its collaboration with OpenAI on November 25 by joining the **Daybreak Defense Network**, launching a commercial vulnerability assessment service that pairs **OpenAI Daybreak** with Fujitsu's red-team tooling. Rather than emitting noisy static alerts, the hybrid pipeline combines dynamic environment testing with static source-code inspection to generate reproducible Proof-of-Concept (PoC) exploits, pinpoint exact code locations, and re-verify fixes post-remediation.

> "Simply using AI to detect large numbers of potential vulnerabilities is not enough. What matters is verifying whether vulnerabilities can actually be exploited and identifying the risks that truly require attention." — **Shuda Shinichiro**, Global CEO & Senior Managing Partner, Uvance Wayfinders at Fujitsu Limited ([Fujitsu Global](https://global.fujitsu/en-global/pr/news/2026/11/25-01))

Meanwhile, threat activity intensified across public and critical infrastructure sectors:

* **CISA KEV & ICS Advisories**: On November 24, [CISA](https://www.cisa.gov/news-events/alerts/2026/11/24/cisa-adds-three-known-exploited-vulnerabilities-catalog) added three actively exploited flaws to its Known Exploited Vulnerabilities catalog under BOD 26-04: `CVE-2026-131914` (Idunno AntiCsrf untrusted deserialization), `CVE-2026-132165` (Drupal Core RCE), and `CVE-2026-132224` (Optimizely Web Experimentation external control of critical state data), alongside ICS advisory [ICSA-26-328-01](https://www.cisa.gov/news-events/ics-advisories/icsa-26-328-01) for AutomationDirect C-More EA9 programming software.  
* **CIA, ODNI, & KEPCO Intrusions**: [The Washington Post](https://www.washingtonpost.com/national-security/2026/11/24/hackers-breach-cia-unclassified-computer-system/) reported hackers breached an unclassified CIA computer system alongside an apparent intrusion at the Office of the Director of National Intelligence (ODNI), while South Korea's state utility **KEPCO** disclosed a November 20 intrusion affecting billing and procurement records for over 1.5 million customers and employees ([CISO Series](https://cisoseries.com/cybersecurity-news-november-24-2026/)).

In broader tech markets, [BNN Bloomberg](https://www.bnnbloomberg.ca/investing/market-outlook/2026/11/24/tech-stocks-wane-a-day-after-a-huang-rally-as-anthropic-tumbles-below-its-initial-offering-price/) noted AI equities pulled back on November 24 as Anthropic dipped below its \$83 IPO price, even as Dell Technologies reported Q3 FY27 results ([Dell SEC Form 8-K](https://investors.delltechnologies.com/sec-filings/all-sec-filings/content/0001571996-26-000050/exhibit991earnings8kq3fy27.htm)).

## Artificial Intelligence: GPT-6 Protein Design, CoEvoBench Ceiling, and Claude Compaction

On November 24, [OpenAI](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) published laboratory validation demonstrating that its **GPT-6** family possesses intrinsic protein-design capabilities using general reasoning and code tools—without calling specialized structural biology generators for backbone or sequence synthesis. Partnering with wet-lab provider **Onava**, OpenAI tested **GPT-6.2** designs across multiple biochemical benchmarks:

| Experimental / Computational Benchmark | Model / Baseline Comparison | Verified Result |
| :---- | :---- | :---- |
| [De Novo Minibinder Design (5 Targets)](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) | GPT-6.2 backbones \+ SolubleMPNN sequences | 35 of 322 designs (**10.9%**) bound PD-L1, IL-7Rα, TrkA, VEGF-A, IL-17A |
| [Sequence Redesign (Known Backbones)](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) | GPT-6.2 vs. withheld native sequences | **85%** MDM2 (75/88), **62%** VEGF-A (26/42), **14%** PD-1 (8/59) |
| [Antibody CDR Loop Redesign](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) | GPT-6.2 (3 loops / therapeutic fragments) | **70%** on IL-4Rα VHHs (128/182); **66%** on PD-1/PD-L1 fragments (179/272) |
| [Small-Molecule Docking (PoseBusters / Scarpino)](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) | Internal model vs. GPT-6.2 vs. DiffDock-L | **96%** / **93%** vs. 50% (PoseBusters); **97%** / **92%** vs. 60% (Scarpino) |

Despite strong first-pass scientific capabilities, new research released November 25 exposed hard limits on autonomous self-improvement. **CoEvoBench**—built by Zhejiang University, Alibaba Group, and Shanghai Jiao Tong University—gave GPT-6 Astra, Claude Opus 5, Qwen3.8-max, GLM-5.3, and Kimi K3 a 9B-parameter base model and 24-hour compute budgets to act as autonomous agentic researchers ([Emergent](https://emergent.sh/news/coevobench-shows-top-ai-models-hit-agent)). While GPT-6 Astra averaged 31.23% (versus 24.19% for Claude Opus 5\) and closed over 80% of the gap to an instruction-tuned baseline in round one, **every tested model failed to produce a second measurable improvement** in round two.

Separately, an engineering study published November 24 revealed that Anthropic's **Claude Code** compaction mechanism retains **77%** of architectural decision nodes while compressing raw execution command history to **0.2%** of its original footprint (\~30 preserved setup/dependency commands alongside 11,550 decision nodes across a 6-hour session inside a 200K-token budget) ([Emergent](https://emergent.sh/news/claude-code-compaction-retains-77-decisions-0)).

## Quantum Computing: 40-Qubit CFD on ORNL's Lux, IonQ Cambridge, and Quantum X Labs

Aerospace and quantum-computing partners **AMD, Rolls-Royce, and Xanadu** reproduced a **40-qubit quantum circuit** on Oak Ridge National Laboratory's **Lux** supercomputer, reports [BigGo Finance](https://finance.biggo.com/news/50df820b-b6fa-42eb-9304-171b32279386) and [The Qubit Report](https://thequbitreport.com/the-qubit-report/2026/11/24/the-qubit-report-november-24-2026/). Using block encoding to process a `2048 × 2048` computational fluid dynamics (CFD) mesh relevant to aircraft engine design, the team executed a **716,050-gate circuit in 17 hours and 22 minutes** across 64 AMD GPUs, cutting non-Clifford gates to less than 1/200th of prior levels and slashing inter-node communication by \~90%.

In hardware and error-correction ecosystems:

* **IonQ 256-Qubit Cambridge Deployment**: IonQ announced it will deploy a **256-qubit** quantum computer at the University of Cambridge by summer 2027 ([Quantum Zeitgeist](https://quantumzeitgeist.com/qubit-computer-ionq-cambridge-256-qubit/)), pairing Professor Fehmi Cirak's structural dynamics algorithms with Dr. Amit Agrawal's nanoscale flat meta-mirror arrays targeting 60%–80% photon collection efficiency (up from 20% with lenses) and \>=99.5% reflectivity to quadruple photonic inter-QPU linking speeds.  
* **Quantum X Labs CUDA-Q Decoder & Ethereum PQC**: [The Qubit Report](https://thequbitreport.com/the-qubit-report/2026/11/24/the-qubit-report-november-24-2026/) noted a CUDA-Q QEC decoder from Quantum X Labs cut logical errors by **12.7%** (distance 3\) and **12.1%** (distance 5\) versus PyMatching on Google superconducting data, while the **Ethereum Foundation** doubled its protocol security team—targeting hash-based cryptography by 2029 while flagging that ~~42 million ETH (~~\$72 billion) sit in wallets with exposed public keys.

## Fintech & Banking Infrastructure: South Korea Crypto Bill, Fidelity DeFi, and FDIC T-PASC

In digital asset regulation, South Korea's Financial Services Commission (FSC) unveiled its government **Digital Asset Basic Act** bill on November 24, reports [OneSafe](https://www.onesafe.io/blog/south-korea-won-stablecoin-bill-bank-majority-exchange-cap). Under the draft legislation—which now heads to the National Assembly—initial won-denominated stablecoin issuance is restricted to **bank-majority consortiums** holding at least ₩5 billion in equity with 100% reserves and zero interest payouts, alongside a **20% per-shareholder ownership cap** on crypto exchanges (34% with FSC approval). Concurrently, [Fidelity Crypto](https://pluang.com/en/news-feed/fidelity-crypto-dukung-perdagangan-uni-aave-link) added **UNI (Uniswap), AAVE (Aave), and LINK (Chainlink)** to its retail platform, while European payments provider **Form3** added Coinbase stablecoin minting to its bank payment API ([OneSafe](https://www.onesafe.io/blog/south-korea-won-stablecoin-bill-bank-majority-exchange-cap)).

In U.S. banking oversight, the [FDIC](https://www.fdic.gov/news/press-releases/2026/fdic-and-csbs-announce-support-third-party-assessments-and-standards) and Conference of State Bank Supervisors (CSBS) announced support on November 24 for the **Third-Party Assessments and Standards Council (T-PASC)**, an industry-led nonprofit establishing voluntary consensus standards to streamline bank-fintech vendor due diligence.

> "The new standards-setting non-profit has the potential to reduce duplicative, costly due diligence and foster innovation, particularly for community banks." — **Travis Hill**, Chairman at the FDIC ([FDIC](https://www.fdic.gov/news/press-releases/2026/fdic-and-csbs-announce-support-third-party-assessments-and-standards))

## Engineering Takeaways

1. **Patch CISA KEV Web Flaws (`CVE-2026-132165`, `132224`, `131914`)**: Prioritize Drupal Core, Optimizely Web Experimentation, and Idunno AntiCsrf updates today, and audit AutomationDirect C-More EA9 OT assets per `ICSA-26-328-01`.  
2. **Keep Humans in Recursive Agent Loops**: Per CoEvoBench, rely on frontier models for high-leverage first-pass code/harness synthesis, but retain deterministic test gates and human architectural review for multi-round iterations.  
3. **Track T-PASC & Hash-Based Crypto Agility**: Fintech engineering teams selling into U.S. banks should align security evidence with emerging T-PASC third-party standards while auditing exposed ECDSA public keys ahead of 2029 hash-based transitions.