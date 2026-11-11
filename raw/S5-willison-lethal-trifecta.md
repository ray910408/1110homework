---
id: S5
title: The lethal trifecta for AI agents
type: source
url: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
author: Simon Willison（prompt injection 一詞的提出者）
published: 2025-06-16
fetched: 2026-11-11
reliability: 業界專家部落格（secondary，觀念性強）
---
# S5 — The Lethal Trifecta（致命三要素）

## 三要素
1. **存取私人資料**（private data）
2. **接觸不可信內容**（untrusted content：網頁、email、文件、issue、圖片）
3. **能對外溝通**（external communication：HTTP 請求、呼叫 API、載入圖片、給使用者點的連結）

三者同時存在 → agent 很容易被騙去讀私人資料並送給攻擊者。

## 為什麼
- LLM 會照著輸入裡任何地方出現的指令做，無法可靠分辨「使用者的指令」和「讀到的內容裡的指令」，因為全部被併成同一串 token。
- 私人資料 = 要偷的東西；不可信內容 = 攻擊者的指令；對外溝通 = 出口。少一個，簡單版攻擊就失敗。

## 攻擊流程（改寫）
攻擊者把指令藏在內容 → 使用者的 agent 在做正常任務時讀到 → 把它當命令 → 用自己的工具讀私人資料 → 經由某個出口送出。
真實案例：2025-05 GitHub MCP 漏洞——同一個 MCP server 能讀公開 issue（不可信）、讀私有 repo（私人資料）、開 PR（出口）。

## 作者對 guardrail 的看法
- 在 system prompt 叫模型「不要聽注入指令」只有機率性效果。
- 號稱擋下 95% 攻擊的產品：在 web 資安裡 95% 是不及格。
- 結論：使用者應避免讓 agent 同時擁有三要素；MCP 讓人很容易在不知不覺中湊齊三要素。

## 與 OWASP 的關係（ingest 時的整理）
三要素 ≈ S4 LLM01（不可信內容）+ LLM06（能力過大）+ S1 ASI01/ASI02 的外洩情境。拿掉任何一隻腳，就是 S1 的 Least Agency 精神。
