# AGENTS — qapps2

Domain rules. Shared conventions: `.agents/component-common.md`.

## Role

Parallel UI entry (`/qapps2`) on Vue 3 + Quasar 2 UMD. Same screen tree as
`/qapps` and `/apps`. Own macros, vendor files, and render modes.

Depends on: `webroot`, `tools`.

## Find things here

- Requirements: `doc/qapps2-requirements.md`
- Upstream sync triage: `doc/upstream-qapps-sync.md`
- Dashboard kit: `doc/qapps2-dashboard.md`; JS under
  `screen/qapps2static/js/dash/`; demo `/qapps2/dashboardKit`
- Shell: `screen/qapps2.xml`; static: `screen/qapps2static/`
- Assist overlay: `screen/Assist.xml` + `screen/Assist.qvue`; OpenUI under
  `screen/qapps2static/js/assist/`
- Macros: `template/screen-macro/`
- Seed: `data/Qapps2ThemeData.xml`, `AppSeedData.xml` (incl. Assist on
  `ASSIST_APP`), `Qapps2L10nData.xml`
- Build: `build.gradle` (vendor under `screen/qapps2static/libs/` is generated)

After clone or `cleanAll`:

```bash
./gradlew :runtime:component:qapps2:build
```

## Conventions

- Do not edit `webroot` or tools Assist; mount only from this `MoquiConf.xml`
- AJAX screens: `.qvt2` / `.qvue2` / `.qjs2`; `qvt`/`qvue`/`qjs` fall back
- `confBasePath=/apps`, `confLinkBasePath=/qapps2`
- Chinese l10n in `data/Qapps2L10nData.xml` only (no `qapps2-zh_CN` sidecar)
- Do not add `depends-on` for `framework-zh_CN` or `base-component-zh_CN`
- When webroot qapps / tools Assist change, triage per
  `doc/upstream-qapps-sync.md` (port / already / N/A / Assist-queue)

## Verify

- Root redirects to `/qapps2/`; `/qapps` and `/apps` must keep working
- Screen: `/qapps2/`; ServiceRun: `/qapps2/tools/Service/ServiceRun`
- Assist: `/qapps2/assist` (Vue3) and `/qapps/assist` (Vue2) both load

## Do not

- Overwrite `webroot/libs/vue` or `webroot/libs/quasar`
- Copy Vue2 `Vue.component` / `httpVueLoader` Assist scripts into this shell
  without a Vue3 port
