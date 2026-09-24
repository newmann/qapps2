# AGENTS — qapps2

Domain rules. Shared conventions: `.agents/component-common.md`.

## Role

Parallel UI entry (`/qapps2`) on Vue 3 + Quasar 2 UMD. Same screen tree as
`/qapps` and `/apps`. Own macros, vendor files, and render modes.

Depends on: `webroot`, `tools`.

## Find things here

- Requirements: `doc/qapps2-requirements.md`
- Shell: `screen/qapps2.xml`; static: `screen/qapps2static/`
- Macros: `template/screen-macro/`
- Seed: `data/Qapps2ThemeData.xml`, `AppSeedData.xml`, `Qapps2L10nData.xml`
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

## Verify

- Root redirects to `/qapps2/`; `/qapps` and `/apps` must keep working
- Screen: `/qapps2/`; ServiceRun: `/qapps2/tools/Service/ServiceRun`

## Do not

- Overwrite `webroot/libs/vue` or `webroot/libs/quasar`
