<!-- 本文件由 tools/sync-pmo-to-notemaster.py 自动从私有仓 personal-pmo/lists 同步，
     已过滤敏感信息。仅供个人助理读取待办，请勿在此编辑。 -->

---
title: 等待清单
updated: 2026-08-21
---

# 等待清单

> 等别人/等外部回复的事项。必须标注：等谁、等什么、跟催日期、状态。

| 事项 | 等待对象 | 等待内容 | 跟催日期 | 状态 |
|------|---------|---------|---------|------|
| Temu QC / 取数链路确认 | Hison / DC | Hison 确认源表、全量/增量、分区、粒度、去重键、item details、图片和可复跑 SQL；DC 处理 QC 问题 | 2026-08-21 | 🔴 P0，目标 8/25 ready |
| 多平台爬虫开发进度 | DC / Leah | 老板反馈：等 Amazon 当前项目这边结束后再启动其他平台；下周（8/24）预计没空，可能下下周（8/31 起）开始。暂时不主动推进，等 Amazon 项目节奏明确 | 2026-08-31 | ⏸ 按老板指示暂停，等 Amazon 项目节奏 |
| Amazon item-level price 口径 | Leah / CI | 确认 item-level 应取哪个 price 字段或价格口径；用户已明确不在 8 月 21 日追问，安排 8 月 24 日处理 | 2026-08-24 | ⏳ 周一主动询问，影响 Amazon 数据准备 |
| SLS US prohibited category 清单 | Michael Tang / SLS team / 实际走货供应商 | 需要 SHP category tree 维度的 US `prohibited` 标签，用于 SHP SKU mapping；供应商具体禁运产品 list 仅作参考，最终颗粒度可能因供应商而异 | 2026-08-24（理想）/ 2026-08-25（最晚） | 🔴 P0，已给供应商，等待回传并持续跟催 |
| Hison 拉数（category 匹配素材） | Hison | ① unique category 已发（8/18 11:01，Hison 已确认）；② 追加 Amazon / Shopee 双方 category sample；因全量 mapping 已暂停，sample 验证暂不使用 | — | ⏸ 已暂停，不再跟催 |
| Hison 拉取 Amazon ~5k 样本 | Hison | 8/19 已完成 deep dive：sold model 级可 sum、review/rating product 级共享、price 用主价位；**product_id=变体父 ASIN 已按 Migoo 口径确认（Hison 无法独立验证）**；price 价差分布待确认是否仍影响当前筛选方案 | 2026-08-21 | 待确认是否仍阻塞 |
| Hison unique brand 清单 | Hison | Amazon brand 清单已收到；先由 Brian 用 Diana 粗匹配，等 Hison unique brand 到位后由 AI 处理剩余异名；目标 8/24 Amazon 数据 ready | 2026-08-21 | ⏳ 等 unique brand，按 8/24 目标倒推 |
| 图搜单站点试跑 | Jun Yaw Poon / Search 团队 | 取数链路 8/25 ready；8/26 准备输入；8/27 跑接口并核对结果映射；8/28 输出一个站点首轮结果 | 2026-08-28 | ⏳ 等开发完成 / 取数 ready / 联调 |
| 图搜 result 对应关系确认 | Qu Yue / Hao Shen | ✅ 8/19 10:53 Hao Shen 回复：可以对应到具体竞品 item；除图片链接外，我们可提供更多竞品字段（如 item id、平台名），Hao Shen 会拼接 DC 回传结果 | — | ✅ 已闭环 8/19 |
| 巴西税基变更 sign-off 未回复 | 产品/税务团队 / Amina / JH | 5 月底 local 请求修改巴西税基，会影响中国卖家账单；Brian 因忙巴西关税未问 JH，也不想先下结论（Amina 会要求给建议）。至今 local/PM/老板均未再催，但 Brian 担心秋后算账。 | — | ⏳ 冷处理，不主动提醒 |

## 变更记录

- 2026-08-21：根据 `Amazon Data Plan` Row 2 整理 8 月 24 日周一核心确认项：BI/数据链路、DC 首批交付条件、Leah/CI item-level price 口径、Hison 数据传递、SLS prohibited category；明确 price 不属于 8 月 21 日到期项。
- 2026-08-22 晚：新增冷处理等待项——巴西税基变更 sign-off（5 月底请求，Brian 未及时回复，对方至今未再催）；原则是不主动提起，若对方再催再确认细节与 JH 意见。
- 2026-08-20：SLS 需求澄清——细粒度禁运产品 list 无法直接用于 SKU mapping，当前等待 category L1/L2/L3 或 global tree 维度的 `prohibited` 标签；供应商差异需等实际走货供应商确认。
- 2026-08-20：Category 全量 Amazon→Shopee mapping 暂停；Hison category sample、竞对 mapping 参考和 v11 灰区优化不再主动跟进，仅保留 SLS US prohibited category 清单等待项。
- 2026-08-20：新增 P0 等待项——Temu QC/取数链路、DC 多平台开发进度；图搜等待项改为 8/28 单站点首轮结果目标。

