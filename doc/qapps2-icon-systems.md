# qapps2 图标系统对照

qapps2 默认主题 `DEFAULT_QUASAR2` 同时挂载两套图标字体：**Material Icons**
和 **Font Awesome 6 (LTS)**。两者各有用途，不能在同一处混写，但可在同一页面
共存。

本文档说明两者的来源、命名、加载、典型用法与混用规则。

## 概览

| | Material Icons | Font Awesome |
|---|---|---|
| 字体包 | `material-icons@1.13.14` | `font-awesome/6.7.2` LTS + v4 shims |
| 来源 | Google 官方 | Font Awesome 官方 |
| 引入文件 | `screen/qapps2static/libs/material-icons/` | `screen/qapps2static/libs/font-awesome/` |
| 字体格式 | woff / woff2（ligature 字体） | woff / woff2（每 family 各一字体） |
| 命名约定 | **ligature 名称**（小写蛇形字符串） | **CSS class 名**（`fa fa-…` / `fas fa-…` / `far fa-…` / `fab fa-…`） |
| 渲染触发 | 文本内容等于 ligature 名称 | 元素带特定 class |
| 主题注册 | `Qapps2ThemeData.xml` seq 7 | `Qapps2ThemeData.xml` seq 2/3/4 |
| 颜色与尺寸 | `font-size`、`color` 直接生效 | `font-size` 生效；`color` 默认需 `style="color:..."` 或 text color |

`build.gradle:30-42` 注释明确说明选型理由：

> FA 6.7.2 LTS + v4 shims so existing Moqui XML `fa fa-*` still works,
> while new screens can use fas/far/fab or fa-solid/fa-regular/fa-brands.

## 命名

### Material Icons

```vue
<q-icon name="search"/>           <!-- 等价于 Material Icons ligature "search" -->
<q-icon name="pending_actions"/>  <!-- 多词 ligature -->
```

