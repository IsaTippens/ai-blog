---
title: "Anthropic $81B IPO, NGINX2Root RCE, & Q-CTRL Magic States"
date: "2026-11-19"
summary: "Anthropic prices its $81.3B Nasdaq IPO as ASUS ramps NVIDIA Vera Rubin NVL72 shipments, NGINX2Root exposes five HTTP/2 flaws, Q-CTRL sets magic-state records on IBM Nighthawk, and Triple-A brings stablecoin prefunding to Visa Direct."
categories: []
filed: "2026-11-19T03:25:46.831Z"
---

- ai  
- cybersecurity  
- quantum  
- fintech

---

# Anthropic \$81B IPO, NGINX2Root RCE, & Q-CTRL Magic States

Between November 18 and 19, 2026, landmark capital-market and rack-scale hardware milestones arrived alongside critical web-proxy and PHP security alerts, major fault-tolerant quantum error-correction benchmarks, and production stablecoin liquidity rails.

## Artificial Intelligence & Rack-Scale Hardware: Anthropic's Nasdaq Debut and ASUS Vera Rubin NVL72

[Anthropic PBC](https://www.anthropic.com/news/anthropic-prices-initial-public-offering) formally priced its initial public offering on November 18 at **\$83.00 per share** across **980,000,000 shares** of Class A common stock (956,351,354 primary shares and 23,648,646 selling-stockholder shares, plus a 147,000,000-share 30-day underwriter option), valuing the gross offering at \$81.34 billion ahead of Nasdaq Global Select Market trading under ticker **ANT** on November 19, 2026\.

At Supercomputing '26 (SC26) in Chicago, [ASUS](https://press.asus.com/news/press-releases/asus-ramps-up-nvidia-vera-rubin-nvl72-shipments-sc26/) announced a Q4 volume shipment ramp for **NVIDIA Vera Rubin NVL72** rack-scale systems. Highlighted by the liquid-cooled **ASUS AI POD XA VR721-E3**—packing **72 NVIDIA Rubin GPUs** and **36 NVIDIA Vera CPUs** per rack alongside NVIDIA Groq 3 LPX trays, Spectrum-X SN6600 Ethernet switches, and CMX context memory—ASUS pairs automated L10/L11 optical assembly with a six-layer rack validation pipeline and 6th Gen AMD EPYC 9006 PCIe 6.0 storage nodes.

![ASUS NVIDIA Vera Rubin NVL72 AI Factory][image1]

## Cybersecurity: NGINX2Root (`CVE-2026-123007`), PHP Release, and CISA KEV

Security researchers at Xint disclosed **NGINX2Root** on November 18, a cluster of five vulnerabilities in `nginx` scored **CVSS v4.0 9.2** (`CVSS v3.1 8.1`) by [F5 (`K000164058`)](https://my.f5.com/manage/s/article/K000164058) and analyzed by [Qualys TRU](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now). The lead flaw, **CVE-2026-123007**, is a memory corruption bug in HTTP/2 flow-control accounting triggered when a client cancels requests mid-stream, allowing unauthenticated attackers to crash workers or achieve remote code execution over public HTTPS ports across NGINX Open Source `1.9.5` through `1.31.8` and unpatched NGINX Plus builds. Alarmingly, Xint chained worker RCE with an **unpatched Linux kernel SCTP flaw** to escape Docker containers to host root. Fixed builds shipped in **NGINX 1.30.7** and **1.31.9** (plus NGINX Plus `37.0.8.1` and `37.3.0.1`), though Ubuntu and Debian packages remained pending on November 18 and the archived `ingress-nginx` project (retired March 2026\) will receive no patch.

| CVE Identifier | Vulnerable Configuration | Mitigated by Disabling HTTP/2? |
| :---- | :---- | :---- |
| [CVE-2026-123007](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now) | HTTP/2 enabled on any listener | Yes |
| [CVE-2026-123633](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now) | HTTP/2 client connections proxied to backend under low worker connection count | Yes |
| [CVE-2026-123634](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now) | Variable-based backend server names with SSI or mirror subrequests | No |
| [CVE-2026-121810](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now) | HTTP/3 enabled | No |
| [CVE-2026-113425](https://blog.qualys.com/product-tech/patch-management/2026/11/18/nginx2root-five-nginx-flaws-led-by-cve-2026-123007-how-to-find-mitigate-and-patch-now) | `nginx` operating as a mail proxy | No |

Simultaneously, [Aikido Security](https://www.aikido.dev/blog/php-security-release-19-november-2026-cve-2026-115560) alerted teams to PHP's critical security release scheduled for November 19 (14:00–14:30 UTC), which patches **CVE-2026-115560**—a session upload progress RCE affecting apps that dynamically switch `session.serialize_handler` to `php` via `ini_set()`. Meanwhile, [CISA](https://www.cisa.gov/news-events/alerts/2026/11/18/cisa-adds-four-known-exploited-vulnerabilities-catalog) added four actively exploited flaws to its KEV catalog on November 18: `CVE-2024-10441` (Synology DSM), `CVE-2026-40217` (BerriAI LiteLLM), `CVE-2026-90436` (Apache Axis), and `CVE-2026-90817` (Vanderbilt REDCap).

![PHP Critical Security Release Feature][image2]

## Quantum Computing: Q-CTRL's Magic-State Records and Cat-Qubit Roadmaps

In fault-tolerant quantum error correction, [Q-CTRL](https://q-ctrl.com/blog/cultivating-record-fidelity-magic-states-with-lattice-surgery-on-publicly-accessible-ibm-quantum-computers) (`arXiv:2611.22035`) achieved the first hardware demonstration of **magic-state cultivation with lattice-surgery escape** into a distance-5 surface code on publicly accessible **IBM Quantum Nighthawk** processors. By pairing custom compilation, interleaved dynamical decoupling, and lattice surgery directly into a matchable surface code—avoiding the slow decoding of grafted codes—Q-CTRL processed syndrome data over **1,000x faster** and set three experimental records compared against Google's prior Willow benchmark:

| Magic-State Cultivation Metric | Google Willow Benchmark | Q-CTRL on IBM Nighthawk |
| :---- | :---- | :---- |
| [Cultivation Logical Error](https://q-ctrl.com/blog/cultivating-record-fidelity-magic-states-with-lattice-surgery-on-publicly-accessible-ibm-quantum-computers) | `1.9 × 10^-4` | `2.0 × 10^-5` (10x lower error) |
| [Shots Retained After Cultivation](https://q-ctrl.com/blog/cultivating-record-fidelity-magic-states-with-lattice-surgery-on-publicly-accessible-ibm-quantum-computers) | 8.7% | 25% (3x higher acceptance) |
| [Post-Escape Surface-Code Fidelity](https://q-ctrl.com/blog/cultivating-record-fidelity-magic-states-with-lattice-surgery-on-publicly-accessible-ibm-quantum-computers) | \~0.91 (prior smaller code) | `>0.99` (`0.991` after 10 QEC rounds) |

Elsewhere in quantum hardware, [Alice & Bob](https://quantumcomputingreport.com/alice-bob-accelerates-modular-cat-qubit-roadmap-to-200-logical-qubits-from-3600-physical-qubits-by-2030/) accelerated its modular cat-qubit roadmap to target 200 logical qubits from 3,600 physical qubits by 2030, while [Quandela and NVIDIA](https://quantumcomputingreport.com/quandela-and-nvidia-benchmark-photonic-quantum-simulability-frontiers-on-h100-gpus/) benchmarked photonic quantum simulability limits on H100 GPUs.

## Fintech & Post-Quantum Finance: Mastercard Advisory, Visa Direct Stablecoins, and Model ML

To counter "harvest now, decrypt later" (HNDL) threats against payment rails, [Mastercard](https://www.mastercard.com/us/en/news-and-trends/press/2026/november/quantum-readiness-post-quantum-cybersecurity.html) launched its **Quantum Advisory Practice** on November 18 alongside a white paper (*Quantum computing and financial services*), integrating QIZ Security and an Oxford Quantum Circuits fraud-protection pilot to guide enterprise cryptographic inventory and PQC migration.

![Mastercard Quantum Readiness Initiative](https://www.mastercard.com/adobe/dynamicmedia/deliver/dm-aid--693ee630-a831-4153-850c-562946ed5ffb/1280x720px.jpg?preferwebp=true&quality=82)

In cross-border settlement, [Fintech News Singapore](https://fintechnews.sg/141729/digitalassets/triple-a-visa-direct-stablecoin-prefunding/) reported on November 19 that **Triple-A** integrated stablecoin prefunding into **Visa Direct** across Asia Pacific, letting payment service providers fund payouts 24/7 outside banking hours while recipients still receive local fiat.

> "Our collaboration with Visa brings stablecoins into existing payment infrastructure, giving payment service providers greater flexibility to manage liquidity and fund cross-border payments." — **Eric Barbier**, Founder and CEO of Triple-A ([Fintech News Singapore](https://fintechnews.sg/141729/digitalassets/triple-a-visa-direct-stablecoin-prefunding/))

Finally, London-based financial AI startup **Model ML** raised a **\$250 million Series B** at a **\$1.5 billion valuation** co-led by General Atlantic and QED Investors ([FinTech Global](https://fintech.global/2026/11/18/model-ml-bags-250m-to-give-every-banker-an-ai-agent/)). Model ML deploys SOC 2 Type II and ISO 27001-certified autonomous agents inside banks' own infrastructure, routing routine financial workflows to fine-tuned open-source models that run 5x faster at 2% of frontier model inference cost.

> "We're building a personal AI agent for every banker, consultant and investor, working 24/7 inside the systems their firm already trusts." — **Chaz Englander**, Co-Founder and CEO at Model ML ([FinTech Global](https://fintech.global/2026/11/18/model-ml-bags-250m-to-give-every-banker-an-ai-agent/))

## Engineering Takeaways

1. **Patch NGINX (`1.31.9` / `1.30.7`) & PHP Today**: Restart all `nginx` reverse proxies and ingress controllers after upgrading—or temporarily disable HTTP/2—and migrate off archived community `ingress-nginx` deployments; set `session.upload_progress.enabled=0` in `php.ini` until today's PHP release is applied.  
2. **Remediate CISA KEV LiteLLM & Infrastructure Flaws**: Prioritize patching BerriAI LiteLLM (`CVE-2026-40217`), Synology DSM, Apache Axis, and REDCap per BOD 26-04.  
3. **Benchmark Open-Source Fine-Tuned Routing & PQC Readiness**: Follow Model ML's cost-routing pattern for high-volume institutional tasks while initiating cryptographic inventory audits for post-quantum migration.

[image1]: /post-media/anthropic-81b-ipo-nginx2root-rce-and-q-ctrl-magic-states/0a296e96eb52-1266x1040.png

[image2]: /post-media/anthropic-81b-ipo-nginx2root-rce-and-q-ctrl-magic-states/cfa5ec165241-1920x1080.png