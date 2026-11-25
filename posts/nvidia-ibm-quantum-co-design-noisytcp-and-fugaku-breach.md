---
title: "NVIDIA-IBM Quantum Co-Design, NoisyTCP, & Fugaku Breach"
date: "2026-11-17"
summary: "NVIDIA, IBM, and Fermilab launch a modular quantum-classical platform with 13,000x faster QEC decoding, while NoisyTCP threatens Linux kernels, Fugaku investigates a breach, and OpenAI deploys healthcare computer-use agents."
categories: ["quantum", "cybersecurity", "ai", "fintech"]
filed: "2026-11-17T04:00:45.952Z"
---

# NVIDIA-IBM Quantum Co-Design, NoisyTCP, & Fugaku Breach

Between November 16 and 17, 2026, major announcements bridged hybrid quantum-classical supercomputing, lattice-based data security, Linux kernel network-stack resilience, autonomous computer-use agents in healthcare, and tokenized securities compliance.

## Quantum Computing & Accelerated Infrastructure: NVIDIA, IBM, Fermilab, and Post-Quantum Security

[NVIDIA](https://nvidianews.nvidia.com/news/nvidia-announces-collaboration-with-ibm-and-fermi-national-accelerator-laboratory-to-launch-quantum-classical-codesign-platform-plus-error-correction-breakthrough-to-advance-practical-quantum-computing), IBM, and the U.S. Department of Energy's [Fermi National Accelerator Laboratory](https://news.fnal.gov/2026/11/fermilab-ibm-and-nvidia-plan-modular-quantum-computing-co-design-platform-to-advance-scientific-discovery/) unveiled a modular quantum-classical co-design platform colocating **NVIDIA DGX B200** systems with **IBM Quantum Nighthawk** processors. Built to advance high-energy and nuclear physics (HENP) alongside fault-tolerant architectures, the initiative integrates open-source **Slurm** workload scheduling with IBM's Quantum Resource Management Interface so HPC centers can schedule QPUs alongside CPUs and GPUs using standard cluster policies.

In parallel, NVIDIA released **TCBP-JOBS** inside CUDA-Q QEC 0.9.0, delivering up to a **13,000x speedup** for quantum error-correction decoding research—compressing design-evaluation cycles from 12 weeks to 45 minutes. NVIDIA also highlighted its Gordon Bell Prize finalist chemistry work with IBM and RIKEN's ROQUO supercomputer (GB200 \+ Quantum-X800 InfiniBand), which modeled 12,635-atom protein-ligand complexes, alongside new releases for **Nemotron for Science**, the **Vera CPU** platform, and an [Altera, OQC, and NVIDIA](https://thequantuminsider.com/2026/11/16/altera-oqc-and-nvidia-link-quantum-processor-to-gpu-computing/) FPGA-to-GPU quantum link.

> "Making quantum computers useful for science requires advances in error correction, applications and the systems that bring quantum processors and accelerated computing together," — **Krysta Svore**, Vice President of Applied Research for Quantum Computing at NVIDIA ([NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-collaboration-with-ibm-and-fermi-national-accelerator-laboratory-to-launch-quantum-classical-codesign-platform-plus-error-correction-breakthrough-to-advance-practical-quantum-computing))

In post-quantum cryptography, [Saltgrain, NTT Research, and Carnegie Mellon University](https://thequantuminsider.com/2026/11/16/saltgrain-ntt-research-post-quantum-attribute-based-encryption/) introduced the first practical large-universe post-quantum Attribute-Based Encryption (ABE) schemes at ACM CCS 2026 (`ia.cr/2026/1895`). Built on Learning With Errors (LWE) and Ring-LWE lattice math, the key-policy (KP-ABE) and ciphertext-policy (CP-ABE) constructions encrypt 2,048 message bits per ciphertext—2,048x more compact per protected bit than single-bit schemes—and decrypt in **5.6 to 33.5 milliseconds** on an Apple M4 Pro MacBook Pro for one-to-four attribute policies.

Closer to home in Africa, [Liquid C2](https://thequantuminsider.com/2026/11/16/liquid-c2-graphiant-quantum-secure-networking-africa/) (a Cassava Technologies business) partnered with Graphiant to launch a managed **Quantum Secure Network-as-a-Service (NaaS)** combining post-quantum encryption, AI/IoT session tracing, and route-level data sovereignty for enterprises migrating workloads onto Cassava AI Factories.

> "When quantum computers break today's encryption, it will happen for everyone at once, and Google has already set 2029 as its own migration deadline to become quantum-safe," — **Ali Shaikh**, Chief Executive Officer at Graphiant ([The Quantum Insider](https://thequantuminsider.com/2026/11/16/liquid-c2-graphiant-quantum-secure-networking-africa/))

## Cybersecurity: NoisyTCP (`CVE-2026-99288`) and Fugaku Supercomputer Breach

Linux infrastructure teams face an unauthenticated remote denial-of-service flaw dubbed **NoisyTCP** (`CVE-2026-99288`), disclosed by researcher Hyunwoo Kim after the `linux-distros` embargo lifted on November 15 and analyzed in detail by [TuxCare](https://tuxcare.com/blog/noisytcp-cve/). Tracing back to an October 2015 commit (`079096f103fa`, Linux 4.4+), the flaw is a race condition in lockless established TCP socket lookups: an attacker mixing IPv4 fragments with normal TCP traffic across two or more receive queues (or Receive Packet Steering) can force a stale lookup to grab a recycled SYN-cookie request socket lacking a listener pointer, triggering a NULL pointer dereference in `tcp_v4_rcv()` and a full host kernel panic within seconds to minutes on multi-vCPU cloud VMs.

| Linux Distribution / Branch | Status (as of Nov 16, 2026\) | Patched Kernel / Mitigation |
| :---- | :---- | :---- |
| [Upstream Stable 6.12 / 6.18 / 7.3](https://tuxcare.com/blog/noisytcp-cve/) | Fixed (`4e2b3ef19e0e`; `arm64` check `5b5d8f351dd9`) | `6.12.117`, `6.18.63`, `7.3.4` (7.2 EOL; move to 7.3.4) |
| [Debian 12 / 13](https://tuxcare.com/blog/noisytcp-cve/) | Fixed | `linux 6.1.192-1` (DLA-4906-1) / `6.12.117-1` (DSA-6628-1) |
| [Oracle Linux UEK / CIQ Rocky](https://tuxcare.com/blog/noisytcp-cve/) | Fixed | `ELSA-2026-500630/31/32` / CIQ RLC Pro & LTS |
| [RHEL 8, 9, 10 & Ubuntu](https://tuxcare.com/blog/noisytcp-cve/) | Pending / Under Evaluation | Disable SYN cookies or restrict NIC to 1 RX queue (`ethtool -L`) |

Separately, [SC Media](https://www.scworld.com/brief/security-breach-reported-at-fugaku-supercomputer-facility) reported that Japan's **Riken Center for Computational Science** in Kobe suspended operations on the **Fugaku** supercomputer after detecting unauthorized access via a compromised system on November 13\. Japan's Ministry of Education, Culture, Sports, Science and Technology (MEXT) is investigating potential user-data exfiltration.

![Fugaku Supercomputer Facility Security Breach](https://www.scworld.com/api/thumbor-proxy?width=1920&src=https%3A%2F%2Ffiles.cyberriskalliance.com%2Fwp-content%2Fuploads%2F2026%2F11%2F111626_japan.jpg)

## Artificial Intelligence: OpenAI Computer-Use Agents in Healthcare

[OpenAI](https://openai.com/index/more-ways-to-move-care-forward-with-chatgpt-for-healthcare/) rolled out **computer-use agents** in ChatGPT Work, Codex, and the OpenAI API for **ChatGPT for Healthcare**, enabling governed agents to read screens, click, and move documents across disconnected EHRs, payer portals, and scheduling tools under Business Associate Agreements (BAAs) for HIPAA compliance. Early deployments with Abridge, Ambience, Cigna Healthcare, and CVS Health automate referral processing and chart follow-ups, backed by more than 20 new healthcare plugins—including IMO Health MCP Server, UpToDate Expert AI, Redox, Stedi, TriZetto, and Turquoise Health—and blind physician evaluations across 1,300+ multi-turn clinical reviews. Meanwhile, [GitHub](https://github.blog/changelog/2026-11-16-github-copilot-models-deprecated-on-november-16-2026/) executed its scheduled November 16 Copilot model deprecations.

![ChatGPT for Healthcare Computer-Use Agents][image1]

## Fintech & Digital Assets: Supreme Court Master Account Ruling and Tokenized Securities

The U.S. Supreme Court declined to hear **Custodia Bank's** appeal against the Federal Reserve and the Kansas City Fed, reports [ABA Banking Journal](https://bankingjournal.aba.com/2026/11/supreme-court-declines-to-consider-crypto-firm-lawsuit-for-master-account-access/), leaving intact the Tenth Circuit's ruling that Reserve Banks retain discretion to deny master account access to crypto-focused institutions while the Fed weighs limited-purpose "payment accounts." In a companion report, [ABA Banking Journal](https://bankingjournal.aba.com/2026/11/fed-financial-services-firms-cite-ai-as-top-risk/) noted that financial services firms cited AI as a top systemic risk in the latest Federal Reserve survey.

In digital asset compliance, [StarCompliance partnered with RWA.xyz](https://fintech.global/2026/11/16/star-and-rwa-xyz-tackle-tokenised-securities-risk/) to embed on-chain registry intelligence into employee and institutional trade surveillance. With tokenized stocks expanding from \$13 million to over \$3.5 billion across 8,000+ tokens in two years, the integration maps multi-chain tokens back to their underlying issuers to enforce restricted-list trading controls automatically.

## Engineering Takeaways

1. **Audit Multi-Queue Linux Hosts for `CVE-2026-99288`**: Check internet-facing servers with `ethtool -l` and `rps_cpus`; apply Debian/Oracle/CIQ kernel updates immediately, or temporarily restrict NICs to a single RX queue on pending RHEL/Ubuntu hosts (and verify `5b5d8f351dd9` on `arm64` builds).  
2. **Adopt Hybrid Slurm-QPU & CUDA-Q Workflows**: Research teams running variational or QEC decoding workloads can benchmark `TCBP-JOBS` in CUDA-Q QEC 0.9.0 and align cluster scheduling with Slurm's new quantum resource interfaces.  
3. **Upgrade Network-Layer PQC & Tokenized Compliance**: Evaluate managed PQC NaaS tunnels for multi-region AI traffic and map multi-chain RWA tokens to issuer-level compliance controls.

[image1]: /post-media/nvidia-ibm-quantum-co-design-noisytcp-and-fugaku-breach/107b708cb70d-1600x900.png