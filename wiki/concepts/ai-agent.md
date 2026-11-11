---
title: AI Agent（AI 代理人）是什麼
type: concept
sources: [S3, S1]
tags: [基礎]
---
# AI Agent（AI 代理人）

**新手一句話**：聊天機器人只會「說」，AI Agent 會「做」——它用 LLM 當大腦，自己規劃步驟、呼叫工具、記住東西，替你完成任務。(S3)

**生活比喻**：ChatGPT 像一位只能回答問題的顧問；Agent 像一位拿到你公司鑰匙、信用卡和 email 帳號的實習生。

## 五個組成（S3）
| 元件 | 做什麼 | 主要風險 |
|---|---|---|
| LLM（大腦） | 推理、規劃 | [[asi01-agent-goal-hijack]]、[[asi10-rogue-agents]] |
| Tools（手腳） | 呼叫 API、執行程式、寄信 | [[asi02-tool-misuse-and-exploitation]]、[[asi05-unexpected-code-execution]] |
| Memory（記憶） | 長期記憶、RAG | [[asi06-memory-and-context-poisoning]] |
| Identity（身分與權限） | 用誰的帳號做事 | [[asi03-identity-and-privilege-abuse]] |
| 其他 agent / 人 | 多 agent 協作、人工審核 | [[asi07-insecure-inter-agent-communication]]、[[asi08-cascading-failures]]、[[asi09-human-agent-trust-exploitation]] |

另外，Agent 用到的模型、工具、MCP server 多半來自第三方 → [[asi04-agentic-supply-chain-vulnerabilities]]。

## 為什麼 Agent 比 LLM 更危險
- 官方說法：**Agents amplify existing vulnerabilities**——原本 LLM 只會講錯話，agent 會把錯話「執行」出來。(S1)
- 所以 OWASP 另外為 agent 寫了一份 Top 10 → [[owasp-agentic-top10]]。

## 相關
- [[prompt-injection]]、[[excessive-agency]]、[[least-agency]]、[[lethal-trifecta]]
