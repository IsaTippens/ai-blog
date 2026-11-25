---
title: "Google Antigravity /teamwork, Apache RCE, & ChatGPT Wallet"
date: "2026-11-14"
summary: "Google Research opens Antigravity's /teamwork multi-agent harness, Apache patches a CVSS 9.8 HTTP/2 race condition, Project Eleven ships post-quantum MPC, and OpenAI launches ChatGPT Wallet."
categories: ["ai", "cybersecurity", "quantum", "fintech"]
filed: "2026-11-14T03:51:09.423Z"
---

# Google Antigravity /teamwork, Apache RCE, & ChatGPT Wallet

Between November 13 and 14, 2026, engineering breakthroughs converged around autonomous multi-agent verification, machine-speed vulnerability discovery, post-quantum threshold cryptography, and tokenized agentic commerce.

## Artificial Intelligence: Google Antigravity `/teamwork` and Open-Source Agent Sandboxes

Google Research formally opened external access to [Antigravity's `/teamwork` multi-agent system](https://research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/) alongside `/boost` and Deep Review, enabling researchers and systems engineers to orchestrate Gemini 4 Argon, Carbon, and Hydrogen across long-horizon mathematical, scientific, and software engineering campaigns. To prevent attention dispersion over multi-day tasks, `/teamwork` partitions context by construction—handing each specialized generator agent only its required files while routing candidate outputs through clean-context critics and deterministic falsifiers such as the Lean 4 proof checker, unmodified test suites, and hardware performance counters.

The engineering benchmarks reported by [Google Research](https://research.google/blog/advancing-science-engineering-with-antigravitys-teamwork-feature/) span formal verification, systems migrations, and production infrastructure:

* **Formal Mathematics in Lean 4**: Using the `/teamwork-LEAP` pattern, 28,800 subagent invocations autonomously formalized Pierre Deligne's 1974 proof of the Weil conjectures into 1.8 million lines of Lean 4, alongside a 50-million-line formalization of the 2013 Courtade–Kumar conjecture and machine-checked formalizations of the Birkhoff and 3D Bochner–Riesz conjectures.  
* **Memory-Safe Rust Migrations**: A two-week Gemini 4 Argon campaign ported the remaining C++ codebase of the Zircon microkernel into roughly 800,000 lines of safe Rust passing all unit tests on `arm64` hardware, while a separate `/teamwork` campaign rewrote Google's `libgav1` AV1 video decoder into 170,000 lines of Rust running 20% to 30% faster than the original C++ and hand-tuned assembly on `x86_64` and ARM.  
* **TPU Kernel & Cluster Optimization**: Using `/teamwork`'s DuoDiscover pattern with 23-second proxy evaluators, agents achieved a 4.09x geometric-mean speedup across 17 JAXBench kernels and a 2.99x speedup across 7 vLLM TPU-Inference Pallas kernels, while Borg agentic scheduling reduced TPU workload preemption by 24% and memory agents identified over 1 PiB of fleet-wide RAM savings.

In parallel, Google's [Open Source Programs Office](https://opensource.googleblog.com/2026/11/this-week-in-open-source-nov-13.html) highlighted the donation of `gVisor`—the user-space kernel sandbox used by both Anthropic and OpenAI to isolate untrusted agent-generated code—alongside Agent Substrate and OpenRL to the Cloud Native Computing Foundation (CNCF). In the same digest, Bluesky detailed ATProto Spaces, replacing Merkle Search Trees with `LtHash` (an \~80-line quantum-resistant lattice multiset hash) and STreaming ARchives (STAR) for permissioned group repositories.

## Mainstream Tech & Computer Vision: Logarithmic Shadow Removal

At Northeastern University's Khoury College of Computer Sciences in Seattle, [Bruce Maxwell](https://news.northeastern.edu/2026/11/13/machine-vision-algorithm-shadow-research/) unveiled a machine vision model trained on approximately 25,000 logarithmic RGB images capable of stripping shadows from scenes to recover true object colors under arbitrary lighting. Standard cameras capture linear pixel intensities that crush dark shadow details and blow out highlights, causing autonomous vehicle perception stacks to brake erroneously for road shadows. By training on logarithmic RGB representations that mimic human retinal photon response, Maxwell's algorithm restores uniform lighting without multi-exposure hardware, targeting real-time deployment in autonomous driving and automated 3D asset scanning.

## Cybersecurity: Apache HTTP/2 RCE (`CVE-2026-119618`) and CISA KEV Additions

The Apache Software Foundation released Apache HTTP Server 2.4.71 to patch [CVE-2026-119618](https://threatdefence.com/article/apache-http-server-cve-2026-119618-http2-rce-patching-hunting), a critical remote code execution vulnerability in `mod_http2` rated **CVSS 9.8** by Red Hat. Notably, the flaw was independently reported by Anthropic's OSS Scanner (`ANT-2026-MAPKT6MZ`) and Google Cloud Vulnerability Research.

The vulnerability is a CWE-362 race condition inside `assign_headers()`. When a worker thread processes an HTTP/2 request containing a `Content-Type` header without a `Content-Length` or body, `assign_headers()` mistakenly writes `Content-Length: 0` into the shared connection-level headers table rather than the worker's private request table. Concurrent writes between the worker thread and the connection thread corrupt heap memory without authentication or user interaction. Organizations running Apache HTTP Server 2.4.55 through 2.4.70 (or standalone `mod_h2` 2.0.8 through 2.0.42) with `h2` or `h2c` enabled should upgrade to 2.4.71 immediately or disable HTTP/2 via `Protocols http/1.1`.

Simultaneously, [CISA](https://www.cisa.gov/news-events/alerts/2026/11/13/cisa-adds-two-known-exploited-vulnerabilities-catalog) added two actively exploited flaws to its Known Exploited Vulnerabilities (KEV) catalog under Binding Operational Directive 26-04, while [LocateRisk](https://locaterisk.com/en/citrix-netscaler-adc-cve-2026-107412/) flagged critical updates for Citrix NetScaler ADC.

| CVE Identifier | Affected Software | Severity / Score | Vulnerability Mechanism | Remediation |
| :---- | :---- | :---- | :---- | :---- |
| [CVE-2026-119618](https://threatdefence.com/article/apache-http-server-cve-2026-119618-http2-rce-patching-hunting) | Apache HTTP Server 2.4.55–2.4.70 (`mod_http2`) | CVSS 9.8 Critical (Red Hat) | CWE-362 race condition in `assign_headers()` causing heap corruption and RCE | Upgrade to 2.4.71 or disable `h2`/`h2c` |
| [CVE-2026-107415](https://locaterisk.com/en/citrix-netscaler-adc-cve-2026-107412/) | Citrix NetScaler ADC / Gateway | CVSS 9.3 Critical | Critical appliance vulnerability disclosed Nov 13 | Apply vendor security patches |
| [CVE-2026-114713](https://www.cisa.gov/news-events/alerts/2026/11/13/cisa-adds-two-known-exploited-vulnerabilities-catalog) | UnrealIRCd | CISA KEV (Active Exploit) | Improper neutralization of delimiters | Apply vendor mitigation per BOD 26-04 |
| [CVE-2026-123039](https://www.cisa.gov/news-events/alerts/2026/11/13/cisa-adds-two-known-exploited-vulnerabilities-catalog) | Check Point Multiple Products | CISA KEV (Active Exploit) | Incorrect permission assignment for critical resource | Apply vendor mitigation per BOD 26-04 |

For broader weekly context, see the [IT Tech Pulse Weekly News Update (Nov 09–13, 2026\)](http://www.youtube.com/watch?v=CId9WTSosTU) and [CNN's breakdown of the Microsoft 365 outage ripple effects](http://www.youtube.com/watch?v=bs4tEwnevjY).

## Quantum Computing: Post-Quantum Threshold MPC and the 2029 Deadline

In post-quantum cryptography, [Project Eleven](https://quantumzeitgeist.com/project-eleven-post-quantum-strongpoint-digital/) launched **Strongpoint MPC**, a multi-party computation threshold signing architecture for institutional digital asset custody that outperforms classical ECDSA-based MPC in signing latency. Historically, post-quantum hash-based signature constructions introduced prohibitive communication overhead in distributed threshold environments, creating friction for stablecoin issuers, blockchain validators, and cross-chain bridges. Strongpoint MPC eliminates that bottleneck while preserving signature indistinguishability so threshold signatures appear identical to single-party signatures on-chain.

The release arrives amid growing concern over cryptographic migration timelines. As [The Quantum Record](https://thequantumrecord.com/quantum-computing/plan-to-adopt-quantum-safe-encryption-and-protect-global-data-by-2029/) noted on November 13, major hardware vendors—including Google, Microsoft, and Quantinuum—are targeting fault-tolerant quantum computers by 2029, whereas official government post-quantum adoption mandates in the U.S., EU, U.K., and Canada still target 2030 to 2031 or later.

## Fintech & Agentic Commerce: ChatGPT Wallet, Feedzai Agent Detection, and Databento

OpenAI launched [ChatGPT Wallet](https://qz.com/openai-chatgpt-wallet-ai-agents-shop-users-111326) in partnership with American Express, Mastercard, and Visa, initially rolling out to U.S. ChatGPT Pro subscribers through OpenAI's `dots` autonomous agents. Users save a U.S.-issued payment card once and authorize each agent-initiated purchase via a biometric security check (such as Face ID or fingerprint). Once approved, the card network issues a single-use payment token so neither the AI agent nor the merchant sees the underlying card number, while preserving card rewards and dispute protections. As [OneSafe](https://www.onesafe.io/blog/openai-ai-payments-stablecoin-next) and [CellCog](https://cellcog.ai/blog/chatgpt-wallet/) observed, card-rail overhead still creates friction for high-frequency machine-to-machine micro-transactions, positioning programmable stablecoin rails and protocols like Google's AP2 as the next layer of agentic settlement.

> "It's going to take time for the ecosystem to build the right infrastructure to be able to make this experience really amazing and seamless across all of their sites," — **Chaya Nayak**, Product Lead for Monetization and Payments at OpenAI ([Quartz](https://qz.com/openai-chatgpt-wallet-ai-agents-shop-users-111326))

![OpenAI ChatGPT Wallet Launch][image1]

As autonomous agents begin transacting directly with financial institutions, [Feedzai](https://fintech.global/2026/11/13/feedzai-expands-digital-trust-to-detect-ai-agents-at-banks/) expanded its Digital Trust platform to distinguish legitimate customer-authorized AI agents from malicious automation. By combining persistent device recognition, pooled network intelligence, and cryptographic device binding, Feedzai reported catching 44% more fraud within the riskiest 0.1% of sessions while cutting unnecessary SMS one-time passcodes by 41% and avoiding 6,000 false authentication challenges per million logins.

> "A leading agent detection strategy starts with a foundation banks can trust: protected signals, cryptographic device recognition and network intelligence. Personal and malicious agents can look very similar. Our latest advancements in Digital Trust help banks tell them apart, blocking unwanted agents and trusting the ones their customers choose to use." — **Pedro Barata**, Chief Product Officer at Feedzai ([FinTech Global](https://fintech.global/2026/11/13/feedzai-expands-digital-trust-to-detect-ai-agents-at-banks/))

Finally, low-latency market data provider [Databento](https://fintech.global/2026/11/13/databento-hits-1-1bn-valuation-with-100m-series-c/) closed a \$100 million Series C round at a \$1.1 billion valuation led by Fifth Down Capital with strategic participation from Fitch Ventures, DRW Venture Capital, and NEA. Operating profitably with just 39 employees, Databento supplies unified live and historical futures, options, and equities feeds to quantitative trading desks as well as five of the six largest frontier AI labs.

## Engineering Takeaways

1. **Patch Apache HTTP Server 2.4.71 Immediately**: Audit all internet-facing reverse proxies and internal `httpd` fleets for `mod_http2` (`h2` or `h2c`) and upgrade to 2.4.71 (or disable HTTP/2) given the simplicity of the `assign_headers()` race condition and public exploit availability.  
2. **Adopt Sandboxed Multi-Agent Verification**: Pair code-generating agents with isolated `gVisor` sandboxes and deterministic falsifiers (unmodified test suites, formal proof checkers, or proxy hardware yardsticks) rather than relying on single-pass generation.  
3. **Prepare Banking & Custody Stacks for Autonomous Agents**: Evaluate cryptographic device binding for agentic traffic detection and benchmark post-quantum threshold MPC ahead of the 2029 fault-tolerant quantum hardware horizon.

[image1]: /post-media/google-antigravity-teamwork-apache-rce-and-chatgpt-wallet/b6abc78a4ab0-1920x1280.png