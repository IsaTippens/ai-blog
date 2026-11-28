---
title: "Cacti 4HTTP2SHELL Zero-Day, Workspace MCP GA, and PP-VarQITE"
date: '2026-11-28'
summary: "An unauthenticated Cacti RCE zero-day, Google Workspace MCP and CLI general availability, Quantinuum's shallow PP-VarQITE circuits, and major fintech security and regulatory moves."
categories: ["cybersecurity", "ai", "quantum", "fintech"]
filed: "2026-11-28T03:11:23.544Z"
---

# Daily Tech Recon: November 28, 2026

Over the past 24 hours, enterprise infrastructure teams faced an unpatched network-monitoring zero-day and fresh CISA KEV mandates, while Google brought Model Context Protocol (MCP) servers to general availability in Workspace. Elsewhere, Quantinuum demonstrated shallower low-temperature quantum state preparation on Helios, UK banking post-quantum TLS metrics highlighted a sharp CDN-versus-in-house divide, and regulators in the US and Russia moved on IT examination reform and crypto investor testing.

## Cybersecurity & Critical Infrastructure

### Unpatched Cacti `4HTTP2SHELL` Zero-Day RCE
On November 27, 2026, security researcher `ek0ms savi0r` publicly released a working proof-of-concept exploit dubbed `4HTTP2SHELL` targeting an unpatched zero-day vulnerability in the open-source Cacti network monitoring platform ([Aviatrix](https://aviatrix.ai/threat-research-center/unpatched-cacti-zero-day-public-poc-remote-code-execution-2026/)). Weak input validation in guest account graph display preferences permits unauthenticated stored SQL injection, allowing attackers to manipulate Cacti's real-time poller and achieve remote code execution in just four HTTP requests. Because Cacti servers routinely store SNMP passphrases and device credentials for routers, switches, and firewalls, compromising the monitoring host creates an immediate lateral-movement path across enterprise networks; defenders should disable the guest account and restrict Cacti web interfaces to trusted internal ranges until a vendor patch is issued.

### CISA Adds Three Active Exploits to KEV Catalog
CISA updated its Known Exploited Vulnerabilities (KEV) Catalog on November 27 under Binding Operational Directive (BOD) 26-04, requiring Federal Civilian Executive Branch agencies to prioritize remediation on publicly exposed assets ([CISA](https://www.cisa.gov/news-events/alerts/2026/11/27/cisa-adds-three-known-exploited-vulnerabilities-catalog)):

| CVE ID | Affected Product | Vulnerability Class | Source |
| :--- | :--- | :--- | :--- |
| `CVE-2026-120705` | OSGeo GeoServer | XML Injection | [CISA](https://www.cisa.gov/news-events/alerts/2026/11/27/cisa-adds-three-known-exploited-vulnerabilities-catalog) |
| `CVE-2026-129243` | OSGeo GeoServer | Incorrect Authorization | [CISA](https://www.cisa.gov/news-events/alerts/2026/11/27/cisa-adds-three-known-exploited-vulnerabilities-catalog) |
| `CVE-2026-136716` | Drupal Core | Improper Check for Unusual or Exceptional Conditions | [CISA](https://www.cisa.gov/news-events/alerts/2026/11/27/cisa-adds-three-known-exploited-vulnerabilities-catalog) |

### South Africa's Purple Group Investigates Cyber Incident
South African financial services firm Purple Group disclosed on November 27 that it is investigating unauthorized access detected on November 25, taking its retail investing platform EasyEquities and associated systems offline as a precaution ([CNBC Africa / Reuters](https://www.cnbcafrica.com/2026/south-africas-purple-group-investigating-cybersecurity-incident)). Independent specialists are assessing whether personal information was leaked, while the company confirmed that all client funds remain accounted for and secure.

## Mainstream Tech & AI Engineering

### Google Workspace MCP Servers and Official CLI Reach GA
In its November 27 weekly update, Google announced general availability for Workspace Model Context Protocol (MCP) servers and the official Workspace CLI alongside standardized usage tiers and a new Workspace AI Tools Addendum ([Google Workspace Updates](http://workspaceupdates.googleblog.com/2026/11/weekly-recap-11-27-2026.html)). The release also adds tables and headings formatting for Google Chat agents and expands default 1080p Full HD video sending in Google Meet on the web to all users.

### `PosteriorBench` Exposes the Cost-Fidelity Trade-Off in Rare LLM Sampling
AI safety organization Transluce released `PosteriorBench` on November 27 to measure whether sampling algorithms can surface rare language model behaviors without distorting the model's conditional output distribution ([Emergent](https://emergent.sh/news/transluce-ships-posteriorbench-rare-llm)). Built across 21 regex-verifiable tasks with event probabilities spanning `10^-5` to `10^-1` and backed by one billion labeled responses from `Qwen3.5-0.8B`, the benchmark finds that no tested approach achieves both low cost and high fidelity: rejection sampling scales inversely with rarity, while training-based methods introduce distributional shift and fail to outperform standard supervised fine-tuning.

### `Prospero`: Single-Binary C++ Coding Harness for Local and Cloud LLMs
Developer Christopher Wellons (`skeeto`) brought `Prospero` to the Hacker News front page on November 27—a public-domain (Unlicense), single-executable Dear ImGui coding harness for Windows, macOS, and Linux ([Emergent](https://emergent.sh/news/prospero-single-binary-c-coding-harness-local)). Supporting OpenAI Chat Completions, Anthropic Messages (including extended thinking and prompt caching), `llama.cpp`, `vLLM`, and `LiteLLM`, Prospero renders passively with zero idle CPU usage, runs over SSH or headless environments, and targets roughly two orders of magnitude lower resource consumption than browser- or Electron-based harnesses.

### December 1 AI API Pricing Shifts Force Multi-Provider Routing
Engineering teams face diverging API pricing moves heading into December ([Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026)):

| Model | Provider | Current Price (per 1M in/out) | Upcoming Change | Source |
| :--- | :--- | :--- | :--- | :--- |
| Gemini 4 Carbon | Google | $2.00 / $10.00 | Doubles to $4.00 / $20.00 on Dec 1, 2026 | [Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026) |
| Gemini 4 Argon | Google | $2.00 / $10.00 | Doubles to $4.00 / $20.00 on Dec 1, 2026 | [Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026) |
| Gemini 3.8 Flash | Google | $0.75 / $3.75 | Doubles to $1.50 / $7.50 on Jan 1, 2027 | [Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026) |
| Claude Fable 5.2 | Anthropic | $8.00 / $40.00 | No change scheduled (20% below Fable 5.1) | [Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026) |
| Claude Sonnet 5 | Anthropic | $2.00 / $10.00 | Introductory rate made permanent | [Mohsin Nawaz](https://mohsinnawaz.one/blog/ai-model-pricing-changes-november-2026) |

On the 200-task Multimodal Knowledge Agent benchmark from Google DeepMind and Artificial Analysis, Fable 5.2 scored 56.56% at $31.97 per task compared to Carbon's 54.34% at $6.29 per task, reinforcing the value of keeping model routing layers swappable behind configuration.

## Quantum Computing & Post-Quantum Cryptography

### Quantinuum `PP-VarQITE` Prepares Low-Temperature States in 42 Layers
Researchers from CERN, EPFL, and Quantinuum demonstrated `PP-VarQITE`—combining Pauli propagation with variational quantum imaginary-time evolution—to prepare low-temperature quantum states on Quantinuum's Helios trapped-ion processor ([Quantum Zeitgeist](https://quantumzeitgeist.com/quantinuum-chip-prepares-low-temperature-states/), [arXiv:2611.32388](https://arxiv.org/html/2611.32388v1)). By determining circuit parameters classically via a shared Gram representation, the team prepared a 48-site frustrated chain (96 qubits) and a 7×7 transverse-field Ising lattice (98 qubits) using at most 42 two-qubit layers, achieving circuits two to ten times shallower than sequential tensor-network compilation.

### UK Banks Lead PQC TLS Negotiation, While Core Infrastructure Lags
TLS handshake measurements on November 27 show 77.5% of 40 measured UK banks negotiate ML-KEM post-quantum key exchange—second globally behind the US at 84.9%—compared to 68.7% across all measured UK organizations and 56.0% for City of London financial market infrastructure ([Quantum Zeitgeist](https://quantumzeitgeist.com/cdn-providers-post-quantum-key-exchange/)). However, 96% of organizations behind major CDNs negotiate ML-KEM versus just 31% running self-hosted front ends, leaving internal APIs, certificates, and data at rest largely on RSA and elliptic-curve cryptography.

> "That is where most of the migration work sits, and where the NCSC's 2028 discovery milestone applies." — **UK PQC Barometer Report** ([Quantum Zeitgeist](https://quantumzeitgeist.com/cdn-providers-post-quantum-key-exchange/))

### Equal1 Advances for Up to €30M EIC STEP Scale Up Equity
Irish quantum computing spinout Equal1 announced on November 27 that it has advanced to due diligence with the European Innovation Council (EIC) Fund under the STEP Scale Up program for a potential equity investment of up to €30 million to scale production of its CMOS-integrated silicon spin-qubit systems ([The Quantum Insider](https://thequantuminsider.com/2026/11/27/equal1-selected-to-advance-in-eic-step-scale-up-program-for-potential-equity-investment-of-up-to-e30-million/)).

> "By building quantum processors using standard CMOS semiconductor processes, we are making scalable, on-premise quantum computing a practical reality." — **Jason Lynch**, CEO of Equal1 ([The Quantum Insider](https://thequantuminsider.com/2026/11/27/equal1-selected-to-advance-in-eic-step-scale-up-program-for-potential-equity-investment-of-up-to-e30-million/))

## Fintech, Banking Regulation & Digital Assets

### FDIC Opens Consultation on Modernizing Bank IT Examinations
On November 27, the U.S. Federal Deposit Insurance Corporation (FDIC) issued a Request for Information (RFI) seeking feedback from supervised institutions on how its IT examination program can better target material technology risks, evaluate emerging-technology risk management, and support bank experimentation with new threat-mitigation tools, with comments due 45 days after Federal Register publication ([FDIC](https://www.fdic.gov/news/press-releases/2026/fdic-seeks-input-regarding-information-technology-examinations)).

### Russia's VTB Launches Bitcoin Trading Under Mandatory Investor Test
Russian bank VTB began offering over-the-counter bitcoin trading inside its VTB My Investments app on November 27 for qualified investors who pass the Bank of Russia's newly approved eight-question crypto knowledge test (requiring at least seven correct answers across regulation, security, stablecoins, and volatility, valid for one year) ([Bitcoin Magazine](https://bitcoinmagazine.com/news/russia-vtb-bitcoin-trading-crypto-test)). Separately, SPB Exchange confirmed it will launch spot trading in BTC, ETH, and USDT against the ruble on December 1 with same-day ruble settlement.

## Video Briefings

- [Daily Tech Insights — Friday, November 27, 2026](http://www.youtube.com/watch?v=UdzqrYiD1UQ) (*Insights Into Things*)
- [AI news Nov 27: ChatGPT limits, ARTEX hackers, Apple pulls Talkie](http://www.youtube.com/watch?v=6pfRFvbSj4w) (*Snippets Ltd.*)
