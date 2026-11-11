---
id: S2
title: Agentic AI – Threats and Mitigations (v1.1)
type: source
url: https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
publisher: OWASP GenAI Security Project — Agentic Security Initiative (ASI)
published: 2025-02-17 (v1.0)；本次讀到的 PDF 為 v1.1, 2025-12
fetched: 2026-11-11
reliability: 官方（primary）
license: CC BY-SA 4.0
how_read: 官方 PDF + pdftotext
---
# S2 — Agentic AI: Threats and Mitigations

## 文件定位
- ASI 的「基礎分類（foundational taxonomy）」，S1 的 Top 10 就是建立在它上面。
- v1.0（2025-02）有 T1–T15；v1.1（2025-12）擴充到 **T1–T17**（新增 T16、T17）。⚠ 二手文章常混用兩版的數字，ingest 時以本 PDF 為準。

## 威脅清單 T1–T17（官方名稱）
| # | 名稱 | 出現在哪些 ASI（依 S1 Appendix A） |
|---|---|---|
| T1 | Memory Poisoning | ASI06 |
| T2 | Tool Misuse | ASI02、ASI04 |
| T3 | Privilege Compromise | ASI03 |
| T4 | Resource Overload | ASI02、ASI06 |
| T5 | Cascading Hallucination Attacks | ASI08 |
| T6 | Intent Breaking & Goal Manipulation | ASI01、ASI06 |
| T7 | Misaligned & Deceptive Behaviors | ASI01、ASI09 |
| T8 | Repudiation & Untraceability | ASI08、ASI09 |
| T9 | Identity Spoofing & Impersonation | （Appendix A 未直接列出；Playbook 4 處理） |
| T10 | Overwhelming Human in the Loop | ASI09 |
| T11 | Unexpected RCE and Code Attacks | ASI04、ASI05 |
| T12 | Agent Communication Poisoning | ASI04、ASI06、ASI07 |
| T13 | Rogue Agents in Multi-Agent Systems | ASI04、ASI10 |
| T14 | Human Attacks on Multi-Agent Systems | ASI10 |
| T15 | Human Manipulation | ASI10 |
| T16 | Insecure Inter-Agent Protocol Abuse（MCP、A2A 等協定） | ASI02、ASI04、ASI07 |
| T17 | Supply Chain Compromise | ASI04 |

> 勘誤（2026-11-11）：第一版這欄是我依名稱「猜」的（例如把 T15 配到 ASI09、T14 配到 ASI07/08），比對 S1 Appendix A 後全部改成官方對照。

## 六本防禦 Playbook（官方對照表，改寫）
1. 防止推理被操控：T6、T8、T7
2. 防止記憶污染與知識腐化：T1、T5
3. 保護工具執行、防止未授權動作（含供應鏈）：T2、T3、T11、T4、T16、T17
4. 強化身分驗證、身分與權限控管：T3、T9、T16
5. 保護 HITL、防止從人下手的攻擊：T10、T15
6. 保護多 agent 通訊與信任機制：T12、T14、T13

## 與 LLM Top 10 的關係
- Goal manipulation 與 LLM01 Prompt Injection 相關，但在 agent 裡會延伸到多步驟規劃。
- Memory poisoning 從 LLM04（靜態資料投毒）延伸到「即時污染持久記憶」，也和 LLM08 向量/embedding 弱點相關。
