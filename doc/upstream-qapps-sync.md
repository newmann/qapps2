# Upstream qapps → qapps2 sync

qapps2 is a parallel Vue 3 + Quasar 2 shell. Do **not** regenerate from
qapps or merge the in-place `vue3quasar2` branch. Port by feature.

## Watch paths (webroot / runtime)

| Upstream path | qapps2 counterpart |
|---------------|-------------------|
| `webroot/.../js/WebrootVue.qvt.js` | `screen/qapps2static/js/WebrootVue.qvt2.js` |
| `webroot/.../includes/WebrootVue.qvt.ftl` | `screen/includes/WebrootVue.qvt2.ftl` |
| `webroot/.../css/WebrootVue.qvt.css` | `screen/qapps2static/css/WebrootVue.qvt2.css` |
| `webroot/.../qapps.xml` | `screen/qapps2.xml` |
| `webroot/.../js/MoquiLib.js` | `screen/qapps2static/js/MoquiLib.js` |
| `runtime/template/.../DefaultScreenMacros.qvt.ftl` | `template/screen-macro/DefaultScreenMacros.qvt2.ftl` |
| `webroot/.../js/assist/**` | `screen/qapps2static/js/assist/**` (Vue 3 shell SFC) |

## Triage labels

For each upstream commit touching the watch paths, pick one:

- **port** — hand-adapt into the qapps2 file with Vue 3 / Quasar 2 idioms
- **already** — qapps2 already has the fix or an equivalent
- **N/A** — Vue2-only, qapps theme-only, or intentionally diverged
- **Assist-queue** — shell Assist / OpenUI; update `screen/qapps2static/js/assist/`, not webroot sources

## Do not copy naively

- `Vue.component` / `new Vue` / `beforeDestroy` / `httpVueLoader`
- `value` + `@input` / `slot=` / `col-xs-*` / `--q-color-*`
- Overwrite `webroot/libs/vue` or `webroot/libs/quasar`

## Chart engine

qapps2 Assist OpenUI charts and shell `m-chart` / `m-dash-chart` use
**Chart.js 2.9.3** (local libs), shared via `js/dash/DashShared.js`. Keep
aligned with upstream webroot Assist Chart.js unless a deliberate dual-shell
ECharts migration is approved.

## Assist layout

- Assist is not an `/apps` subscreen. qapps and qapps2 each mount a static SFC from the shell header when the user has `LlmGateway`.
- qapps2 SFC: `screen/qapps2static/js/assist/Assist.qvue`. OpenUI and the sandbox parent load from `qapps2static/js/assist/`. The generated-screen iframe still uses webroot Vue 2 and `/js/assist/AssistSandboxRuntime.js`.
- Title updates POST `/apps/setAssistTitle`. There is no `ASSIST_APP` screen authz for qapps2.

## Verify after a sync

1. `/qapps/` and `/apps/` still work (Vue2 shell unchanged).
2. `/qapps2/` and `/qapps2/tools/Service/ServiceRun`.
3. If Assist changed: header button on `/qapps/` and `/qapps2/` (user needs `LlmGateway`).
4. After vendor URL changes: `./gradlew :runtime:component:qapps2:build`.
