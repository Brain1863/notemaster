<!-- 本文件由 tools/sync-pmo-to-notemaster.py 自动从私有仓 personal-pmo/lists 同步，
     已过滤敏感信息。仅供个人助理读取待办，请勿在此编辑。 -->

---
title: 项目清单
updated: 2026-08-21
---

# 项目清单

> 所有需要多步完成的事项的总清单。每个项目必须有一个下一步行动。
> 激活项目 ≤ 3 个，遵循 WIP 限制。

## 激活项目（WIP ≤ 3）

| 项目 | 状态 | 下一步行动 | 备注 |
|------|------|-----------|------|
| US 电商市场与 AI 商业化研究 | 进行中 | **当前 P0**：① 8/24 按 Amazon Data Plan Row 2 完成 BI/DC/Leah/Hison 核心确认；② 为 9/1 AMZ 站点匹配结果 presentation 倒排，8/28 冻结结果；③ Temu QC，问题当天同步 DC；④ 向 DC 询问 TTS/AE/Temu 进度；⑤ Category 只等待 SLS prohibited category 清单并建立最小 filter 表。 | 主项目；子项目 Annie 竞对图搜匹配（Amazon 3.4M + Temu 1M + TTS 1M + AE 1M + SHEIN 1M = 7.4M）；9/1 需向 Pine/JH/Annie present AMZ 站点匹配结果，8/29–8/31 预留 review/材料/修正；全量 Amazon→Shopee category mapping 已暂停；Amazon brand 中文名二次匹配已于 8/21 完成；Category 只服务于 US 禁运品剔除；8/24 项目内部 `Internal Kick off` 已约好；eBay 仅保留在将来/也许清单 |
| cross-border-ecommerce KB 维护 | 进行中 | 将 Temu 研究结论归仓到 cross-border-ecommerce KB | 支撑 US 研究的平台事实层；8/17 Temu 数据已核对完成，待归仓 |

## 已解决/已交付项目

| 项目 | 状态 | 交付时间 | 备注 |
|------|------|---------|------|
| UST/ST seller data | 已交付 | 2026-08-14 | 周五已完结 |
| BR/MX New Seller Migration | 已交付 | 2026-08-14 | 周五已完结并交付 |
| RM 新卖家迁移免佣问题支持 | 已解决 | 2026-08-17 | 免佣问题已解决；Kate 已交接 |

## 暂停/待激活项目

| 项目 | 状态 | 激活条件 | 备注 |
|------|------|---------|------|
| 3PF 研究 | 暂停 | 老板重新安排汇报时间 | 美国市场开设 3PF / Local 店铺可行性研究；AR Local 时间线已归档为输入：[原图](../US电商市场与AI商业化研究/sources/2026-08-20-ar-local-store-opening-timeline.png)；P2，暂不因该材料重新激活 |
| Kate 交接 TTL performance | 待启动 | 明确交接内容与时间后启动 | 每周巴西大盘表现汇报材料；Brian → Kate；需整理数据口径 + 更新流程 |
| BR 站点搜索架构评估（向量 vs vespa）| 待启动 | 确认优先级和排期 | 需 1-2 天深度评估 |

## 变更记录

- **2026-08-21** | 读取并纳入 `Amazon Data Plan` Row 2：8/24 先锁 BI/DC 数据链路与首批交付条件，问 Leah 确认 item-level price，和 Hison 对齐数据传递；8/25 再与 JH 确认首批 1–2 个站点。
- **2026-08-20** | Category 全量 Amazon→Shopee mapping 暂停：当前只关注 US prohibited category；等待 SLS 权威清单，确认 ID/路径/适用范围/剔除规则后建立最小 filter 表。复杂 mapping、sample 验证、竞对做法调研和 v11 灰区优化均不再主动推进。
- **2026-08-20** | 新增 Amazon 硬 deadline：9/1 向 Pine/JH/Annie present 站点匹配结果；8/28 冻结结果，8/29–8/31 预留内部 review、材料和修正。
- **2026-08-20** | Siying 对齐后项目主线调整：Temu QC 升为 P0；Hison 取数流程需在 8/25 前锁定并在 8/28 产出一个站点图搜结果；同步询问 DC 其他平台爬虫进度；Brand 剩余中文名转英文后重匹配；Category 以 US prohibited category 剔除为核心，按 SLS 清单到达时间采用内部预筛或 6M 匹配后置剔除。

- 2026-08-19: Amazon 进度——Siying 回复聚合口径（unique product id 确认需要 / sold 先确认共享性 / price 用稳健口径）；Hison 5k 样本 deep dive 完成（sold model 级可 sum、review/rating product 级共享、price 主价位；product_id vs offer_url ASIN 83% 不一致转另一 task）；图搜 Hao Shen 回复（sample 已给 DC、result 可对应竞品 item）；CM 挂空确认（L1-L2 不为空，L3 起可能挂空）
- 2026-08-19: Temu 优先级补充——正式看数字排在 Amazon 之后，图搜开发等待期再穿插推进，当前不属于紧急事项
- 2026-08-19: Siying 对齐后更新优先级——Amazon 升为主线；Temu 底表审核为 P2；图搜人天不变、正式排期目标本周结束前确认；Diana AI 数据产品负责底数与 `review_cnt` 核验；下周一项目内部 `Internal Kick off` 已约好（8/24 14:00–15:00，SH-Lyzhou-3F-2 (6)）；eBay 匹配仅为 hypo
- 2026-08-19: Amazon brand 清单已收到，执行链路定为 Diana 粗匹配 → Hison unique brand → AI 处理剩余异名；结果更新到指定 Google Sheet；Amazon 目标 8/24 data ready 后进入 test
- 2026-08-19: 图搜资源协调完成——Search 优先开发 Migoo 需求，接口交付减少约 2 天刷数据工作量；8/20 开发，预计 8/25 完成，可能再加 1 天联调
- 2026-08-18 晚: Migoo 字段映射闭环——Nikki 经 Seatalk 确认「Shopee CB 需求」tab 的 Migoo 对应字段已更新；US 研究项目下一步行动更新：Amazon 清洗前置解除、明天可开工；Mason 清洗规则框架可补全字段映射
- 2026-08-18: 全面维护项目清单——RM 新卖家迁移免佣问题已移入已解决；US 电商研究与 cross-border-ecommerce KB 的下一步行动更新为当前具体动作
- 2026-08-17: RM 新卖家迁移免佣问题已解决；UST assortment 已解决；Temu 事项由另一 task 更新 PMO（待同步，本侧不动）
- 2026-08-16: 确认 Brian 不去 CI 团队，`ci-handover/` 仅参考、不跟进；US 电商市场研究为唯一主线；Kate 交接与 3PF 研究属于 BR 业务收尾
- 2026-08-16: 修正语音识别错误——Annie 项目 Amazon 目标 3.4M（非 340 万）；补充 Annie 角色：MX/AR Country head + US 市场，虚线老板；项目总量 7.4M（Amazon 3.4M + Temu 1M + TTS 1M + AE 1M + SHEIN 1M）；保持主项目"US 电商市场与 AI 商业化研究"名称，Annie 竞对图搜匹配作为其子项目
- 2026-08-16: 填入首次大脑清空内容：激活项目 3 个 + 待激活项目 3 个
- 2026-08-16: 初始骨架创建
