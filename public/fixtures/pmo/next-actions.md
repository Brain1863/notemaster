<!-- 本文件由 tools/sync-pmo-to-notemaster.py 自动从私有仓 personal-pmo/lists 同步，
     已过滤敏感信息。仅供个人助理读取待办，请勿在此编辑。 -->

---
title: 下一步行动清单
updated: 2026-08-22
---

# 下一步行动清单

> 具体、可执行、无歧义的物理动作。每条标注执行者：【Brian】或【Mason】。
> 按情境/精力分组，便于挑选。

## 2026-08-24（周一）Amazon Data Plan 核心确认

- [ ] **早上和 BI / Shen Hao 确认数据链路**：锁定数据接口与传输方式、联调时间线、数据量级；同步让 Hison 提前整理结果底表并重新评估量级与耗时【Brian】
- [ ] **确认 Amazon 底表在品牌剔除后是否仍满足 600 万+ 需求**：底表约 900 万+，目标需 600 万+，剔除部分品牌后需核对剩余量级；若已接近或不足 600 万， reconsider 是否还需继续加筛选条件【Brian】
- [ ] **早上和 DC 确认图搜首批交付条件**：确认是否能在 8 月 26 日凌晨跑出第一批、是否有可参考的 score 规则，以及每个 Amazon 返回 1,000 个 item / 双重 filter 的具体逻辑【Brian】
- [ ] **问 Leah 确认 item-level price 取值**：明确应该取哪个字段或价格口径；这不是 8 月 21 日事项，安排在 8 月 24 日处理【Brian】
- [ ] **和 Hison 对齐数据准备与传递**：确认 Amazon 底数复核、数据拉取、Hison → Shen Hao 的传递方式，以及 8 月 25 日 ready 目标是否可达【Brian】
- [ ] **跟进 SLS US prohibited category 清单**：确认是否按 8 月 24 日理想时间返回；若未到，继续按 8 月 25 日最晚节点跟催【Brian】
- [ ] **参加项目内部 Internal Kick off**：14:00–15:00，重点带入 Row 2 的数据链路、首批交付、price、站点选择和 prohibited category 依赖【Brian】

## 深度块用（Brian）

- [x] **Amazon brand 初稿已发给 Siying**（✅ 8/20 10:18）：基于 Diana 粗匹结果先交付；已说明 Hison unique brand 与异名匹配属于后续迭代，Amazon 缺少 `is official shop` 字段可能漏掉部分官店【Brian】
- [x] **Brand 中文名二次匹配并反馈 Siying**（✅ 8/21 已完成）：中文 brand name 已转换为英文候选名并完成二次匹配，后续只处理反馈和必要复核【Brian】
- [x] **与 Siying 对齐 Amazon 项目的 next step**（✅ 8/20 11:00）：已明确 Temu QC、Hison 取数链路、Brand 中文名英文重匹配和 Category 禁运品方案四条线【Brian】
- [ ] **P0：9/1 与 Pine / Annie / JH 开会汇报 Amazon 站点匹配结果，倒排并留足缓冲**：目标 8/28 前冻结可展示结果，8/29–8/31 留给内部 review、材料和修正【Brian】
- [ ] **8/29 上午确认深圳差旅安排**：Amina 希望全 team 8/30 到深圳，8/31 参加 CB internal kick off；提前确认交通与住宿【Brian】
- [x] **确认 Amazon 网页 sold/review 共享性并回复 Siying**（✅ 8/19 14:02）：sold=model level 可加总；review=Amazon 新机制复杂（部分场景共享、部分不共享）→ 建议取 max；先按此 hypo，等 category 确认后最终敲定【Brian】
- [ ] **P0：只整理 US prohibited category filter 规则并发 Siying / 相关数据方确认**：不再继续优化全量 Amazon→Shopee mapping；只确认 prohibited category 的 ID、路径、适用范围、命中条件和剔除动作【Brian】
- [ ] **P0 下午：解决 Amazon `review_cnt` 口径**：在 Diana/数据侧完成底数与字段核对，确认最终取值逻辑并记录可执行结论【Brian】
- [ ] **P0 下午：完成 Temu QC 与取数流程核对**：检查数据日期、记录量、item details、图片、brand/category、重复和空值；与 Hison 确认源表、全量/增量、分区、粒度、去重键、字段和可复跑 SQL，问题当天同步 DC【Brian】
- [ ] **P0 EOD：向 Siying 回报 Brand、review_cnt、Temu 三项结果**：明确已完成、未解决问题、责任人和下一步时间点【Brian】

