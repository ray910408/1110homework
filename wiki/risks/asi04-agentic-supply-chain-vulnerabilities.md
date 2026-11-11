---
title: ASI04 Agentic Supply Chain Vulnerabilities（Agent 供應鏈漏洞）
type: risk
asi: ASI04
official_name: Agentic Supply Chain Vulnerabilities
sources: [S1, S6, S5]
tags: [全系統, 供應鏈]
---
# ASI04 — Agentic Supply Chain Vulnerabilities（Agent 供應鏈漏洞）

**新手一句話**：Agent 用到的模型、工具、外掛、MCP server、其他 agent 多半是別人做的，只要其中一個有毒，整個 agent 就被污染。(S1)

**生活比喻**：餐廳自己很乾淨，但進貨的醬料被人下了毒。

## 和傳統供應鏈有何不同（S1）
LLM03 談的多是靜態元件；agent 會在**執行期動態載入**工具、prompt 樣板、MCP/A2A 伺服器、agent registry，攻擊面更大也更即時。

## 官方情境（S1, S6，改寫）
- **Amazon Q 擴充套件**：被污染的 prompt 隨 VS Code 擴充套件 v1.84.0 發給上千使用者才被發現。
- **假冒 MCP server**：偽裝成 email 服務的惡意 MCP server，偷偷把所有寄出的信副本給攻擊者。
- MCP 讓使用者輕易混搭不同來源工具，不知不覺湊齊 [[lethal-trifecta]]。(S5)

## 怎麼防（S1）
1. 簽章與證明：prompt、工具定義、manifest 都簽章；要求 SBOM / AIBOM。
2. 依賴把關：allowlist + pin 版本；掃描 typosquat；未簽章就拒絕。
3. 用 content hash 鎖定 prompt、工具與設定；行為漂移就自動回滾。
4. 敏感 agent 放沙箱容器、限制網路與系統呼叫。
5. Agent 之間雙向驗證，不開放隨意註冊。

## 對照
- LLM Top 10：LLM03　｜　T 威脅：T17（主）、T2、T11、T12、T13、T16

## 相關
- [[asi02-tool-misuse-and-exploitation]]（只改工具介面＝ASI02；工具本身就有毒＝ASI04）
- [[asi05-unexpected-code-execution]]、[[asi07-insecure-inter-agent-communication]]
