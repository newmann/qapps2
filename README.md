# qapps2

[English](README.md) | [中文](README.zh.md)

Parallel internal UI entry at `/qapps2` on **Vue 3.5 + Quasar UI 2.27** (UMD). The business screen tree is still `/apps`, shared with `/qapps` and `/vapps`. The shell, screen macros, vendor files, and render modes live in this component.

Version **0.1.0**. While this component is installed, `/` and post-login
root use `/qapps2` (`MoquiConf.xml` `default-subscreen`). `/qapps` remains
available. Without this component, webroot still defaults to `/qapps`.

## Compared with other entries

| Entry | Stack | Screen extensions |
|-------|--------|-------------------|
| `/qapps` | Vue 2.7 + Quasar 1.22 | `.qvt` / `.qvue` / `.qjs` |
| `/vapps` | Vuetify | `.vuet` |
| `/qapps2` | Vue 3.5 + Quasar 2.27 | `.qvt2` / `.qvue2` / `.qjs2` |

`webroot.xml` `default-item` stays `qapps`. This component's `MoquiConf.xml`
sets `default-subscreen="qapps2"` so the root path uses `/qapps2` only when
the component is present.

## URL and data flow

| URL | Role |
|-----|------|
| `/qapps2` | Vue 3 shell (`confLinkBasePath`) |
| `/apps` | Shared business screens (`confBasePath`; AJAX fetch) |
| `/qapps2static` | Vue 3 / Quasar 2 / shell JS and CSS |

```text
/qapps2  (shell)  -->  Vue 3.5 + Quasar 2.27
                          |
                          v
                       .qvt2 macros
                          |
                          v
                       /apps  (webroot apps.xml)
```

Example: open `/qapps2/tools/Service/ServiceRun` and the shell requests `/apps/tools/Service/ServiceRun.qvt2`.

Mounts and render modes are registered only in this component's [`MoquiConf.xml`](MoquiConf.xml). Do not edit webroot source. Business apps stay mounted on `webroot/apps.xml`; they do not need a second mount for qapps2.

## Quick start

Depends on `webroot` and `tools` (`component.xml`). Runtime must already be present.

1. Download vendor files and minify (required after a fresh clone or `cleanAll`):

   ```bash
   ./gradlew :runtime:component:qapps2:build
   ```

   Root `./gradlew build` also runs this subproject. Gradle auto-includes any `runtime/component/*` directory that has a `build.gradle`.

2. Stop `moqui.war`, then load data (authz is `seed`; theme `DEFAULT_QUASAR2` is `seed-initial`):

   ```bash
   ./gradlew load
   ```

   Or at least: `./gradlew load -Ptypes=seed,seed-initial`.

3. Start the server and open the shell:

   ```bash
   java -jar moqui.war
   ```

   - UI: http://localhost:8080/ (defaults to `/qapps2/` when this component is installed)
   - Explicit shell: http://localhost:8080/qapps2/
   - Demo login (after demo data): `john.doe` / `moqui`
   - Check: http://localhost:8080/qapps2/tools/Service/ServiceRun
   - `/qapps` and `/apps` must keep working

## Production vs development scripts

From [`screen/qapps2.xml`](screen/qapps2.xml), JVM property `instance_purpose`:

- Empty or `production`: `CombinedBase.min.js` + `CombinedQvt2.min.js`
- Anything else: unminified split files (Moment, jQuery, `MoquiLib.js`, Vue, vue3-sfc-loader, Quasar, `WebrootVue.qvt2.js`)

## Layout

```text
runtime/component/qapps2/
  component.xml
  MoquiConf.xml                 # /qapps2, /qapps2static, default-subscreen, qvt2 / qjs2 / qvue2
  build.gradle                  # download vendor, minify, Combined*.min.js
  .gitignore                    # libs/ and js/*.min.js
  AGENTS.md
  doc/qapps2-requirements.md
  data/AppSeedData.xml          # ADMIN all, ALL_USERS view
  data/Qapps2ThemeData.xml      # STT_INTERNAL_QUASAR2, DEFAULT_QUASAR2
  data/Qapps2L10nData.xml       # zh_CN messages for shell / macros / JS / qvue
  screen/qapps2.xml
  screen/includes/WebrootVue.qvt2.ftl
  screen/qapps2static.xml
  screen/qapps2static/js/       # WebrootVue.qvt2.js, MoquiLib.js
  screen/qapps2static/css/
  screen/qapps2static/lib/      # nav SFCs copied from SimpleScreens
  screen/qapps2static/libs/     # Gradle output (not committed)
  template/screen-macro/        # DefaultScreenMacros.qvt2.ftl, plain.ftl
```

`build.gradle` downloads Vue 3.5.21, Quasar 2.27.0, vue3-sfc-loader 0.9.5, jQuery 3.7.1, Moment 2.30.1, and Font Awesome 6.7.2, then minifies and combines.

Existing screen XML does not need separate `qvt2` / `qvue2` / `qjs2` text
blocks. The macros treat `type="qvt"`, `type="qvue"`, and `type="qjs"` as
compatible fallbacks. The shell requests `.qjs2` when `render-modes`
lists `qjs2`, `qjs`, or `js`.

## Boundaries

- Do not edit `runtime/base-component/webroot/**`, the qapps `.qvt` macros, `MoquiDefaultConf.xml`, or tools Assist sources.
- QZ printing is not migrated in this round.
- Assist is rendered with the `.qvt2` macros; its source is unchanged.

## Related

- Requirements: [doc/qapps2-requirements.md](doc/qapps2-requirements.md)
- Agent conventions: [AGENTS.md](AGENTS.md)

## License

Source headers use CC0 1.0 Universal plus a Grant of Patent License (same as Moqui). This component directory has no separate `LICENSE.md`.
