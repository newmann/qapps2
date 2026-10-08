# qapps2 Font Awesome 参考

qapps2 FTL 宏（`<submit>`、`<reset>`、`<link>`、`<field>` 等）的 `icon` 属性
以及遗留 Moqui XML 屏的按钮图标，都使用 **Font Awesome**。本文按 dashboard
场景分组，列出约 350+ 高频可用的图标。

字体包：`font-awesome/6.7.2` LTS + v4 shims（`build.gradle:30-42`）
CSS：`screen/qapps2static/libs/font-awesome/css/all.min.css` +
`v4-shims.min.css` + `v4-font-face.min.css`
加载：主题 `DEFAULT_QUASAR2` 通过 `ScreenThemeResource` 注入

## 与 Material Icons 的区别

详见 `doc/qapps2-icon-systems.md`。简记：

- Vue 组件（`m-dash-*`、`<q-icon name="...">`） → 用 **Material Icons ligature**
- FTL 宏（`icon="..."` 属性） → 用 **Font Awesome class**

本文档只覆盖 Font Awesome。

## 用法

### FTL 宏（推荐）

```xml
<form-single>
    <field name="username"><text-field/></field>
    <field name="password"><password/></field>
    <submit name="login" text="登录"/>      <!-- 自动选图标 fa fa-search / fa fa-sign-in-alt -->
    <submit name="save"   text="保存" icon="fa fa-save"/>   <!-- 显式指定 -->
</form-single>
```

宏内默认按按钮文字匹配（`DefaultScreenMacros.qvt2.ftl:2162-2178`）；也可
直接写 `icon="fa fa-…"` 或 `icon="fas fa-…"` 覆盖。主题级 `ScreenThemeIcon`
（`Qapps2ThemeData.xml:44-53`）也参与匹配。

### 直接写 HTML（绕过 `<q-icon>` 的 iconSet 解析）

```html
<q-btn><i class="fa fa-save q-icon on-left"></i>保存</q-btn>
<q-btn flat round><i class="fas fa-search"></i><q-tooltip>搜索</q-tooltip></q-btn>
```

注意：`<q-icon name="fa fa-search">` **不会**渲染 FA 图标（Quasar 2 UMD 默认
将 `name` 当 ligature 查找）。要使用 FA 必须写 `<i class="fa fa-…">` 或放进
slot。

### 在 `m-dash-*` 组件里用 FA

`m-dash-*` 组件的 `icon` prop 是 Material Icons。如要 FA 图标，请把 `<i class>`
放进默认 slot 或 toolbar slot：

```vue
<m-dash-panel title="财务">
    <i class="fa fa-dollar-sign" slot="toolbar"></i>
    <m-chart ...>      <!-- 内容区 -->
</m-dash-panel>
```

## 命名约定

| 写法 | 含义 | 备注 |
|---|---|---|
| `fa fa-search` | v4 兼容写法 | 走 `v4-shims.min.css` 自动映射到 v6 |
| `fas fa-search` | v6 Solid（默认 900 实心） | 推荐 |
| `far fa-search` | v6 Regular（空心） | 仅部分图标有 Regular 版 |
| `fal fa-search` | v6 Light | **不推荐**（Pro only） |
| `fat fa-search` | v6 Thin | **不推荐**（Pro only） |
| `fab fa-github` | v6 Brands（品牌） | 推荐品牌图标 |
| `fa-solid fa-search` | v6 显式前缀 | 与官方文档一致 |

