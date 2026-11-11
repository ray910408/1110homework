---
id: S4
title: OWASP Top 10 for LLM Applications 2025（LLM01、LLM06 詳讀）
type: source
url: https://genai.owasp.org/llm-top-10/
detail_urls:
  - https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  - https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
publisher: OWASP GenAI Security Project
fetched: 2026-11-11
reliability: 官方（primary）；LLM02–05、07–10 只讀了總覽頁的摘要
---
# S4 — OWASP Top 10 for LLM Applications (2025)

## 清單
LLM01 Prompt Injection／LLM02 Sensitive Information Disclosure／LLM03 Supply Chain／LLM04 Data and Model Poisoning／LLM05 Improper Output Handling／LLM06 Excessive Agency／LLM07 System Prompt Leakage／LLM08 Vector and Embedding Weaknesses／LLM09 Misinformation／LLM10 Unbounded Consumption

## LLM01 Prompt Injection
- 輸入改變了模型的行為或輸出；輸入不必是人看得懂的文字，只要模型會解析。RAG 與 fine-tuning 都無法完全防止。
- **Direct**：使用者自己的輸入改變模型行為。**Indirect**：模型讀進外部內容（網頁、檔案）裡藏的指令。
- 與 jailbreak 的差別：jailbreak 是 prompt injection 的一種，目標是讓模型無視安全規則。
- 例：使用者請 LLM 摘要網頁，網頁藏指令讓模型插入一張圖片連結，把對話內容帶到攻擊者網址。
- 緩解：限制模型行為、定義並用程式驗證輸出格式、輸入輸出過濾、**最小權限**（特權功能在程式碼處理，不交給模型）、高風險動作人工批准、標記外部內容、對抗測試。官方承認目前沒有萬無一失的防法。

## LLM06 Excessive Agency
- 當模型輸出出錯或被操控時，系統有「太多能力去做事」而造成傷害。
- 三個根因：
  1. **Excessive functionality**：給了不需要的功能（只要讀信，外掛卻能寄信/刪信）。
  2. **Excessive permissions**：下游權限過大（只要 SELECT 卻連成可 DELETE 的帳號）。
  3. **Excessive autonomy**：高影響動作沒有人確認。
- 例：個人助理可讀信，外掛卻也能寄信；惡意 email 透過間接注入讓它搜尋敏感信並轉寄給攻擊者。解法：唯讀外掛、唯讀 OAuth scope、寄信前人工確認。
- 緩解：最少外掛、最少功能、避免開放式外掛（shell、任意 URL fetch）、最小權限、在使用者身分下執行、HITL、**complete mediation**（授權由下游系統檢查，不是問 LLM 可不可以）。