- 名称即为 ligature 文本。字体文件中 `search` 对应一个图形，`pending_actions` 对应另一个。
- 完整清单参见 [Google Fonts · Material Icons](https://fonts.google.com/icons)
  （Selected: Material Icons / Filled）。
- 详见 `doc/qapps2-material-icons.md`。

### Font Awesome

```html
<i class="fa fa-search"></i>          <!-- FA v4 兼容写法（v4 shim 自动映射） -->
<i class="fas fa-magnifying-glass"></i><!-- FA 6 写法（Solid） -->
<i class="far fa-bell"></i>            <!-- Regular -->
<i class="fab fa-github"></i>          <!-- Brands -->
<i class="fa-solid fa-search"></i>     <!-- FA 6 显式前缀写法 -->
```

- **v4 兼容层**：项目开启 `v4-shims.min.css` + `v4-font-face.min.css`，
  `fa fa-search`、`fa fa-pencil`、`fa fa-trash` 等老写法自动映射到 FA 6 图形。
- **新写法**：推荐 `fas` / `far` / `fab` / `fa-solid` / `fa-regular` / `fa-brands` 显式前缀，
  与 FA 6 官方文档一致。
- 完整清单参见 [fontawesome.com/icons](https://fontawesome.com/icons)。

## 加载顺序

`Qapps2ThemeData.xml` 中 `DEFAULT_QUASAR2` 主题的样式表：

```
seq 2  /qapps2static/libs/font-awesome/css/all.min.css
seq 3  /qapps2static/libs/font-awesome/css/v4-shims.min.css
seq 4  /qapps2static/libs/font-awesome/css/v4-font-face.min.css
seq 5  /qapps2static/css/qapps2-fonts.css
seq 6  /qapps2static/libs/quasar2/quasar.prod.css
seq 7  /qapps2static/libs/material-icons/material-icons.css
seq 20 /qapps2static/css/WebrootVue.qvt2.css
```

两套字体都加载，CSS 互相隔离（不同 `@font-face` 名称 + 不同 class），因此
同页面两种图标可同时使用，无冲突。

## 典型用法

### Material Icons

仅在 Vue 组件的 `name` / `icon` prop 中以 ligature 名称传入，Quasar 2 UMD
默认将 `<q-icon name="...">` 渲染为 Material Icons ligature。

```vue
<m-dash-stat title="待办" :value="14" icon="pending_actions" color="primary"/>
<m-dash-list :items="[{ title:'IN', icon:'inbox', ... }]"/>
<q-icon name="notifications_active" color="negative"/>
```

适用组件 / 位置：

- `m-dash-stat`、`m-dash-list`（items.icon）、`m-dash-progress`（无图标）
- `m-dash-filter-bar` 内置 "Apply" 按钮 `icon="filter_alt"`
- 任意 `<q-icon name="...">`（qapps2 壳内）

### Font Awesome

FTL 宏渲染为 `<i class="fa fa-…">`（**不是** `<q-icon>`）。这是 Quasar 推荐的
"绕开 iconSet 解析" 的写法。

```html
<q-btn><i class="fa fa-save q-icon on-left"></i>保存</q-btn>
```

适用场景（均由 FTL 宏产生）：

- `<submit>` / `<reset>` / `<link>` / `<field>` 等宏的 `icon` 属性
  （`DefaultScreenMacros.qvt2.ftl:2162-2178`、`304/315/352/436`）
- 主题级 `ScreenThemeIcon` 映射（`Qapps2ThemeData.xml:44-53`，按按钮文字正则匹配）
- `MoquiLib.js` 通知 toast 图标（`:372-375`）
- 所有 Moqui 遗留 XML 屏（`webroot/...`、mantle-*）的按钮图标

## 混用规则

| 场景 | 用什么 | 备注 |
|---|---|---|
| `<m-dash-*>` 组件的 `icon` prop | Material Icons ligature | 如 `search`、`pending_actions` |
| `<q-icon name="...">` | Material Icons ligature | Quasar 2 默认 icon set |
| `<submit icon="...">` 等 FTL 宏 | FA class | 如 `fa fa-search`、`fas fa-save` |
| FTL 宏生成的 `<i class="fa fa-…">` | FA | 已有 `q-icon` 类用于对齐 |
| `<i class="material-icons">search</i>` | Material Icons | 字形文本方式（不推荐） |
| `<q-icon>` 默认 slot | 任意 HTML | 例：`<q-icon><i class="fa fa-…"></i></q-icon>` |

### 错误的混写（不会得到预期效果）

```vue
<!-- 错：把 FA class 当 Material ligature 查找，会渲染成字面字符串或空白 -->
<m-dash-stat icon="fa fa-search"/>
<q-icon name="fa fa-search"/>

<!-- 错：把 Material ligature 当 FA class，不会渲染 -->
<i class="material-icons">fa-search</i>
<i class="fa-search material-icons"></i>
```

如想在 `m-dash-*` 组件里显示 FA 图标，请把 `<i class="fa fa-…">` 放进默认 slot
或 toolbar slot（参考 `m-dash-panel` 用法），而不是用 `icon` prop。

## v4 → v6 兼容映射

项目开启 v4 shims 后，以下老写法仍然有效；建议新代码直接用 v6 名称。

| v4 写法 | v6 写法（推荐） | 含义 |
|---|---|---|
| `fa fa-search` | `fas fa-magnifying-glass` | 搜索 |
| `fa fa-pencil` | `fas fa-pen` | 编辑 |
| `fa fa-trash` | `fas fa-trash-can` | 删除 |
| `fa fa-save` | `fas fa-floppy-disk` | 保存 |
| `fa fa-cog` | `fas fa-gear` | 设置 |
| `fa fa-cogs` | `fas fa-gears` | 多设置 |
| `fa fa-times` | `fas fa-xmark` | 关闭/取消 |
| `fa fa-close` | `fas fa-xmark` | 同上 |
| `fa fa-check` | `fas fa-check` | 勾选（未改名） |
| `fa fa-info-circle` | `fas fa-circle-info` | 信息 |
| `fa fa-question-circle` | `fas fa-circle-question` | 提问 |
| `fa fa-exclamation-triangle` | `fas fa-triangle-exclamation` | 警告 |
| `fa fa-mobile` | `fas fa-mobile-screen` | 手机 |
| `fa fa-mobile-alt` | `fas fa-mobile-screen-button` | 智能手机 |
| `fa fa-television` | `fas fa-tv` | 电视 |
| `fa fa-volume-up` | `fas fa-volume-high` | 音量加 |
| `fa fa-volume-down` | `fas fa-volume-low` | 音量减 |
| `fa fa-volume-mute` | `fas fa-volume-off` | 静音 |
| `fa fa-photo` / `fa fa-picture-o` | `fas fa-image` | 图片 |
| `fa fa-globe` | `fas fa-earth-americas` | 地球 |
| `fa fa-bar-chart-o` | `fas fa-chart-column` | 柱状图 |
| `fa fa-line-chart` | `fas fa-chart-line` | 折线图 |
| `fa fa-pie-chart` | `fas fa-chart-pie` | 饼图 |
| `fa fa-area-chart` | `fas fa-chart-area` | 面积图 |
| `fa fa-money` | `fas fa-money-bill-1` | 现金 |
| `fa fa-cloud-download` | `fas fa-cloud-arrow-down` | 云下载 |
| `fa fa-cloud-upload` | `fas fa-cloud-arrow-up` | 云上传 |
| `fa fa-refresh` | `fas fa-arrows-rotate` | 刷新 |
| `fa fa-undo` | `fas fa-arrow-rotate-left` | 撤销 |
| `fa fa-redo` | `fas fa-arrow-rotate-right` | 重做 |
| `fa fa-edit` | `fas fa-pen-to-square` | 编辑（按钮） |
| `fa fa-print` | `fas fa-print` | 打印（未改名） |
| `fa fa-eye` | `fas fa-eye` | 查看（未改名） |
| `fa fa-eye-slash` | `fas fa-eye-slash` | 隐藏（未改名） |
| `fa fa-bell` / `fa fa-bell-o` | `fas fa-bell` / `far fa-bell` | 通知 / 通知空心 |
| `fa fa-bookmark-o` | `far fa-bookmark` | 书签空心 |
| `fa fa-star-o` | `far fa-star` | 星空心 |
| `fa fa-thumbs-o-up` | `far fa-thumbs-up` | 点赞空心 |
| `fa fa-thumbs-o-down` | `far fa-thumbs-down` | 点踩空心 |
| `fa fa-folder-o` | `far fa-folder` | 文件夹空心 |
| `fa fa-folder-open-o` | `far fa-folder-open` | 文件夹（开）空心 |
| `fa fa-circle-o` | `far fa-circle` | 圆空心 |

v4 shim 仅覆盖 FA Free 在 v4 中有、FA 6 中重命名或转移前缀的常用图标；
不包含的内容（如 `fa fa-cc-visa` 这类 brands 在 v4 中已存在，v6 中仍存在）
直接走 v4 shim 后退路径。

## Outlined 样式（Material Icons 才有）

`material-icons.css` 同时声明了 `Material Icons`（Filled）和
`Material Icons Outlined` 两套字体家族。切换 outlined 样式：

```html
<q-icon name="inventory_2" class="material-icons-outlined"/>
```

FA **不提供** outlined/outline class 切换；如需 outline 风格可在
`screen/qapps2static/css/` 自定义覆盖，或改用 `far fa-…`（部分图标支持）。

## 引用

- `doc/qapps2-material-icons.md` — Material Icons ligature 名称参考
- `doc/qapps2-font-awesome.md` — Font Awesome 6.7.2 LTS 参考
- `doc/qapps2-dashboard.md` — dashboard kit 总览（`m-dash-*` 组件 API）
- `data/Qapps2ThemeData.xml` — 主题样式表 / 图标映射
- `template/screen-macro/DefaultScreenMacros.qvt2.ftl` — FTL 宏默认图标选择