## 普通执行（Brian）

- [x] **找 CM 确认 L3 挂空情况**（✅ 8/19 上午已问 Celine）：结论——L1-L2 理论上不为空；L3 开始可能挂空；每个 L1 下有 others L2；item 至少应有 L1-L2；US 用 global tree；业务日常主要看 L2、偶尔看 L3-L4【Brian】
- [ ] **若 GPT 公司申请未下来 → 先用千问 Token Plan 个人版给 Codex 接 Qwen 顶上**：订阅页 https://platform.qianwenai.com/home/billing/subscription/token-plan-individual ，通过 cc-switch（Codex 面板）接入，端点为 compatible-mode/v1（配置指南已查好，见 Mason 8/18 晚回复）【Brian】
- [ ] **P0：向 Hison 确认 Temu 两张 crawler 表权限及取数权限**：全量表为 `crawler.dim_shopee_crawler_temu_reg_item_s0_live`，增量表为 `crawler.dwd_shopee_crawler_temu_reg_item_s0_di`；权限或字段有问题当天升级【Brian】
- [ ] **权限到位后审核 Temu 底表并按 Amazon item details 需求做字段映射**【Mason】
- [ ] **P0：向 DC 询问 TikTok Shop / AliExpress / Temu 爬虫开发进度**：拿到每个平台 owner、ETA、当前 blocker 和数据可用时间，汇总到多平台开发进度表【Brian】
- [ ] **P0：倒排单站点图搜试跑**：8/25 取数 ready，8/26 准备输入，8/27 跑接口与检查映射，8/28 拿到一个站点的首轮匹配结果【Brian】
- [x] **在内部群同步图搜 ETA / 接口方案，并补 cc 沈浩（Hao Shen）**（✅ 8/19 18:27 已发送）：说明 8/20 开发、预计 8/25 完成及后续联调安排【Brian】
- [ ] **P0 下午：在 Diana AI 数据产品中查询 Amazon 底数并核对 `review_cnt`**【Brian】
- [x] **用 Diana 对已收到的 Amazon brand 清单做第一轮粗匹配，并把结果更新到 Google Sheet**（✅ 8/19 完成）：https://docs.google.com/spreadsheets/d/10wJNzEzHW0BS2w8ddQX-ghMny2se36TGHCsXeTVeq2w/edit?gid=340434602#gid=340434602【Brian】
- [ ] **P0：8/24 前确认 Amazon 数据 ready 并准备 test handoff**：数据 ready 后立即进入站点匹配 test，目标 8/28 前冻结可向 Pine / JH / Annie 展示的结果【Brian】
- [ ] **8/25 和 JH 确认优先跑哪 1–2 个站点**：根据数据量、接口准备度和 9 月 1 日汇报要求锁定首批站点【Brian】
- [ ] **筛选逻辑确认后，向数据侧发 Amazon 最新底表刷新请求并确认完成时间**【Brian】
- [ ] **Brand 中文名二次匹配留痕**：保留中文原名、英文标准名、Amazon 命中名和置信度，作为上午主任务的输出字段【Brian/Mason】
- [ ] **P0：向 SLS team 获取 US 对应的 Shopee prohibited category 清单**：确认 category ID、路径、适用范围和交付时间；这是当前 Category 唯一外部前置【Brian】
- [ ] **收到 SLS 清单后建立 prohibited category filter 表**：字段至少包含 Shopee category ID、路径、Amazon 对应范围、命中条件、剔除动作和验证样例；清单早到走内部预筛，清单晚到走 6M 匹配后按 Shopee category 后置剔除【Brian】
- [ ] **核对 Lydia 提供的 Col I brand name 与 Amazon mapping**：标记哪些 brand 已在美国；责任人待确认【Brian（责任待确认）】
- [ ] **对尚未在美国的 brand 按 Top L2 确定 migration 优先级**：以上一步 mapping 结果为前置；责任人待确认【Brian（责任待确认）】
- [x] **确认 model lvl 的 sold_cnt / review_cnt 是共享还是仅该 model**（✅ 8/19 5k 样本初步确认）：sold=model 级（各自不同，可 sum）；review/rating=product 级共享（不可 sum，取代表值）；Brian 正在 double confirm Amazon 网页口径（split 情况），待他看完后定【Brian/Mason】
- [x] **price 价差确认**（✅ 8/19 5k 样本确认）：同 product 价差最大约 $363，需用主价位/中位数而非最低价；正式聚合口径在清洗规则中定稿【Brian/Mason】

