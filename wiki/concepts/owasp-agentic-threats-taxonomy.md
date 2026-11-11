---
title: Agentic AI Threats & Mitigations（T1–T17 威脅分類）
type: concept
sources: [S2, S1]
tags: [框架]
---
# Agentic AI – Threats and Mitigations（T1–T17）

**新手一句話**：這是 OWASP 更詳細的「agent 威脅字典」，Top 10 就是從這本字典濃縮出來的。(S1, S2)

## 版本
- v1.0（2025-02-17）：T1–T15
- v1.1（2025-12）：T1–T17，新增 **T16 Insecure Inter-Agent Protocol Abuse**、**T17 Supply Chain Compromise**。(S2)
- ⚠ 網路上「15 項 / 17 項」的說法都對，只是版本不同 → 見 [[log]]。

## 17 項 → Top 10（S1 Appendix A）
| T | 名稱 | ASI |
|---|---|---|
| T1 | Memory Poisoning | [[asi06-memory-and-context-poisoning]] |
| T2 | Tool Misuse | [[asi02-tool-misuse-and-exploitation]]、ASI04 |
| T3 | Privilege Compromise | [[asi03-identity-and-privilege-abuse]] |
| T4 | Resource Overload | ASI02、ASI06 |
| T5 | Cascading Hallucination Attacks | [[asi08-cascading-failures]] |
| T6 | Intent Breaking & Goal Manipulation | [[asi01-agent-goal-hijack]]、ASI06 |
| T7 | Misaligned & Deceptive Behaviors | ASI01、ASI09 |
| T8 | Repudiation & Untraceability | ASI08、ASI09 |
| T9 | Identity Spoofing & Impersonation | （Playbook 4） |
| T10 | Overwhelming Human in the Loop | [[asi09-human-agent-trust-exploitation]] |
| T11 | Unexpected RCE and Code Attacks | [[asi05-unexpected-code-execution]]、ASI04 |
| T12 | Agent Communication Poisoning | [[asi07-insecure-inter-agent-communication]]、ASI04、ASI06 |
| T13 | Rogue Agents in Multi-Agent Systems | [[asi10-rogue-agents]]、ASI04 |
| T14 | Human Attacks on Multi-Agent Systems | ASI10 |
| T15 | Human Manipulation | ASI10 |
| T16 | Insecure Inter-Agent Protocol Abuse | ASI02、ASI04、ASI07 |
| T17 | Supply Chain Compromise | [[asi04-agentic-supply-chain-vulnerabilities]] |

## 六本 Playbook（S2）
1. 防推理被操控　2. 防記憶污染　3. 保護工具執行（含供應鏈）　4. 身分與權限控管　5. 保護 HITL　6. 多 agent 通訊與信任

## 相關
- [[owasp-agentic-top10]]、[[owasp-llm-top10]]