- 2026-08-19: Hison 5k 样本 deep dive 完成——sold=model 级可 sum（缺失按 0）；review/rating=product 级共享不可 sum；price 用主价位非最低价；product_id vs offer_url ASIN 83% 不一致，口径确认转另一 task
- 2026-08-19 12:00: 新增 Temu crawler 表权限等待项；Leah 确认 `dwd..._di` 为增量表、`dim..._live` 为全量表，后续按 Amazon 方式取 item details
- 2026-08-19: Temu 等待项降为低优先级——排在 Amazon 之后，图搜开发等待期再推进，不主动抢占当前深度块
- 2026-08-19: 新增 Hison unique brand 等待项——为 8/24 Amazon data ready 倒推 8/21 跟催
- 2026-08-19: 图搜正式排期等待项更新为开发/联调等待——Search 优先开发 Migoo 需求，8/20 开发、预计 8/25 完成，可能再加 1 天联调
- 2026-08-19 11:10: Siying 回复——unique product id 确认需要（取数方式待议）；sold/review cnt 需先确认 model 共享性；price 建议稳健口径非最低价，需 Hison double check 价差
- 2026-08-19: CM 挂空问题闭环——Celine（BR CM）确认：L1-L2 理论上不为空；L3 开始可能挂空；每个 L1 下有 others L2；US 用 global tree
- 2026-08-19: BI/图搜两项等待项跟催日期从上午改为下午（早上已读不回，不逼太紧）
- 2026-08-19: 新增 Hison 等待项——按字段需求 + Migoo 映射拉取 Amazon ~5k 行 sample（8/19 10:17 已发）
- 2026-08-18 晚: Migoo tab 等待项闭环——Nikki 通过 Seatalk 确认「Shopee CB 需求」tab 的 Migoo 对应字段已更新；Amazon 取数/清洗的前置阻塞解除（原跟催日期 8/19 上午，当晚提前完成）

- 2026-08-18: 全面维护——移除已闭环项（Amina、Nikki sold_cnt、yu fan/SPU、Kate 交接、UST tracker），只保留 4 条活跃等待项
- 2026-08-18: Hison 需求更新——unique category 已发；追加 Amazon/Shopee 双方按 category 抽 5 个 item 的匹配素材（紧急度低）；brand name 清单暂不拉
- 2026-08-18: 已发 BI 确认图搜两点（sample 是否到 DC / result 能否对应竞品），8/19 跟催
- 2026-08-18: 执行人澄清——Hao Shen 是 DC 实际执行（非 BI 收件人）；BI 侧 Qu Yue/郭任仅协调
- 2026-08-18: BI 对接人确认 Qu Yue（郭任协助）；sample 已直发 Hao Shen；Qu Yue 提出直传文件可省 DC 下载开发
- 2026-08-18: SPU team 事项闭环（Siying 确认无需跟进）；图搜 sample 已给 BI，待 BI 转 DC 评估耗时（需跟催）
- 2026-08-18: Nikki + BI Amazon 口径会已结束——Migoo 负责更新「Shopee CB 需求」tab 字段映射（8/19 跟催）
- 2026-08-17: Nikki 回复——sold_cnt 在 dwd 表（update_type 批次过滤），dws 无此字段（闭环）
- 2026-08-17: 图搜对接人齐——PM Chen Sinuo / PJM ZhangXinyu（提单流程）
- 2026-08-17: 图搜协议由 Jun Yaw Poon 敲定；周三/四 DDL 有风险，明早 10:00 会对齐 timeline（involve PM/PJ）
- 2026-08-17: 新增 Nikki 等待项——dws 表无 sold_cnt，如何获取
- 2026-08-17: Tingliang 补充——pricing center 图片匹配可能停更、精度标准不可比；选型改为确认功能可用性
- 2026-08-17: Duan Tingliang 答复——Search 与 SPU 完全分开（买家 vs 内部），待补问模型同源与选型
- 2026-08-17: Siying 出面追图搜排期（Feng Hao 澄清：算法侧无工作量，主要工程侧），等 Jun Yaw Poon 排期
- 2026-08-17: Amina 已确认——weekly sync 不需要参加（闭环）
- 2026-08-17: yu fan 转 Duan Tingliang，问题已发 Tingliang 待回复
- 2026-08-17: Kate 交接闭环；yu fan 消息已发送转等待
- 2026-08-17: 图搜对接初步对齐（input/output 草稿已提，待 PJM 提需 + 拉会）
- 2026-08-17: Hison 拉数需求明确为 unique brand name + unique category 字段
- 2026-08-17: Kate 交接已沟通；UST assortment 底数问题已解决
- 2026-08-17: Amazon 底表审批已通过；新增「创建 Diana topic + Hison 拉数字」
- 2026-08-17: Feng Hao 上午休假，图搜排期确认顺延至其回来
- 2026-08-17: 底表审批已发送，转等待回复（8/18 跟催）
- 2026-08-17: Amina / Hison 已发送，转等待清单（8/18 跟催）
- 2026-08-16: 新增 Amazon 底表（Hive）权限审批等待项（明早优先跟进）
- 2026-08-16: 新增 UST assortment tracker → Hison 查看（等待项）
- 2026-08-16: 填入首次大脑清空内容：2 条等待事项
- 2026-08-16: 初始骨架创建
