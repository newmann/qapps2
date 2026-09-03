# qapps2

[English](README.md) | [中文](README.zh.md)

并行内部 UI 入口 `/qapps2`，栈为 **Vue 3.5 + Quasar UI 2.27**（UMD）。业务屏树仍是 `/apps`，与 `/qapps`、`/vapps` 共用。壳、屏宏、vendor、render mode 都在本组件内。

版本 **0.1.0**。默认内部 UI 仍是 `/qapps`；本入口需主动访问。

## 与其他入口的对比

| 入口 | 栈 | 拉屏扩展名 |
|------|-----|------------|
| `/qapps` | Vue 2.7 + Quasar 1.22 | `.qvt` / `.qvue` / `.qjs` |
| `/vapps` | Vuetify | `.vuet` |
| `/qapps2` | Vue 3.5 + Quasar 2.27 | `.qvt2` / `.qvue2` / `.qjs2` |

不改 `webroot.xml` 的 `default-item`。需要时直接打开 `/qapps2`。

## URL 与数据流

| URL | 作用 |
|-----|------|
| `/qapps2` | Vue 3 壳（`confLinkBasePath`） |
| `/apps` | 共享业务屏（`confBasePath`；AJAX 拉屏） |
| `/qapps2static` | Vue 3 / Quasar 2 / 壳 JS 与 CSS |

```text
/qapps2  (壳)  -->  Vue 3.5 + Quasar 2.27
                      |
                      v
                   .qvt2 宏
                      |
                      v
                   /apps  (webroot apps.xml)
```

示例：打开 `/qapps2/tools/Service/ServiceRun`，壳会请求 `/apps/tools/Service/ServiceRun.qvt2`。

挂载与 render mode 只在本组件 [`MoquiConf.xml`](MoquiConf.xml) 里注册，不要改 webroot 源文件。业务应用仍挂在 `webroot/apps.xml` 上，不必为 qapps2 再挂一遍。

## 快速开始

依赖 `webroot` 和 `tools`（见 `component.xml`）。本机需已有 runtime。

1. 下载 vendor 并压缩（全新 clone 或 `cleanAll` 之后必做）：

   ```bash
   ./gradlew :runtime:component:qapps2:build
   ```

   根目录 `./gradlew build` 也会跑本子项目。Gradle 会自动 include 任何带 `build.gradle` 的 `runtime/component/*` 目录。

2. 先停 `moqui.war`，再加载数据（鉴权是 `seed`；主题 `DEFAULT_QUASAR2` 是 `seed-initial`）：

   ```bash
   ./gradlew load
   ```

   或至少：`./gradlew load -Ptypes=seed,seed-initial`。

3. 启动服务并打开壳：

   ```bash
   java -jar moqui.war
   ```

   - 界面：http://localhost:8080/qapps2/
   - 演示账号（已加载 demo 数据）：`john.doe` / `moqui`
   - 验收：http://localhost:8080/qapps2/tools/Service/ServiceRun
   - `/qapps` 与 `/apps` 必须仍可正常使用

## 生产与开发脚本

见 [`screen/qapps2.xml`](screen/qapps2.xml)，由 JVM 属性 `instance_purpose` 决定：

- 为空或 `production`：加载 `CombinedBase.min.js` + `CombinedQvt2.min.js`
- 其他值：加载未压缩拆分文件（Moment、jQuery、`MoquiLib.js`、Vue、vue3-sfc-loader、Quasar、`WebrootVue.qvt2.js`）

## 目录

```text
runtime/component/qapps2/
  component.xml
  MoquiConf.xml                 # /qapps2、/qapps2static、qvt2 / qjs2 / qvue2
  build.gradle                  # 下载 vendor、minify、Combined*.min.js
  .gitignore                    # libs/ 与 js/*.min.js
  AGENTS.md
  doc/qapps2-requirements.md
  data/AppSeedData.xml          # ADMIN 全权限、ALL_USERS VIEW
  data/Qapps2ThemeData.xml      # STT_INTERNAL_QUASAR2、DEFAULT_QUASAR2
  screen/qapps2.xml
  screen/includes/WebrootVue.qvt2.ftl
  screen/qapps2static.xml
  screen/qapps2static/js/       # WebrootVue.qvt2.js、MoquiLib.js
  screen/qapps2static/css/
  screen/qapps2static/lib/      # 从 SimpleScreens 复制并适配的导航 SFC
  screen/qapps2static/libs/     # Gradle 产物（不入库）
  template/screen-macro/        # DefaultScreenMacros.qvt2.ftl、plain.ftl
```

`build.gradle` 会下载 Vue 3.5.21、Quasar 2.27.0、vue3-sfc-loader 0.9.5、jQuery 3.7.1、Moment 2.30.1、Font Awesome 6.7.2，再 minify 并合并。

现有业务屏 XML 不必再写一份 `qvt2` 文本。`qvt2` 宏把 `type="qvt"` 当作兼容回退。

## 约定与边界

- 不改 `runtime/base-component/webroot/**`、qapps 的 `.qvt` 宏、`MoquiDefaultConf.xml`、tools Assist 源文件。
- 本轮不迁 QZ 打印。
- Assist 用 `.qvt2` 宏渲染，不改其源。

## 相关文档

- 需求：[doc/qapps2-requirements.md](doc/qapps2-requirements.md)
- Agent 约定：[AGENTS.md](AGENTS.md)

## 许可

源文件头为 CC0 1.0 Universal plus a Grant of Patent License（与 Moqui 一致）。本组件目录没有单独的 `LICENSE.md`。