## Mason 可代办

- [x] **起草 Amazon 数据清洗规则框架**（✅ 8/19 v1 落盘 `output/2026-08-19-amazon-cleaning-rules.md`）：Migoo 字段映射 + Siying 口径 + 5k 样本 deep dive 已整合，输出聚合规则（sold sum / review max / rating 随代表行 / price 主价位）、输出字段、待确认问题；待 Hison 确认 product_id 逻辑与价差分布后定稿 v2【Mason】
- [ ] **8/25 检查图搜开发是否完成，并准备后续联调**【Mason】
- [ ] **Hison unique brand 到位后，用 AI 处理 brand 名称不一致的剩余匹配，并回填 Google Sheet**【Mason】
- [x] **Hison Amazon ~5k 样本 deep dive**（✅ 8/19 完成）：5,000 行 / 4,929 unique product_id；sold 空 86.5%；sold 为 model 级可 sum（缺失按 0）；review/rating 为 product 级共享不可 sum；price 价差大须用主价位；product_id 与 offer_url ASIN 83% 不一致 → 口径确认转另一 task【Mason/Brian】
- [ ] **低优先级：将 8/17 Temu 研究结论归仓到 cross-border-ecommerce KB**：整合 US电商市场与AI商业化研究/references/temu-us-eu-supply-and-seller-governance.md 与 output/2026-08-17-temu-research-summary.md（当前让位于 Temu QC）【Mason】

## 变更记录

- 2026-08-20：SLS 沟通口径确认——当前需要的是 SHP category tree 维度的 US `prohibited` 标签，用于 SHP SKU mapping；供应商具体禁运产品清单只能作参考，不能直接作为交付。理想周一、最晚下周二拿到品类表维度结果；IP/假货将进入黑名单 category，后续可能单独发起美国假货清理 initiative。
- 2026-08-20：Category 全量 Amazon→Shopee mapping 暂停。后续只围绕 US prohibited category：等待 SLS 权威清单，确认 ID/路径/适用范围/剔除规则，建立最小 filter 表；Amazon/Shopee sample、竞对 mapping 调研、v3.5 全量候选池和灰区优化均不再主动推进。
- 2026-08-20：新增 Amazon 硬 deadline——9/1 向 Pine/JH/Annie present 站点匹配结果；目标 8/28 冻结结果，8/29–8/31 留作 review、材料和修正缓冲。
- 2026-08-20：新增差旅提醒——Amina 希望全 team 8/30 到深圳，8/31 在深圳参加 CB internal kick off；已设置 8/29 上午提醒确认交通与住宿。
- 2026-08-20：Siying 对齐后主线调整——Temu QC 升为 P0；与 Hison 核对取数流程，目标 8/25 ready、8/28 获得一个站点图搜结果；向 DC 询问其他平台进度；Brand 剩余中文名转英文后二次匹配；Category 核心转为 US prohibited category 剔除，新增 SLS 清单早到/晚到两种方案。

