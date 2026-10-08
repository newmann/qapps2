# qapps2 Material Icons 参考

`m-dash-stat`、`m-dash-list` 等 dashboard 组件的 `icon` 属性以及
Quasar 的 `<q-icon>` 都接受 **Material Icons ligature 名称**（小写蛇形字符串）。
本文按 dashboard 实际场景分组，列出约 350+ 高频可用的图标。

字体包：`material-icons@1.13.14`（Google 官方 Material Icons / Filled）
CSS：`screen/qapps2static/libs/material-icons/material-icons.css`
来源：`build.gradle` line 63–65（jsDelivr）

## 用法

### `m-dash-stat`

```vue
<m-dash-stat title="待办" :value="14"
             icon="pending_actions" color="primary"/>
<m-dash-stat title="完成" :value="128" delta="+12" delta-type="up"
             icon="task_alt" color="positive"/>
<m-dash-stat title="库存" :value="37" delta="-2" delta-type="down"
             icon="inventory_2" color="warning"/>
<m-dash-stat title="SLA" value="92%" caption="Last 30 days"
             icon="verified" color="info"/>
```

### `m-dash-list`

```vue
<m-dash-list :items="[
  { title: 'Request submitted', caption: 'Checkout', meta: '2h', icon: 'inbox' },
  { title: 'Asset returned',     caption: 'SN-991',  meta: '5h', icon: 'inventory_2' }
]"/>
```

### `q-icon`

```vue
<q-icon name="filter_alt" size="20px"/>
<q-icon name="notifications_active" color="negative"/>
```

