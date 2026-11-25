---
title: "OpenAI Perplexity Limits, Isaac Lab 3.0, & Quantum Chip Bus"
date: "2026-11-23"
summary: "OpenAI Chief Scientist Jakub Pachocki proposes cross-lab perplexity safety thresholds, Nvidia ships Isaac Lab 3.0 and Isaac OS at GTC Berlin, Stanford and Google Quantum AI cut QPU control lines to <=30 wires, and Microsoft discloses an Entra Connect Health breach."
categories: []
filed: "2026-11-23T03:32:41.564Z"
---

- ai  
- hardware  
- quantum  
- cybersecurity

---

# OpenAI Perplexity Limits, Isaac Lab 3.0, & Quantum Chip Bus

Developments across November 22 and 23, 2026 paired calls for quantitative AI pretraining safety thresholds with major physical-AI robotics releases at GTC Berlin, a constant-wire fault-tolerant quantum processor architecture, and new enterprise cloud and payment security disclosures.

## Artificial Intelligence: OpenAI Proposes Shared Perplexity Safety Thresholds

On November 22, OpenAI Chief Scientist [Jakub Pachocki](https://openai.com/index/perplexity-and-intelligence/) published a rare look into OpenAI's internal pretraining telemetry, arguing that cross-entropy loss (log-perplexity) on held-out codebases provides the clearest leading indicator of emergent capabilities—and should anchor industry-wide safety pacing limits. Tracing OpenAI's trajectory from GPT-3.5 (`~0.99` log-perplexity) and GPT-4 (`~0.91`) to below `0.8` (where transformative cybersecurity and mathematical capabilities emerged) and `~0.76` (where models began resolving open mathematical problems), Pachocki warned that entering the **`~0.68–0.7` log-perplexity window** could bring further degradation in chain-of-thought (CoT) alignment auditing just as AI begins accelerating deep learning pretraining research itself by 2027\.

> "I further propose common limits, based on perplexity and other measurements, that developers are committed to not crossing until our ability to understand and monitor AI behavior achieves a certain concrete milestone (such as the development of a successor to CoT monitors)." — **Jakub Pachocki**, Chief Scientist at OpenAI ([OpenAI](https://openai.com/index/perplexity-and-intelligence/))

![OpenAI Perplexity and Intelligence][image1]

In applied AI infrastructure on November 22, the OpenAI Foundation and Rockefeller Foundation launched a **\$50 million AI Cities Initiative** targeting urban transportation and public safety ([Emergent](https://emergent.sh/news/openai-rockefeller-launch-50m-ai-cities)), while [Pandex](https://emergent.sh/news/pandex-opens-mcp-api-2-8m-eu-legal-documents) opened a Model Context Protocol (MCP) API connecting agents directly to 2.8 million European Union legal documents.

## Mainstream Hardware & Robotics: Nvidia Isaac Lab 3.0 and Isaac OS at GTC Berlin

At GTC Berlin on November 23, [Nvidia](https://emergent.sh/news/nvidia-isaac-lab-3-0-agile-one-sn-humanoid) launched **Isaac Lab 3.0** and the open-source **Isaac OS** runtime alongside Agile Robots' **Agile ONE SN** reference humanoid. Built to standardize the sensor-to-actuator pipeline across industrial arms, mobile manipulators, and humanoids, Isaac Lab 3.0 already cut commissioning times by **50%** at Toyota Material Handling Europe, supported by the new `SimReady Central Library` (\>2,000 factory assets) and the `Human 1M Dataset` for imitation learning. Shipping in early 2027 on **Jetson Thor** and **Isaac GR00T**, Agile ONE SN stands 1.4 meters tall, weighs 40 kg, and packs 31 degrees of freedom (with 20-DoF tactile five-finger hands), with ABB Robotics, Kuka, Sereact, Neura Robotics, and Hexagon Robotics joining as early European integrators.

## Quantum Computing & Post-Quantum Encryption: Constant-Wire QPUs and Messaging Audits

Solving one of quantum hardware's sharpest physical bottlenecks—routing one coaxial/microwave control line per qubit—researchers Christopher A. Pattison (UC Berkeley), Jeongwan Haah (Stanford), and John Preskill (Caltech) proposed a fault-tolerant processor architecture (`arXiv:2611.23919`) requiring only a **constant 20 to 30 external wires** regardless of chip scale ([Quantum Zeitgeist](https://quantumzeitgeist.com/stanford-university-quantum-chip-design-cuts/)). Modeled on clocked classical CPUs, qubits sit in a 2D `LxL` planar array executing a fixed, repeating **depth-3** local circuit while classical instruction streams steer logical data through `n / polylog(n/ε)` logical qubits with `n polylog(n/ε)` time overhead below a universal noise threshold.

![Constant-Wire Quantum Processor Design](https://quantumzeitgeist.com/wp-content/smush-webp/quantum-chip-design-cuts-external-control.png.webp)

In applied post-quantum cryptography, a November 22 audit by [Shattered.io](https://shattered.io/quantum-resistant-encryption-signal-pqxdh-imessage-pq3-whatsapp-telegram-2026/) underscored the widening gap between messaging platforms against "harvest now, decrypt later" attacks, while [EU Today](https://eutoday.net/eu-quantum-act-european-preference-public-procurement/) reported Brussels is preparing European-preference public procurement rules in the **EU Quantum Act** expected November 24\.

| Messenger | Post-Quantum Protocol | Scope & Assurance | Current Status (Nov 22, 2026\) |
| :---- | :---- | :---- | :---- |
| [Signal](https://shattered.io/quantum-resistant-encryption-signal-pqxdh-imessage-pq3-whatsapp-telegram-2026/) | `PQXDH` (X25519 \+ ML-KEM) & `SPQR` Triple Ratchet | Opening handshake \+ ongoing rekeying; public spec & `libsignal` | Shipped (blocking OS AI screen capture as of Nov 20\) |
| [Apple iMessage](https://shattered.io/quantum-resistant-encryption-signal-pqxdh-imessage-pq3-whatsapp-telegram-2026/) | `PQ3` \+ open `corecrypto` (ML-KEM / ML-DSA) | Opening handshake \+ continuous rekeying; ETH Zurich analysis | Shipped (closed client; iOS 27.2.1 fixed group-chat bugs) |
| [WhatsApp](https://shattered.io/quantum-resistant-encryption-signal-pqxdh-imessage-pq3-whatsapp-telegram-2026/) | None named in public docs | Signal Protocol classical E2EE lineage | Unconfirmed for messaging |
| [Telegram](https://shattered.io/quantum-resistant-encryption-signal-pqxdh-imessage-pq3-whatsapp-telegram-2026/) | None confirmed | 256-bit AES, 2048-bit RSA, classical DH (Secret Chats only) | Classical only; default cloud chats not E2EE |

## Cybersecurity: Microsoft Entra Connect Health and Cleverbridge Breaches

Microsoft disclosed a data breach involving its **Entra Connect Health** API on November 22, reports [SC Media](https://www.scworld.com/brief/microsoft-discloses-data-breach-involving-entra-connect-health-service). Introduced on July 23, 2026, discovered November 9, and patched server-side on November 19, the API flaw allowed unauthorized read-only access to tenant IDs, domain names, synchronization status, and administrator email addresses. While no passwords, tokens, or cryptographic keys were exposed, Microsoft advised enforcing phishing-resistant MFA and running its configuration-review PowerShell script.

![Microsoft Entra Connect Health Breach](https://www.scworld.com/api/thumbor-proxy?width=1920&src=https%3A%2F%2Ffiles.cyberriskalliance.com%2Fwp-content%2Fuploads%2F2025%2F08%2F080725_microsoft.jpg)

Separately, e-commerce billing provider **Cleverbridge** (serving Red Hat, Sony, and Veeam) confirmed attackers exfiltrated payment card numbers, expiration dates, and CVV codes following a November 4 intrusion ([SC Media](https://www.scworld.com/brief/cleverbridge-reports-data-breach-involving-payment-card-information)), while federal agencies face CISA's November 23 remediation deadline for actively exploited SAP NetWeaver flaw `CVE-2025-42884` ([TMC Insight](https://insight.tmcnet.com/insight/cisa-adds-exploited-sap-netweaver-flaw-to-priority-catalog-mws23fgp)).

## Fintech & Digital Banking: Banknbox Launches `nexura` Across MENA & Africa

Egyptian banking-technology provider **Banknbox** launched **nexura** on November 22 to accelerate digital-bank deployments across MENA, Africa, and Europe ([Daily News Egypt](https://dailynewsegypt.com/2026/11/22/banknbox-launches-nexura-banking-platform-to-accelerate-digital-transformation-across-mena-africa/)). Unifying core banking, mobile/corporate channels, card issuance, digital wallets, lending, and fraud prevention under a single modular stack, `nexura` aims to compress multi-year digital banking launches down to months. Meanwhile, [OneSafe](https://www.onesafe.io/blog/crypto-banking-dollar-retreat) analyzed how stablecoin settlement rails are decoupling from equity-correlated crypto price swings, alongside an updated November 22 [Zenodo Stablecoin DeFi Hourly Dataset](https://zenodo.org/records/24440516) covering Aave, Uniswap, Curve, and Chainlink feeds.

## Engineering Takeaways

1. **Harden Entra Admin Identities & Audit Cleverbridge Billing**: Enforce FIDO2/phishing-resistant MFA on all Entra global and sync administrators and review vendor billing integrations for payment card exposure.  
2. **Enforce Post-Quantum & Screen-Security Hygiene**: Route sensitive long-lived communications through `PQXDH`/`SPQR` (Signal) or `PQ3` (iMessage) and disable OS-level AI screen capture on corporate mobile devices.  
3. **Evaluate Isaac OS & MCP Legal Integrations**: Robotics teams can benchmark `Isaac Lab 3.0` simulation workflows to cut commissioning cycles, while compliance agents can test Pandex's MCP endpoint for EU regulatory retrieval.

[image1]: /post-media/openai-perplexity-limits-isaac-lab-3-0-and-quantum-chip-bus/14f40a4fb292-1600x900.png