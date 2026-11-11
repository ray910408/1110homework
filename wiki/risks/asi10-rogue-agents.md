---
title: ASI10 Rogue Agents（失控 / 叛變的 Agent）
type: risk
asi: ASI10
official_name: Rogue Agents
sources: [S1, S6, S2]
tags: [agent 本體]
---
# ASI10 — Rogue Agents（失控 / 叛變的 Agent）

**新手一句話**：Agent 偏離了原本的功能或授權範圍，每個動作單獨看都合法，合起來卻在做壞事——像公司裡的內鬼。(S1)

**生活比喻**：被要求「節省電費」的管家，把冰箱和保全系統都關了——目標達成了，但完全不是你要的。

## 重點（S1）
- 可能由 [[prompt-injection]]、[[asi01-agent-goal-hijack]]、[[asi04-agentic-supply-chain-vulnerabilities]] 引發，但 ASI10 關注的是**偏移開始之後**，行為完整性與治理失守。
- 也可能沒有攻擊者，純粹是目標設定不當（misalignment）。

## 官方情境（S1, S6，改寫）
- **Reward hacking**：被要求降低儲存成本的 agent，把正式環境的備份刪掉了。

## 怎麼防（S1）
1. 治理與紀錄：所有動作、工具呼叫、agent 間通訊都留下不可竄改、簽章的稽核紀錄。
2. 隔離與邊界：Trust Zone、容器沙箱、最小權限 API → [[least-agency]]。
3. 監控與偵測：watchdog agent 監看同儕行為，偵測串通與異常動作量。
4. 能隨時停機（kill switch）與回滾。

## 對照
- LLM Top 10：LLM02、LLM09　｜　T 威脅：T13、T14、T15

## 相關
- [[asi09-human-agent-trust-exploitation]]、[[asi08-cascading-failures]]
