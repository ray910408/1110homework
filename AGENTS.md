# LLM Wiki Schema — OWASP Agentic Security

這份檔案是給 AI（LLM agent）讀的「Wiki 維護規則」。任何 AI 在這個 repo 裡 ingest、查詢、產生簡報前都要先讀它。
參考 Karpathy 的 LLM Wiki 模式：`raw/`（原始來源，不改）→ `wiki/`（AI 撰寫、可持續修正的知識頁）→ 產出（簡報）。

## 1. 目錄分層

| 層 | 路徑 | 誰寫 | 規則 |
|---|---|---|---|
| Raw sources | `raw/` | ingest 時建立一次 | 每篇來源一個檔：URL、抓取日期、可信度、重點摘錄（改寫，非整段貼上）。之後不改內容，只能補「勘誤」段。 |
| Wiki | `wiki/` | AI | 概念頁 `concepts/`、風險頁 `risks/`、`index.md`（目錄）、`log.md`（操作紀錄）、`discussion.md`（先討論的決策）。 |
| Graph | `graph/` | `tools/wiki.mjs` 自動產生 | 由 `[[wikilink]]` 解析出節點與邊，不手改。 |
| Output | `index.html` | AI | 教學簡報；每張投影片用 `data-wiki="頁名"` 標出它引用的 Wiki 頁。 |

## 2. 頁面格式

```markdown
---
title: 頁面標題
type: concept | risk | source | meta
sources: [S1, S2]        # 對應 raw/ 的來源編號，risk/concept 頁至少 1 個
tags: [...]
---
# 標題
一句話定義（給新手看的版本）。
## 內文 ...
## 相關
- [[其他頁名]]
```

- 連結一律用 `[[檔名不含副檔名]]`，例如 `[[asi01-agent-goal-hijack]]`。
- 事實要能回溯：關鍵句後面標 `(S1)` 等來源編號。
- 官方 OWASP 文件（S1、S2）優先；第三方文章（S6）只用來交叉比對，衝突時以官方為準並記在 `log.md`。

## 3. 三個操作

1. **Ingest**：讀來源 → 寫 `raw/Sx-*.md` → 更新或新增相關 wiki 頁 → 更新 `index.md` → 在 `log.md` 記一筆。
2. **Query**：回答問題或產生簡報前，先讀 `index.md` 找頁，再讀頁面；答案只能用 wiki 裡有的內容。缺內容 → 回到 Ingest，不要靠記憶補。
3. **Lint**：執行 `node tools/wiki.mjs`。檢查：斷掉的 wikilink、孤兒頁、缺 `sources`、ASI 名稱與官方清單不一致、簡報 `data-wiki` 指向不存在的頁。全部通過才能 push。

## 4. 語言

內文用繁體中文；OWASP 專有名詞（例如 Agent Goal Hijack、Least Agency）保留英文原名。