> 完整图标清单参见 [Google Fonts · Material Icons](https://fonts.google.com/icons)
> （Selected style = Material Icons / Filled）。本文档只挑选 dashboard 场景下
> 高频出现的图标，避免一页几千行不易翻阅。

## 目录

1. [KPI / 指标](#1-kpi--指标)
2. [状态 / 进度](#2-状态--进度)
3. [订单 / 销售](#3-订单--销售)
4. [库存 / 物流](#4-库存--物流)
5. [通知 / 提醒](#5-通知--提醒)
6. [导航 / 视图切换](#6-导航--视图切换)
7. [文件 / 文档](#7-文件--文档)
8. [用户 / 团队](#8-用户--团队)
9. [财务 / 报表](#9-财务--报表)
10. [设置 / 管理](#10-设置--管理)
11. [通用动作](#11-通用动作)
12. [设备 / 硬件](#12-设备--硬件)
13. [媒体 / 通讯](#13-媒体--通讯)
14. [地点 / 地图](#14-地点--地图)

---

## 1. KPI / 指标

| Icon | 名称 | 用途 |
|------|------|------|
| analytics | 分析 | 整体数据看板入口 |
| assessment | 评估 | KPI 报表、绩效总览 |
| insight | 洞察 | 业务洞察、趋势分析 |
| timeline | 时间线 | 里程碑、阶段进度 |
| speed | 速度 | 实时速率、吞吐 |
| equalizer | 均衡器 | 多维度对比 |
| monitor_heart | 心跳监测 | 系统健康度、SLO |
| percent | 百分比 | 完成率、转化率 |
| calculate | 计算 | 计算器、数值汇总 |
| functions | 函数 | 公式、规则 |
| show_chart | 折线图 | 趋势展示 |
| bar_chart | 柱状图 | 分类对比 |
| stacked_line_chart | 堆叠折线 | 趋势构成 |
| multiline_chart | 多线图 | 多系列趋势 |
| pie_chart | 饼图 | 占比 |
| donut_large | 大环形图 | 中心指标占比 |
| donut_small | 小环形图 | 子项占比 |
| scatter_plot | 散点图 | 分布、相关性 |
| add_chart | 添加图表 | 新建图表 |
| query_stats | 查询统计 | 实时查询 |
| leaderboard | 排行榜 | Top N |
| workspaces | 工作区 | 多业务线 |
| trending_up | 上升趋势 | 增长 |
| trending_down | 下降趋势 | 下滑 |
| trending_flat | 持平趋势 | 无变化 |
| bolt | 闪电 | 突发、即时 |
| autorenew | 自动刷新 | 定时任务 |

## 2. 状态 / 进度

| Icon | 名称 | 用途 |
|------|------|------|
| check_circle | 已完成 | 任务完成、成功 |
| check_circle_outline | 完成（空心） | 表单校验通过 |
| check | 勾 | 单项确认 |
| done | 完成 | 列表项完成 |
| done_all | 全部完成 | 批量完成 |
| pending | 待处理 | 等待中 |
| pending_actions | 待办动作 | 待办事项 |
| task_alt | 任务完成 | 任务打勾 |
| hourglass_top | 沙漏上行 | 倒计时（开始） |
| hourglass_bottom | 沙漏下行 | 倒计时（结束） |
| hourglass_empty | 空沙漏 | 超时 |
| hourglass_full | 满沙漏 | 进行中 |
| schedule | 时间 | 时长、排程 |
| timer | 计时器 | 倒计时 |
| timer_off | 关闭计时 | 暂停 |
| history | 历史 | 历史记录 |
| history_toggle_off | 关闭历史 | 不留痕 |
| update | 更新 | 升级 |
| replay | 重放 | 重试 |
| restart_alt | 重启 | 重新启动 |
| refresh | 刷新 | 重新获取 |
| cached | 缓存 | 重新计算 |
| sync | 同步 | 数据同步 |
| sync_alt | 同步切换 | 双向同步 |
| loop | 循环 | 循环任务 |
| autorenew | 自动 | 自动轮询 |
| error | 错误 | 失败 |
| error_outline | 错误（空心） | 软错误 |
| warning | 警告 | 警告 |
| warning_amber | 琥珀警告 | 中度警告 |
| report_problem | 上报问题 | 风险 |
| info | 信息 | 提示 |
| info_outline | 信息（空心） | 备注 |
| help | 帮助 | 帮助 |
| help_outline | 帮助（空心） | 文档入口 |
| cancel | 取消 | 取消 |
| block | 禁止 | 禁用 |
| do_not_disturb | 请勿打扰 | 静音状态 |
| remove_circle | 移除 | 删除/取消 |
| verified | 已验证 | 已审核 |
| verified_outline | 已验证（空心） | 待复核 |
| new_releases | 新发布 | 标记为新 |
| stars | 多星 | 推荐 |
| star | 星 | 评分 |
| star_border | 星（空心） | 未评分 |
| star_half | 半星 | 中等评分 |
| favorite | 收藏 | 收藏 |
| favorite_border | 收藏（空心） | 未收藏 |
| bookmark | 书签 | 标记 |
| bookmark_border | 书签（空心） | 添加书签 |
| flag | 标记 | 重要标记 |
| flag_outlined | 标记（空心） | 待标记 |
| push_pin | 图钉 | 置顶 |
| push_pin_outlined | 图钉（空心） | 可置顶 |
| thumb_up | 点赞 | 同意 |
| thumb_down | 点踩 | 反对 |
| priority_high | 高优先级 | 紧急 |

## 3. 订单 / 销售

| Icon | 名称 | 用途 |
|------|------|------|
| shopping_cart | 购物车 | 订单、购物 |
| shopping_bag | 购物袋 | 零售订单 |
| shopping_basket | 购物篮 | 采购 |
| shopping_cart_checkout | 购物车结算 | 结账 |
| add_shopping_cart | 加入购物车 | 下单 |
| remove_shopping_cart | 移出购物车 | 撤销 |
| storefront | 门店 | 店铺入口 |
| store | 商店 | 门店 |
| store_mall_directory | 商场 | 实体店 |
| point_of_sale | POS | 收银 |
| receipt | 小票 | 单据 |
| receipt_long | 长小票 | 详细订单 |
| sell | 出售 | 销售 |
| monetization_on | 货币 | 收入、收益 |
| attach_money | 美元 | 金额 |
| paid | 已支付 | 付款成功 |
| price_check | 价格核对 | 比价 |
| price_change | 价格调整 | 改价 |
| credit_card | 信用卡 | 支付方式 |
| credit_card_off | 信用卡（关） | 拒付 |
| account_balance_wallet | 钱包 | 余额 |
| wallet | 钱包 | 我的钱包 |
| savings | 存款 | 储蓄 |
| request_quote | 询价 | 报价单 |
| discount | 折扣 | 促销 |
| local_offer | 特价 | 优惠标签 |
| loyalty | 积分 | 会员 |
| redeem | 兑换 | 兑换码 |
| card_giftcard | 礼品卡 | 福利 |
| card_travel | 出行卡 | 出差 |
| list_alt | 列表 | 订单列表 |
| add_business | 添加商户 | 新建商户 |
| business_center | 商务中心 | 商务 |
| work | 工作 | 业务 |
| work_outline | 工作（空心） | 待办业务 |
| assignment | 任务单 | 工单 |
| assignment_turn_in | 任务提交 | 工单已交 |
| assignment_turned_in | 任务已交 | 工单完成 |
| fact_check | 核查 | 审核 |
| rule | 规则 | 业务规则 |
| rule_folder | 规则集 | 规则组 |
| approval | 审批 | 流程审批 |
| inventory | 库存（单数） | 库存项 |
| inventory_2 | 库存（复数） | 库存盒 |
| package_2 | 包裹 | 打包 |
| production_quantity_limits | 产量限额 | 产能上限 |

## 4. 库存 / 物流

| Icon | 名称 | 用途 |
|------|------|------|
| warehouse | 仓库 | 仓储入口 |
| local_shipping | 本地运输 | 物流配送 |
| shipping | 发货 | 出运 |
| local_mall | 商城 | 集采 |
| directions_car | 车辆 | 车队 |
| directions_bus | 公交 | 班车 |
| directions_subway | 地铁 | 轨道 |
| directions_railway | 铁路 | 铁路 |
| flight | 航班 | 空运 |
| flight_takeoff | 起飞 | 出发 |
| flight_land | 降落 | 到达 |
| two_wheeler | 二轮车 | 外卖 |
| airport_shuttle | 机场班车 | 接驳 |
| departure_board | 出发信息 | 班次 |
| inventory | 库存 | 货物 |
| inventory_2 | 库存盒 | 货架 |
| package | 包裹（单） | 单件 |
| package_2 | 包裹（复） | 多件 |
| qr_code | 二维码 | 标签 |
| qr_code_2 | 二维码（方形） | 二维码备选 |
| qr_code_scanner | 扫码 | 扫码枪 |
| barcode_reader | 条码扫描 | 条码 |
| label | 标签 | 标签 |
| label_important | 重要标签 | 主标签 |
| label_outline | 标签（空心） | 次标签 |
| category | 分类 | SKU 类别 |
| production_quantity_limits | 产量限制 | 产能 |
| production | 生产 | 制造 |
| factory | 工厂 | 制造场所 |
| precision_manufacturing | 精密制造 | 工艺 |
| forklift | 叉车 | 物流搬运 |
| moving | 搬运 | 移库 |
| alt_route | 备选路线 | 改道 |
| route | 路线 | 路径规划 |
| place | 地点 | 位置 |
| pin_drop | 钉地点 | 落点 |
| map | 地图 | 区域 |
| my_location | 我的位置 | 当前位置 |
| location_on | 位置（开） | 已启用定位 |
| location_off | 位置（关） | 关闭定位 |
| location_searching | 定位中 | 搜索中 |

## 5. 通知 / 提醒

| Icon | 名称 | 用途 |
|------|------|------|
| notifications | 通知 | 通知中心 |
| notifications_active | 通知（活跃） | 有新通知 |
| notifications_none | 通知（无） | 通知为空 |
| notifications_off | 通知（关） | 通知静默 |
| notifications_paused | 通知（暂停） | 通知暂停 |
| add_alert | 添加提醒 | 新建告警 |
| alarm | 闹钟 | 闹钟 |
| alarm_on | 闹钟（开） | 启用 |
| alarm_off | 闹钟（关） | 关闭 |
| access_alarm | 闹钟图标 | 时间接入 |
| access_time | 访问时间 | 时段 |
| schedule | 时间表 | 计划 |
| mail | 邮件 | 邮件 |
| mail_outline | 邮件（空心） | 未读 |
| email | 电子邮件 | 收件箱 |
| mark_email_unread | 邮件未读 | 未读标记 |
| mark_email_read | 邮件已读 | 已读 |
| markunread | 未读 | 标记 |
| inbox | 收件箱 | 收件 |
| drafts | 草稿 | 草稿 |
| archive | 归档 | 已归档 |
| archive_outline | 归档（空心） | 待归档 |
| move_to_inbox | 移到收件箱 | 还原 |
| unarchive | 取消归档 | 还原 |
| send | 发送 | 推送 |
| share | 分享 | 转发 |
| share_outlined | 分享（空心） | 分享备选 |
| reply | 回复 | 单个回复 |
| reply_all | 全部回复 | 群回 |
| forward | 转发（邮件） | 邮件转发 |
| voicemail | 语音邮件 | 留言 |
| sms | 短信 | 短信 |
| sms_failed | 短信失败 | 发送失败 |
| message | 消息 | IM |
| forum | 论坛 | 讨论 |
| chat | 聊天 | 即时通讯 |
| chat_bubble | 聊天气泡 | 对话 |
| chat_bubble_outline | 聊天气泡（空心） | 对话入口 |
| comment | 评论 | 评论 |
| comment_outline | 评论（空心） | 软评论 |
| announcement | 公告 | 通告 |
| campaign | 活动 | 群发 |
| priority_high | 高优先级 | 紧急通知 |
| report | 报告 | 故障报告 |
| report_off | 报告（关） | 隐藏 |
| feedback | 反馈 | 用户反馈 |
| rate_review | 评分 | 用户评分 |
| reviews | 评论汇总 | 评价列表 |

## 6. 导航 / 视图切换

| Icon | 名称 | 用途 |
|------|------|------|
| dashboard | 仪表盘 | 主页 |
| home | 首页 | 回到首页 |
| menu | 菜单 | 侧栏 |
| menu_open | 菜单（开） | 展开 |
| menu_book | 菜单书 | 文档 |
| apps | 应用 | 应用列表 |
| app_shortcut | 应用快捷方式 | 桌面快捷 |
| grid_view | 网格视图 | 网格 |
| view_module | 块视图 | 模块 |
| view_list | 列表视图 | 列表 |
| view_quilt | 拼布视图 | 多宫格 |
| view_column | 列视图 | 列 |
| view_headline | 标题视图 | 标题流 |
| view_stream | 流视图 | 流式 |
| view_agenda | 议程视图 | 议程 |
| view_week | 周视图 | 周历 |
| view_day | 日视图 | 日历 |
| view_timeline | 时间轴视图 | 时间轴 |
| view_carousel | 轮播视图 | 轮播 |
| table_chart | 表格 | 表格入口 |
| table_rows | 表行 | 行表格 |
| table_view | 表格视图 | 表格备选 |
| sidebar | 侧栏 | 侧栏开关 |
| drag_indicator | 拖拽指示 | 可拖 |
| drag_handle | 拖拽柄 | 把手 |
| more_vert | 垂直更多 | 菜单 |
| more_horiz | 水平更多 | 横向菜单 |
| expand_more | 展开更多 | 下拉 |
| expand_less | 收起 | 上收 |
| chevron_right | 右箭头 | 下一级 |
| chevron_left | 左箭头 | 上一级 |
| chevron_up | 上箭头 | 上移 |
| chevron_down | 下箭头 | 下移 |
| arrow_back | 返回 | 后退 |
| arrow_forward | 前进 | 前进 |
| arrow_upward | 上箭头（粗） | 上升 |
| arrow_downward | 下箭头（粗） | 下降 |
| arrow_back_ios | iOS 返回 | iOS 风格 |
| arrow_forward_ios | iOS 前进 | iOS 风格 |
| navigate_before | 上一个 | 轮播 |
| navigate_next | 下一个 | 轮播 |
| first_page | 首页 | 第一页 |
| last_page | 末页 | 最后一页 |
| swap_horiz | 水平切换 | 左右 |
| swap_vert | 垂直切换 | 上下 |
| swap_horizontal_circle | 切换（圆水平） | 切换图标 |
| swap_vertical_circle | 切换（圆垂直） | 切换图标 |
| compare_arrows | 对比箭头 | A/B 对比 |
| open_in_new | 在新窗口打开 | 外链 |
| open_in_full | 全屏打开 | 全屏进入 |
| close_fullscreen | 关闭全屏 | 全屏退出 |
| fullscreen | 全屏 | 进入全屏 |
| fullscreen_exit | 退出全屏 | 退出 |
| zoom_in | 放大 | 放大 |
| zoom_out | 缩小 | 缩小 |
| center_focus_strong | 居中加强 | 聚焦 |
| center_focus_weak | 居中弱 | 弱聚焦 |
| touch_app | 点击 | 触屏 |
| pan_tool | 拖动手势 | 拖动 |
| explore | 探索 | 发现 |
| explore_off | 探索（关） | 关闭发现 |
| travel_explore | 旅行探索 | 出差探索 |
| ads_click | 点击广告 | 命中 |
| search | 搜索 | 搜索入口 |
| search_off | 搜索（关） | 关闭搜索 |
| find_in_page | 页面查找 | 查找 |
| find_replace | 查找替换 | 替换 |
| manage_search | 管理搜索 | 高级搜索 |
| filter_list | 筛选 | 列表筛选 |
| filter_alt | 筛选（实心） | 条件筛选 |
| filter_alt_off | 筛选（关） | 关闭筛选 |
| sort | 排序 | 排序入口 |
| sort_by_alpha | 字母排序 | A-Z |
| code | 代码 | 代码块 |

## 7. 文件 / 文档

| Icon | 名称 | 用途 |
|------|------|------|
| description | 描述 | 文件 |
| article | 文章 | 长文 |
| note | 便签 | 备注 |
| note_add | 新建便签 | 新增 |
| notes | 便签集 | 多便签 |
| edit_note | 编辑便签 | 改备注 |
| file_copy | 复制文件 | 副本 |
| folder | 文件夹 | 目录 |
| folder_open | 文件夹（开） | 已展开 |
| folder_shared | 共享文件夹 | 协作文档 |
| folder_zip | 压缩文件夹 | 压缩包 |
| folder_special | 特殊文件夹 | 收藏 |
| folder_delete | 删除文件夹 | 删目录 |
| create_new_folder | 新建文件夹 | 建目录 |
| drive_folder_upload | 上传文件夹 | 目录上传 |
| drive_file_move | 移动文件 | 文件移动 |
| file_download | 下载文件 | 下载 |
| file_upload | 上传文件 | 上传 |
| file_open | 打开文件 | 打开 |
| file_present | 出席文件 | 提交 |
| file_download_done | 下载完成 | 已下载 |
| file_download_off | 下载（关） | 禁止下载 |
| upload | 上传 | 通用上传 |
| upload_file | 上传文件 | 文件上传 |
| download | 下载 | 通用下载 |
| download_done | 下载完成 | 已下载 |
| cloud | 云 | 云端 |
| cloud_download | 云下载 | 下载到云 |
| cloud_upload | 云上传 | 上传到云 |
| cloud_done | 云完成 | 同步完成 |
| cloud_off | 云（关） | 云不可用 |
| cloud_sync | 云同步 | 同步中 |
| attach_file | 附件 | 附件 |
| attach_email | 附邮件 | 邮件附件 |
| link | 链接 | 关联 |
| link_off | 链接（关） | 断开 |
| insert_link | 插入链接 | 富文本 |
| insert_drive_file | 插入文件 | 富文本 |
| insert_photo | 插入图片 | 富文本 |
| insert_chart | 插入图表 | 富文本 |
| insert_invitation | 插入邀请 | 富文本 |
| insert_comment | 插入评论 | 富文本 |
| insert_page_break | 插入分页 | 富文本 |
| content_copy | 复制 | 内容复制 |
| content_cut | 剪切 | 内容剪切 |
| content_paste | 粘贴 | 内容粘贴 |
| content_paste_off | 粘贴（关） | 禁止粘贴 |
| content_paste_search | 粘贴搜索 | 富搜索 |
| clipboard | 剪贴板 | 板 |
| content_save | 保存内容 | 暂存 |
| save | 保存 | 保存 |
| save_alt | 保存（备选） | 快速保存 |
| save_as | 另存为 | 副本保存 |
| print | 打印 | 打印 |
| print_outline | 打印（空心） | 软打印 |
| picture_as_pdf | PDF | PDF 导出 |
| pdf | PDF（短） | PDF 标记 |
| pdf_off | PDF（关） | 禁 PDF |
| feed | 订阅 | RSS |
| draw | 绘图 | 画图 |
| brush | 画笔 | 涂改 |
| auto_fix_high | 自动修复 | 增强 |
| auto_stories | 自动故事 | 故事模式 |
| auto_awesome | 自动魔法 | AI 生成 |
| book | 书 | 文档 |
| library_books | 书库 | 多文档 |
| library_add | 加入书库 | 入库 |
| rule | 规则 | 规则说明 |
| edit_document | 编辑文档 | 改稿 |

## 8. 用户 / 团队

| Icon | 名称 | 用途 |
|------|------|------|
| person | 人 | 单个用户 |
| person_outline | 人（空心） | 软用户 |
| person_add | 添加人 | 邀请 |
| person_remove | 移除人 | 注销 |
| person_search | 搜索人 | 找人 |
| person_off | 人（关） | 禁用账号 |
| account_circle | 账号（圆形） | 个人中心 |
| account_box | 账号（方形） | 账户入口 |
| account_tree | 账户树 | 组织结构 |
| group | 群组 | 团队 |
| group_add | 添加群组 | 新建组 |
| group_remove | 移除群组 | 解散组 |
| groups | 群组（复数） | 多群 |
| people | 多人 |
| people_alt | 多人（备选） |
| people_outline | 多人（空心） |
| supervisor_account | 主管账户 | 管理员 |
| badge | 徽章 | 角色 |
| badge_outlined | 徽章（空心） | 待授 |
| workspace_premium | 高级工作区 | 高级会员 |
| military_tech | 军衔 | 等级 |
| emoji_events | 表情事件 | 颁奖 |
| shield | 盾牌 | 安全 |
| shield_outlined | 盾牌（空心） | 软防御 |
| verified_user | 已验证用户 | 已实名 |
| admin_panel_settings | 管理员设置 | 后台 |
| manage_accounts | 管理账户 | 账号设置 |
| switch_account | 切换账户 | 换号 |
| switch_left | 切换左 | 换左 |
| switch_right | 切换右 | 换右 |
| contact_page | 联系页 | 联系卡 |
| contact_phone | 联系电话 | 拨号 |
| contact_mail | 联系邮件 | 邮箱 |
| contact_support | 联系支持 | 客服入口 |
| support_agent | 支持坐席 | 在线客服 |
| face | 人脸 | 头像 |
| face_retouching_natural | 人脸美化 | 头像编辑 |
| fingerprint | 指纹 | 生物识别 |
| pin | 钉 | 个人置顶 |
| how_to_reg | 如何注册 | 注册引导 |
| assignment_ind | 个人任务 | 个人工单 |
| assignment_late | 任务逾期 | 超期 |
| assignment_return | 任务退回 | 退回 |
| assignment_returned | 任务已退 | 已退 |
| person_pin | 人钉 (地点) | 人员位置 |
| diversity_3 | 多元 3 | 团队多样 |
| diversity_1 | 多元 1 | 个体多样 |
| diversity_2 | 多元 2 | 群体多样 |
| psychology | 心理 | 智能 |
| mood | 心情 | 表情 |
| mood_bad | 心情差 | 不满 |
| sentiment_very_satisfied | 非常满意 | 正面 |
| sentiment_satisfied | 满意 | 正面 |
| sentiment_neutral | 中性 | 一般 |
| sentiment_dissatisfied | 不满 | 负面 |
| sentiment_very_dissatisfied | 非常不满 | 强烈负面 |

## 9. 财务 / 报表

| Icon | 名称 | 用途 |
|------|------|------|
| payments | 付款 | 付款流水 |
| payment | 付款（单） | 单笔 |
| account_balance | 银行 | 银行账户 |
| account_balance_wallet | 钱包 | 钱包余额 |
| credit_card | 信用卡 | 卡 |
| credit_card_off | 信用卡（关） | 停卡 |
| savings | 储蓄 | 存款 |
| monetization_on | 货币 | 收益 |
| attach_money | 美元 | 金额 |
| paid | 已付 | 标记付款 |
| request_quote | 询价 | 报价 |
| receipt | 小票 | 单据 |
| receipt_long | 长小票 | 详细小票 |
| currency_exchange | 货币兑换 | 换汇 |
| currency_bitcoin | 比特币 | BTC |
| currency_yuan | 人民币 | CNY |
| currency_yen | 日元 | JPY |
| currency_pound | 英镑 | GBP |
| currency_ruble | 卢布 | RUB |
| currency_rupee | 卢比 | INR |
| currency_lira | 里拉 | TRY |
| price_check | 比价 | 价签核对 |
| price_change | 价格变化 | 调价 |
| redeem | 兑换 | 兑换码 |
| loyalty | 积分 | 会员体系 |
| card_giftcard | 礼品卡 | 福利卡 |
| pie_chart | 饼图 | 占比 |
| donut_large | 环形大图 | 中心占比 |
| donut_small | 环形小图 | 子占比 |
| stacked_line_chart | 堆叠折线 | 趋势构成 |
| bar_chart | 柱状图 | 分类对比 |
| show_chart | 折线图 | 趋势 |
| timeline | 时间线 | 阶段 |
| leaderboard | 排行榜 | Top N |
| query_stats | 查询统计 | 查询 |
| summarize | 摘要 | 汇总 |
| assessment | 评估 | 报表 |
| analytics | 分析 | 看板 |
| fact_check | 核查 | 审计 |
| rule | 规则 | 规则 |
| calculate | 计算 | 财务计算 |
| functions | 函数 | 公式 |
| percent | 百分比 | 费率 |
| request_page | 请求页 | 申请单 |
| pending_actions | 待办 | 待办动作 |
| task_alt | 任务完成 | 任务 |
| verified | 已核实 | 审核 |
| sell | 出售 | 销售标记 |
| point_of_sale | POS | 收银 |

## 10. 设置 / 管理

| Icon | 名称 | 用途 |
|------|------|------|
| settings | 设置 | 设置入口 |
| settings_applications | 应用设置 | 应用配置 |
| settings_accessibility | 无障碍 | 辅助 |
| settings_backup_restore | 备份还原 | 备份 |
| settings_bluetooth | 蓝牙设置 | 蓝牙 |
| settings_brightness | 亮度 | 亮度调节 |
| settings_cell | 蜂窝 | 移动网络 |
| settings_ethernet | 以太网 | 网络 |
| settings_input_antenna | 输入天线 | 信号 |
| settings_input_composite | 输入合成 | 输入源 |
| settings_input_hdmi | HDMI | 接口 |
| settings_input_svideo | S-Video | 接口 |
| settings_overscan | 过扫描 | 显示 |
| settings_voice | 语音 | 语音 |
| settings_power | 电源 | 电源管理 |
| settings_remote | 遥控 | 遥控器 |
| settings_suggest | 推荐设置 | 推荐 |
| settings_system_daydream | 系统屏保 | 屏保 |
| settings_video_camera | 摄像头设置 | 摄像头 |
| tune | 调谐 | 微调 |
| manage_accounts | 管理账户 | 账号管理 |
| manage_history | 管理历史 | 历史管理 |
| manage_search | 管理搜索 | 搜索管理 |
| build | 构建 | 编译/构建 |
| construction | 施工 | 维护中 |
| engineering | 工程 | 工程模式 |
| admin_panel_settings | 管理员 | 后台入口 |
| security | 安全 | 安全 |
| shield | 盾牌 | 防护 |
| lock | 锁 | 锁定 |
| lock_open | 开锁 | 解锁 |
| lock_outline | 锁（空心） | 软锁 |
| key | 钥匙 | 密钥 |
| key_off | 钥匙（关） | 无密钥 |
| vpn_key | VPN 密钥 | VPN |
| password | 密码 | 密码 |
| https | HTTPS | 安全连接 |
| enhanced_encryption | 增强加密 | 加密 |
| policy | 策略 | 策略 |
| privacy_tip | 隐私提示 | 隐私 |
| dns | DNS | DNS |
| dataset | 数据集 | 数据 |
| dataset_linked | 关联数据集 | 关联 |
| rule | 规则 | 规则 |
| rule_folder | 规则集 | 规则组 |
| layers | 图层 | 多层 |
| layers_clear | 清除图层 | 移除层 |
| category | 分类 | 类别 |
| widgets | 小部件 | 小组件 |
| extension | 扩展 | 插件 |
| plugin | 插件 | 扩展 |
| add_circle_outline | 添加（圆） | 添加 |
| toggle_on | 开关（开） | 启用 |
| toggle_off | 开关（关） | 关闭 |
| switch_left | 切换左 | 切换 |
| switch_right | 切换右 | 切换 |
| backup | 备份 | 数据备份 |
| restore_outlined | 还原（空心） | 还原 |
| restore_from_trash | 从回收站还原 | 撤销删除 |

## 11. 通用动作

| Icon | 名称 | 用途 |
|------|------|------|
| add | 添加 | 新增 |
| add_circle | 添加（圆） | 新增按钮 |
| add_circle_outline | 添加（圆空心） | 添加备选 |
| add_box | 添加（方形） | 新增按钮 |
| remove | 移除 | 减少 |
| remove_circle | 移除（圆） | 减少按钮 |
| remove_circle_outline | 移除（圆空心） | 减少备选 |
| remove_red_eye | 显示密码 | 显隐 |
| clear | 清除 | 清空 |
| close | 关闭 | 关弹窗 |
| create | 创建 | 新建 |
| edit | 编辑 | 修改 |
| edit_note | 编辑便签 | 备注编辑 |
| delete | 删除 | 删除 |
| delete_outline | 删除（空心） | 软删除 |
| delete_sweep | 批量删除 | 清扫 |
| delete_forever | 永久删除 | 真删 |
| save | 保存 | 落盘 |
| save_alt | 保存（备选） | 快速保存 |
| save_as | 另存为 | 副本 |
| undo | 撤销 | 后退 |
| redo | 重做 | 前进 |
| done | 完成 | 标记完成 |
| done_outline | 完成（空心） | 软完成 |
| done_all | 全部完成 | 批量完成 |
| content_copy | 复制 | 复制 |
| content_cut | 剪切 | 剪切 |
| content_paste | 粘贴 | 粘贴 |
| search | 搜索 | 查找 |
| search_off | 搜索（关） | 关闭 |
| find_in_page | 页面查找 | 查找 |
| find_replace | 查找替换 | 替换 |
| refresh | 刷新 | 重载 |
| sync | 同步 | 同步 |
| more_vert | 垂直更多 | 菜单 |
| more_horiz | 水平更多 | 横向菜单 |
| expand_more | 展开 | 展开 |
| expand_less | 收起 | 收起 |
| menu | 菜单 | 导航 |
| filter_list | 筛选 | 列表 |
| filter_alt | 筛选（实心） | 条件筛选 |
| filter_alt_off | 筛选（关） | 关闭筛选 |
| filter_drama | 滤镜 | 图像滤镜 |
| sort | 排序 | 排序 |
| sort_by_alpha | 字母排序 | A-Z |
| swap_horiz | 水平切换 | 左右换 |
| swap_vert | 垂直切换 | 上下换 |
| open_in_new | 新窗口 | 外链 |
| open_in_full | 全屏打开 | 全屏进入 |
| close_fullscreen | 关闭全屏 | 全屏退出 |
| fullscreen | 全屏 | 进入全屏 |
| fullscreen_exit | 退出全屏 | 退出全屏 |
| launch | 启动 | 跳转 |
| share | 分享 | 转发 |
| share_outlined | 分享（空心） | 分享备选 |
| link | 链接 | 关联 |
| link_off | 链接（关） | 断开 |
| call_made | 已拨出 | 呼出 |
| call_received | 已接入 | 呼入 |
| send | 发送 | 推送 |
| attach_file | 附件 | 附加 |
| attach_money | 美元 | 金额 |
| bookmark | 书签 | 标记 |
| bookmark_border | 书签（空心） | 加书签 |
| bookmark_add | 添加书签 | 加书签 |
| flag | 标记 | 重要 |
| flag_outlined | 标记（空心） | 待标记 |
| push_pin | 图钉 | 置顶 |
| push_pin_outlined | 图钉（空心） | 可置顶 |
| logout | 登出 | 注销 |
| login | 登录 | 登录 |
| exit_to_app | 退出应用 | 退出 |
| input | 输入 | 导入 |
| output | 输出 | 导出 |
| copy | 复制（短） | 复制 |
| cut | 剪切（短） | 剪切 |
| paste | 粘贴（短） | 粘贴 |
| archive | 归档 | 归档 |
| archive_outline | 归档（空心） | 软归档 |
| unarchive | 取消归档 | 还原 |
| restore | 还原 | 恢复 |
| restore_from_trash | 从回收站还原 | 撤销删除 |
| restore_page | 还原页 | 页面还原 |
| history | 历史 | 历史 |
| history_toggle_off | 关闭历史 | 不记录 |
| update | 更新 | 升级 |
| autorenew | 自动 | 自动 |
| replay | 重放 | 重试 |
| cached | 缓存 | 重算 |
| loop | 循环 | 循环 |
| compare_arrows | 对比 | A/B |

## 12. 设备 / 硬件

| Icon | 名称 | 用途 |
|------|------|------|
| computer | 电脑 | 台式机 |
| laptop_chromebook | Chromebook | 笔记本 |
| laptop_mac | Mac 笔记本 | Mac |
| laptop_windows | Windows 笔记本 | Win |
| monitor | 显示器 | 屏幕 |
| desktop_windows | Windows 桌面 | 桌面 |
| devices | 设备 | 多设备 |
| smartphone | 智能手机 | 手机 |
| phone_iphone | iPhone | iPhone |
| tablet_mac | Mac 平板 | iPad |
| tablet_android | Android 平板 | 安卓平板 |
| tablet | 平板 | 通用平板 |
| watch | 手表 | 智能手表 |
| watch_off | 手表（关） | 关闭 |
| headphones | 耳机 | 头戴 |
| headset | 头戴耳机 | 通话 |
| headset_mic | 耳麦 | 麦克 |
| headset_off | 耳机（关） | 关闭 |
| keyboard | 键盘 | 输入 |
| keyboard_alt | 键盘（备选） | 软键盘 |
| keyboard_arrow_down | 键盘下键 | 下箭头 |
| keyboard_arrow_up | 键盘上键 | 上箭头 |
| keyboard_arrow_left | 键盘左键 | 左箭头 |
| keyboard_arrow_right | 键盘右键 | 右箭头 |
| keyboard_backspace | 退格键 | 删除键 |
| router | 路由器 | 网络设备 |
| scanner | 扫描仪 | 扫描 |
| sensors | 传感器 | IoT |
| sensors_off | 传感器（关） | 关闭 |
| dock | 底座 | 对接 |
| power | 电源 | 开关 |
| power_settings_new | 电源设置新 | 设置电源 |
| battery_charging | 电池充电 | 充电中 |
| battery_full | 满电 | 满格 |
| battery_5_bar | 5 格电量 | 80%+ |
| battery_alert | 电量警告 | 低电量 |
| battery_unknown | 电量未知 | 未知 |
| battery_saver | 省电模式 | 省电 |
| usb | USB | USB |
| sd_storage | SD 卡 | SD |
| storage | 存储 | 存储 |
| sim_card | SIM 卡 | SIM |
| sim_card_download | SIM 下载 | 下载卡 |
| sim_card_alert | SIM 警告 | 卡故障 |
| cable | 线缆 | 数据线 |
| wifi | Wi-Fi | 无线 |
| wifi_off | Wi-Fi（关） | 关闭无线 |
| wifi_tethering | Wi-Fi 热点 | 热点 |
| wifi_password | Wi-Fi 密码 | 输入密码 |
| wifi_lock | Wi-Fi 加密 | 加密 |
| bluetooth | 蓝牙 | 蓝牙 |
| bluetooth_audio | 蓝牙音频 | 蓝牙声 |
| bluetooth_connected | 蓝牙已连 | 连接 |
| bluetooth_disabled | 蓝牙已禁 | 禁用 |
| bluetooth_search | 蓝牙搜索 | 搜索 |
| signal_cellular | 信号 | 移动信号 |
| signal_cellular_alt | 信号（备选） | 信号 |
| signal_wifi | Wi-Fi 信号 | 信号 |
| network_check | 网络检查 | 检测 |
| network_locked | 网络锁定 | 加密 |
| network_wifi | 无线网络 | 无线 |
| vpn_lock | VPN 锁 | VPN 加密 |
| vpn_key | VPN 密钥 | VPN |
| memory | 内存 | 内存 |
| developer_board | 开发板 | 开发 |
| developer_mode | 开发者模式 | 开发者 |
| dvr | DVR | 录像机 |
| cast | 投屏 | 投射 |
| cast_for_education | 教育投屏 | 教育投射 |

## 13. 媒体 / 通讯

| Icon | 名称 | 用途 |
|------|------|------|
| email | 邮件 | 邮件 |
| mail | 邮件（简） | 邮件 |
| mail_outline | 邮件（空心） | 未读 |
| drafts | 草稿 | 草稿 |
| inbox | 收件箱 | 收件 |
| send | 发送 | 推送 |
| markunread | 未读 | 标记未读 |
| mark_email_read | 邮件已读 | 已读 |
| mark_email_unread | 邮件未读 | 未读 |
| forum | 论坛 | 讨论 |
| chat | 聊天 | 即时通讯 |
| chat_bubble | 聊天气泡 | 对话 |
| chat_bubble_outline | 聊天气泡（空心） | 对话入口 |
| message | 消息 | IM |
| comment | 评论 | 评论 |
| comment_outline | 评论（空心） | 软评论 |
| sms | 短信 | 短信 |
| sms_failed | 短信失败 | 失败 |
| call | 通话 | 呼叫 |
| call_end | 通话结束 | 挂断 |
| call_made | 拨出 | 呼出 |
| call_merge | 合并通话 | 合并 |
| call_missed | 未接 | 漏接 |
| call_missed_outgoing | 未接（呼出） | 漏接 |
| call_received | 接入 | 呼入 |
| call_split | 分离通话 | 分线 |
| video_call | 视频通话 | 视频 |
| video_camera_front | 前置摄像头 | 自拍 |
| video_camera_back | 后置摄像头 | 主摄 |
| videocam | 视频 | 录像 |
| videocam_off | 视频（关） | 关闭 |
| videodisc | 视频光盘 | 光盘 |
| video_chat | 视频聊天 | 视频对话 |
| voice_chat | 语音聊天 | 语音对话 |
| voice_over_off | 关闭语音解说 | 无障碍 |
| phone | 电话 | 电话 |
| phone_in_talk | 通话中 | 进行中 |
| phone_callback | 回拨 | 回拨 |
| phone_disabled | 电话（禁） | 禁用 |
| phone_enabled | 电话（启） | 启用 |
| phone_forwarded | 已转接 | 转接 |
| phone_locked | 电话（锁） | 锁定 |
| phone_missed | 未接 | 漏接 |
| phone_paused | 电话（暂停） | 暂停 |
| dialpad | 拨号盘 | 拨号 |
| voicemail | 语音邮件 | 留言 |
| contact_phone | 联系电话 | 联系方式 |
| contact_mail | 联系邮件 | 联系 |
| contacts | 联系人 | 通讯录 |
| speaker_phone | 扬声器 | 免提 |
| volume_up | 音量加 | 大声 |
| volume_down | 音量减 | 小声 |
| volume_mute | 静音 | 静音 |
| volume_off | 关闭音量 | 关声 |
| mic | 麦克风 | 话筒 |
| mic_off | 麦克风（关） | 禁麦 |
| mic_external_off | 外置麦（关） | 关闭 |
| mic_external_on | 外置麦（开） | 开启 |
| live_tv | 直播电视 | 直播 |
| ondemand | 点播 | 按需 |
| ondemand_video | 点播视频 | 视频点播 |
| podcast | 播客 | 播客 |
| queue_music | 音乐队列 | 播放列表 |
| library_music | 音乐库 | 媒体库 |
| library_add | 加入库 | 加入 |
| library_books | 书库 | 文档 |
| album | 专辑 | 音乐 |
| equalizer | 均衡器 | 音频 |
| graphic_eq | 图形均衡 | 调节 |
| surround_sound | 环绕声 | 音效 |
| playlist_play | 播放列表播放 | 播放 |
| playlist_add | 添加到列表 | 加入 |
| playlist_add_check | 列表添加（勾） | 确认 |
| playlist_remove | 列表移除 | 移除 |
| play_circle | 播放 | 播放 |
| play_circle_outline | 播放（空心） | 启动 |
| play_arrow | 播放箭头 | 播放 |
| pause | 暂停 | 暂停 |
| pause_circle | 暂停（圆） | 暂停 |
| pause_circle_outline | 暂停（圆空心） | 暂停入口 |
| stop | 停止 | 停止 |
| stop_circle | 停止（圆） | 停止 |
| fast_forward | 快进 | 前进 |
| fast_rewind | 快退 | 后退 |
| skip_next | 下一首 | 下一 |
| skip_previous | 上一首 | 上一 |
| replay | 重放 | 重放 |
| replay_10 | 回放 10s | 回放 |
| replay_30 | 回放 30s | 回放 |
| replay_5 | 回放 5s | 回放 |
| repeat | 重复 | 循环 |
| repeat_one | 单曲循环 | 单曲 |
| shuffle | 随机 | 随机播放 |
| loop | 循环 | 循环 |
| fiber_manual_record | 录制（红点） | 录制 |
| fiber_new | 新 | NEW |
| fiber_smart_record | 智能录制 | 智能 |
| fiber_dvr | DVR | 录像 |
| hd | 高清 | HD |
| high_quality | 高画质 | 高清 |
| slow_motion_video | 慢动作 | 慢放 |
| straight_letter | 直邮信件 | 邮件 |

## 14. 地点 / 地图

| Icon | 名称 | 用途 |
|------|------|------|
| place | 地点 | 位置 |
| location_on | 位置（开） | 已定位 |
| location_off | 位置（关） | 关闭 |
| location_searching | 定位中 | 搜索 |
| location_history | 历史位置 | 轨迹 |
| my_location | 我的位置 | 当前位置 |
| pin_drop | 钉地点 | 落点 |
| map | 地图 | 区域 |
| map_outlined | 地图（空心） | 地图入口 |
| alt_route | 备选路线 | 改道 |
| route | 路线 | 路径 |
| directions | 路线 | 导航 |
| directions_bike | 单车 | 骑行 |
| directions_boat | 船 | 水路 |
| directions_bus | 公交 | 陆路 |
| directions_car | 汽车 | 驾车 |
| directions_ferry | 渡轮 | 渡口 |
| directions_subway | 地铁 | 轨道 |
| directions_train | 火车 | 铁路 |
| directions_transit | 公交 | 公共交通 |
| directions_walk | 步行 | 走路 |
| directions_run | 跑步 | 跑步 |
| layers | 图层 | 多层 |
| layers_clear | 清除图层 | 移除 |
| public | 公共 | 全球 |
| public_off | 公共（关） | 关闭 |
| globe_asia | 亚洲地球 | 区域 |
| language | 语言 | 多语 |
| translate | 翻译 | 翻译 |
| flight | 航班 | 飞行 |
| flight_takeoff | 起飞 | 出发 |
| flight_land | 降落 | 到达 |
| local_airport | 机场 | 机场 |
| local_activity | 活动 | 娱乐 |
| local_atm | ATM | 取款 |
| local_attraction | 景点 | 旅游 |
| local_bar | 酒吧 | 夜场 |
| local_cafe | 咖啡馆 | 咖啡 |
| local_car_wash | 洗车 | 洗车 |
| local_convenience_store | 便利店 | 便利 |
| local_dining | 餐饮 | 餐饮 |
| local_drink | 饮品 | 饮料 |
| local_fire_department | 消防 | 应急 |
| local_florist | 花店 | 花 |
| local_gas_station | 加油站 | 油站 |
| local_grocery_store | 杂货店 | 超市 |
| local_hospital | 医院 | 医疗 |
| local_hotel | 酒店 | 住宿 |
| local_laundry_service | 洗衣 | 洗护 |
| local_library | 图书馆 | 阅读 |
| local_mall | 商场 | 商城 |
| local_movies | 影院 | 电影 |
| local_parking | 停车 | 停车 |
| local_pharmacy | 药房 | 药 |
| local_phone | 公话 | 电话 |
| local_pizza | 披萨 | 外卖 |
| local_play | 游乐场 | 娱乐 |
| local_police | 警察 | 警务 |
| local_post_office | 邮局 | 邮政 |
| local_printshop | 打印店 | 打印 |
| local_see | 观景 | 风景 |
| local_shipping | 本地运输 | 物流 |
| local_taxi | 出租车 | 打车 |
| local_travel | 旅行 | 旅游 |
| park | 公园 | 园区 |
| terrain | 地形 | 地形 |
| traffic | 交通 | 交通流量 |
| travel_explore | 旅行探索 | 探索 |
| where_to_vote | 投票点 | 投票 |
| wine_bar | 酒吧（酒） | 酒馆 |

---

## 附录

### 完整图标库

本文档只精选 dashboard 场景常用图标（约 350+）。完整列表（约 2000+ 条）
参见 Google 官方：

- [fonts.google.com/icons](https://fonts.google.com/icons)
  （Selected style = **Material Icons** / Filled）
- npm 包 [`material-icons@1.13.14`](https://www.npmjs.com/package/material-icons)
  与本项目使用的字体一致。

### 切换到 Outlined 样式

CSS 中同时声明了 `Material Icons Outlined` 字体。要切换某个图标到 outlined
样式，可在 `<q-icon>` 上加 `class="material-icons-outlined"` 并使用同一
ligature 名：

```html
<q-icon name="inventory_2" class="material-icons-outlined"/>
```

Outlined 与 Filled 共用同一份 ligature 字符集（即同一图标名），仅渲染样式
不同。

### 参考其它文档

- `doc/qapps2-dashboard.md` — dashboard kit 总览（`m-dash-stat` 等组件 API）
- `doc/qapps2-requirements.md` — qapps2 组件需求
- `doc/upstream-qapps-sync.md` — 与上游 `/qapps` 的同步状态