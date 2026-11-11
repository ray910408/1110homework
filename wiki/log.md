---
title: 操作紀錄（log）
type: meta
sources: [S1, S2, S6]
tags: [process]
---
# Log

格式：`## [日期] 操作 | 對象`，只往下追加。

## [2026-11-11] discuss | 範圍與架構
- 完成 [[discussion]]：主題鎖定 OWASP Agentic Top 10，聽眾為新手，官方來源優先。

## [2026-11-11] ingest | S1–S6
- 用 5 個 web-fetch 子代理平行抓 S1–S5，再加 S6 交叉比對。
- ❌ **問題 1：官方 PDF 讀不到**。WebFetch 對 S1、S2 的 PDF 只回傳壓縮亂碼，子代理回報「找不到 T1–T15 清單、找不到緩解措施」。
  - 修正：改用本機 `pdftotext -layout` 抽官方 PDF 文字再讀，S1/S2 的名稱、緩解、Appendix A 對照都從原文取得。
- ❌ **問題 2：版本衝突**。二手來源說 Threats & Mitigations 有「15 項」或「17 項」。
  - 查證：v1.0（2025-02）是 T1–T15，v1.1（2025-12）是 T1–T17。以 S2 PDF 為準，寫進 [[owasp-agentic-threats-taxonomy]]。
- ❌ **問題 3：我自己推論的對照表錯了**。第一版 raw 筆記依名稱「猜」T 威脅對應哪個 ASI：17 列中 5 列配錯（T7、T8、T9、T14、T15）、7 列漏列（例如把 T15 Human Manipulation 配給 ASI09）。
  - 查證：S1 Appendix A 寫的是 ASI09 ↔ T7、T8、T10；T15 屬於 ASI10。已在 S1、S2 raw 筆記加勘誤，所有 wiki 對照表改用官方矩陣。
  - **流程修正**：在 ingest 之後、寫 wiki 之前加入「來源驗證」步驟——任何對照或數字都要在官方原文找到出處才可寫入。
- S6（Giskard）沒有緩解措施 → 緩解內容全部只採 S1。

## [2026-11-11] write | wiki 19 頁
- 概念頁 9、風險頁 10，加上 index / log / discussion。

## [2026-11-11] lint | 第一次執行 tools/wiki.mjs
- ❌ 4 個風險頁（ASI03、06、08、10）的「官方情境」寫成段落而非條列，簡報資料抽不到。
  - 修正：改頁面符合 AGENTS.md 格式，**不放寬 parser**——Wiki 是唯一事實來源，格式統一才能自動產生簡報。
- ✓ 修正後：22 頁、6 來源、28 節點、178 條邊，0 錯誤。

## [2026-11-11] generate | index.html（18 張投影片）
- 風險卡、測驗、LLM 對照矩陣、知識圖譜全部讀 `graph/wiki-data.js`（由 Wiki 抽出），不手抄。

## [2026-11-11] check | 簡報檢查
- ❌ **檢查本身有 bug**：用「變異測試」故意把 ASI03 寫成「Identity Theft」，lint 竟然通過——名稱比對只看第一個單字。收緊為「必須是官方名稱的前綴」後，變異測試正確報錯。
- ❌ 瀏覽器實測：直接改網址 `#5` 不會換頁（缺 `hashchange` 監聽）→ 已修。
- ❌ 瀏覽器實測：workflow 圖上排的 loop 曲線超出 SVG 上緣、標籤看不到 → 節點整體下移 40px。
- ❌ 用 `file://` 開啟時，預覽工具以快照載入、讀不到 `graph/wiki-data.js` → 改用本機 http server 檢查；README 註明兩種開法。
- ✓ 18 張逐一開過，互動元件（元件圖、注入示範、三要素開關、風險卡 modal、架構地圖、測驗、矩陣、知識圖譜、workflow 圖）皆可操作，console 無錯誤。

## [2026-11-11] schema | AGENTS.md 改版
- AGENTS.md 改成六段：專案目的、網頁風格、頁面結構、檔案與命名、新增內容的步驟、AI 修改規則（含完成前檢查清單）。
- 新增 `templates/`（risk / concept / source）：新增頁面一律「複製模板 → 照固定段落寫 → 登記到 index」。
- 簡報拆成 `index.html` + `style.css` + `app.js`，顏色集中在 `:root` 變數。
- lint 新增：檔名 kebab-case、頁面放對資料夾、風險頁檔名與 `asi` 一致、來源檔名格式、**每頁都要登記在 index**。
  - 變異測試：放一個大寫檔名、放錯資料夾、沒登記的假頁面，lint 報出 6 個錯誤；刪除後恢復 0 錯誤。
