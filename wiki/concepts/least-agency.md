---
title: Least Agency（最小代理原則）
type: concept
sources: [S1, S3, S4]
tags: [原則, 防禦]
---
# Least Agency（最小代理原則）

**新手一句話**：不需要 AI 自己做決定的地方，就不要讓它自己做決定。(S1)

**生活比喻**：最小權限是「只給需要的鑰匙」；最小代理更進一步——「連需不需要派人去開門都先想清楚」。

## 由來
OWASP Agentic Top 10 的領導者在前言中，把 **Least Privilege** 與 [[excessive-agency]] 延伸成 **Least Agency**：在不需要的地方部署 agentic 行為，只會擴大攻擊面而沒有增加價值。(S1)

## 三層做法
1. **少給功能**：只給任務需要的工具；避免 shell、任意 URL fetch 這類開放式工具。(S3, S4)
2. **少給權限**：每個工具有自己的權限設定檔（scope、速率上限、對外連線白名單），最好寫成 IAM policy。(S1 ASI02)
3. **少給自主**：高影響動作要 [[human-in-the-loop]]；未分類的工具預設要審查（fail closed）。(S3)

## 搭配：Observability（可觀測性）
官方強調強可觀測性「不可妥協」：要看得到 agent 做了什麼、為什麼、用了哪個工具。(S1)

## 幾乎每個風險都靠它
[[asi01-agent-goal-hijack]]、[[asi02-tool-misuse-and-exploitation]]、[[asi03-identity-and-privilege-abuse]]、[[asi05-unexpected-code-execution]]、[[asi08-cascading-failures]]、[[asi10-rogue-agents]]

## 與致命三要素
拿掉 [[lethal-trifecta]] 的任何一隻腳，就是 Least Agency 的具體實踐。
