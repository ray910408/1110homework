# AGENTS.md — 給 AI 的規則（開工前先讀完）

這個 repo 是一個 **LLM Wiki + 教學簡報**。任何 AI 在這裡 ingest 資料、回答問題、新增頁面或修改簡報之前，都要先讀這份檔案。
參考 Karpathy 的 LLM Wiki 模式：`raw/`（原始來源）→ `wiki/`（AI 整理的知識頁）→ `index.html`（由 Wiki 產生的簡報）。

---

## 專案目的

- 用 LLM Wiki 整理 **OWASP Agentic Security**（OWASP Top 10 for Agentic Applications 2026），做成一份讓**資安新手**也看得懂的互動式 HTML 簡報。
- Wiki 是**唯一事實來源**：簡報的風險卡、測驗、對照矩陣、知識圖譜都由 `tools/wiki.mjs` 從 Wiki 自動抽出，不在簡報裡手寫事實。
- 一個主題一頁：一個概念一頁（`wiki/concepts/`），一個 ASI 風險一頁（`wiki/risks/`），一篇來源一個檔（`raw/`）。

## 網頁風格

| 項目 | 規則 |
|---|---|
| 底色 | 深藍 `#0d1321`，卡片 `#151d30`，邊框 `#2c3a5a` |
| 文字 | 主文字 `#e8edf7`，次要說明 `#9fb0cf` |
| 強調色 | 青藍 `#4cc9f0` 只用在**重點與可點的元素**；粉紅 `#f72585` 只用在 **loop / 重複**；紅 `#ff7a90` 只用在**風險（ASI）**；黃 `#ffb703` 只用在**警告 / 反思** |
| 字體 | Noto Sans TC → 微軟正黑體 → 系統字體；程式碼用等寬字 |
| 語氣 | 繁體中文、對新手說話；每個術語第一次出現要附中文與生活比喻；OWASP 官方名稱保留英文原文 |
| 投影片 | 一張只講一個觀念；可互動的標 `可互動` 標籤；底部一定有「Wiki：頁名（來源 Sx）」 |
| 不做 | 不用外部 CDN 或套件（要能離線看）；不放大段原文（版權，只改寫）；色彩不得挪作他用 |

所有顏色都定義在 `style.css` 最上面的 `:root` 變數，**只改變數、不在別處寫死色碼**。

## 頁面結構

**簡報（`index.html`，18 張）**：封面 → 路線 → Agent 是什麼 → 為什麼更危險 → 三個觀念（Prompt Injection / 致命三要素 / Excessive Agency）→ 十大風險卡 → 架構地圖 → 連鎖攻擊 → 四大防禦 → 檢查表 → 測驗 → LLM 對照矩陣 → 知識圖譜 → 製作流程 → 反思 → 參考資料。

每張投影片的固定寫法：

```html
<section class="slide" data-title="目錄上顯示的名稱" data-wiki="引用的wiki頁名 可多個用空白分隔">
  <h2>標題 <span class="tag">可互動</span></h2>
  <p class="lead">一句話重點</p>
  ……內容……
  <div class="src">Wiki：<code>頁名</code>（來源 S1）</div>
</section>
```

**Wiki 頁的固定段落**（照模板，段落名稱不可改，`tools/wiki.mjs` 靠它抽簡報資料）：

| 類型 | 固定段落（順序固定） |
|---|---|
| risk | `**新手一句話**` → `**生活比喻**` → `## 怎麼發生` → `## 官方情境`（條列）→ `## 怎麼防`（至少 3 點編號）→ `## 對照` → `## 相關` |
| concept | `**新手一句話**` → `**生活比喻**` → 內文（自由）→ `## 相關` |
| source | frontmatter（id、url、published、fetched、reliability、how_read）→ 重點改寫 → 必要時 `勘誤` 段 |

**Wiki 入口**：`wiki/index.md` 是目錄，AI 查詢時**先讀 index，再讀頁面**。

## 檔案與命名

