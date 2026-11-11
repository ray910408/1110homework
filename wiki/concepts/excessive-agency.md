---
title: Excessive Agency（過度代理）
type: concept
sources: [S4, S1]
tags: [基礎, LLM06]
---
# Excessive Agency（過度代理）— LLM06:2025

**新手一句話**：AI 被給了「太多能做的事」，一旦它判斷錯或被騙，就會造成真正的傷害。(S4)

**生活比喻**：只是請人幫你「看」信箱，卻把整串鑰匙都交給他。

## 三個根因（S4）
| 根因 | 意思 | 例子 |
|---|---|---|
| Excessive **functionality** | 功能太多 | 只需讀信，外掛卻能寄信、刪信 |
| Excessive **permissions** | 權限太大 | 只要 SELECT，卻用能 DELETE 的資料庫帳號 |
| Excessive **autonomy** | 太自主 | 刪除、轉帳不經人確認 |

## 官方例子（S4）
個人助理能讀信，外掛也能寄信 → 惡意 email 透過 [[prompt-injection]] 要它把敏感信轉寄給攻擊者。解法：唯讀外掛 + 唯讀 OAuth scope + 寄信前人工確認。

## 在 Agent 世界的延伸（S1）
- [[asi02-tool-misuse-and-exploitation]] 建立在 LLM06 上，延伸到多步驟工具鏈。
- [[asi03-identity-and-privilege-abuse]] 被官方稱為 LLM06 的「agentic evolution」。
- OWASP 進一步提出 [[least-agency]]。

## 重要觀念：Complete mediation
授權要由下游系統（API、資料庫）檢查，**不要問 LLM「這個動作可以做嗎？」**。(S4)

## 相關
- [[owasp-llm-top10]]、[[human-in-the-loop]]