本文档优先列出 v4 写法（与项目当前 FTL 宏一致），右侧备注 v6 推荐写法。

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
15. [品牌 / Brands](#15-品牌--brands)

---

## 1. KPI / 指标

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-line-chart` | `fas fa-chart-line` | 折线图 | 趋势 |
| `fa fa-bar-chart` / `fa fa-bar-chart-o` | `fas fa-chart-column` | 柱状图 | 分类对比 |
| `fa fa-pie-chart` | `fas fa-chart-pie` | 饼图 | 占比 |
| `fa fa-area-chart` | `fas fa-chart-area` | 面积图 | 趋势构成 |
| `fa fa-chart-line` | `fas fa-chart-line` | 折线图 | 趋势 |
| `fa fa-chart-bar` | `fas fa-chart-simple` | 条形图 | 简化柱状 |
| `fa fa-gauge` | `fas fa-gauge` | 仪表 | 仪表盘入口 |
| `fa fa-tachometer` | `fas fa-gauge-high` | 高速仪表 | 高优先 |
| `fa fa-tachometer-alt` | `fas fa-gauge-high` | 高速仪表（新） | 高优先 |
| `fa fa-tachometer-alt-average` | `fas fa-gauge` | 中速仪表 | 中 |
| `fa fa-tachometer-alt-fast` | `fas fa-gauge-max` | 极速仪表 | 满 |
| `fa fa-tachometer-alt-slow` | `fas fa-gauge-low` | 低速仪表 | 低 |
| `fa fa-bullseye` | `fas fa-bullseye` | 靶心 | KPI 命中 |
| `fa fa-signal` | `fas fa-signal` | 信号 | 信号强度 |
| `fa fa-arrow-trend-up` | `fas fa-arrow-trend-up` | 上升趋势 | 增长 |
| `fa fa-arrow-trend-down` | `fas fa-arrow-trend-down` | 下降趋势 | 下滑 |
| `fa fa-arrows-up-down` | `fas fa-arrows-up-down` | 上下箭头 | 涨跌 |
| `fa fa-arrows-up-down-left-right` | `fas fa-arrows-up-down-left-right` | 四向 | 全面 |
| `fa fa-calculator` | `fas fa-calculator` | 计算器 | 数值汇总 |
| `fa fa-percent` | `fas fa-percent` | 百分比 | 比率 |
| `fa fa-arrows-to-dot` | `fas fa-arrows-to-dot` | 汇聚 | 收敛 |
| `fa fa-arrows-from-dot` | `fas fa-arrows-from-dot` | 发散 | 分散 |
| `fa fa-trophy` | `fas fa-trophy` | 奖杯 | 第一名 |
| `fa fa-award` | `fas fa-award` | 奖项 | 表彰 |
| `fa fa-medal` | `fas fa-medal` | 勋章 | 排名 |
| `fa fa-podium` | `fas fa-podium` | 领奖台 | Top 3 |
| `fa fa-ranking-star` | `fas fa-ranking-star` | 星级排名 | 排行榜 |
| `fa fa-bolt` | `fas fa-bolt` | 闪电 | 突发 |
| `fa fa-rocket` | `fas fa-rocket` | 火箭 | 启动 |

## 2. 状态 / 进度

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-check` | `fas fa-check` | 勾 | 确认 |
| `fa fa-check-circle` / `fa fa-check-circle-o` | `fas fa-circle-check` / `far fa-circle-check` | 完成（圆） | 任务完成 |
| `fa fa-check-square` / `fa fa-check-square-o` | `fas fa-square-check` / `far fa-square-check` | 完成（方） | 表单确认 |
| `fa fa-check-double` | `fas fa-check-double` | 双勾 | 全部完成 |
| `fa fa-times` / `fa fa-close` / `fa fa-times-circle` | `fas fa-xmark` / `fas fa-circle-xmark` | 关闭 / 取消 | 取消 |
| `fa fa-exclamation` | `fas fa-exclamation` | 感叹号 | 警告 |
| `fa fa-exclamation-triangle` | `fas fa-triangle-exclamation` | 三角警告 | 风险 |
| `fa fa-exclamation-circle` | `fas fa-circle-exclamation` | 圆警告 | 中度 |
| `fa fa-info` | `fas fa-circle-info` | 信息 | 提示 |
| `fa fa-info-circle` | `fas fa-circle-info` | 信息（圆） | 备注 |
| `fa fa-question` | `fas fa-circle-question` | 提问 | 帮助 |
| `fa fa-question-circle` / `fa fa-question-circle-o` | `fas fa-circle-question` / `far fa-circle-question` | 提问（圆） | 引导 |
| `fa fa-spinner` | `fas fa-spinner` | 旋转 | 加载中 |
| `fa fa-sync` / `fa fa-refresh` | `fas fa-arrows-rotate` | 同步 / 刷新 | 重载 |
| `fa fa-hourglass` | `fas fa-hourglass` | 沙漏 | 倒计时 |
| `fa fa-hourglass-half` | `fas fa-hourglass-half` | 沙漏半 | 进行中 |
| `fa fa-hourglass-start` | `fas fa-hourglass-start` | 沙漏开始 | 即将开始 |
| `fa fa-hourglass-end` | `fas fa-hourglass-end` | 沙漏结束 | 即将结束 |
| `fa fa-hourglass-o` | `far fa-hourglass` | 沙漏空心 | 等待 |
| `fa fa-clock` / `fa fa-clock-o` | `fas fa-clock` / `far fa-clock` | 时钟 | 时长 |
| `fa fa-clock-rotate-left` | `fas fa-clock-rotate-left` | 历史时钟 | 历史 |
| `fa fa-history` | `fas fa-clock-rotate-left` | 历史（v4） | 历史记录 |
| `fa fa-undo` | `fas fa-arrow-rotate-left` | 撤销 | 后退 |
| `fa fa-redo` | `fas fa-arrow-rotate-right` | 重做 | 前进 |
| `fa fa-rotate-left` | `fas fa-arrow-rotate-left` | 左旋 | 撤销 |
| `fa fa-rotate-right` | `fas fa-arrow-rotate-right` | 右旋 | 重做 |
| `fa fa-pause` / `fa fa-pause-circle` / `fa fa-pause-circle-o` | `fas fa-pause` / `fas fa-circle-pause` | 暂停 | 暂停 |
| `fa fa-play` / `fa fa-play-circle` / `fa fa-play-circle-o` | `fas fa-play` / `fas fa-circle-play` | 播放 | 启动 |
| `fa fa-stop` / `fa fa-stop-circle` / `fa fa-stop-circle-o` | `fas fa-stop` / `fas fa-circle-stop` | 停止 | 终止 |
| `fa fa-circle` / `fa fa-circle-o` | `fas fa-circle` / `far fa-circle` | 圆 | 占位 |
| `fa fa-dot-circle` / `fa fa-dot-circle-o` | `fas fa-circle-dot` / `far fa-circle-dot` | 点圆 | 单选 |
| `fa fa-circle-notch` | `fas fa-circle-notch` | 缺口圆 | 加载 |
| `fa fa-star` / `fa fa-star-o` | `fas fa-star` / `far fa-star` | 星 | 评分 |
| `fa fa-star-half` / `fa fa-star-half-o` / `fa fa-star-half-empty` | `fas fa-star-half-stroke` | 半星 | 中等 |
| `fa fa-bookmark` / `fa fa-bookmark-o` | `fas fa-bookmark` / `far fa-bookmark` | 书签 | 标记 |
| `fa fa-flag` / `fa fa-flag-o` / `fa fa-flag-checkered` | `fas fa-flag` / `far fa-flag` / `fas fa-flag-checkered` | 标记 | 重要 |
| `fa fa-thumbs-up` / `fa fa-thumbs-o-up` | `fas fa-thumbs-up` / `far fa-thumbs-up` | 点赞 | 同意 |
| `fa fa-thumbs-down` / `fa fa-thumbs-o-down` | `fas fa-thumbs-down` / `far fa-thumbs-down` | 点踩 | 反对 |
| `fa fa-ban` | `fas fa-ban` | 禁止 | 禁用 |
| `fa fa-lock` / `fa fa-lock-open` | `fas fa-lock` / `fas fa-lock-open` | 锁 / 开锁 | 锁定 |
| `fa fa-bell` / `fa fa-bell-o` / `fa fa-bell-slash` | `fas fa-bell` / `far fa-bell` / `fas fa-bell-slash` | 通知 | 提醒 |
| `fa fa-circle-half-stroke` | `fas fa-circle-half-stroke` | 半圆 | 进度环 |
| `fa fa-battery-half` | `fas fa-battery-half` | 电量半 | 进度 |
| `fa fa-tasks` | `fas fa-list-check` | 任务 | 任务 |

## 3. 订单 / 销售

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-shopping-cart` | `fas fa-cart-shopping` | 购物车 | 订单 |
| `fa fa-shopping-bag` | `fas fa-bag-shopping` | 购物袋 | 零售 |
| `fa fa-shopping-basket` | `fas fa-basket-shopping` | 购物篮 | 采购 |
| `fa fa-cart-plus` | `fas fa-cart-plus` | 加入购物车 | 下单 |
| `fa fa-cart-arrow-down` | `fas fa-cart-arrow-down` | 移出购物车 | 撤销 |
| `fa fa-store` | `fas fa-store` | 商店 | 门店 |
| `fa fa-cash-register` | `fas fa-cash-register` | 收银机 | POS |
| `fa fa-receipt` | `fas fa-receipt` | 小票 | 单据 |
| `fa fa-file-invoice` | `fas fa-file-invoice` | 发票 | 财务单据 |
| `fa fa-file-invoice-dollar` | `fas fa-file-invoice-dollar` | 美元发票 | 报价单 |
| `fa fa-tag` | `fas fa-tag` | 标签 | 单价 |
| `fa fa-tags` | `fas fa-tags` | 标签（复数） | 多价 |
| `fa fa-money-bill` | `fas fa-money-bill` | 现金 | 金额 |
| `fa fa-money-bill-alt` / `fa fa-money-bill-1` | `fas fa-money-bill-1` | 单张现金 | 金额 |
| `fa fa-money-bill-wave` | `fas fa-money-bill-wave` | 现金波动 | 收入 |
| `fa fa-money-bill-wave-alt` | `fas fa-money-bill-wave-alt` | 现金波动（新） | 收入 |
| `fa fa-money-check` | `fas fa-money-check` | 支票 | 付款 |
| `fa fa-money-check-alt` / `fa fa-money-check-dollar` | `fas fa-money-check-dollar` | 美元支票 | 支付 |
| `fa fa-coins` | `fas fa-coins` | 硬币 | 零钱 |
| `fa fa-coin` | `fas fa-coin` | 单硬币 | 货币 |
| `fa fa-dollar` / `fa fa-dollar-sign` | `fas fa-dollar-sign` | 美元 | 货币 |
| `fa fa-euro` / `fa fa-euro-sign` | `fas fa-euro-sign` | 欧元 | 货币 |
| `fa fa-pound-sign` / `fa fa-gbp` | `fas fa-pound-sign` | 英镑 | 货币 |
| `fa fa-yen-sign` / `fa fa-jpy` / `fa fa-yen` | `fas fa-yen-sign` | 日元 | 货币 |
| `fa fa-won-sign` / `fa fa-krw` / `fa fa-won` | `fas fa-won-sign` | 韩元 | 货币 |
| `fa fa-rupee-sign` / `fa fa-inr` | `fas fa-rupee-sign` | 卢比 | 货币 |
| `fa fa-ruble-sign` / `fa fa-rub` | `fas fa-ruble-sign` | 卢布 | 货币 |
| `fa fa-lira-sign` / `fa fa-try` | `fas fa-lira-sign` | 里拉 | 货币 |
| `fa fa-bitcoin-sign` / `fa fa-btc` | `fas fa-bitcoin-sign` | 比特币 | 数字货币 |
| `fa fa-credit-card` / `fa fa-credit-card-alt` | `fas fa-credit-card` | 信用卡 | 支付 |
| `fa fa-wallet` | `fas fa-wallet` | 钱包 | 余额 |
| `fa fa-gift` | `fas fa-gift` | 礼物 | 礼品卡 |
| `fa fa-suitcase` / `fa fa-suitcase-rolling` | `fas fa-suitcase` / `fas fa-suitcase-rolling` | 行李 | 出差 |
| `fa fa-briefcase` | `fas fa-briefcase` | 公文包 | 商务 |
| `fa fa-briefcase-business` | `fas fa-briefcase-business` | 商务公文包 | 商务 |
| `fa fa-barcode` | `fas fa-barcode` | 条码 | 标签 |
| `fa fa-qrcode` | `fas fa-qrcode` | 二维码 | 标签 |
| `fa fa-truck-ramp-box` | `fas fa-truck-ramp-box` | 装卸 | 物流 |
| `fa fa-boxes-stacked` / `fa fa-boxes` / `fa fa-boxes-alt` | `fas fa-boxes-stacked` | 箱子堆 | 库存 |
| `fa fa-box-archive` / `fa fa-archive` | `fas fa-box-archive` | 归档箱 | 归档 |
| `fa fa-box-open` | `fas fa-box-open` | 开箱 | 拆包 |
| `fa fa-industry` | `fas fa-industry` | 工厂 | 生产 |
| `fa fa-sitemap` | `fas fa-sitemap` | 站点地图 | 结构 |
| `fa fa-list-check` / `fa fa-tasks` | `fas fa-list-check` | 任务列表 | 订单 |

## 4. 库存 / 物流

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-warehouse` | `fas fa-warehouse` | 仓库 | 仓储 |
| `fa fa-truck` | `fas fa-truck` | 卡车 | 配送 |
| `fa fa-truck-fast` | `fas fa-truck-fast` | 快运 | 加急 |
| `fa fa-truck-moving` | `fas fa-truck-moving` | 搬运 | 移动 |
| `fa fa-truck-monster` | `fas fa-truck-monster` | 越野车 | 重型 |
| `fa fa-truck-pickup` | `fas fa-truck-pickup` | 皮卡 | 短途 |
| `fa fa-shipping-fast` | `fas fa-truck-fast` | 快速发货 | 加急 |
| `fa fa-truck-loading` | `fas fa-truck-loading` | 装车 | 装货 |
| `fa fa-plane` | `fas fa-plane` | 飞机 | 空运 |
| `fa fa-plane-departure` | `fas fa-plane-departure` | 起飞 | 出发 |
| `fa fa-plane-arrival` | `fas fa-plane-arrival` | 降落 | 到达 |
| `fa fa-ship` | `fas fa-ship` | 船 | 水运 |
| `fa fa-train` | `fas fa-train` | 火车 | 铁路 |
| `fa fa-train-subway` / `fa fa-subway` | `fas fa-train-subway` | 地铁 | 轨道 |
| `fa fa-train-tram` | `fas fa-train-tram` | 有轨电车 | 城市轨道 |
| `fa fa-bus` | `fas fa-bus` | 公交 | 班车 |
| `fa fa-bus-alt` | `fas fa-bus-simple` | 公交（新） | 班车 |
| `fa fa-bicycle` | `fas fa-bicycle` | 单车 | 骑行 |
| `fa fa-motorcycle` | `fas fa-motorcycle` | 摩托 | 派送 |
| `fa fa-taxi` / `fa fa-cab` | `fas fa-taxi` | 出租车 | 打车 |
| `fa fa-shuttle-van` / `fa fa-van-shuttle` | `fas fa-van-shuttle` | 班车 | 接驳 |
| `fa fa-route` | `fas fa-route` | 路线 | 路径 |
| `fa fa-road` | `fas fa-road` | 道路 | 公路 |
| `fa fa-map-marker` / `fa fa-map-marker-alt` | `fas fa-location-dot` | 位置点 | 地址 |
| `fa fa-map-pin` | `fas fa-map-pin` | 图钉 | 落点 |
| `fa fa-location-arrow` | `fas fa-location-arrow` | 定位箭头 | 方向 |
| `fa fa-map` | `fas fa-map` | 地图 | 区域 |
| `fa fa-map-location` | `fas fa-map-location` | 地图位置 | 标记 |
| `fa fa-map-location-dot` | `fas fa-map-location-dot` | 地图位置点 | 详细 |
| `fa fa-barcode` | `fas fa-barcode` | 条码 | 标签 |
| `fa fa-qrcode` | `fas fa-qrcode` | 二维码 | 标签 |
| `fa fa-box` / `fa fa-cube` | `fas fa-box` | 箱子 | 单件 |
| `fa fa-boxes-stacked` / `fa fa-boxes` | `fas fa-boxes-stacked` | 箱子堆 | 多件 |
| `fa fa-box-open` | `fas fa-box-open` | 开箱 | 拆包 |
| `fa fa-pallet` | `fas fa-pallet` | 托盘 | 装卸 |
| `fa fa-container-storage` | `fas fa-container-storage` | 集装箱 | 货柜 |
| `fa fa-dolly` / `fa fa-dolly-box` | `fas fa-dolly` / `fas fa-dolly-box` | 推车 | 搬运 |
| `fa fa-industry` | `fas fa-industry` | 工厂 | 制造 |
| `fa fa-forklift` | `fas fa-forklift` | 叉车（v6） | 物流 |

## 5. 通知 / 提醒

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-bell` / `fa fa-bell-o` | `fas fa-bell` / `far fa-bell` | 通知 | 提醒 |
| `fa fa-bell-slash` / `fa fa-bell-slash-o` | `fas fa-bell-slash` / `far fa-bell-slash` | 通知（关） | 静音 |
| `fa fa-bell-concierge` | `fas fa-bell-concierge` | 礼宾铃 | 服务 |
| `fa fa-envelope` / `fa fa-envelope-o` | `fas fa-envelope` / `far fa-envelope` | 邮件 | 收件 |
| `fa fa-envelope-open` / `fa fa-envelope-open-o` | `fas fa-envelope-open` / `far fa-envelope-open` | 邮件（开） | 已读 |
| `fa fa-envelopes-bulk` | `fas fa-envelopes-bulk` | 群发邮件 | 群发 |
| `fa fa-inbox` / `fa fa-inboxes` | `fas fa-inbox` / `fas fa-inboxes` | 收件箱 | 收件 |
| `fa fa-paper-plane` / `fa fa-send` / `fa fa-send-o` | `fas fa-paper-plane` / `far fa-paper-plane` | 发送 | 推送 |
| `fa fa-share` | `fas fa-share` | 分享 | 转发 |
| `fa fa-share-alt` / `fa fa-share-nodes` | `fas fa-share-nodes` | 分享（多） | 社交分享 |
| `fa fa-share-from-square` / `fa fa-share-square` / `fa fa-share-square-o` | `fas fa-share-from-square` / `far fa-share-from-square` | 分享（方） | 嵌入式 |
| `fa fa-reply` | `fas fa-reply` | 回复 | 单回 |
| `fa fa-reply-all` | `fas fa-reply-all` | 全部回复 | 群回 |
| `fa fa-forward` | `fas fa-forward` | 转发 | 邮件转发 |
| `fa fa-comment` / `fa fa-comment-o` | `fas fa-comment` / `far fa-comment` | 评论 | 留言 |
| `fa fa-comments` / `fa fa-comments-o` | `fas fa-comments` / `far fa-comments` | 多评论 | 讨论 |
| `fa fa-comment-dots` / `fa fa-commenting` / `fa fa-commenting-o` | `fas fa-comment-dots` | 带点评论 | 提醒 |
| `fa fa-message` | `fas fa-message` | 消息 | IM |
| `fa fa-voicemail` | `fas fa-voicemail` | 语音邮件 | 留言 |
| `fa fa-sms` | `fas fa-sms` | 短信 | 短信 |
| `fa fa-bullhorn` / `fa fa-megaphone` | `fas fa-bullhorn` | 喇叭 | 公告 |
| `fa fa-circle-exclamation` | `fas fa-circle-exclamation` | 圆感叹号 | 风险 |
| `fa fa-triangle-exclamation` | `fas fa-triangle-exclamation` | 三角警告 | 警告 |

## 6. 导航 / 视图切换

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-bars` | `fas fa-bars` | 横条 | 菜单 |
| `fa fa-navicon` | `fas fa-bars` | 同 bars | 菜单 |
| `fa fa-list` / `fa fa-list-ul` | `fas fa-list` | 列表 | 列表 |
| `fa fa-list-ol` | `fas fa-list-ol` | 有序列表 | 排序列表 |
| `fa fa-list-alt` | `fas fa-rectangle-list` | 列表（方） | 列表项 |
| `fa fa-table` | `fas fa-table` | 表格 | 表格 |
| `fa fa-th` / `fa fa-th-large` / `fa fa-th-list` | `fas fa-th` / `fas fa-table-cells` / `fas fa-table-list` | 网格 | 视图切换 |
| `fa fa-th-large` | `fas fa-table-cells-large` | 大网格 | 大图 |
| `fa fa-grip-horizontal` / `fa fa-grip-vertical` / `fa fa-grip` / `fa fa-grip-lines` | `fas fa-grip` / `fas fa-grip-vertical` | 抓手 | 拖拽 |
| `fa fa-columns` | `fas fa-table-columns` | 列 | 列布局 |
| `fa fa-house` / `fa fa-home` | `fas fa-house` | 首页 | 主页 |
| `fa fa-tachometer-alt` / `fa fa-dashboard` | `fas fa-gauge-high` | 仪表盘 | 主页 |
| `fa fa-compass` / `fa fa-compass-drafting` | `fas fa-compass` | 罗盘 | 导航 |
| `fa fa-arrow-left` / `fa fa-arrow-right` / `fa fa-arrow-up` / `fa fa-arrow-down` | `fas fa-arrow-left` 等 | 四向箭头 | 导航 |
| `fa fa-chevron-left` / `fa fa-chevron-right` / `fa fa-chevron-up` / `fa fa-chevron-down` | `fas fa-chevron-left` 等 | V 形箭头 | 折叠 |
| `fa fa-angle-left` / `fa fa-angle-right` / `fa fa-angle-up` / `fa fa-angle-down` | `fas fa-angle-left` 等 | 尖角箭头 | 折叠 |
| `fa fa-caret-left` / `fa fa-caret-right` / `fa fa-caret-up` / `fa fa-caret-down` | `fas fa-caret-left` 等 | 实心尖角 | 下拉 |
| `fa fa-arrows-left-right` / `fa fa-arrows-up-down` | `fas fa-arrows-left-right` 等 | 双箭头 | 切换 |
| `fa fa-circle-chevron-left` / `fa fa-circle-chevron-right` | `fas fa-circle-chevron-left` 等 | 圆 V | 圆形导航 |
| `fa fa-arrow-rotate-left` / `fa fa-arrow-rotate-right` | `fas fa-arrow-rotate-left` 等 | 旋转箭头 | 撤销/重做 |
| `fa fa-forward` / `fa fa-backward` | `fas fa-forward` / `fas fa-backward` | 快进/快退 | 翻页 |
| `fa fa-step-forward` / `fa fa-step-backward` | `fas fa-forward-step` / `fas fa-backward-step` | 单步 | 翻页 |
| `fa fa-arrow-up-right-from-square` | `fas fa-up-right-from-square` | 外链 | 新窗口 |
| `fa fa-external-link-alt` / `fa fa-external-link-square-alt` | `fas fa-up-right-from-square` | 外链 | 新窗口 |
| `fa fa-expand` / `fa fa-compress` | `fas fa-expand` / `fas fa-compress` | 展开/收起 | 折叠 |
| `fa fa-maximize` / `fa fa-minimize` | `fas fa-maximize` / `fas fa-minimize` | 最大/最小 | 全屏 |
| `fa fa-up-right-and-down-left-from-center` | `fas fa-up-right-and-down-left-from-center` | 最大化 | 全屏 |
| `fa fa-down-left-and-up-right-to-center` | `fas fa-down-left-and-up-right-to-center` | 最小化 | 全屏 |
| `fa fa-search` / `fa fa-search-plus` / `fa fa-search-minus` | `fas fa-magnifying-glass` / `fas fa-magnifying-glass-plus` 等 | 搜索 | 搜索 |
| `fa fa-filter` / `fa fa-filter-circle-xmark` | `fas fa-filter` / `fas fa-filter-circle-xmark` | 筛选 | 条件 |
| `fa fa-sort` / `fa fa-sort-asc` / `fa fa-sort-desc` | `fas fa-sort` / `fas fa-sort-up` / `fas fa-sort-down` | 排序 | 排序 |
| `fa fa-sort-alpha-asc` / `fa fa-sort-alpha-desc` | `fas fa-arrow-down-a-z` / `fas fa-arrow-up-z-a` | A-Z | 字母序 |
| `fa fa-sign-in` / `fa fa-sign-in-alt` | `fas fa-right-to-bracket` | 登录 | 登录 |
| `fa fa-sign-out` / `fa fa-sign-out-alt` | `fas fa-right-from-bracket` | 登出 | 注销 |
| `fa fa-log-in` / `fa fa-log-out` | `fas fa-right-to-bracket` / `fas fa-right-from-bracket` | 登录/登出 | 入口 |
| `fa fa-door-open` / `fa fa-door-closed` | `fas fa-door-open` / `fas fa-door-closed` | 门 | 入口 |
| `fa fa-ellipsis-v` / `fa fa-ellipsis-h` / `fa fa-ellipsis` | `fas fa-ellipsis-vertical` / `fas fa-ellipsis` | 省略号 | 菜单 |
| `fa fa-sliders` / `fa fa-sliders-h` | `fas fa-sliders` | 滑杆 | 设置 |
| `fa fa-cog` / `fa fa-gear` | `fas fa-gear` | 齿轮 | 设置 |
| `fa fa-code` | `fas fa-code` | 代码 | 代码块 |
| `fa fa-bars-progress` | `fas fa-bars-progress` | 进度条 | 进度 |
| `fa fa-bars-staggered` | `fas fa-bars-staggered` | 错位条 | 列表菜单 |
| `fa fa-table-list` | `fas fa-table-list` | 列表表格 | 表格式列表 |
| `fa fa-table-cells` / `fa fa-table-cells-large` | `fas fa-table-cells` / `fas fa-table-cells-large` | 表格单元 | 网格 |

## 7. 文件 / 文档

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-file` / `fa fa-file-o` | `fas fa-file` / `far fa-file` | 文件 | 单文件 |
| `fa fa-files` / `fa fa-files-o` | `fas fa-files` / `far fa-files` | 多文件 | 多文件 |
| `fa fa-file-lines` / `fa fa-file-text` / `fa fa-file-text-o` | `fas fa-file-lines` / `far fa-file-lines` | 文本文件 | 文档 |
| `fa fa-file-pdf` / `fa fa-file-pdf-o` | `fas fa-file-pdf` / `far fa-file-pdf` | PDF | PDF |
| `fa fa-file-word` / `fa fa-file-word-o` | `fas fa-file-word` / `far fa-file-word` | Word | DOC |
| `fa fa-file-excel` / `fa fa-file-excel-o` | `fas fa-file-excel` / `far fa-file-excel` | Excel | XLS |
| `fa fa-file-powerpoint` / `fa fa-file-powerpoint-o` | `fas fa-file-powerpoint` / `far fa-file-powerpoint` | PowerPoint | PPT |
| `fa fa-file-image` / `fa fa-file-image-o` / `fa fa-file-photo-o` | `fas fa-file-image` / `far fa-file-image` | 图片 | IMG |
| `fa fa-file-zipper` / `fa fa-file-zip-o` / `fa fa-file-archive` / `fa fa-file-archive-o` | `fas fa-file-zipper` / `far fa-file-zipper` | 压缩 | ZIP |
| `fa fa-file-audio` / `fa fa-file-audio-o` | `fas fa-file-audio` / `far fa-file-audio` | 音频 | MP3 |
| `fa fa-file-video` / `fa fa-file-video-o` | `fas fa-file-video` / `far fa-file-video` | 视频 | MP4 |
| `fa fa-file-code` / `fa fa-file-code-o` | `fas fa-file-code` / `far fa-file-code` | 代码 | SRC |
| `fa fa-file-csv` | `fas fa-file-csv` | CSV | 数据 |
| `fa fa-file-signature` | `fas fa-file-signature` | 签名 | 签署 |
| `fa fa-file-contract` | `fas fa-file-contract` | 合同 | 合同 |
| `fa fa-file-prescription` | `fas fa-file-prescription` | 处方 | 药方 |
| `fa fa-file-medical` / `fa fa-file-medical-alt` | `fas fa-file-medical` / `fas fa-file-waveform` | 病历 | 医疗 |
| `fa fa-file-import` | `fas fa-file-import` | 导入 | 入站 |
| `fa fa-file-export` | `fas fa-file-export` | 导出 | 出站 |
| `fa fa-file-pen` / `fa fa-file-edit` | `fas fa-file-pen` | 编辑文件 | 改稿 |
| `fa fa-folder` / `fa fa-folder-o` | `fas fa-folder` / `far fa-folder` | 文件夹 | 目录 |
| `fa fa-folder-open` / `fa fa-folder-open-o` | `fas fa-folder-open` / `far fa-folder-open` | 文件夹（开） | 已展开 |
| `fa fa-folder-tree` | `fas fa-folder-tree` | 目录树 | 结构 |
| `fa fa-folder-plus` | `fas fa-folder-plus` | 新建文件夹 | 建目录 |
| `fa fa-folder-minus` | `fas fa-folder-minus` | 移除文件夹 | 删目录 |
| `fa fa-cloud` | `fas fa-cloud` | 云 | 云端 |
| `fa fa-cloud-download` / `fa fa-cloud-download-alt` | `fas fa-cloud-arrow-down` | 云下载 | 下载 |
| `fa fa-cloud-upload` / `fa fa-cloud-upload-alt` | `fas fa-cloud-arrow-up` | 云上传 | 上传 |
| `fa fa-cloud-bolt` | `fas fa-cloud-bolt` | 云闪 | 雷击 |
| `fa fa-cloud-meatball` | `fas fa-cloud-meatball` | 云球 | 多云 |
| `fa fa-cloud-moon` / `fa fa-cloud-sun` | `fas fa-cloud-moon` / `fas fa-cloud-sun` | 多云 | 多云 |
| `fa fa-download` | `fas fa-download` | 下载 | 下载 |
| `fa fa-upload` | `fas fa-upload` | 上传 | 上传 |
| `fa fa-file-arrow-up` / `fa fa-file-upload` | `fas fa-file-arrow-up` | 文件上传 | 上传 |
| `fa fa-file-arrow-down` / `fa fa-file-download` | `fas fa-file-arrow-down` | 文件下载 | 下载 |
| `fa fa-paste` / `fa fa-clipboard` | `fas fa-paste` / `fas fa-clipboard` | 粘贴 / 剪贴板 | 板 |
| `fa fa-copy` / `fa fa-files-o` | `fas fa-copy` / `fas fa-clone` | 复制 | 副本 |
| `fa fa-cut` / `fa fa-scissors` | `fas fa-scissors` | 剪切 | 剪 |
| `fa fa-print` | `fas fa-print` | 打印 | 打印 |
| `fa fa-paperclip` | `fas fa-paperclip` | 回形针 | 附件 |
| `fa fa-link` | `fas fa-link` | 链接 | 关联 |
| `fa fa-link-slash` / `fa fa-chain-broken` / `fa fa-unlink` | `fas fa-link-slash` | 链接（关） | 断开 |
| `fa fa-book` | `fas fa-book` | 书 | 文档 |
| `fa fa-book-open` | `fas fa-book-open` | 书（开） | 阅读 |
| `fa fa-bookmark` / `fa fa-bookmark-o` | `fas fa-bookmark` / `far fa-bookmark` | 书签 | 标记 |
| `fa fa-newspaper` | `fas fa-newspaper` | 报纸 | 新闻 |
| `fa fa-archive` / `fa fa-box-archive` | `fas fa-box-archive` | 归档 | 归档 |
| `fa fa-note-sticky` / `fa fa-sticky-note` / `fa fa-sticky-note-o` | `fas fa-note-sticky` / `far fa-note-sticky` | 便签 | 贴纸 |
| `fa fa-clipboard-list` | `fas fa-clipboard-list` | 列表板 | 待办板 |

## 8. 用户 / 团队

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-user` / `fa fa-user-o` | `fas fa-user` / `far fa-user` | 用户 | 个人 |
| `fa fa-user-plus` | `fas fa-user-plus` | 添加用户 | 邀请 |
| `fa fa-user-minus` | `fas fa-user-minus` | 移除用户 | 注销 |
| `fa fa-user-xmark` / `fa fa-user-times` | `fas fa-user-xmark` | 删除用户 | 移除 |
| `fa fa-user-pen` / `fa fa-user-edit` | `fas fa-user-pen` | 编辑用户 | 改资料 |
| `fa fa-user-gear` / `fa fa-user-cog` | `fas fa-user-gear` | 用户设置 | 配置 |
| `fa fa-user-tie` | `fas fa-user-tie` | 领带用户 | 高管 |
| `fa fa-user-graduate` | `fas fa-user-graduate` | 学生用户 | 学员 |
| `fa fa-user-astronaut` | `fas fa-user-astronaut` | 宇航员 | 奇幻 |
| `fa fa-user-doctor` / `fa fa-user-md` | `fas fa-user-doctor` | 医生 | 医疗 |
| `fa fa-user-shield` | `fas fa-user-shield` | 盾牌用户 | 安全 |
| `fa fa-user-lock` | `fas fa-user-lock` | 锁用户 | 受限 |
| `fa fa-user-secret` | `fas fa-user-secret` | 秘密用户 | 匿名 |
| `fa fa-user-tag` | `fas fa-user-tag` | 标签用户 | 标注 |
| `fa fa-user-clock` | `fas fa-user-clock` | 时钟用户 | 待审 |
| `fa fa-user-check` | `fas fa-user-check` | 勾选用户 | 已批准 |
| `fa fa-user-slash` | `fas fa-user-slash` | 用户（关） | 禁用 |
| `fa fa-user-circle` / `fa fa-user-circle-o` | `fas fa-circle-user` / `far fa-circle-user` | 圆形用户 | 头像 |
| `fa fa-circle-user` | `fas fa-circle-user` | 圆用户 | 头像 |
| `fa fa-people-group` / `fa fa-users` | `fas fa-people-group` | 多人群 | 团队 |
| `fa fa-user-friends` / `fa fa-users` | `fas fa-user-group` | 朋友群 | 同事 |
| `fa fa-people-pulling` | `fas fa-people-pulling` | 牵引人群 | 协作 |
| `fa fa-people-carry-box` | `fas fa-people-carry-box` | 搬运人群 | 团队 |
| `fa fa-people-line` | `fas fa-people-line` | 排队人群 | 队列 |
| `fa fa-people-arrows` / `fa fa-people-arrows-left-right` | `fas fa-people-arrows` | 人群交换 | 转岗 |
| `fa fa-id-card` / `fa fa-id-card-o` | `fas fa-id-card` / `far fa-id-card` | ID 卡 | 工卡 |
| `fa fa-id-badge` / `fa fa-id-badge-o` | `fas fa-id-badge` / `far fa-id-badge` | ID 徽章 | 工号 |
| `fa fa-address-card` / `fa fa-address-card-o` / `fa fa-vcard` / `fa fa-vcard-o` | `fas fa-address-card` / `far fa-address-card` | 地址卡 | 名片 |
| `fa fa-person` | `fas fa-person` | 人 | 个人 |
| `fa fa-person-dress` | `fas fa-person-dress` | 女性 | 性别 |
| `fa fa-person-walking` | `fas fa-person-walking` | 行走 | 步行 |
| `fa fa-person-running` / `fa fa-running` | `fas fa-person-running` | 跑步 | 跑步 |
| `fa fa-person-biking` / `fa fa-biking` | `fas fa-person-biking` | 骑行 | 骑行 |
| `fa fa-handshake` / `fa fa-handshake-o` / `fa fa-handshake-alt-slash` | `fas fa-handshake` / `far fa-handshake` | 握手 | 合作 |
| `fa fa-handshake-simple` | `fas fa-handshake-simple` | 简洁握手 | 合作 |
| `fa fa-heart` / `fa fa-heart-o` | `fas fa-heart` / `far fa-heart` | 心 | 关注 |
| `fa fa-thumbs-up` / `fa fa-thumbs-o-up` | `fas fa-thumbs-up` / `far fa-thumbs-up` | 点赞 | 同意 |
| `fa fa-thumbs-down` / `fa fa-thumbs-o-down` | `fas fa-thumbs-down` / `far fa-thumbs-down` | 点踩 | 反对 |
| `fa fa-smile` / `fa fa-smile-o` / `fa fa-face-smile` | `fas fa-face-smile` / `far fa-face-smile` | 笑 | 正面 |
| `fa fa-frown` / `fa fa-frown-o` / `fa fa-face-frown` | `fas fa-face-frown` | 皱眉 | 负面 |
| `fa fa-meh` / `fa fa-meh-o` / `fa fa-face-meh` | `fas fa-face-meh` / `far fa-face-meh` | 中性 | 一般 |
| `fa fa-crown` | `fas fa-crown` | 皇冠 | 管理员 |
| `fa fa-shield` / `fa fa-shield-alt` / `fa fa-shield-halved` | `fas fa-shield-halved` | 盾牌 | 防御 |
| `fa fa-shield-check` | `fas fa-shield-check` | 盾牌（勾） | 已验证 |
| `fa fa-user-cog` | `fas fa-user-gear` | 用户齿轮 | 设置 |

## 9. 财务 / 报表

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-dollar` / `fa fa-dollar-sign` / `fa fa-usd` | `fas fa-dollar-sign` | 美元 | 货币 |
| `fa fa-euro` / `fa fa-euro-sign` / `fa fa-eur` | `fas fa-euro-sign` | 欧元 | 货币 |
| `fa fa-pound-sign` / `fa fa-gbp` | `fas fa-pound-sign` | 英镑 | 货币 |
| `fa fa-yen-sign` / `fa fa-jpy` / `fa fa-yen` | `fas fa-yen-sign` | 日元 | 货币 |
| `fa fa-won-sign` / `fa fa-krw` / `fa fa-won` | `fas fa-won-sign` | 韩元 | 货币 |
| `fa fa-rupee-sign` / `fa fa-inr` | `fas fa-rupee-sign` | 卢比 | 货币 |
| `fa fa-ruble-sign` / `fa fa-rub` | `fas fa-ruble-sign` | 卢布 | 货币 |
| `fa fa-lira-sign` / `fa fa-try` | `fas fa-lira-sign` | 里拉 | 货币 |
| `fa fa-bitcoin-sign` / `fa fa-btc` | `fas fa-bitcoin-sign` | 比特币 | 数字 |
| `fa fa-money-bill` | `fas fa-money-bill` | 现金 | 金额 |
| `fa fa-money-bill-alt` / `fa fa-money-bill-1` / `fa fa-money` | `fas fa-money-bill-1` | 单现金 | 金额 |
| `fa fa-money-bill-wave` / `fa fa-money-bill-wave-alt` | `fas fa-money-bill-wave` | 现金波动 | 收入 |
| `fa fa-money-bills` / `fa fa-money-bills-alt` | `fas fa-money-bills` | 多现金 | 现金 |
| `fa fa-money-check` / `fa fa-money-check-alt` / `fa fa-money-check-dollar` | `fas fa-money-check-dollar` | 美元支票 | 支付 |
| `fa fa-credit-card` / `fa fa-credit-card-alt` | `fas fa-credit-card` | 信用卡 | 支付 |
| `fa fa-cc-visa` / `fa fa-cc-mastercard` / `fa fa-cc-amex` / `fa fa-cc-paypal` / `fa fa-cc-apple-pay` / `fa fa-cc-stripe` | `fab fa-cc-visa` 等 | 信用卡品牌 | Brands |
| `fa fa-wallet` | `fas fa-wallet` | 钱包 | 余额 |
| `fa fa-receipt` | `fas fa-receipt` | 小票 | 单据 |
| `fa fa-file-invoice` | `fas fa-file-invoice` | 发票 | 财务单据 |
| `fa fa-file-invoice-dollar` | `fas fa-file-invoice-dollar` | 美元发票 | 报价单 |
| `fa fa-cash-register` | `fas fa-cash-register` | 收银机 | POS |
| `fa fa-coins` | `fas fa-coins` | 硬币 | 零钱 |
| `fa fa-coin` | `fas fa-coin` | 单硬币 | 货币 |
| `fa fa-line-chart` | `fas fa-chart-line` | 折线图 | 趋势 |
| `fa fa-bar-chart` / `fa fa-bar-chart-o` | `fas fa-chart-column` | 柱状图 | 对比 |
| `fa fa-pie-chart` | `fas fa-chart-pie` | 饼图 | 占比 |
| `fa fa-area-chart` | `fas fa-chart-area` | 面积图 | 趋势构成 |
| `fa fa-chart-line` / `fa fa-chart-bar` / `fa fa-chart-simple` | `fas fa-chart-line` / `fas fa-chart-simple` | 简化图 | 简图 |
| `fa fa-chart-mixed` | `fas fa-chart-mixed` | 混合图 | 多类 |
| `fa fa-calculator` | `fas fa-calculator` | 计算器 | 数值 |
| `fa fa-percent` | `fas fa-percent` | 百分比 | 比率 |
| `fa fa-scale-balanced` / `fa fa-balance-scale` | `fas fa-scale-balanced` | 天平 | 平衡 |
| `fa fa-scale-unbalanced` / `fa fa-balance-scale-left` | `fas fa-scale-unbalanced` | 偏天平 | 偏差 |
| `fa fa-piggy-bank` | `fas fa-piggy-bank` | 存钱罐 | 储蓄 |
| `fa fa-vault` | `fas fa-vault` | 保险柜 | 资产 |
| `fa fa-building-columns` / `fa fa-bank` / `fa fa-university` | `fas fa-building-columns` | 银行 | 金融 |
| `fa fa-briefcase` | `fas fa-briefcase` | 公文包 | 商务 |
| `fa fa-arrow-trend-up` | `fas fa-arrow-trend-up` | 上升趋势 | 增长 |
| `fa fa-arrow-trend-down` | `fas fa-arrow-trend-down` | 下降趋势 | 下滑 |
| `fa fa-industry` | `fas fa-industry` | 工厂 | 制造 |
| `fa fa-gem` / `fa fa-diamond` | `fas fa-gem` / `fas fa-diamond` | 钻石 | 高价值 |

## 10. 设置 / 管理

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-cog` / `fa fa-gear` | `fas fa-gear` | 齿轮 | 设置 |
| `fa fa-cogs` / `fa fa-gears` | `fas fa-gears` | 多齿轮 | 多设置 |
| `fa fa-sliders` / `fa fa-sliders-h` | `fas fa-sliders` | 滑杆 | 微调 |
| `fa fa-user-gear` / `fa fa-user-cog` | `fas fa-user-gear` | 用户齿轮 | 账号设置 |
| `fa fa-tools` | `fas fa-tools` | 工具 | 工具集 |
| `fa fa-wrench` | `fas fa-wrench` | 扳手 | 维护 |
| `fa fa-screwdriver` | `fas fa-screwdriver` | 螺丝刀 | 维护 |
| `fa fa-screwdriver-wrench` | `fas fa-screwdriver-wrench` | 螺丝刀+扳手 | 工具集 |
| `fa fa-shield` / `fa fa-shield-alt` / `fa fa-shield-halved` | `fas fa-shield-halved` | 盾牌 | 安全 |
| `fa fa-shield-check` | `fas fa-shield-check` | 盾牌（勾） | 已验证 |
| `fa fa-shield-virus` | `fas fa-shield-virus` | 盾牌（病毒） | 防毒 |
| `fa fa-key` | `fas fa-key` | 钥匙 | 密钥 |
| `fa fa-lock` / `fa fa-lock-open` | `fas fa-lock` / `fas fa-lock-open` | 锁 / 开锁 | 锁定 |
| `fa fa-eye` / `fa fa-eye-slash` | `fas fa-eye` / `fas fa-eye-slash` | 查看 / 隐藏 | 显示 |
| `fa fa-bell` / `fa fa-bell-slash` | `fas fa-bell` / `fas fa-bell-slash` | 通知 | 提醒 |
| `fa fa-language` | `fas fa-language` | 语言 | 多语 |
| `fa fa-globe` / `fa fa-earth-americas` | `fas fa-earth-americas` | 地球 | 全球 |
| `fa fa-earth-asia` / `fa fa-earth-africa` / `fa fa-earth-oceania` / `fa fa-earth-europe` | `fas fa-earth-asia` 等 | 区域地球 | 区域 |
| `fa fa-filter` / `fa fa-filter-circle-xmark` / `fa fa-funnel` | `fas fa-filter` / `fas fa-filter-circle-xmark` | 筛选 | 过滤 |
| `fa fa-database` | `fas fa-database` | 数据库 | 数据库 |
| `fa fa-server` | `fas fa-server` | 服务器 | 服务 |
| `fa fa-hard-drive` | `fas fa-hard-drive` | 硬盘 | 存储 |
| `fa fa-code` / `fa fa-code-branch` | `fas fa-code` / `fas fa-code-branch` | 代码 | 代码 |
| `fa fa-terminal` | `fas fa-terminal` | 终端 | 命令行 |
| `fa fa-sitemap` | `fas fa-sitemap` | 站点地图 | 结构 |
| `fa fa-network-wired` | `fas fa-network-wired` | 网络 | 拓扑 |
| `fa fa-plug` / `fa fa-plug-circle-bolt` | `fas fa-plug` | 插头 | 电源 |
| `fa fa-power-off` | `fas fa-power-off` | 关闭电源 | 关机 |
| `fa fa-toggle-on` / `fa fa-toggle-off` | `fas fa-toggle-on` / `fas fa-toggle-off` | 开关 | 切换 |
| `fa fa-list-check` / `fa fa-tasks` | `fas fa-list-check` | 任务列表 | 检查项 |
| `fa fa-list-ul` | `fas fa-list-ul` | 无序列表 | 列表 |
| `fa fa-arrow-right-arrow-left` / `fa fa-arrows-rotate` | `fas fa-arrow-right-arrow-left` | 切换 | 切换 |
| `fa fa-bolt` | `fas fa-bolt` | 闪电 | 突发 |
| `fa fa-industry` | `fas fa-industry` | 工厂 | 制造 |
| `fa fa-briefcase` | `fas fa-briefcase` | 公文包 | 业务 |
| `fa fa-user-shield` | `fas fa-user-shield` | 盾牌用户 | 管理员 |

## 11. 通用动作

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-plus` / `fa fa-plus-circle` / `fa fa-plus-square` / `fa fa-plus-square-o` | `fas fa-plus` / `fas fa-circle-plus` / `fas fa-square-plus` | 加 | 添加 |
| `fa fa-minus` / `fa fa-minus-circle` / `fa fa-minus-square` / `fa fa-minus-square-o` | `fas fa-minus` / `fas fa-circle-minus` / `fas fa-square-minus` | 减 | 减少 |
| `fa fa-times` / `fa fa-close` / `fa fa-times-circle` | `fas fa-xmark` / `fas fa-circle-xmark` | 关 / 取消 | 取消 |
| `fa fa-check` / `fa fa-check-circle` / `fa fa-check-square` | `fas fa-check` / `fas fa-circle-check` / `fas fa-square-check` | 勾 | 确认 |
| `fa fa-pencil` / `fa fa-pencil-alt` / `fa fa-pencil-square` / `fa fa-pencil-square-o` | `fas fa-pen` / `fas fa-pen-to-square` | 铅笔 | 编辑 |
| `fa fa-edit` / `fa fa-edit-o` / `fa fa-pen-square` | `fas fa-pen-to-square` | 编辑（按钮） | 改 |
| `fa fa-trash` / `fa fa-trash-o` / `fa fa-trash-alt` | `fas fa-trash-can` / `far fa-trash-can` | 垃圾桶 | 删除 |
| `fa fa-trash-can` | `fas fa-trash-can` | 垃圾桶（新） | 删除 |
| `fa fa-save` | `fas fa-floppy-disk` | 保存 | 保存 |
| `fa fa-copy` / `fa fa-files-o` | `fas fa-copy` / `fas fa-clone` | 复制 | 副本 |
| `fa fa-cut` / `fa fa-scissors` | `fas fa-scissors` | 剪切 | 剪 |
| `fa fa-paste` | `fas fa-paste` | 粘贴 | 粘 |
| `fa fa-download` | `fas fa-download` | 下载 | 下载 |
| `fa fa-upload` | `fas fa-upload` | 上传 | 上传 |
| `fa fa-share` / `fa fa-share-alt` / `fa fa-share-square` / `fa fa-share-square-o` | `fas fa-share` / `fas fa-share-nodes` / `fas fa-share-from-square` | 分享 | 转发 |
| `fa fa-link` / `fa fa-link-slash` / `fa fa-chain` / `fa fa-chain-broken` | `fas fa-link` / `fas fa-link-slash` | 链接 | 关联 |
| `fa fa-search` / `fa fa-search-plus` / `fa fa-search-minus` | `fas fa-magnifying-glass` / `fas fa-magnifying-glass-plus` 等 | 搜索 | 查找 |
| `fa fa-filter` / `fa fa-sort` / `fa fa-sort-asc` | `fas fa-filter` / `fas fa-sort` | 筛选 / 排序 | 过滤 |
| `fa fa-print` | `fas fa-print` | 打印 | 打印 |
| `fa fa-eye` / `fa fa-eye-slash` | `fas fa-eye` / `fas fa-eye-slash` | 显示 / 隐藏 | 可见 |
| `fa fa-sync` / `fa fa-refresh` | `fas fa-arrows-rotate` | 同步 / 刷新 | 重载 |
| `fa fa-undo` / `fa fa-rotate-left` | `fas fa-arrow-rotate-left` | 撤销 | 后退 |
| `fa fa-redo` / `fa fa-rotate-right` | `fas fa-arrow-rotate-right` | 重做 | 前进 |
| `fa fa-arrows-rotate` | `fas fa-arrows-rotate` | 旋转 | 刷新 |
| `fa fa-ellipsis-v` / `fa fa-ellipsis-h` / `fa fa-ellipsis` | `fas fa-ellipsis-vertical` / `fas fa-ellipsis` | 省略号 | 菜单 |
| `fa fa-expand` / `fa fa-compress` | `fas fa-expand` / `fas fa-compress` | 展开 / 收起 | 折叠 |
| `fa fa-clock` / `fa fa-clock-rotate-left` / `fa fa-history` | `fas fa-clock` / `fas fa-clock-rotate-left` | 时钟 / 历史 | 时间 |
| `fa fa-bookmark` / `fa fa-bookmark-o` | `fas fa-bookmark` / `far fa-bookmark` | 书签 | 标记 |
| `fa fa-star` / `fa fa-star-o` | `fas fa-star` / `far fa-star` | 星 | 评分 |
| `fa fa-flag` / `fa fa-flag-o` / `fa fa-flag-checkered` | `fas fa-flag` / `far fa-flag` | 旗 | 标记 |
| `fa fa-arrow-up` / `fa fa-arrow-down` / `fa fa-arrow-left` / `fa fa-arrow-right` | `fas fa-arrow-up` 等 | 四向 | 导航 |
| `fa fa-circle-plus` / `fa fa-circle-minus` / `fa fa-circle-xmark` / `fa fa-circle-check` | `fas fa-circle-plus` 等 | 圆形动作 | 按钮 |
| `fa fa-paperclip` | `fas fa-paperclip` | 回形针 | 附件 |
| `fa fa-paper-plane` | `fas fa-paper-plane` | 纸飞机 | 发送 |
| `fa fa-comment` / `fa fa-envelope` | `fas fa-comment` / `fas fa-envelope` | 评论 / 邮件 | 通讯 |
| `fa fa-bars` / `fa fa-list` / `fa fa-list-ul` | `fas fa-bars` / `fas fa-list` | 菜单 / 列表 | 列表 |
| `fa fa-cog` / `fa fa-sliders` | `fas fa-gear` / `fas fa-sliders` | 设置 | 设置 |
| `fa fa-bolt` | `fas fa-bolt` | 闪电 | 突发 |
| `fa fa-ban` | `fas fa-ban` | 禁止 | 禁用 |
| `fa fa-circle-stop` | `fas fa-circle-stop` | 停止（圆） | 停止 |
| `fa fa-eraser` | `fas fa-eraser` | 橡皮 | 清除 |

## 12. 设备 / 硬件

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-desktop` | `fas fa-desktop` | 桌面 | 台式机 |
| `fa fa-laptop` | `fas fa-laptop` | 笔记本 | 笔记本 |
| `fa fa-mobile` | `fas fa-mobile-screen` | 手机 | 手机 |
| `fa fa-mobile-alt` / `fa fa-mobile-screen` | `fas fa-mobile-screen-button` | 智能手机 | 触屏 |
| `fa fa-tablet` / `fa fa-tablet-alt` | `fas fa-tablet-screen-button` | 平板 | 触屏 |
| `fa fa-tv` / `fa fa-television` / `fa fa-tv-alt` | `fas fa-tv` | 电视 | 屏幕 |
| `fa fa-display` | `fas fa-display` | 显示器 | 屏幕 |
| `fa fa-computer` / `fa fa-desktop-alt` | `fas fa-desktop` | 电脑 | 台式 |
| `fa fa-keyboard` | `fas fa-keyboard` | 键盘 | 输入 |
| `fa fa-mouse` | `fas fa-computer-mouse` | 鼠标 | 鼠标 |
| `fa fa-gamepad` | `fas fa-gamepad` | 手柄 | 游戏 |
| `fa fa-headphones` / `fa fa-headset` | `fas fa-headphones` / `fas fa-headset` | 耳机 | 音频 |
| `fa fa-microphone` / `fa fa-microphone-alt` / `fa fa-microphone-slash` | `fas fa-microphone` / `fas fa-microphone-slash` | 麦克风 | 录音 |
| `fa fa-camera` / `fa fa-camera-retro` | `fas fa-camera` / `fas fa-camera-retro` | 相机 | 拍照 |
| `fa fa-video` / `fa fa-video-camera` | `fas fa-video` | 摄像机 | 录像 |
| `fa fa-video-slash` | `fas fa-video-slash` | 摄像机（关） | 关闭 |
| `fa fa-server` | `fas fa-server` | 服务器 | 服务 |
| `fa fa-hard-drive` | `fas fa-hard-drive` | 硬盘 | 存储 |
| `fa fa-memory` | `fas fa-memory` | 内存 | RAM |
| `fa fa-usb` | `fas fa-usb` | USB | USB |
| `fa fa-plug` / `fa fa-plug-circle-bolt` | `fas fa-plug` | 插头 | 电源 |
| `fa fa-battery-full` | `fas fa-battery-full` | 满电 | 电量 |
| `fa fa-battery-three-quarters` | `fas fa-battery-three-quarters` | 75% | 电量 |
| `fa fa-battery-half` | `fas fa-battery-half` | 半电 | 电量 |
| `fa fa-battery-quarter` | `fas fa-battery-quarter` | 25% | 电量 |
| `fa fa-battery-empty` | `fas fa-battery-empty` | 无电 | 电量 |
| `fa fa-battery-bolt` | `fas fa-battery-bolt` | 充电中 | 电量 |
| `fa fa-battery-exclamation` | `fas fa-battery-exclamation` | 电量警告 | 电量 |
| `fa fa-bluetooth` / `fa fa-bluetooth-b` | `fas fa-bluetooth` | 蓝牙 | 蓝牙 |
| `fa fa-wifi` / `fa fa-wifi-strong` / `fa fa-wifi-1` / `fa fa-wifi-2` / `fa fa-wifi-3` | `fas fa-wifi` | Wi-Fi | 无线 |
| `fa fa-signal` | `fas fa-signal` | 信号 | 信号强度 |
| `fa fa-satellite` / `fa fa-satellite-dish` | `fas fa-satellite` / `fas fa-satellite-dish` | 卫星 | 卫星 |
| `fa fa-router` | `fas fa-router` | 路由器 | 路由 |
| `fa fa-ethernet` | `fas fa-ethernet` | 以太网 | 网线 |
| `fa fa-phone` / `fa fa-phone-alt` | `fas fa-phone` | 电话 | 通话 |
| `fa fa-fax` | `fas fa-fax` | 传真 | 传真 |
| `fa fa-printers` / `fa fa-print` | `fas fa-print` | 打印机 | 打印 |
| `fa fa-scanner` / `fa fa-scanner-image` | `fas fa-scanner` | 扫描仪 | 扫描 |
| `fa fa-thermometer` / `fa fa-thermometer-half` | `fas fa-thermometer-half` | 温度计 | 测温 |
| `fa fa-microchip` / `fa fa-chip` | `fas fa-microchip` | 芯片 | 处理器 |
| `fa fa-barcode` | `fas fa-barcode` | 条码 | 条码 |
| `fa fa-qrcode` | `fas fa-qrcode` | 二维码 | 二维码 |
| `fa fa-volume-up` / `fa fa-volume` | `fas fa-volume-high` | 音量加 | 音量 |
| `fa fa-volume-down` | `fas fa-volume-low` | 音量减 | 音量 |
| `fa fa-volume-mute` / `fa fa-volume-off` | `fas fa-volume-off` | 静音 | 静音 |
| `fa fa-play` / `fa fa-pause` / `fa fa-stop` | `fas fa-play` / `fas fa-pause` / `fas fa-stop` | 播放 / 暂停 / 停止 | 媒体 |
| `fa fa-forward` / `fa fa-backward` / `fa fa-step-forward` / `fa fa-step-backward` | `fas fa-forward` / `fas fa-backward` / `fas fa-forward-step` 等 | 翻页 | 媒体 |
| `fa fa-fast-forward` / `fa fa-fast-backward` | `fas fa-forward-fast` / `fas fa-backward-fast` | 快进 / 快退 | 媒体 |
| `fa fa-compact-disc` / `fa fa-cd` | `fas fa-compact-disc` | CD | 光盘 |

## 13. 媒体 / 通讯

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-envelope` / `fa fa-envelope-o` | `fas fa-envelope` / `far fa-envelope` | 邮件 | 收件 |
| `fa fa-envelope-open` / `fa fa-envelope-open-o` | `fas fa-envelope-open` / `far fa-envelope-open` | 邮件（开） | 已读 |
| `fa fa-envelopes-bulk` | `fas fa-envelopes-bulk` | 群发邮件 | 群发 |
| `fa fa-paper-plane` / `fa fa-send` | `fas fa-paper-plane` / `far fa-paper-plane` | 纸飞机 | 发送 |
| `fa fa-share` / `fa fa-share-square` | `fas fa-share` / `fas fa-share-from-square` | 分享 | 转发 |
| `fa fa-reply` / `fa fa-reply-all` / `fa fa-forward` | `fas fa-reply` / `fas fa-reply-all` / `fas fa-forward` | 回复 / 转发 | 邮件 |
| `fa fa-comment` / `fa fa-comment-o` / `fa fa-comments` / `fa fa-comments-o` | `fas fa-comment` / `far fa-comment` / `fas fa-comments` | 评论 | 留言 |
| `fa fa-comment-dots` / `fa fa-commenting` / `fa fa-commenting-o` | `fas fa-comment-dots` | 带点评论 | 提醒 |
| `fa fa-message` / `fa fa-message-dots` | `fas fa-message` | 消息 | IM |
| `fa fa-phone` / `fa fa-phone-alt` / `fa fa-phone-volume` / `fa fa-phone-slash` | `fas fa-phone` / `fas fa-phone-volume` / `fas fa-phone-slash` | 电话 | 通话 |
| `fa fa-mobile` / `fa fa-mobile-alt` | `fas fa-mobile-screen` / `fas fa-mobile-screen-button` | 手机 | 移动 |
| `fa fa-fax` | `fas fa-fax` | 传真 | 传真 |
| `fa fa-microphone` / `fa fa-microphone-slash` / `fa fa-microphone-alt` / `fa fa-microphone-alt-slash` | `fas fa-microphone` / `fas fa-microphone-slash` | 麦克风 | 录音 |
| `fa fa-video` / `fa fa-video-slash` / `fa fa-camera` / `fa fa-camera-retro` | `fas fa-video` / `fas fa-camera` | 视频 / 相机 | 录像 |
| `fa fa-headphones` / `fa fa-headset` | `fas fa-headphones` / `fas fa-headset` | 耳机 | 听 |
| `fa fa-circle-play` / `fa fa-play` / `fa fa-pause` / `fa fa-stop` | `fas fa-circle-play` / `fas fa-play` / `fas fa-pause` / `fas fa-stop` | 播放控制 | 媒体 |
| `fa fa-forward` / `fa fa-backward` / `fa fa-step-forward` / `fa fa-step-backward` | `fas fa-forward` / `fas fa-forward-step` 等 | 翻页 | 媒体 |
| `fa fa-fast-forward` / `fa fa-fast-backward` | `fas fa-forward-fast` / `fas fa-backward-fast` | 快进 / 快退 | 媒体 |
| `fa fa-podcast` | `fas fa-podcast` | 播客 | 播客 |
| `fa fa-rss` / `fa fa-rss-square` | `fas fa-rss` / `fas fa-square-rss` | RSS | 订阅 |
| `fa fa-tower-broadcast` / `fa fa-tower-cell` / `fa fa-signal-broadcast` | `fas fa-tower-broadcast` / `fas fa-tower-cell` | 广播 | 广播 |
| `fa fa-bullhorn` / `fa fa-megaphone` | `fas fa-bullhorn` | 喇叭 | 公告 |

## 14. 地点 / 地图

| Icon (v4) | Icon (v6 推荐) | 名称 | 用途 |
|------|------|------|------|
| `fa fa-map` | `fas fa-map` | 地图 | 区域 |
| `fa fa-map-location` / `fa fa-map-marked` / `fa fa-map-marked-alt` | `fas fa-map-location` | 标记地图 | 标注 |
| `fa fa-map-location-dot` | `fas fa-map-location-dot` | 标记地图（点） | 详细 |
| `fa fa-map-marker` / `fa fa-map-marker-alt` / `fa fa-map-pin` | `fas fa-location-dot` / `fas fa-map-pin` | 位置点 | 地址 |
| `fa fa-location-dot` / `fa fa-map-marker-alt` | `fas fa-location-dot` | 圆点位置 | 现代写法 |
| `fa fa-location-crosshairs` / `fa fa-crosshairs` | `fas fa-location-crosshairs` | 十字位置 | 居中 |
| `fa fa-location-arrow` | `fas fa-location-arrow` | 定位箭头 | 方向 |
| `fa fa-location-pin` / `fa fa-thumbtack` | `fas fa-thumbtack` | 图钉 | 钉住 |
| `fa fa-route` | `fas fa-route` | 路线 | 路径 |
| `fa fa-road` | `fas fa-road` | 道路 | 公路 |
| `fa fa-signs-post` / `fa fa-signs` | `fas fa-signs-post` | 路标 | 方向 |
| `fa fa-compass` / `fa fa-compass-drafting` | `fas fa-compass` | 罗盘 | 导航 |
| `fa fa-earth` / `fa fa-globe` / `fa fa-earth-americas` | `fas fa-earth-americas` | 地球 | 全球 |
| `fa fa-earth-asia` / `fa fa-earth-africa` / `fa fa-earth-oceania` / `fa fa-earth-europe` | `fas fa-earth-asia` 等 | 区域地球 | 区域 |
| `fa fa-language` | `fas fa-language` | 语言 | 多语 |
| `fa fa-plane` / `fa fa-plane-departure` / `fa fa-plane-arrival` | `fas fa-plane` / `fas fa-plane-departure` / `fas fa-plane-arrival` | 飞机 | 空运 |
| `fa fa-ship` | `fas fa-ship` | 船 | 水运 |
| `fa fa-train` / `fa fa-train-subway` / `fa fa-train-tram` | `fas fa-train` / `fas fa-train-subway` | 火车 / 地铁 | 轨道 |
| `fa fa-bus` / `fa fa-bus-alt` / `fa fa-bus-simple` | `fas fa-bus` / `fas fa-bus-simple` | 公交 | 班车 |
| `fa fa-van-shuttle` / `fa fa-shuttle-van` | `fas fa-van-shuttle` | 班车 | 接驳 |
| `fa fa-taxi` / `fa fa-cab` | `fas fa-taxi` | 出租车 | 打车 |
| `fa fa-helicopter` | `fas fa-helicopter` | 直升机 | 空运 |
| `fa fa-motorcycle` | `fas fa-motorcycle` | 摩托 | 派送 |
| `fa fa-bicycle` | `fas fa-bicycle` | 单车 | 骑行 |
| `fa fa-car` / `fa fa-car-alt` / `fa fa-car-side` | `fas fa-car-side` | 汽车 | 车辆 |
| `fa fa-person-walking` / `fa fa-walking` | `fas fa-person-walking` | 行走 | 步行 |
| `fa fa-person-running` / `fa fa-running` | `fas fa-person-running` | 跑步 | 跑步 |
| `fa fa-person-biking` / `fa fa-biking` | `fas fa-person-biking` | 骑行 | 骑行 |
| `fa fa-person-hiking` / `fa fa-hiking` | `fas fa-person-hiking` | 徒步 | 远足 |
| `fa fa-tree` | `fas fa-tree` | 树 | 自然 |
| `fa fa-tree-city` | `fas fa-tree-city` | 城市树 | 城市绿化 |
| `fa fa-mountain` / `fa fa-mountain-city` | `fas fa-mountain` / `fas fa-mountain-city` | 山 | 地形 |
| `fa fa-umbrella` / `fa fa-umbrella-beach` | `fas fa-umbrella-beach` | 海滩伞 | 旅游 |
| `fa fa-island-tropical` | `fas fa-island-tropical` | 热带岛 | 旅游 |
| `fa fa-monument` | `fas fa-monument` | 纪念碑 | 旅游 |
| `fa fa-store` | `fas fa-store` | 商店 | 场所 |
| `fa fa-landmark` | `fas fa-landmark` | 地标 | 旅游 |
| `fa fa-mug-hot` | `fas fa-mug-hot` | 热饮 | 咖啡 |
| `fa fa-utensils` | `fas fa-utensils` | 餐具 | 餐饮 |
| `fa fa-hotel` / `fa fa-bed` | `fas fa-bed` | 床 | 住宿 |
| `fa fa-gas-pump` | `fas fa-gas-pump` | 加油 | 油站 |
| `fa fa-parking` | `fas fa-square-parking` | 停车 | 停车 |
| `fa fa-flag` / `fa fa-flag-checkered` | `fas fa-flag` / `fas fa-flag-checkered` | 旗 | 标记 |
| `fa fa-globe` / `fa fa-earth` | `fas fa-earth-americas` | 地球 | 全球 |

## 15. 品牌 / Brands

以下为常用 `fab fa-…` 品牌图标（仅 Free 收录部分）。

| Icon | 名称 | 类别 |
|------|------|------|
| `fab fa-github` | GitHub | 代码 |
| `fab fa-gitlab` | GitLab | 代码 |
| `fab fa-bitbucket` | Bitbucket | 代码 |
| `fab fa-stack-overflow` | Stack Overflow | 代码 |
| `fab fa-stack-exchange` | Stack Exchange | 代码 |
| `fab fa-codepen` | CodePen | 代码 |
| `fab fa-jsfiddle` | JSFiddle | 代码 |
| `fab fa-js` | JavaScript | 语言 |
| `fab fa-python` | Python | 语言 |
| `fab fa-java` | Java | 语言 |
| `fab fa-php` | PHP | 语言 |
| `fab fa-rust` | Rust | 语言 |
| `fab fa-golang` / `fab fa-go` | Go | 语言 |
| `fab fa-linux` | Linux | OS |
| `fab fa-apple` | Apple | OS |
| `fab fa-windows` | Windows | OS |
| `fab fa-android` | Android | OS |
| `fab fa-ubuntu` | Ubuntu | OS |
| `fab fa-redhat` | Red Hat | OS |
| `fab fa-docker` | Docker | 工具 |
| `fab fa-kubernetes` | Kubernetes | 工具 |
| `fab fa-aws` | AWS | 云 |
| `fab fa-google` | Google | 云 |
| `fab fa-google-cloud` / `fab fa-google-cloud-platform` | Google Cloud | 云 |
| `fab fa-microsoft` | Microsoft | 云 |
| `fab fa-microsoft-azure` | Azure | 云 |
| `fab fa-digital-ocean` | DigitalOcean | 云 |
| `fab fa-heroku` | Heroku | 云 |
| `fab fa-firebase` | Firebase | 云 |
| `fab fa-slack` | Slack | 协作 |
| `fab fa-discord` | Discord | 通讯 |
| `fab fa-telegram` | Telegram | 通讯 |
| `fab fa-whatsapp` | WhatsApp | 通讯 |
| `fab fa-weixin` / `fab fa-wechat` | WeChat | 通讯 |
| `fab fa-qq` | QQ | 通讯 |
| `fab fa-weibo` | 微博 | 社交 |
| `fab fa-twitter` / `fab fa-x-twitter` | Twitter / X | 社交 |
| `fab fa-facebook` / `fab fa-facebook-f` | Facebook | 社交 |
| `fab fa-instagram` | Instagram | 社交 |
| `fab fa-linkedin` / `fab fa-linkedin-in` | LinkedIn | 社交 |
| `fab fa-youtube` | YouTube | 媒体 |
| `fab fa-tiktok` | TikTok | 媒体 |
| `fab fa-reddit` | Reddit | 论坛 |
| `fab fa-twitch` | Twitch | 流媒体 |
| `fab fa-spotify` | Spotify | 音乐 |
| `fab fa-soundcloud` | SoundCloud | 音乐 |
| `fab fa-paypal` | PayPal | 支付 |
| `fab fa-stripe` | Stripe | 支付 |
| `fab fa-stripe-s` | Stripe S | 支付 |
| `fab fa-apple-pay` | Apple Pay | 支付 |
| `fab fa-google-pay` | Google Pay | 支付 |
| `fab fa-cc-visa` | Visa | 信用卡 |
| `fab fa-cc-mastercard` | MasterCard | 信用卡 |
| `fab fa-cc-amex` | AmEx | 信用卡 |
| `fab fa-cc-jcb` | JCB | 信用卡 |
| `fab fa-cc-discover` | Discover | 信用卡 |
| `fab fa-cc-diners-club` | Diners Club | 信用卡 |
| `fab fa-cc-stripe` | Stripe | 信用卡 |
| `fab fa-bitcoin` | Bitcoin | 数字货币 |
| `fab fa-ethereum` | Ethereum | 数字货币 |
| `fab fa-shopify` | Shopify | 电商 |
| `fab fa-wordpress` | WordPress | 电商 |
| `fab fa-drupal` | Drupal | 电商 |
| `fab fa-joomla` | Joomla | 电商 |
| `fab fa-yahoo` | Yahoo | 门户 |
| `fab fa-baidu` | 百度 | 门户 |

> 完整 brands 列表见 [fontawesome.com/icons?o=brands](https://fontawesome.com/icons?o=brands)。

---

## 附录

### 完整图标库

本文档只精选 dashboard 场景常用图标（约 400+）。完整列表（约 2000+ 条 Free，
2000+ 条 Pro）参见：

- [fontawesome.com/icons](https://fontawesome.com/icons) — 完整图标库
- [docs.fontawesome.com/web/add-icons/svg-sprites](https://docs.fontawesome.com/web/add-icons/svg-sprites) — 高级用法

### v4 → v6 兼容映射

详细映射见 `doc/qapps2-icon-systems.md` 末尾"v4 → v6 兼容映射"小节。
常见要点：

- 所有 `fa fa-…` v4 写法仍可用（v4 shim 自动映射）。
- 新代码推荐 `fas` / `far` / `fab` 前缀（v6 标准）。
- 颜色：`<i class="fa fa-… text-primary">` 通过 Quasar text color 类生效；
  直接用 `style="color:..."` 或 `<i class="text-primary">` 也能用。

### Quasar 集成注意事项

- `<q-icon name="fa fa-search">` **不会**渲染 FA。要使用 FA 必须：
  - 写 `<i class="fa fa-search">` 直接放在 HTML 中；
  - 或 `<q-icon>` 内放默认 slot：`<q-icon><i class="fa fa-search"></i></q-icon>`；
  - 或放进 `m-dash-*` 组件的 default / toolbar slot。
- `m-dash-stat` / `m-dash-list` 等的 `icon` prop 必须是 Material Icons ligature。

### 参考其它文档

- `doc/qapps2-icon-systems.md` — 两套图标系统的对照说明
- `doc/qapps2-material-icons.md` — Material Icons ligature 名称参考
- `doc/qapps2-dashboard.md` — dashboard kit 总览
- `template/screen-macro/DefaultScreenMacros.qvt2.ftl` — FTL 宏默认图标选择
- `data/Qapps2ThemeData.xml` — 主题图标映射