```
AGENTS.md            給 AI 的規則（本檔，一定在最外層）
README.md            給人看的說明
index.html           簡報首頁（GitHub Pages 從這裡打開）
style.css            簡報樣式
app.js               簡報互動程式
raw/                 來源：S{編號}-{來源英文簡稱}.md        例：S5-willison-lethal-trifecta.md
wiki/index.md        Wiki 目錄
wiki/log.md          操作紀錄（只往下追加）
wiki/discussion.md   先討論、後生成的決策
wiki/concepts/       概念頁：{英文概念}.md                   例：least-agency.md
wiki/risks/          風險頁：asi{兩位數}-{官方英文名}.md     例：asi06-memory-and-context-poisoning.md
templates/           新增頁面用的模板（不算 Wiki 頁）
tools/wiki.mjs       lint + 產生 graph + 抽簡報資料
graph/               自動產生（graph.json、wiki-data.js），不要手改
docs/workflow.md     loop / graph 設計與反思
images/              之後若有圖片，集中放這裡（目前沒有）
.github/workflows/   CI/CD
```

命名規則（lint 會檢查）：

- 檔名一律**小寫英文 + 數字 + 連字號**（kebab-case），不用空白、中文、底線。
- wikilink 用檔名不含副檔名：`[[least-agency]]`。
- 風險頁檔名的編號要和 frontmatter `asi:` 一致；英文名取自官方名稱，`&` 寫成 `and`。
- 來源編號 `S1, S2…` 依 ingest 順序遞增，不重用。

## 新增內容的步驟

**A. 新增一篇來源（ingest）**
1. 複製 `templates/source.md` → `raw/S{下一個編號}-{簡稱}.md`，填 frontmatter 與改寫重點。
2. **來源驗證**：名稱、數字、對照表都要在官方原文找到出處；PDF 用 `pdftotext -layout` 抽文字再讀。二手來源只能交叉比對。
3. 更新受影響的 wiki 頁，在 frontmatter `sources:` 加上新編號。
4. 在 `wiki/index.md` 的來源表登記；在 `wiki/log.md` 追加一筆。

**B. 新增一個概念頁或風險頁**
1. 複製 `templates/concept.md` 或 `templates/risk.md` 到對應資料夾，照命名規則取檔名。
2. 照固定段落填寫，每個關鍵句後標來源 `(S1)`；至少 `[[連結]]` 到 1 個既有頁，也讓至少 1 個既有頁連回來。
3. 在 `wiki/index.md` 對應區塊登記；在 `wiki/log.md` 追加一筆。

**C. 新增一張投影片**
1. 先確認內容在 Wiki 裡有；沒有就先走 A 或 B。
2. 照「頁面結構」的固定寫法加 `<section>`，`data-wiki` 填引用的頁；互動程式寫進 `app.js`。

**最後一律**：執行 `node tools/wiki.mjs`，0 錯誤才 commit；push 後 GitHub Actions 會再跑一次 lint 與自我測試，通過才部署。

## AI 修改規則

**不可以**
- 手改 `graph/`（它是 `tools/wiki.mjs` 產生的）。
- 刪除或改寫 `raw/` 的內容——發現錯誤只能在檔尾加 `勘誤` 段。
- 刪舊的 Wiki 頁或改檔名（會造成斷鏈）；要淘汰就在頁首註明並改連結。
- 改 OWASP 官方英文名稱，或用記憶補 Wiki 沒有的事實。
- 為了讓 lint 通過而放寬 `tools/wiki.mjs` 的規則——要修的是頁面。
- 改動與這次任務無關的頁面或樣式。

**完成前的檢查清單**
- [ ] `node tools/wiki.mjs` 顯示 `✓ lint 全部通過`
- [ ] 新頁已登記在 `wiki/index.md`，`wiki/log.md` 有追加紀錄
- [ ] 新頁每個事實都有 `(Sx)` 來源標註
- [ ] 改到簡報時，用 http server 實際開過改到的投影片，console 無錯誤
- [ ] 沒有手改 `graph/`、沒有刪 `raw/`

lint 會自動檢查：斷掉的 wikilink、孤兒頁、未登記到 index、缺 `sources`、來源不存在、檔名與位置、ASI 官方名稱、固定段落抽不抽得到、投影片是否都有 `data-wiki` 且指向存在的頁。
