---
title: OWASP Top 10 for LLM Applications 2025（前置知識）
type: concept
sources: [S4, S1]
tags: [框架]
---
# OWASP Top 10 for LLM Applications (2025)

**新手一句話**：OWASP 先為「大型語言模型應用」整理了十大風險；Agentic Top 10 是在它上面的延伸版。(S4, S1)

## 清單（S4）
| ID | 名稱 | 和 Agentic Top 10 的關係（S1 Appendix A） |
|---|---|---|
| LLM01 | Prompt Injection | ASI01, 03, 05, 06, 08, 09 的起點 → [[prompt-injection]] |
| LLM02 | Sensitive Information Disclosure | ASI03, 07, 10 |
| LLM03 | Supply Chain | ASI04 |
| LLM04 | Data and Model Poisoning | ASI06, 08 |
| LLM05 | Improper Output Handling | ASI05, 09 |
| LLM06 | Excessive Agency | ASI01, 02, 03, 07, 08, 09 → [[excessive-agency]] |
| LLM07 | System Prompt Leakage | — |
| LLM08 | Vector and Embedding Weaknesses | ASI06 |
| LLM09 | Misinformation | ASI09, 10 |
| LLM10 | Unbounded Consumption | （ASI02 的 loop amplification 相近） |

## 重點
- LLM Top 10 談「模型說了什麼」；Agentic Top 10 談「agent 做了什麼」。
- 最常被引用的兩項是 LLM01 與 LLM06——所以新手先學這兩個。

## 相關
- [[owasp-agentic-top10]]、[[owasp-agentic-threats-taxonomy]]
