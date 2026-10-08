# qapps2 Dashboard kit

Screen-side `m-dash-*` Vue components for KPI / charts / lists, aligned with
Assist OpenUI (`Stat`, `Card`, charts). Chart engine: **Chart.js 2.9.3**
(local `/qapps2static/libs/Chart.js/`). Do not introduce ECharts without an
explicit sync decision (see plan notes in `upstream-qapps-sync.md` triage).

## Files

| Path | Role |
|------|------|
| `screen/qapps2static/js/dash/DashShared.js` | Colors, Chart.js config builders → `moqui.qapps2Dash` |
| `screen/qapps2static/js/dash/DashComponents.js` | `m-dash-stat` … `m-dash-filter-bar` |
| `screen/qapps2static/css/WebrootVue.qvt2.css` | `.m-dash-*` styles |
| `screen/DashboardKit.xml` | Demo gallery |
| Assist OpenUI | `Stat` (+ delta/icon/href); charts reuse DashShared when loaded |

After JS changes: `./gradlew :runtime:component:qapps2:build`.

Demo URL: `/qapps2/dashboardKit` (MoquiConf mount; load `AppSeedData` if 403).

## Screen components (API)

### `m-dash-stat`

| Prop | Notes |
|------|--------|
| `title` / `label` | Caption above value |
| `value` | Main metric |
| `subtitle` / `caption` | Secondary line |
| `delta`, `delta-type` | Trend text; type `up`/`down`/`positive`/`negative` |
| `icon`, `color` | Material icon + Quasar color |
| `href` / `url` | Optional navigation |

### `m-dash-panel`

Non-collapsing card (`title`, `dense`, `flat`, default slot, `toolbar` slot).
Prefer over `container-box` for dashboard tiles.

### `m-dash-chart`

Declarative Chart.js wrapper (same semantics as OpenUI charts):

| Prop | Notes |
|------|--------|
| `type` | `bar`, `line`, `area`, `pie`, `doughnut` |
| `labels` | Category labels |
| `datasets` / `series` | `[{ name, values }]` |
| `values` / `data` | Pie values |
| `variant` | e.g. `stacked`, `natural`, `step`, `donut` |
| `x-label`, `y-label`, `height`, `width` |
| `config` | Escape hatch: raw Chart.js 2.x config |

Legacy `m-chart` (`:config`) remains for compatibility; prefer `m-dash-chart`.

### `m-dash-list`

`items`: `[{ title, caption, meta, icon, url }]`.

### `m-dash-progress`

`label`, `value`, `max`, `color`.

### `m-dash-filter-bar`

Date from/thru + presets; emits `change` with `{ fromDate, thruDate }`.
Optional `container-id` reloads a `m-dynamic-container` with those query params.

## Usage recipes

### A. XML dashboard (render-mode)

```xml
<container-row>
  <row-col md="3">
    <render-mode>
      <text type="qvt"><![CDATA[
<m-dash-stat title="Open" :value="${openCount}" icon="pending_actions" color="primary"/>
      ]]></text>
    </render-mode>
  </row-col>
</container-row>
```

Use `type="qvt"` (qapps2 treats it as `qvt2` compatible). Build JSON in
`<actions>` with `groovy.json.JsonOutput` for `:labels` / `:datasets`.

### B. Mix with forms

KPI row (`m-dash-stat`) above `container-box` + `form-list` / `form-single`
(see `.agents/skills/moqui-xml-dsls/references/screen-ui-patterns.md`).

### C. `.qvue2`

Components are global on the qapps2 app; use the same tags in an SFC template.

## OpenUI ↔ screen对照

| Screen | OpenUI |
|--------|--------|
| `m-dash-stat` | `Stat(label, value, caption?, delta?, deltaType?, icon?, color?, href?)` |
| `m-dash-panel` | `Card` + `CardHeader` |
| `m-dash-chart` | `BarChart` / `LineChart` / `AreaChart` / `PieChart` + `Series` |
| `m-dash-list` | `ListBlock` + `ListItem` |
| `m-dash-progress` | (screen only in v1) |
| `m-dash-filter-bar` | `Form` + `DatePeriod` |

### OpenUI lang example (Assist canvas)

Paste into Assist WriteUi (kind=openui) or use as a prompt sample:

```
root = Stack([
  Stack(direction: "row", gap: "m", wrap: true, children: [
    Stat("Open", 14, caption: "Active", delta: "+3", deltaType: "up", icon: "pending_actions", color: "primary"),
    Stat("Done", 128, delta: "+12", deltaType: "up", icon: "task_alt", color: "positive"),
    Stat("Backlog", 37, delta: "-2", deltaType: "down", icon: "inventory_2", color: "warning"),
    Stat("SLA", "92%", caption: "Last 30 days", icon: "verified", color: "info")
  ]),
  Card([
    CardHeader("Weekly volume"),
    LineChart(["Mon","Tue","Wed","Thu","Fri"], [
      Series("Opened", [8,12,9,15,11]),
      Series("Closed", [5,10,11,12,14])
    ])
  ]),
  Card([
    CardHeader("Activity"),
    ListBlock([
      ListItem("Request submitted", "Checkout", "2h"),
      ListItem("Asset returned", "SN-991", "5h")
    ])
  ])
])
```

Exact OpenUI syntax follows `@openuidev/lang-core` / Assist prompts; property
names match `AssistOpenUiLibrary.spec.json`.

## Refresh

- Prefer `dynamic-container` + transition for server-driven slices.
- `m-dash-filter-bar` with `container-id` appends `fromDate` / `thruDate` and
  calls `load` on the registered container.
