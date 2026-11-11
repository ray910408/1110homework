# AI Agent 也會被騙？— OWASP Agentic Top 10 新手互動簡報

用 **LLM Wiki** 當知識庫，製作一份教學型 HTML 簡報，讓沒接觸過資安的人也能理解 OWASP Top 10 for Agentic Applications (2026)。

## 怎麼看

| 想看什麼 | 開這個 |
|---|---|
| 互動簡報（18 張） | `index.html` — 需用 http server 開（它會載入 `graph/wiki-data.js`） |
| LLM Wiki 目錄 | [`wiki/index.md`](wiki/index.md) |
| Loop / graph 設計 + 反思 | [`docs/workflow.md`](docs/workflow.md) |
| 先討論、後生成的決策 | [`wiki/discussion.md`](wiki/discussion.md) |
| 每一步的紀錄與發現的錯誤 | [`wiki/log.md`](wiki/log.md) |
| Wiki 規則（給 AI 讀） | [`AGENTS.md`](AGENTS.md) |

本機開簡報：

```bash
python -m http.server 8765
```

然後瀏覽 http://localhost:8765 。操作：← → 換頁、左下 ☰ 目錄。

## 結構

```
raw/        6 篇 ingest 來源（S1–S6，改寫筆記 + URL + 可信度）
wiki/       LLM Wiki：concepts/（9 個概念）、risks/（ASI01–ASI10）、index、log、discussion
tools/      wiki.mjs — lint + 產生 graph + 把 Wiki 抽成簡報資料
graph/      graph.json、wiki-data.js（自動產生，勿手改）
docs/       workflow.md — loop/graph 設計與反思
index.html  教學簡報
```

## 重新產生 / 檢查

```bash
node tools/wiki.mjs
```

檢查斷鏈、孤兒頁、缺來源、ASI 官方名稱、段落格式、簡報引用；通過才會更新 `graph/`。exit code 非 0 代表有問題。

## 來源

S1 OWASP Top 10 for Agentic Applications 2026 · S2 Agentic AI – Threats and Mitigations v1.1 · S3 OWASP AI Agent Security Cheat Sheet · S4 OWASP Top 10 for LLM Applications 2025 · S5 Simon Willison, *The lethal trifecta* · S6 Giskard 解說（交叉比對）。OWASP 文件為 CC BY-SA 4.0；本 repo 內容為改寫摘要，非官方翻譯。