- 2026-08-20 00:00: 新增 P1 待办——明天咨询竞对之前是怎么做匹配映射的（调研竞对类目匹配方法论，作当前 category mapping 参考佐证）
- 2026-08-19: Hison 5k 样本 deep dive 完成——sold=model 级可 sum（缺失按 0）；review/rating=product 级共享不可 sum；price 用主价位非最低价；product_id vs offer_url ASIN 83% 不一致，口径确认转另一 task
- 2026-08-19 12:00: Temu 数据准备启动——Leah 确认 `dwd..._di` 为前一天爬取数据的增量表，当前全量使用 `dim..._live`；Brian 已请 Hison 确认两张表权限，后续按 Amazon 方式取 item details
- 2026-08-19: Temu 优先级明确——排在 Amazon 之后；图搜进入开发等待期时再穿插推进，当前不抢占主线深度块
- 2026-08-19: 方法论复核——按 GTD 将项目描述与具体下一步行动拆开；已约会议留在日程/项目支持信息，eBay hypothesis 放入将来/也许，不激活为项目
- 2026-08-19: Amazon brand 清单已收到；新增 Diana 粗匹配 → Hison unique brand → AI 剩余匹配的执行链路，结果统一更新至指定 Google Sheet
- 2026-08-19 收工：Diana 粗匹配已完成；Hison unique brand 与 AI 异名匹配仍为后续链路；新增 Lydia 的美国 brand 覆盖核对与 Top L2 migration priority 两步，责任人待确认
- 2026-08-19 收工补充明日计划：明早先把 brand 初稿发给 Siying，再沉淀 category 简洁方法论，随后约 Siying 对齐 next step；图搜 ETA/接口方案已于 18:27 发内部群并 cc 沈浩
- 2026-08-19: 图搜资源/ETA 已确认——优先开发 Migoo 需求，接口交付减少约 2 天刷数据工作量；8/20 开发，预计 8/25 完成，可能再加 1 天联调
- 2026-08-19 11:10: Siying 回复 Amazon 聚合口径——① unique product id 确认需要，取数方式待讨论；② sold/review cnt 需先确认 model lvl 共享性再定逻辑；③ price 不用最低价，用稳健口径（9 个 10 刀 + 1 个 1 刀 → 用 10 刀），需 Hison double check 价差
- 2026-08-19: Hison ~5k Amazon 样本已反馈——Brian 初步看数字无大问题，后续 deep dive；提醒点：unique product id 口径下 Hison 筛选是否去重/是否作用于 buybox model 层级
- 2026-08-19: Brian 将问 Leah：① Temu 上周 assortment tracker 数字 ② DC TTS/AE/Temu 爬虫排期；next-actions 对应项已标注
- 2026-08-19: CM 确认 L3 挂空——Celine 回复：L1-L2 不为空，L3 开始可能挂空，US 用 global tree，业务日常看 L2 偶尔 L3-L4；next-actions 对应项闭环
- 2026-08-19 10:53: 图搜双事项闭环/更新——sample 已给 DC（建议字节流传输）、result 可对应竞品 item；原"result 对应关系确认"完成，原"正式排期"改为"DC 工时评估"待跟进
- 2026-08-19: 图搜进度跟催时间从上午改为下午（早上已读不回）
- 2026-08-19: 新增 Mason 检查项——Hison Amazon ~5k 样本交付检查
- 2026-08-18 深夜: 新增明天待办——若 GPT 公司申请未下来，先通过千问 Token Plan 个人版（platform.qianwenai.com）给 Codex 接 Qwen 顶上，cc-switch（Codex 面板，compatible-mode/v1 端点）接入指南已备好
- 2026-08-18 深夜: 新增明天待办——找 CM 确认 Amazon item 是否存在 L3 挂空（只有 L1、L2/L3 为空），Brian 睡前投喂；与类目匹配方案 v3.2 实测（Raw Amazon 深度 2-9 层）配套
- 2026-08-18 晚: Migoo tab 闭环——Nikki 经 Seatalk 确认「Shopee CB 需求」tab 的 Migoo 对应字段已更新：① 删除"明天上午跟催 Migoo tab"行动项；② Amazon 清洗深度块前置解除，明天可开工；③ Mason 清洗规则框架任务字段映射部分可补全；④ 删除"明天上午检查 Migoo tab 更新"检查项
- 2026-08-18: 全面维护——按 GTD 标准重写 active 部分，只保留未完成的物理动作；已完成/暂挂项移入变更记录或 waiting.md
- 2026-08-18: brand 清单决策更新——Siying 确认当前不需要 unique brand name；brand 事宜后置到 category 映射 + 禁运 brand 剔除后再评估
- 2026-08-18: 修正依赖——category 映射不依赖 Migoo tab/Hison，Amazon 与 Shopee 数据均已拉齐，可立即开工
- 2026-08-18: BI 对接人 Qu Yue（郭任协助）；sample 已直发 Hao Shen；Qu Yue 提出直传文件方案（省 DC 下载开发）
- 2026-08-18: SPU team 事项闭环；图搜链路更新为 sample → BI → DC 评估耗时（需跟催）
- 2026-08-18: Nikki + BI Amazon 口径会已结束——Migoo 将更新 Shopee CB 需求 tab（字段映射）
- 2026-08-18: 图搜进度确认消息已发送 Qu Yue / Hao Shen，等回复
- 2026-08-18: BR vespa 资源评估已完成；美国 3PF 店铺开设阿根廷输入已完成
- 2026-08-18: Diana topic 已创建；Siying 两个 Sheet 已查看；Amazon 核心约束已与 Siying 对齐
- 2026-08-17: 明天会议目标明确——打通 13M→3.4M 取数（Hison 可执行），两问聚焦 sold 覆盖与无 sold 处理
- 2026-08-17: Nikki 给出 13M 取数 SQL（offer_id 3 段 = buybox level），待 Diana 验证量级
- 2026-08-17: Nikki 口径确认升级为明天三方会（Brian + Nikki + BI），由 Bryan 组织
- 2026-08-17: 新增核对核心两问——13M 口径（model/buybox、是否含 sold）与筛选标准
- 2026-08-17: 口径澄清——13M=buybox level / 6190万=supplier 明细 / sold=近30D 动销（null 正常）；3.4M 交付口径待定
- 2026-08-17: Diana 实测发现量级口径问题（965万/1444万/6190万；sold 覆盖仅 6.7%；review_count 异常）——已记入状态卡，待 8/18 与 Nikki 核对
- 2026-08-17: 新增明天与 Nikki 核对 Amazon 数字（口径问题较多）
- 2026-08-17: Shopee 侧 category 树已确认 = global tree（映射目标定）
- 2026-08-17: 新增明天 category 匹配硬任务（unique Amazon category → Shopee 匹配），前置依赖已标
- 2026-08-17: 图搜对接人确认——PM Chen Sinuo / PJM ZhangXinyu（提单流程），明早会对齐 timeline
- 2026-08-17: 图搜协议已定（Jun Yaw Poon 敲定 Hive 表 input/output，top50 逗号分隔）；周三/四 DDL 有风险（开发+刷数据约 2 天），已约明早 10:00 会对齐 timeline
- 2026-08-17: Kate 交接材料取消（已闭环）；yu fan 消息已发转等待
- 2026-08-17: 图搜对接协议草稿已提（input/output/Hive 落数），新增 PJM 提需 + 拉会收尾
- 2026-08-17: Temu 数据核对完成（发货指标 / 全球 vs 站点口径）；JIT 48h/5–10 元来源更正为 zp165 2026-04
- 2026-08-17: RM 新卖家免佣问题已解决；Temu 事项交由另一 task 更新 PMO
- 2026-08-17: US Temu 研究完成；新增明天 10:30-11:30 Temu 货盘会议（硬承诺）
- 2026-08-17: Hison 拉数需求明确为 unique brand name + unique category
- 2026-08-17: 底表审批通过，新增 Diana topic + Hison 拉数字
- 2026-08-17: 新增 US Temu 信息研究（另一 task 展开中，待同步）
- 2026-08-17: 底表审批已发送，转等待清单
- 2026-08-17: Amina / Hison 消息已发送，转等待清单（8/18 跟催）
- 2026-08-16: 并入另一 task 更新（Hison 更新 UST tracker 数字 / 查看 Temu 上周数字）；补回底表审批优先项
- 2026-08-16: 填入首次大脑清空内容：5 条下一步行动（2 深度 / 3 普通 / 3 Mason）
- 2026-08-16: 初始骨架创建
