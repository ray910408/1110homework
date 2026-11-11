---
title: Human-in-the-Loop（人工把關）
type: concept
sources: [S3, S1, S4]
tags: [防禦]
---
# Human-in-the-Loop（HITL，人工把關）

**新手一句話**：危險或無法復原的動作，AI 只能「提議」，要人按下確認才執行。(S3)

**生活比喻**：實習生可以幫你填好匯款單，但要你簽名才能送出。

## 做對的 HITL（S3）
- 依風險分級：low / medium / high / critical，只有 low 可以自動執行；**沒分類的工具預設要審查**。
- 先給預覽（dry-run、diff），再批准。(S1 ASI02)
- 批准要綁定：誰、哪個工具、哪個目標、什麼參數、何時到期；參數一改就要重新批准。
- 關鍵動作（轉帳、改權限、大量刪除、正式環境部署）要 step-up 驗證。

## HITL 本身也會被攻擊
- [[asi09-human-agent-trust-exploitation]]：人太相信 AI，看都不看就按同意。
- 官方 T10「Overwhelming Human in the Loop」：用大量審核請求讓人疲勞而亂按。(S2)
- 對策：給「不是模型產生的」白話風險摘要、可檢舉可疑互動。(S1)

## 相關
- [[least-agency]]、[[excessive-agency]]、[[asi03-identity-and-privilege-abuse]]
