---
title: Lethal Trifecta（致命三要素）
type: concept
sources: [S5]
tags: [心智模型, 防禦]
---
# Lethal Trifecta（致命三要素）

**新手一句話**：只要一個 AI agent 同時「能看你的私密資料」、「會讀陌生人寫的內容」、「能把東西送出去」，它就很容易被騙去偷你的資料。(S5)

**生活比喻**：一個人同時有你家鑰匙、會聽任何陌生人的話、又能自由寄包裹——小偷只要寫張紙條就夠了。

## 三隻腳（S5）
| 腳 | 例子 | 攻擊中的角色 |
|---|---|---|
| 🔒 Private data | 信箱、私有 repo、公司文件 | 要偷的東西 |
| ☠️ Untrusted content | 網頁、別人寄的 email、公開 issue | 攻擊者的指令 |
| 📤 External communication | 寄信、HTTP 請求、載入圖片、開 PR | 出口 |

## 攻擊流程
攻擊者藏指令 → agent 做正常任務時讀到 → 當成命令（[[prompt-injection]]）→ 用自己的工具讀私密資料 → 從出口送出。

真實案例：2025-05 GitHub MCP 漏洞，一個 MCP server 同時湊齊三隻腳。(S5)

## 防禦
- 作者建議：不要讓同一個 agent 同時擁有三要素。(S5)
- guardrail 只有機率性效果，不能當唯一防線。(S5)
- 拿掉一隻腳 = [[least-agency]]；對外連線白名單（egress allowlist）是最常見的「拿掉出口」。(S1)

## 對應 OWASP
- [[asi01-agent-goal-hijack]]（EchoLeak 就是三要素齊全）
- [[asi02-tool-misuse-and-exploitation]]（用合法工具當出口）
- [[asi04-agentic-supply-chain-vulnerabilities]]（MCP 讓人不知不覺湊齊三要素）
