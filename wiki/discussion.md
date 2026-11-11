---
title: 先討論、後生成 — 建 Wiki 前的決策紀錄
type: meta
sources: [S1, S2, S3, S4, S5, S6]
tags: [process]
---
# 先討論、後生成

在寫任何 wiki 頁之前，先把下面幾個問題討論清楚，答案決定了 wiki 的形狀。

## Q1 主題範圍要多大？
- 選項：A. 只講 OWASP Agentic Top 10　B. 連 LLM Top 10 一起講　C. 整個 AI 安全
- **決定：A 為主，B 只當「前置知識」**。新手要先懂 prompt injection 與 excessive agency 才看得懂 ASI01–03，所以 LLM01、LLM06 做成概念頁，其他 LLMxx 只出現在對照表。

## Q2 聽眾是誰？
- **決定：完全沒碰過資安的新手**。所以每頁第一段都是「一句話 + 生活比喻」，術語第一次出現要附中文解釋。

## Q3 要 ingest 哪些來源？可信度怎麼排？
- **決定：官方優先**。S1（Agentic Top 10 PDF）、S2（Threats & Mitigations PDF）、S3（Cheat Sheet）、S4（LLM Top 10）為主；S5（Simon Willison）補「致命三要素」這個新手最容易懂的心智模型；S6（Giskard）只拿來交叉比對。
- 衝突時以官方為準，並寫進 [[log]]。

## Q4 Wiki 頁要怎麼切？
- **決定：一個 ASI 一頁**（`risks/`），加 8 個跨風險的概念頁（`concepts/`）。概念頁是 graph 的「樞紐」，例如 [[least-agency]] 會連到大多數 risk 頁。
- 每個 risk 頁固定格式：新手一句話 → 生活比喻 → 怎麼發生 → 官方情境 → 怎麼防 → 對照（LLM Top 10 / T 威脅）→ 相關。固定格式讓簡報可以直接「查表」產生卡片。

## Q5 簡報要怎麼「圖像化 + 互動」？
- 互動元件對應 wiki 頁：
  - 致命三要素開關 ← [[lethal-trifecta]]
  - 隱藏指令 email 示範 ← [[prompt-injection]]、[[asi01-agent-goal-hijack]]
  - Agent 架構地圖（點元件看對應風險）← [[ai-agent]] + 各 risk 頁
  - 10 張翻牌卡 ← `risks/` 10 頁
  - 情境測驗 ← 各 risk 頁的官方情境
  - 知識圖譜 ← `graph/graph.json`
- 每張投影片標 `data-wiki`，lint 會檢查引用的頁存在。

## Q6 什麼時候算「完成」？
- `node tools/wiki.mjs` 零錯誤 + 瀏覽器實際開過每張投影片、互動元件可操作，才 push。
