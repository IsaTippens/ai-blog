---
title: PHPAfterShell, Ruby2Shell, Quantum Contextuality, & IOSCO PQC
date: '2026-11-20'
summary: Critical RCE flaws PHPAfterShell and Ruby2Shell hit web runtimes while Google Quantum AI proves 105-qubit contextuality, memQ and Infleqtion partner on quantum networking, and IOSCO warns blockchains on post-quantum migration.
categories:
  - cybersecurity
  - quantum
  - ai
  - fintech
filed: "2026-11-26T14:22:37.074Z"
---

# PHPAfterShell, Ruby2Shell, Quantum Contextuality, & IOSCO PQC

Between November 19 and 20, 2026, web-runtime maintainers rushed out critical memory-corruption patches for PHP and Ruby, Google Quantum AI published a landmark *Science* study on 105-qubit quantum contextuality, and global securities regulators issued a formal warning on post-quantum blockchain migration overhead.

## Cybersecurity: PHPAfterShell (`CVE-2026-126714`), Ruby2Shell (`CVE-2026-132825`), and OpenPLC

Web application stacks took a double hit on November 19 as maintainers shipped urgent patches for **PHPAfterShell** and **Ruby2Shell**:

* **PHPAfterShell (`CVE-2026-126714`)**: Rated **CVSS 4.0 9.2 (Critical)** by the PHP project, this flaw in PHP's default `files` session handler enables remote code execution as the PHP worker, reports [Cycode](https://cycode.com/blog/phpaftershell-cve-2026-126714/), [Red Hat (`RHSB-2026-020`)](https://access.redhat.com/security/vulnerabilities/RHSB-2026-020), and [AWS (`2026-190-aws`)](https://aws.amazon.com/security/security-bulletins/2026-190-aws/). Fixed on November 19 in **PHP `8.2.36`, `8.3.37`, `8.4.28`, `8.5.13`, and `8.6.0`** (plus Debian 12 `8.2.36-1~deb12u1` and Debian 13 `8.4.28-1~deb13u1`), the release also silently turns `session.upload_progress.enabled` off by default. October's `PHP2Shell` patches do not remediate `CVE-2026-126714`, though Redis and database session stores are unaffected.
* **Ruby2Shell (`GHSA-34m4-m9fh-gqp5` / `CVE-2026-132825`)**: Fixed in **Ruby `4.0.10`, `3.4.13`, and `3.3.14`** (commit `d582f8f`) alongside six additional regular-expression and case-conversion advisories, Ruby2Shell is a one-byte heap buffer overflow (CWE-193) in single-byte encodings such as `ISO-8859-1` and `Windows-1252` where the sharp-s (`0xDF`) character expands to two bytes while checking only one byte of buffer room ([Rescana](https://www.rescana.com/post/ruby2shell-ghsa-34m4-m9fh-gqp5-regexp-case-conversion-patch-now)). Reachable without authentication in default Rails (`_method` middleware) and Sinatra deployments, the flaw was independently surfaced by Stephan Lipp (Ada Logics) and Anthropic, Moritz Sanft using OpenAI Codex, and Veria Labs (which plans a public Rails RCE proof of concept on November 25). Mastodon (`4.7.6`, `4.6.12`, `4.5.22`, `4.4.29`), OpenProject, and Discourse have already released updated images.

| Runtime / Advisory | CVE / GHSA Identifier | Root Mechanism | Fixed Releases |
| :--- | :--- | :--- | :--- |
| [PHP Default Session Handler](https://cycode.com/blog/phpaftershell-cve-2026-126714/) | `CVE-2026-126714` (CVSS 4.0 9.2) | File-based session handler corruption & upload progress RCE | `8.2.36`, `8.3.37`, `8.4.28`, `8.5.13`, `8.6.0` |
| [CRuby String Case Conversion](https://www.rescana.com/post/ruby2shell-ghsa-34m4-m9fh-gqp5-regexp-case-conversion-patch-now) | `CVE-2026-132825` / `GHSA-34m4-m9fh-gqp5` | 1-byte heap overflow on `0xDF` in `ISO-8859-1` / `Windows-1252` | `4.0.10`, `3.4.13`, `3.3.14` (3.2 EOL) |
| [Autonomy Logic OpenPLC](https://www.cisa.gov/news-events/ics-advisories/icsa-26-323-01) | `ICSA-26-323-01` | Industrial control system runtime vulnerabilities | Apply CISA / vendor ICS mitigations |

## Quantum Computing: Google Proves 105-Qubit Contextuality and memQ Partners with Infleqtion

In a *Science* study detailed on November 19, [Google Research](https://research.google/blog/a-game-you-cannot-win-unless-you-have-a-quantum-computer/) demonstrated large-scale **quantum contextuality**—the property that measurement outcomes cannot exist prior to observation—on its superconducting **Willow** processor:

* **Magic Square Game**: Across 100,000 trials per configuration, Willow won **98.30% (±0.0001)** of rounds, decisively beating the **88.89%** classical bound.
* **Bell–Kochen–Specker Inequality**: Running 540 sequential non-destructive ancilla measurements repeated 1,000 times, Google measured **χ = 5.590 ± 0.008**, surpassing the classical limit of `4` and approaching the quantum ceiling of `6`.
* **Scale to 105 Qubits**: The team beat classical limits in a **71-player GHZ parity game** (verifying genuine 45-qubit entanglement) and executed constant-depth hidden-linear-function circuits across **105 qubits**, surfacing subtle coherent gate errors that random-circuit benchmarks miss.

![Google Quantum AI Magic Square Contextuality Diagram](https://storage.googleapis.com/gweb-research2023-media/original_images/QuantumContextuality1-MagicSquareGame.png)

Meanwhile, in Chicago, [memQ and Infleqtion](https://infleqtion.com/newsroom/announcements/memq-and-infleqtion-sign-mou-to-advance-networked-quantum-computing/) signed a memorandum of understanding on November 19 to validate interoperability between memQ's `xQNA` optical quantum networking portfolio and Infleqtion's `Sqale` neutral-atom QPU and `Superstaq` compiler—enabling distributed quantum clustering analogous to classical HPC interconnects.

> "Interoperability is essential as our industry moves toward broader commercial deployments. Our collaboration with memQ reflects our shared commitment to building an ecosystem that moves end-users closer to confident adoption across their enterprise." — **Pranav Gokhale**, Chief Technology Officer at Infleqtion ([Infleqtion](https://infleqtion.com/newsroom/announcements/memq-and-infleqtion-sign-mou-to-advance-networked-quantum-computing/))

## Fintech & Post-Quantum Governance: IOSCO Warns Blockchains and OSFI Updates Open Banking

The International Organization of Securities Commissions (IOSCO) published a 63-page report on November 19 warning that post-quantum cryptography (PQC) poses a sharp architectural challenge for public blockchains and financial markets, reports [Bitcoin Magazine](https://bitcoinmagazine.com/news/iosco-quantum-computing-warning-bitcoin). IOSCO noted that NIST's **ML-DSA-44** signatures (~2,420 bytes) are **35 to 40 times larger** than standard 64-byte ECDSA/EdDSA signatures, citing Solana quantum-resistant testnet experiments where throughput dropped roughly **90%**. Highlighting Ethereum, Solana, Tron, and dormant exposed public-key UTXOs (such as an estimated 6.93 million BTC, or 34.6% of supply), IOSCO urged institutions to build "crypto-agility" and guard against "quantum washing."

> "The scale and duration of the transition mean the financial sector should start preparing today," — **Jean-Paul Servais**, Chair of the IOSCO Board ([Bitcoin Magazine](https://bitcoinmagazine.com/news/iosco-quantum-computing-warning-bitcoin))

![IOSCO Quantum Computing Threat to Blockchains and Finance](https://bitcoinmagazine.com/wp-content/uploads/2026/11/Global-Securities-Watchdog-Warns-of-Quantum-Computing-Threat-to-Blockchains-and-Finance.jpg)

In open-banking regulation, Canada's Office of the Superintendent of Financial Institutions ([OSFI](https://www.osfi-bsif.gc.ca/en/news/backgrounder-targeted-amendment-guideline-b-10-consumer-driven-banking)) issued an immediate amendment to **Guideline B-10** on November 19, allowing banks to rely on federal accreditation of consumer-driven banking participants rather than duplicating third-party vendor risk assessments.

## Artificial Intelligence & Cloud Infrastructure: Anthropic Nasdaq Debut and Red Hat on Azure

Anthropic officially began trading on the Nasdaq Global Select Market under ticker **ANT** on November 19 following its record $81.34 billion IPO pricing, as broadcast live by the [Associated Press](http://www.youtube.com/watch?v=cpIlQK6p9cY) and [NDTV Profit](http://www.youtube.com/watch?v=p0b_Z6ttwvI), even as broader technology indices pulled back 2.2% on the Nasdaq ([Eurasia Business News](https://eurasiabusinessnews.com/2026/11/19/stock-market-today-november-19-2026-dow-sinks-1084-points-nasdaq-drops-2-2-after-anthropic-debut/)).

In enterprise hybrid cloud, [Red Hat](https://www.redhat.com/en/blog/friday-five-november-20-2026-red-hat) detailed its November 20 expansion with Microsoft bringing direct-virtualization OpenShift VMs to Azure for near-bare-metal AI and container consolidation, alongside launching **IBM and Red Hat Lightwell Network** on Microsoft Marketplace for version-specific backported open-source vulnerability remediations and opening a Singapore AI Centre of Excellence.

## Engineering Takeaways

1. **Patch PHP & Ruby Runtimes Immediately**: Upgrade PHP to `8.2.36` / `8.3.37` / `8.4.28` / `8.5.13` / `8.6.0` (and re-enable `session.upload_progress.enabled` explicitly if your app depends on it) and bump CRuby to `4.0.10`, `3.4.13`, or `3.3.14` before Veria Labs' November 25 Rails PoC release.
2. **Audit Blockchain & Custody Crypto-Agility**: Model signature-size and throughput impacts of NIST ML-DSA-44 on settlement nodes and inventory exposed static public keys per IOSCO guidance.
3. **Adopt Contextuality Benchmarks for QPU Evaluation**: Track hardware providers adopting state-independent Bell–Kochen–Specker and constant-depth contextuality benchmarks alongside traditional random-circuit fidelity scores.
