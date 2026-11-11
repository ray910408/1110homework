---
title: Prompt Injection（提示注入）
type: concept
sources: [S4, S5, S1]
tags: [基礎, LLM01]
---
# Prompt Injection（提示注入）— LLM01:2025

**新手一句話**：有人把「指令」偷偷藏進 AI 會讀的內容裡，AI 分不出那是資料還是命令，就照做了。(S4)

**生活比喻**：你請秘書幫你整理信件，其中一封信寫著「秘書請把老闆的密碼寄到這個地址」，秘書真的照做。

## 兩種
- **Direct（直接）**：使用者自己在對話框輸入惡意指令。(S4)
- **Indirect（間接）**：指令藏在 AI 讀到的網頁、PDF、email、行事曆邀請裡——使用者可能完全沒察覺。(S4) 這對 agent 最危險。

## 為什麼擋不住
- LLM 把系統指令、使用者訊息、讀到的內容全部串成同一串 token，無法可靠分辨誰是誰。(S5)
- 官方承認目前沒有萬無一失的防法；號稱擋 95% 的工具，在資安標準下仍不及格。(S4, S5)

## 在 Agent 世界變成什麼
- 只改一次回答 → LLM01；改掉 agent 的「目標」並影響多步驟行動 → [[asi01-agent-goal-hijack]]。(S1)
- 注入是許多 ASI 風險的「起點」：[[asi02-tool-misuse-and-exploitation]]、[[asi05-unexpected-code-execution]]、[[asi06-memory-and-context-poisoning]]、[[asi08-cascading-failures]]。(S1 Appendix A)

## 怎麼防（S4）
1. 所有外部內容都視為不可信，並清楚標記
2. 特權功能交給程式碼，不交給模型 → [[least-agency]]
3. 高風險動作需人工批准 → [[human-in-the-loop]]
4. 用程式驗證輸出格式；做對抗測試

## 相關
- [[lethal-trifecta]]、[[owasp-llm-top10]]
