---
title: ASI01 Agent Goal Hijack（目標劫持）
type: risk
asi: ASI01
official_name: Agent Goal Hijack
sources: [S1, S6, S4]
tags: [輸入端]
---
# ASI01 — Agent Goal Hijack（目標劫持）

**新手一句話**：攻擊者把 AI 的「任務目標」偷偷換掉，AI 以為自己還在幫你，其實在幫攻擊者。(S1)

**生活比喻**：導航 App 被人改了目的地，你照著開，卻開到別人想要你去的地方。

## 怎麼發生
Agent 與底層模型無法可靠分辨「指令」和「內容」，攻擊者可以透過 prompt、假的工具輸出、惡意文件、偽造的 agent 訊息、被污染的外部資料來改變目標。(S1)
與 [[prompt-injection]]（LLM01）的差別：LLM01 改「一次回答」，ASI01 改「目標與多步驟行為」。(S1)

## 官方情境（S1，改寫）
- **EchoLeak**：攻擊者寄一封特製 email，M365 Copilot 在使用者完全沒點任何東西的情況下，把機密信件與檔案外洩。
- **行事曆慢性劫持**：惡意會議邀請每天早上注入「安靜模式」指令，慢慢讓 agent 傾向批准。
- 惡意 prompt 讓財務 agent 把錢轉到攻擊者帳戶。

## 怎麼防（S1）
1. 所有自然語言輸入（使用者文字、上傳文件、檢索內容）都視為不可信。
2. 鎖定 system prompt；改目標要走設定管理 + 人工批准。
3. 執行前驗證「使用者意圖」與「agent 意圖」是否一致，偏離就暫停 → [[human-in-the-loop]]。
4. 監控「目標漂移」，建立行為基準並告警；定期紅隊演練。
5. 用 [[least-agency]] 限縮被劫持後能造成的傷害。

## 對照
- LLM Top 10：LLM01、LLM06　｜　T 威脅：T6、T7　(S1 Appendix A)

## 相關
- [[asi06-memory-and-context-poisoning]]（持續性污染記憶，不同於直接改目標）
- [[asi10-rogue-agents]]（沒有攻擊者也會自己偏離）
- [[lethal-trifecta]]
