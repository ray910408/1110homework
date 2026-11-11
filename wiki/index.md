---
title: Wiki 目錄（index）
type: meta
sources: [S1, S2, S3, S4, S5, S6]
tags: [index]
---
# OWASP Agentic Security — LLM Wiki 目錄

AI 查詢 wiki 時**先讀這一頁**，再依連結讀需要的頁。規則見 repo 根目錄 `AGENTS.md`。

## 0. 流程頁
- [[discussion]] — 先討論、後生成：範圍、聽眾、來源、頁面切法的決策
- [[log]] — 每次 ingest / lint / 產生簡報的紀錄與發現的錯誤

## 1. 新手先讀（概念）
- [[ai-agent]] — Agent 是什麼、五個組成、為何比 LLM 危險
- [[prompt-injection]] — LLM01，幾乎所有攻擊的起點
- [[excessive-agency]] — LLM06，能力給太多
- [[lethal-trifecta]] — 致命三要素：私密資料 × 不可信內容 × 對外溝通
- [[least-agency]] — OWASP 的核心原則
- [[human-in-the-loop]] — 人工把關，以及它怎麼被攻擊

## 2. 框架
- [[owasp-agentic-top10]] — Agentic Top 10 總覽（ASI01–ASI10）
- [[owasp-agentic-threats-taxonomy]] — T1–T17 威脅字典與六本 Playbook
- [[owasp-llm-top10]] — LLM Top 10 與 ASI 的對照

## 3. 十大風險
| ID | 頁面 |
|---|---|
| ASI01 | [[asi01-agent-goal-hijack]] |
| ASI02 | [[asi02-tool-misuse-and-exploitation]] |
| ASI03 | [[asi03-identity-and-privilege-abuse]] |
| ASI04 | [[asi04-agentic-supply-chain-vulnerabilities]] |
| ASI05 | [[asi05-unexpected-code-execution]] |
| ASI06 | [[asi06-memory-and-context-poisoning]] |
| ASI07 | [[asi07-insecure-inter-agent-communication]] |
| ASI08 | [[asi08-cascading-failures]] |
| ASI09 | [[asi09-human-agent-trust-exploitation]] |
| ASI10 | [[asi10-rogue-agents]] |

## 4. 來源（raw/）
| ID | 來源 | 類型 |
|---|---|---|
| S1 | OWASP Top 10 for Agentic Applications 2026（PDF） | 官方 |
| S2 | OWASP Agentic AI – Threats and Mitigations v1.1（PDF） | 官方 |
| S3 | OWASP AI Agent Security Cheat Sheet | 官方 |
| S4 | OWASP Top 10 for LLM Applications 2025 | 官方 |
| S5 | Simon Willison — The lethal trifecta | 專家部落格 |
| S6 | Giskard — Agentic Top 10 解說 | 第三方（交叉比對） |
