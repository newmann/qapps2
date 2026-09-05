# AGENTS — qapps2

Scoped rules for this component. This file overrides the repository root
`AGENTS.md` when you are working in this directory.

## Role

Parallel internal UI entry (`/qapps2`) on Vue 3 + Quasar UI 2 UMD. Same
business screen tree as `/qapps` and `/vapps` (`/apps`). Own macros, vendor
files, and render modes.

Depends on (from `component.xml`):

- `webroot`
- `tools`

## Find things here

- Requirements: `doc/qapps2-requirements.md`
- Screens: `screen/qapps2.xml` (shell at `/qapps2`)
- Static: `screen/qapps2static/` (source JS/CSS/qvue; `libs/` is generated)
- Macros: `template/screen-macro/`
- Seed: `data/Qapps2ThemeData.xml`, `data/AppSeedData.xml`, `data/Qapps2L10nData.xml`
- Frontend build: `build.gradle` (download Vue 3 / Quasar 2, minify, combine)

Vendor files under `screen/qapps2static/libs/` and `js/*.min.js` are Gradle
outputs, not committed. After a fresh clone or `cleanAll`, run:

```bash
./gradlew :runtime:component:qapps2:build
```

Root `./gradlew build` also runs this subproject. Production loads
`CombinedBase.min.js` and `CombinedQvt2.min.js`; set
`instance_purpose` to anything other than empty/`production` to load
unminified split files.

## Conventions

- Do not edit `webroot` or tools Assist
- Mount only from this component's `MoquiConf.xml` (shell + static + render modes)
- AJAX screens use `.qvt2` / `.qvue2` / `.qjs2`
- `confBasePath=/apps`, `confLinkBasePath=/qapps2` (same pattern as `/qapps`)
- Treat `qvt` render-mode text as compatible when rendering `qvt2`
- Chinese l10n lives in this component (`data/Qapps2L10nData.xml`). Do not create
  a `qapps2-zh_CN` sidecar. If a screen, FTL, JS, or qvue string needs
  `localize()`, change it here. Locale is `zh_CN`. Keep English originals.
- Do not add `depends-on` for `framework-zh_CN` or `base-component-zh_CN`.
  Business screens under `/apps` still pick up those sidecars when present.

## Verify

- Screen: `http://localhost:8080/qapps2/`
- ServiceRun: `http://localhost:8080/qapps2/tools/Service/ServiceRun`
- Existing `/qapps` and `/apps` must keep working

## Do not

- Overwrite `webroot/libs/vue` or `webroot/libs/quasar`
- Edit the Cursor plan file
