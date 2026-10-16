# AGENTS — qapps2

Vue 3 / Quasar 2 application shell for `/qapps2`. Shared conventions:
`.agents/component-common.md`.

## Find things here

- Mount: `screen/qapps2.xml` (`/qapps2`), conf in `MoquiConf.xml`
- Shell: `screen/includes/WebrootVue.qvt2.ftl`
- SPA loader: `screen/qapps2static/js/WebrootVue.qvt2.js`
- Production script: `screen/qapps2static/js/CombinedQvt2.min.js`
  (`instance_purpose` empty or `production`). Dev loads `WebrootVue.qvt2.js`.
- `WebrootVue.qvt2.min.js` and `CombinedQvt2.min.js` are build outputs
  (`js/*.min.js` is gitignored). `minifyJsDir` minifies `WebrootVue.qvt2.js`;
  `combineQvt2Js` concatenates that into `CombinedQvt2.min.js`.

## Guardrails

- `.qvue2` loads must send the screen query string and extra path.
  `loadComponent` appends both before the SFC request. Cache key stays the
  path; only `Cache-Control: max-age` responses are cached.
- Edit `WebrootVue.qvt2.js` only. Do not hand-edit `WebrootVue.qvt2.min.js`
  or `CombinedQvt2.min.js`. Regenerate them with
  `./gradlew :runtime:component:qapps2:build`.
- Do not edit `runtime/base-component/webroot`. Screen mounts stay in this
  component's `MoquiConf.xml`.
