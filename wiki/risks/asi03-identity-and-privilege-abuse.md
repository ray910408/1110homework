---
title: ASI03 Identity and Privilege Abuse（身分與權限濫用）
type: risk
asi: ASI03
official_name: Identity and Privilege Abuse
sources: [S1, S6]
tags: [輸入端, 身分]
---
# ASI03 — Identity and Privilege Abuse（身分與權限濫用）

**新手一句話**：Agent 常常「借用」別人的身分和權限做事，這些借來、繼承、或快取的權限被攻擊者拿去用。(S1)

**生活比喻**：經理把自己的門禁卡整張借給實習生去拿一份文件，實習生被騙後拿著這張卡打開了所有機房。

## 怎麼發生（S1）
- **權限整包繼承**：高權限 agent 委派工作時，沒有縮小權限就整包傳下去。
- **記憶裡的憑證**：agent 為了方便把 token、金鑰快取在記憶裡，下一個使用者能騙它拿出來用。
- **Confused deputy（被混淆的代理人）**：低權限 agent 轉送一個看似合理的請求，高權限 agent 不檢查原始使用者意圖就執行。

官方稱它是 [[excessive-agency]]（LLM06）的「agentic 進化版」。

## 官方情境（S1）
- 財務 agent 委派給「DB 查詢」agent 時把全部權限一起傳，攻擊者操控查詢內容，借這份權限撈走 HR 與法務資料。

## 怎麼防（S1）
1. 任務範圍、短效期的權限（scoped token、mTLS 憑證）。
2. 每個 agent 獨立身分與記憶，任務之間清空狀態。
3. 每一步特權動作都由集中 policy engine 重新授權。
4. 提權或不可逆動作要 [[human-in-the-loop]]。
5. 把 OAuth token 綁定「簽章過的意圖」，意圖不符就拒絕。

## 對照
- LLM Top 10：LLM01、LLM06、LLM02　｜　T 威脅：T3（一對一）

## 相關
- [[asi02-tool-misuse-and-exploitation]]（在既有權限內濫用 vs 取得不該有的權限）
- [[least-agency]]、[[asi07-insecure-inter-agent-communication]]
