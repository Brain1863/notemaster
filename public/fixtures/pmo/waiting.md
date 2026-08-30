<!-- 本文件由 tools/sync-pmo-to-notemaster.py 自动从私有仓 personal-pmo/lists 同步，
     已过滤敏感信息。仅供个人助理读取待办，请勿在此编辑。 -->

---
title: 等待清单
updated: 2026-08-30
---

# 等待清单

> 等别人/等外部回复的事项。必须标注：等谁、等什么、跟催日期、状态。

| 事项 | 等待对象 | 等待内容 | 跟催日期 | 状态 |
|------|---------|---------|---------|------|
| Temu `brand_name` 字段确认 | Hison / DC | Temu QC / 取数沟通已完成，当前只需确认底表是否包含 `brand_name`；若没有，再确认替代字段或补充方式 | — | ⏳ 非当前主线，等待字段确认 |
| TTS ready 数据复核（后置） | DC / Brian | TTS 已 ready；后续复核字段、量级、日期覆盖、图片和 brand/category 可用性，确认是否进入主链路 | — | ⏸ 后置，等待我们复核 |
| AE 爬虫进度（后置） | DC / Leah | 预计 8 月底开发完成，随后开始爬虫，目标 2026 年 9 月 11 日上线；到节点后确认实际数据可用时间 | 2026-08-31 | ⏸ 后置，等待开发完成 |
| Amazon VN / TH 匹配结果 | Shen Hao / DC | MY、BR、PH 已完成；VN、TH 等待结果返回。结果到位后核对数量、字段和异常，并纳入 9/1 汇报版本 | 2026-08-30 | ⏳ 等结果返回 |
| SHEIN 是否推进（后置） | JH / 项目 owner | SHEIN 爬虫当前不可行，项目建议改用 eBay；等待 owner/JH 确认是否替换及最终范围 | — | ⚠️ 后置，范围决策待确认 |
| SLS US prohibited category 清单 | Michael Tang / SLS team / 实际走货供应商 | 需要 SHP category tree 维度的 US `prohibited` 标签，用于结果后处理；原定 8/26 EOD 已逾期，供应商仍未闭环，需确认新的明确 ETA；若继续延迟，走“先保留原始结果、后置按 Shopee category 剔除”兜底 | 2026-08-30 | 🔴 P0，逾期，继续跟催 |
| Hison 拉数（category 匹配素材） | Hison | ① unique category 已发（8/18 11:01，Hison 已确认）；② 追加 Amazon / Shopee 双方 category sample；因全量 mapping 已暂停，sample 验证暂不使用 | — | ⏸ 已暂停，不再跟催 |
| Hison Amazon SKU selection 底表 | Hison → Diana | Hison 负责写入/维护 Hive 底表；取数字段、price 和代表性 model / URL 口径已对齐：无差异直接取值，有差异按 sold_cnt 加权，无 sold_cnt 算术平均；price 取最低值；model 按 `sold_cnt` → `review_cnt` → `rating` → 随机选择。底表提供后由 Diana 配置读取并完成底数、字段和量级核验 | — | ⏳ 当前前置依赖，等待 Hison 提供底表 |
| Hison unique brand 清单 | Hison | 当前 Brand 交付已通过 BPO 人工复核和 `To BI - Brand ingest` tab 完成，Hison unique brand 不再是当前交付前置；如后续要做更多异名扩展，再重新激活 | — | ⏸ 当前不再等待，已被人工复核路径替代 |
| 图搜开发、联调与首批匹配 | Chen Sinuo / Danping Wu / Jun Yaw Poon / DC Pricing Center team | 非 BR 路径等待联调 sample；BR 由 DC 侧另一个具备 Pricing Center 能力的 team 承接。需要分别 review DC 图搜结果和 Pricing Center 结果 | 2026-08-30 | ⚠️ 等待 sample / 结果收口 |
| 图搜接口输入输出 schema | Hao Shen / Jun Yaw Poon / Feng Hao / Qu Yue | Shen Hao 负责衔接 Hison 与 DC 的接口链路；当前确认输入为图片字节流，输出为纯图召回的 `item_id` + `shop_id`；仍需确认 Hive/interface 交付形式、每个 Amazon SKU 返回 1,000 个 item、score/参考标准和结果关联键 | 2026-08-26 | ⏳ 待补齐，影响联调和结果验收 |
| 图搜图片匹配粒度 | Feng Hao / Jun Yaw Poon / DC / Nikki | ✅ 已确认：同一个 Shopee item 下的全部 model-level 图片/值都会参与匹配，最终按 item-level 返回；Amazon 每个 product 只需选择一个代表性 model（`sold_cnt` → `review_cnt` → `rating` → 随机）作为输入并用其 URL 代表 Amazon item URL。Nikki 已确认 `offer_url`、`variant_image_url` 均为 model-level，Amazon 没有统一的 item-level 主图 | — | ✅ 已闭环，不再等待 |
| 图搜 score 分档与留存率 | Hison / Brian | 从 `0.96` 起每隔 `0.005` 分档，补齐 CNCB + Live SKU 筛选后的 Amazon `product_id` 数量及对应留存率；底数/留存率分母沿用当前已对齐口径，如有歧义再确认 | 2026-08-28 | ⏳ 等 Hison 补数 |
| Diana 底数刷新 | Hison / Diana | 刷新 Diana 对 Hison 底表的读取结果，核对底数、筛选范围和字段状态 | 2026-08-28 | ⏳ 等 Hison 更新底表后刷新 |
| 图搜字段返回边界与 500 条召回量级 | Shen Hao → Siying | 先由 Shen Hao 确认 Row 22–24 必传字段、Row 25–41 是否可由 DC 直接返回，以及 BI 是否需要二次拉数；再由 Siying 确认每个 Amazon product 是否最多保留 500 个 Shopee item，以及少于/超过 500 时的业务规则 | 2026-08-26 | ⏳ 当前等 Shen Hao 回复，业务数量口径后置确认 |
| 图搜 result 对应关系确认 | Qu Yue / Hao Shen | ✅ 8/19 10:53 Hao Shen 回复：可以对应到具体竞品 item；除图片链接外，我们可提供更多竞品字段（如 item id、平台名），Hao Shen 会拼接 DC 回传结果 | — | ✅ 已闭环 8/19 |
| 9/1 会议材料：爬虫结果 / NFR / counterfeit | Qynnie / Siying / 相关数据与运营团队 | Qynnie 是 9/1 汇报 PIC，负责统筹材料和模块衔接；爬虫结果是其中一个材料模块。NFR 和 counterfeit 需在 8/25 上午确认定义、数据来源、是否可补及替代呈现方式 | 2026-08-25 上午 | ⏳ Kickoff 已完成，Qynnie 汇报 PIC 已明确，指标口径待确认 |
| 图搜结果 prohibited category 后处理 | SLS team / Lydia / Hison | DC 原始结果复用现有 Shopee category mapping，与 SLS US prohibited 清单做 join 并剔除；已有 mapping 能匹配的部分不重复人工处理。仅当 SLS 清单本身无法对应现有 Shopee category tree 时，才澄清异常项。原始结果保留，过滤后另产最终结果 | 2026-08-27 结果返回后 | ⏳ 依赖 SLS 清单，主流程不新增通用人工 mapping |
| Hison 图搜结果匹配表（下游） | Hison / Shen Hao / DC | 依赖 Hison 先提供 `Amazon selection` Hive 底表，并由 Diana 完成底数/字段核验；DC 返回后再承接 Amazon product 与 Shopee item 的原始召回结果、`score/value`、匹配状态及后续 Y/N 判定字段。原始结果与禁运过滤后的最终结果分开维护 | 2026-08-27 首批匹配后 | ⏳ 下游等待，不能早于 Amazon selection 和 DC 首批结果 |
| BR 图搜 Pricing Center 链路准备 | Hison / DC Pricing Center team（Yu Fan / Xitong / Lin / Kyle / Yumou） | BR 由 DC 侧另一个具备 Pricing Center 能力的 team 承接，拟使用 `mpi.item.matching.get_matching_products_by_custom_fields`；正式数据更新已完成，待 model-level sample/输入准备完成后开展正式匹配测试，并核对 item-level 返回和归集 | 2026-08-30 | ⏳ 等 sample / 正式测试结果 |
| BR Quick Matching 输入 ID 口径 | DC Pricing Center team | 确认 Quick Matching 的 Product ID 是否可以填 Amazon `model_id`，以及系统是否校验 ID 类型，还是仅将其作为结果标识符返回 | 2026-08-26 | ⏳ 待 DC Pricing Center team 确认 |
| BR 图搜匹配粒度风险 | DC Pricing Center team / Hison / Siying | Quick Matching 当前回复为只能匹配 Shopee item 图，不能匹配 item 下的 model 图；因此需把每个 Amazon item 下的 model 都作为输入，预计约 4M item、6M model，最终按 Amazon product/item 归集。结果质量放到正式数据匹配测试中验证 | 2026-08-26 下午 | ⚠️ 方案已切换，等待正式数据测试 |
| BR 图搜量级口径 | Siying / Hison / Brian | 沟通中同时出现约 6M Amazon SKU、约 4M item、约 6M model，以及项目旧规划中的 3.4M Amazon 量级；需确认各数字的单位、筛选前后关系及本次 Pricing Center 实际跑数 scope | 2026-08-26 | ⚠️ 量级未完全统一，影响 QPS/资源申请 |
| Category 反向匹配确认 | Brian / Lydia | 核对现有反向匹配结果及异常项；先确认是否只服务 prohibited filter，避免重新启动全量 category mapping | 2026-08-28 | ⏳ 今日处理 |
| 后续 path 与 support 对齐 | Siying / 相关 DC team | 对齐下一步路径、owner、接口/数据支持、资源和时间要求，形成明确 support request | 2026-08-28 | ⏳ 今日沟通 |
| PH 数据整合 | Shen Hao / Hison / DC | 等 Shen Hao 链路 ready 后，再确认 PH 数据返回状态、字段/关联键完整性及整合进结果底表的责任边界 | Shen Hao ready 后 | ⏸ 前置链路未 ready，暂不刷新 |
| Pricing Center 数据更新 | Brian / Hison / DC Pricing Center team | 已在 thread 明确输入映射、返回、落表和归集步骤，Hison 已按步骤更新正式数据；统一使用映射后的 model id，并保留原始 id ↔ 映射 id 对照表 | — | ✅ 已完成，进入正式数据匹配测试 |
| Pricing Center 正式数据匹配测试 | Brian / Hison / DC Pricing Center team | 基于已更新的正式数据，验证 model-level 输入、item-level 返回、匹配结果质量和结果回查；该事项不是前置数据更新，也不是仅打通代码的 sample 测试 | 2026-08-30 | ⏳ 待开展/收结果 |
| Timeline PPT | Brian / Qynnie | 整理开发、联调、跑数、结果 review、prohibited category 过滤及汇报节点，形成下周二/9.1会议可用的 timeline 初稿 | 2026-08-28 | ⏳ 待完成初稿 |
| 巴西税基变更 sign-off 未回复 | 产品/税务团队 / Amina / JH | 5 月底 local 请求修改巴西税基，会影响中国卖家账单；Brian 因忙巴西关税未问 JH，也不想先下结论（Amina 会要求给建议）。至今 local/PM/老板均未再催，但 Brian 担心秋后算账。 | — | ⏳ 冷处理，不主动提醒 |

## 变更记录

- 2026-08-24：Hison 确认 Shopee price 逻辑为取最低值；Amazon 主聚合沿用该口径，并新增 `model_cnt`。后续比价必须保留 model-level 明细，不能只保留计数。
- 2026-08-24：图搜进度确认已收到回复——8/25 开发完成、8/26 联调、8/27 凌晨第一批匹配；8/26 EOD 小范围 test 不承诺。输入输出 schema、1,000 个 item、score/参考标准仍待补齐。
- 2026-08-24：SLS prohibited category 清单需要在 8/26（周三）前明确交付 ETA/结果，因 8/27（周四）开始拿数据；今天先问进展，未给 ETA 则追实际 vendor。
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
