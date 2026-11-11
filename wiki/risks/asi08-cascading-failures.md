---
title: ASI08 Cascading Failures（連鎖失效）
type: risk
asi: ASI08
official_name: Cascading Failures
sources: [S1, S3, S2]
tags: [全系統, 多 agent]
---
# ASI08 — Cascading Failures（連鎖失效）

**新手一句話**：一個 agent 出錯（幻覺、被注入、記憶被污染），錯誤沿著 agent 鏈傳下去並越放越大，最後整個系統出事。(S1)

**生活比喻**：骨牌效應——第一張倒下不可怕，可怕的是後面沒有任何東西擋住。

## 重點（S1）
ASI08 描述的是錯誤的**傳播與放大**，不是第一個漏洞本身。Agent 會自主規劃、保存狀態、委派工作，一個錯誤能繞過人工檢查並留在狀態裡。

## 官方情境（S1）
- **金融交易連鎖**：[[prompt-injection]] 污染了「市場分析 agent」，它調高風險上限；下游「部位」與「執行」agent 照著自動下更大的單，而合規系統看到的都是「參數內」的活動。

## 怎麼防（S1, S3）
1. 零信任設計：假設 LLM、agent 元件、外部來源都可能失效。
2. 隔離與信任邊界：沙箱、網路分段、範圍化 API、雙向驗證。
3. 一次性、任務範圍的 JIT 權限；每個高影響工具呼叫都用 policy-as-code 檢查。
4. **規劃與執行分離**，由外部 policy engine 把關。
5. Circuit breaker（斷路器）：異常時自動切斷。(S3)

## 對照
- LLM Top 10：LLM01、LLM04、LLM06　｜　T 威脅：T5、T8

## 相關
- [[asi06-memory-and-context-poisoning]]、[[asi07-insecure-inter-agent-communication]]、[[least-agency]]
