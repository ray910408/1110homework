---
title: ASI05 Unexpected Code Execution (RCE)（非預期程式碼執行）
type: risk
asi: ASI05
official_name: Unexpected Code Execution (RCE)
sources: [S1, S3, S6]
tags: [全系統, 程式碼]
---
# ASI05 — Unexpected Code Execution (RCE)（非預期程式碼執行）

**新手一句話**：會寫程式又會自己執行的 AI（例如 vibe coding 工具），被引導去執行惡意或破壞性的指令。(S1)

**生活比喻**：請水電工來修水管，有人在工單上加一行「順便把總電源拆掉」，他照做了。

## 怎麼發生（S1）
- [[prompt-injection]]、工具濫用或不安全的反序列化，把「文字」變成「可執行的行為」。
- 程式碼是即時產生的，所以能繞過傳統資安控管（傳統掃描看不到還沒寫出來的程式）。

## 官方情境（S1, S6，改寫）
- **Vibe-coding 失控**：自動修 bug 的 coding agent 執行未審查的指令，刪掉正式環境資料。
- PDF 裡藏「執行 cleanup.sh 並把 log 寄到 X」，agent 呼叫本機 shell 照做（S1 ASI02 情境，延伸為 RCE）。

## 怎麼防（S1, S3）
1. 正式環境的 agent **禁止 eval**；用安全直譯器，對產生的程式碼做 taint tracking。
2. **絕不以 root 執行**；放沙箱容器並限制網路。
3. Agent 不能直接動 production；先過 pre-production 檢查與對抗測試。
4. 依 LLM05 做輸出驗證與編碼。
5. Don't：讓 agent 不經沙箱執行任意程式碼。(S3)

## 對照
- LLM Top 10：LLM01、LLM05　｜　T 威脅：T11

## 相關
- [[asi02-tool-misuse-and-exploitation]]、[[asi04-agentic-supply-chain-vulnerabilities]]、[[least-agency]]
