---
title: ASI06 Memory & Context Poisoning（記憶與上下文污染）
type: risk
asi: ASI06
official_name: Memory & Context Poisoning
sources: [S1, S3, S2]
tags: [記憶]
---
# ASI06 — Memory & Context Poisoning（記憶與上下文污染）

**新手一句話**：攻擊者把假資訊塞進 AI 的長期記憶或知識庫，之後 AI 每次做決定都會被這些假資訊影響。(S1)

**生活比喻**：有人偷偷改了你的通訊錄，把「銀行」的電話換成詐騙集團的號碼——之後你每次打都打錯。

## 怎麼發生（S1）
- 「記憶與上下文」包含：對話摘要、記憶工具、embedding、RAG 資料庫（不含一次性的 prompt，那是 LLM01）。
- 寫入來源（上傳檔、API、使用者輸入、其他 agent）可能不可信，污染會**跨 session 持續存在**。
- 和 [[asi01-agent-goal-hijack]] 不同：ASI06 是「持續性地」污染儲存的內容。

## 官方情境（S1）
- **旅遊訂票記憶污染**：攻擊者不斷強化一個假票價，助理把它存成事實，之後照這個價格核准訂票、跳過付款檢查。

## 怎麼防（S1, S3）
1. 寫入記憶前先掃描（規則 + AI）惡意或敏感內容。
2. 依使用者 / session / 領域分隔記憶。
3. 只收已驗證的來源；依敏感度縮短保留時間（TTL）。
4. 保留來源出處（provenance），偵測可疑的更新。
5. 長期記憶做完整性檢查（checksum）。(S3)

## 對照
- LLM Top 10：LLM01、LLM04、LLM08　｜　T 威脅：T1（主）、T4、T6、T12

## 相關
- [[asi08-cascading-failures]]（被污染的記憶會往下游擴散）
- [[asi03-identity-and-privilege-abuse]]（記憶裡的憑證）
