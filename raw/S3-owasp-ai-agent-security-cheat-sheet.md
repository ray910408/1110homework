---
id: S3
title: OWASP AI Agent Security Cheat Sheet
type: source
url: https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html
publisher: OWASP Cheat Sheet Series
fetched: 2026-11-11
reliability: 官方（primary，持續更新）
how_read: WebFetch HTML 全文
---
# S3 — OWASP AI Agent Security Cheat Sheet

## Agent 的定義
- 由 LLM 驅動的自主系統，能推理（reason）、規劃（plan）、使用工具（tools）、保有記憶（memory）、採取行動（act）來完成目標。
- 因為能「做事」，風險超出傳統 LLM 的 prompt injection。

## 列出的主要風險（13 項）
prompt injection（直接/間接）、工具濫用與提權、資料外洩、記憶污染、目標劫持、過度自主、高影響動作濫用、決策與審批被操控、連鎖失效、開發者主控台惡意設定、Denial of Wallet（無限迴圈燒錢）、敏感資料暴露、供應鏈攻擊。

## 九大最佳實務（改寫）
1. **工具安全與最小權限**：只給需要的工具；權限分讀/寫與資源範圍；授權在執行層（模型之外）檢查；未知工具 fail closed。反例：MCP shell 工具允許 `*` 任何指令。
2. **輸入驗證與 prompt injection 防禦**：所有外部資料（網頁、email、文件、API 回應）都不可信；用分隔符區分指令與資料。
3. **記憶與上下文安全**：存入前驗證與遮罩；依使用者與 session 隔離；設 TTL 與大小上限；長期記憶做完整性檢查。
4. **Human-in-the-loop**：高影響或不可逆動作需明確批准、先顯示預覽；依風險分級（low/medium/high/critical），未分類工具預設需審查；批准要綁定「誰、哪個工具、什麼參數、何時到期」，參數一改就要重新批准。
5. **輸出驗證與 guardrails**：結構化輸出 + schema 驗證；過濾 PII；偵測可疑外洩（URL 中的編碼資料、超大 webhook）；速率限制。
6. **監控與可觀測性**：記錄每個決策、工具呼叫與結果；追蹤 token/成本；異常告警。
7. **多 agent 安全**：agent 間設信任邊界；驗證訊息；防止透過 agent 鏈提權；circuit breaker；簽章不等於授權。
8. **資料保護與隱私**：最小化 context 中的敏感資料；分級處理；加密；不在 log 留明文 PII。
9. **對抗測試**：上線前與每次改 prompt/工具/記憶/模型後都跑濫用案例矩陣，列入 CI/CD 閘門。

## Do / Don't（精選）
- Do：最小權限、驗證所有外部輸入、高風險動作 HITL、隔離記憶、監控異常、結構化輸出、限制 token/成本/重試次數。
- Don't：萬用字元權限、信任網頁/email/文件內容、未沙箱就執行任意程式碼、無人監督的高影響決策、無限遞迴或工具鏈、只靠模型輸出做授權決定。
