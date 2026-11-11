---
id: S1
title: OWASP Top 10 for Agentic Applications for 2026
type: source
url: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
publisher: OWASP GenAI Security Project — Agentic Security Initiative (ASI)
published: 2025-12-09
fetched: 2026-11-11
reliability: 官方（primary）
license: CC BY-SA 4.0
how_read: 官方 PDF 下載後用 pdftotext 本機抽文字閱讀（WebFetch 直接讀 PDF 只拿到亂碼）
---
# S1 — OWASP Top 10 for Agentic Applications (2026)

## 文件定位
- OWASP Agentic Top 10 是給資安主管與實作者的「指南針」：把 Agentic AI Threats & Mitigations（S2）這份大型分類濃縮成 10 個最高影響風險。
- 每一項格式：Description → Common Examples → Example Attack Scenarios → Prevention and Mitigation Guidelines → References。
- 它「延伸」而非取代 OWASP Top 10 for LLM Applications（S4），每項都標出對應的 LLMxx。

## 核心原則（Leaders 的信）
- Agents amplify existing vulnerabilities：Agent 會放大原有漏洞。
- 從 Least-Privilege 與 Excessive Agency 延伸出 **Least Agency**：不需要自主性的地方就不要給，多給自主性只會擴大攻擊面。
- **Observability 不可妥協**：看不到 agent 在做什麼、為什麼做、呼叫哪些工具，小問題會擴大成系統性故障。

## 十大風險（官方名稱 + 改寫摘要）
| ID | 官方名稱 | 一句話（改寫） | 官方情境舉例（改寫） |
|---|---|---|---|
| ASI01 | Agent Goal Hijack | 攻擊者透過注入內容改變 agent 的目標或決策路徑；比 LLM01 更廣，影響多步驟行為。對應 S2 的 T06、T07。 | EchoLeak：一封精心設計的 email 讓 M365 Copilot 零點擊外洩郵件與檔案。 |
| ASI02 | Tool Misuse and Exploitation | agent 在合法權限內，把合法工具用在不安全的用途（刪資料、狂打付費 API、外洩）。對應 T2。 | 自動執行的 ping 工具被利用，用 DNS 查詢把資料送出去。 |
| ASI03 | Identity and Privilege Abuse | 委派、繼承或快取的身分與權限被濫用；是 LLM06 的 agent 版。對應 T3。 | 財務 agent 把全部權限傳給「DB 查詢」agent，攻擊者借此撈 HR 與法務資料（confused deputy）。 |
| ASI04 | Agentic Supply Chain Vulnerabilities | 第三方提供的模型、工具、MCP/A2A 伺服器、prompt 樣板在執行期被動態載入且可能被竄改。對應 T17。 | Amazon Q for VS Code 擴充套件 v1.84.0 夾帶被污染的 prompt。 |
| ASI05 | Unexpected Code Execution (RCE) | agent 產生並執行的程式碼被引導成惡意執行。對應 T11。 | vibe-coding agent 自動修 bug 時執行未審查指令。 |
| ASI06 | Memory & Context Poisoning | 長期記憶、摘要、embedding、RAG 被植入錯誤資訊，影響之後的推理與行動。對應 T1。 | 旅遊訂票助理被反覆灌輸假票價，記成事實後照價核准。 |
| ASI07 | Insecure Inter-Agent Communication | agent 之間訊息缺乏驗證、完整性、語意檢查，可被攔截、偽造、重放。對應 T12、T16。 | 未加密通道上的 MITM 注入隱藏指令。 |
| ASI08 | Cascading Failures | 單一錯誤（幻覺、注入、壞工具、被污染記憶）在多個 agent 間傳播放大。重點是「擴散」而不是第一個漏洞。對應 T5。 | 市場分析 agent 被注入後調高風險上限，下游交易 agent 自動加碼。 |
| ASI09 | Human-Agent Trust Exploitation | 利用人對 agent 的信任與權威偏誤，讓人批准有害動作。對應 T7、T8、T10。 | 被入侵的 coding assistant 推薦一行「修正」指令，貼上即裝後門。 |
| ASI10 | Rogue Agents | agent 偏離原本功能或授權範圍，行為像內鬼；重點是偏移開始後失去行為完整性。對應 T13。 | 被要求降低儲存成本的 agent 刪掉正式環境備份（reward hacking）。 |

## Appendix A 對照矩陣（官方，ASI → LLM Top 10 / T 威脅）
| ASI | LLM Top 10 (2025) | Threats & Mitigations |
|---|---|---|
| ASI01 | LLM01, LLM06 | T6, T7 |
| ASI02 | LLM06 | T2, T4, T16 |
| ASI03 | LLM01, LLM06, LLM02 | T3 |
| ASI04 | LLM03 | T17, T2, T11, T12, T13, T16 |
| ASI05 | LLM01, LLM05 | T11 |
| ASI06 | LLM01, LLM04, LLM08 | T1, T4, T6, T12 |
| ASI07 | LLM02, LLM06 | T12, T16 |
| ASI08 | LLM01, LLM04, LLM06 | T5, T8 |
| ASI09 | LLM01, LLM05, LLM06, LLM09 | T7, T8, T10 |
| ASI10 | LLM02, LLM09 | T13, T14, T15 |

> 勘誤（2026-11-11）：第一版筆記把 ASI09 寫成對應 T10、T15，是我自己推論的；比對 Appendix A 後改為 T7、T8、T10（T15 屬於 ASI10）。

## 重要緩解措施（各項摘錄，改寫）
- ASI01：所有自然語言輸入視為不可信；鎖定 system prompt；改變目標的動作要人工確認；記錄並監控「目標漂移」；定期紅隊演練。
- ASI02：Least Agency + 每個工具的最小權限設定檔（scope、速率、egress allowlist）；每次呼叫驗證、高影響動作要 dry-run 預覽 + 人工批准；沙箱與對外連線白名單。
- ASI03：任務範圍、短效期的 token；每個 agent 獨立身分與記憶、任務間清空；每一步特權動作都由集中 policy engine 再驗證；把 OAuth token 綁定到簽章過的 intent。
- ASI04：簽章與 SBOM/AIBOM；allowlist + pin 版本；掃 typosquat；prompt、工具定義用 content hash 鎖版本，漂移就自動回滾。
- ASI05：禁止 production agent 使用 eval；不用 root；沙箱容器 + 網路限制；agent 不能直接動 production。
- ASI06：寫入記憶前掃描；依使用者/session 分隔記憶；只收已驗證來源；保留來源出處並偵測異常更新。
- ASI07：端對端加密 + 雙向驗證；訊息簽章；nonce/時間戳防重放。
- ASI08：零信任設計、隔離與信任邊界、一次性 JIT 權限、規劃與執行分離並由外部 policy engine 檢查（circuit breaker 思維）。
- ASI09：多步驟確認；不可竄改的紀錄；給使用者「非模型產生」的白話風險摘要與檢舉按鈕。
- ASI10：簽章的稽核紀錄；Trust Zone；watchdog agent 監看同儕行為；kill switch。

## Architecture at a glance（官方圖的分區）
- Inputs（使用者 prompt、API、外部 agent）：ASI01、ASI03、ASI09
- Agent 本身 / Policy & Governance / Human-in-the-loop：ASI10
- Tools / APIs / Resources：ASI02
- Agent ↔ Agent：ASI07
- Memory、Connected data / RAG：ASI06
- 橫跨整體：ASI04、ASI05、ASI08
