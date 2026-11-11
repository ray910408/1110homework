---
title: OWASP Top 10 for Agentic Applications 2026（總覽）
type: concept
sources: [S1, S6]
tags: [框架, 總覽]
---
# OWASP Top 10 for Agentic Applications (2026)

**新手一句話**：OWASP 在 2025-12-09 發布的「AI Agent 十大風險清單」，告訴開發者 agent 最容易在哪裡出事、怎麼防。(S1)

## 基本資料（S1）
- 發布：OWASP GenAI Security Project 的 Agentic Security Initiative（ASI），編號 ASI01–ASI10。
- 由上百位業界專家參與、全球同儕審查；建立在 [[owasp-agentic-threats-taxonomy]] 之上，並對照 [[owasp-llm-top10]]。
- 核心原則：[[least-agency]] + 強可觀測性。

## 十大風險
| ID | 名稱 | 新手版（一句話） | 頁面 |
|---|---|---|---|
| ASI01 | Agent Goal Hijack | AI 的目標被偷換 | [[asi01-agent-goal-hijack]] |
| ASI02 | Tool Misuse and Exploitation | 好工具被拿去做壞事 | [[asi02-tool-misuse-and-exploitation]] |
| ASI03 | Identity and Privilege Abuse | 借來的權限被濫用 | [[asi03-identity-and-privilege-abuse]] |
| ASI04 | Agentic Supply Chain Vulnerabilities | 第三方零件有毒 | [[asi04-agentic-supply-chain-vulnerabilities]] |
| ASI05 | Unexpected Code Execution (RCE) | AI 寫的程式被引導去做壞事 | [[asi05-unexpected-code-execution]] |
| ASI06 | Memory & Context Poisoning | AI 的記憶被下毒 | [[asi06-memory-and-context-poisoning]] |
| ASI07 | Insecure Inter-Agent Communication | AI 之間的對話被竊聽或偽造 | [[asi07-insecure-inter-agent-communication]] |
| ASI08 | Cascading Failures | 一個出錯，全部跟著倒 | [[asi08-cascading-failures]] |
| ASI09 | Human-Agent Trust Exploitation | 利用人對 AI 的信任 | [[asi09-human-agent-trust-exploitation]] |
| ASI10 | Rogue Agents | AI 自己走偏變內鬼 | [[asi10-rogue-agents]] |

## 架構地圖（S1 At A Glance）
- 輸入端：ASI01、ASI03、ASI09
- Agent 本體 / 治理：ASI10
- 工具：ASI02
- Agent ↔ Agent：ASI07
- 記憶 / RAG：ASI06
- 橫跨全系統：ASI04、ASI05、ASI08

## 交叉比對
名稱與 S6（Giskard）一致；緩解措施只採 S1 官方內容。

## 相關
- [[ai-agent]]、[[lethal-trifecta]]、[[human-in-the-loop]]
