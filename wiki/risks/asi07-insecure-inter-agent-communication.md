---
title: ASI07 Insecure Inter-Agent Communication（不安全的 Agent 間通訊）
type: risk
asi: ASI07
official_name: Insecure Inter-Agent Communication
sources: [S1, S3, S6]
tags: [多 agent]
---
# ASI07 — Insecure Inter-Agent Communication（不安全的 Agent 間通訊）

**新手一句話**：多個 AI agent 互相傳訊息合作時，如果訊息沒加密、沒驗證，攻擊者就能偷聽、竄改、冒充或重放。(S1)

**生活比喻**：兩個部門用沒封口的明信片傳公文，路上誰都能看、能改，還能假冒寄件人。

## 怎麼發生（S1）
- 多 agent 系統透過 API、message bus、共享記憶溝通，去中心化、自主程度不一、信任不均，傳統「邊界防禦」失效。
- 缺乏：身分驗證、完整性、機密性、授權、**語意驗證**（訊息裡夾帶的自然語言指令）。

## 官方情境（S1, S6，改寫）
- **未加密通道的語意注入**：MITM 攻擊者在 HTTP 通道注入隱藏指令，agent 輸出被偏向卻看起來正常。
- **協定降級**：強迫改走未加密 HTTP，再插入指令。

## 怎麼防（S1, S3）
1. 端對端加密 + 每個 agent 獨立憑證 + 雙向驗證（mTLS）。
2. 訊息簽章、雜湊 payload 與上下文；檢查被竄改或隱藏的自然語言指令。
3. 防重放：nonce、session ID、時間戳。
4. **簽章 ≠ 授權**：接收方仍要檢查發送者有沒有權限要求這件事。(S3)

## 對照
- LLM Top 10：LLM02、LLM06　｜　T 威脅：T12、T16

## 相關
- [[asi08-cascading-failures]]、[[asi03-identity-and-privilege-abuse]]、[[asi04-agentic-supply-chain-vulnerabilities]]
