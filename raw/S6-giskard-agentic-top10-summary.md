---
id: S6
title: OWASP Top 10 for Agentic Applications 2026 — Giskard 解說文
type: source
url: https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026
fetched: 2026-11-11
reliability: 第三方解說（secondary）— 只用於交叉比對
---
# S6 — Giskard 解說文（交叉比對用）

## 用途
用來交叉比對 S1 的 ASI01–ASI10 名稱與舉例是否一致。

## 比對結果
- 10 項名稱與 S1 官方 PDF 一致（ASI05 有 "(RCE)" 後綴）。
- 舉例大致相同：EchoLeak（ASI01）、工具名稱 typosquatting（ASI02）、confused deputy（ASI03）、假冒 MCP server（ASI04）、vibe-coding 刪 production（ASI05）、假票價（ASI06）、協定降級 MITM（ASI07）、金融連鎖（ASI08）、發票詐騙（ASI09）、reward hacking 刪備份（ASI10）。
- **缺口**：這篇沒有給緩解措施，也沒有 LLM Top 10 對照 → 緩解與對照改以 S1 官方 PDF 為準。

## 發現的衝突（記入 wiki/log.md）
- 其他二手搜尋結果把 Threats & Mitigations 說成「15 項」或「17 項」：實際是版本差異（v1.0 = T1–T15，v1.1 = T1–T17），以 S2 PDF 為準。
