/* qapps2 dashboard Vue components (m-dash-*). Requires DashShared.js + WebrootVue.qvt2.js. Public domain CC0. */
(function() {
    'use strict';
    function dash() { return (typeof moqui !== 'undefined' && moqui.qapps2Dash) || window.Qapps2Dash || {}; }
    /** Register into the pending map and onto a live app if shell already mounted (Combined load order). */
    function registerDash(name, def) {
        if (typeof qapps2Register === 'function') qapps2Register(name, def);
        if (window.moqui && moqui.qapps2App && typeof moqui.qapps2App.component === 'function') {
            moqui.qapps2App.component(name, def);
        }
    }

    registerDash('m-dash-stat', {
        name: 'mDashStat',
        props: {
            title: { type: String, 'default': '' },
            label: { type: String, 'default': '' },
            value: { 'default': null },
            subtitle: { type: String, 'default': '' },
            caption: { type: String, 'default': '' },
            delta: { 'default': null },
            deltaType: { type: String, 'default': '' },
            icon: { type: String, 'default': '' },
            color: { type: String, 'default': 'primary' },
            href: { type: String, 'default': '' },
            url: { type: String, 'default': '' }
        },
        computed: {
            displayTitle: function() { return this.title || this.label || ''; },
            displayCaption: function() { return this.subtitle || this.caption || ''; },
            displayValue: function() {
                var fmt = dash().formatStatText;
                return fmt ? fmt(this.value) : (this.value == null ? '' : String(this.value));
            },
            qColor: function() {
                var qc = dash().quasarColor;
                return qc ? qc(this.color) : (this.color || 'primary');
            },
            deltaClass: function() {
                var t = (this.deltaType || '').toLowerCase();
                if (t === 'up' || t === 'positive' || t === 'good') return 'text-positive';
                if (t === 'down' || t === 'negative' || t === 'bad') return 'text-negative';
                if (this.delta == null || this.delta === '') return '';
                var n = parseFloat(this.delta);
                if (!isFinite(n) || n === 0) return 'text-grey-7';
                return n > 0 ? 'text-positive' : 'text-negative';
            },
            linkHref: function() { return this.href || this.url || ''; }
        },
        methods: {
            onClick: function() {
                var href = this.linkHref;
                if (!href) return;
                if (href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
                if (this.$root && typeof this.$root.loadNewUrl === 'function' && href.indexOf('http') !== 0) {
                    this.$root.loadNewUrl(href);
                } else {
                    window.location.href = href;
                }
            }
        },
        template:
            '<q-card flat bordered class="m-dash-stat q-pa-md" :class="{ \'m-dash-stat--link\': !!linkHref }" @click="onClick">' +
                '<div class="row items-start no-wrap">' +
                    '<div class="col">' +
                        '<div class="m-dash-stat__label text-caption text-grey-7">{{ displayTitle }}</div>' +
                        '<div class="m-dash-stat__value text-h4" :class="\'text-\' + qColor">{{ displayValue }}</div>' +
                        '<div v-if="delta != null && delta !== \'\'" class="m-dash-stat__delta text-caption" :class="deltaClass">{{ delta }}</div>' +
                        '<div v-if="displayCaption" class="m-dash-stat__caption text-caption">{{ displayCaption }}</div>' +
                    '</div>' +
                    '<div v-if="icon" class="m-dash-stat__icon q-ml-sm">' +
                        '<q-icon :name="icon" :color="qColor" size="32px"></q-icon>' +
                    '</div>' +
                '</div>' +
            '</q-card>'
    });

    registerDash('m-dash-panel', {
        name: 'mDashPanel',
        props: {
            title: { type: String, 'default': '' },
            dense: { type: Boolean, 'default': false },
            flat: { type: Boolean, 'default': true }
        },
        template:
            '<q-card :flat="flat" bordered class="m-dash-panel q-ma-sm">' +
                '<q-card-section v-if="title || $slots.toolbar" class="m-dash-panel__header row items-center q-pb-none" :class="{ \'q-pt-sm q-px-sm\': dense }">' +
                    '<div v-if="title" class="text-subtitle1 text-weight-medium">{{ title }}</div>' +
                    '<q-space></q-space>' +
                    '<div class="m-dash-panel__toolbar"><slot name="toolbar"></slot></div>' +
                '</q-card-section>' +
                '<q-card-section :class="dense ? \'q-pa-sm\' : \'\'"><slot></slot></q-card-section>' +
            '</q-card>'
    });

    registerDash('m-dash-chart', {
        name: 'mDashChart',
        props: {
            type: { type: String, 'default': 'bar' },
            labels: { type: Array, 'default': function() { return []; } },
            datasets: { type: Array, 'default': null },
            series: { type: Array, 'default': null },
            values: { type: Array, 'default': null },
            data: { type: Array, 'default': null },
            variant: { type: String, 'default': '' },
            xLabel: { type: String, 'default': '' },
            yLabel: { type: String, 'default': '' },
            fill: { type: Boolean, 'default': false },
            config: { type: Object, 'default': null },
            height: { type: String, 'default': '280px' },
            width: { type: String, 'default': '100%' }
        },
        data: function() { return { instance: null, loadError: null, chartType: null }; },
        mounted: function() { this.ensureChart(); },
        beforeUnmount: function() { this.destroyChart(); },
        watch: {
            type: function() { this.redraw(); },
            labels: { deep: true, handler: function() { this.updateChart(); } },
            datasets: { deep: true, handler: function() { this.updateChart(); } },
            series: { deep: true, handler: function() { this.updateChart(); } },
            values: { deep: true, handler: function() { this.updateChart(); } },
            config: { deep: true, handler: function() { this.redraw(); } },
            variant: function() { this.redraw(); }
        },
        methods: {
            destroyChart: function() {
                if (this.instance) {
                    try { this.instance.destroy(); } catch (e) { /* ignore */ }
                    this.instance = null;
                }
            },
            buildCfg: function() {
                var d = dash();
                if (!d.buildChartConfig) return this.config;
                return d.buildChartConfig({
                    type: this.type, labels: this.labels,
                    datasets: this.datasets, series: this.series,
                    values: this.values != null ? this.values : this.data,
                    variant: this.variant, xLabel: this.xLabel, yLabel: this.yLabel,
                    fill: this.fill, config: this.config
                });
            },
            ensureChart: function() {
                var vm = this;
                var d = dash();
                var loader = d.loadChartJs || function(cb) {
                    moqui.loadScript('/qapps2static/libs/Chart.js/Chart.min.js', cb, function() { return !!window.Chart; });
                };
                loader(function(err) {
                    if (err) { vm.loadError = 'Chart.js failed to load'; return; }
                    vm.updateChart();
                });
            },
            redraw: function() {
                this.destroyChart();
                this.chartType = null;
                this.updateChart();
            },
            updateChart: function() {
                if (!window.Chart || !this.$refs.canvas) return;
                var cfg = this.buildCfg();
                if (!cfg || !cfg.data) return;
                if (this.instance && this.chartType === cfg.type) {
                    this.instance.data.labels = cfg.data.labels;
                    this.instance.data.datasets = cfg.data.datasets;
                    if (cfg.options) this.instance.options = cfg.options;
                    this.instance.update();
                    return;
                }
                this.destroyChart();
                this.chartType = cfg.type;
                this.instance = new window.Chart(this.$refs.canvas, cfg);
            }
        },
        template:
            '<div class="m-dash-chart chart-container" style="position:relative;" :style="{height:height,width:width}">' +
                '<div v-if="loadError" class="text-negative text-caption">{{ loadError }}</div>' +
                '<canvas ref="canvas"></canvas>' +
            '</div>'
    });

    registerDash('m-dash-list', {
        name: 'mDashList',
        props: {
            items: { type: Array, 'default': function() { return []; } }
        },
        methods: {
            itemClick: function(item) {
                if (!item || !item.url) return;
                var href = item.url;
                if (this.$root && typeof this.$root.loadNewUrl === 'function' && href.indexOf('http') !== 0) {
                    this.$root.loadNewUrl(href);
                } else {
                    window.location.href = href;
                }
            }
        },
        template:
            '<q-list bordered separator class="m-dash-list">' +
                '<q-item v-for="(item, idx) in items" :key="idx" :clickable="!!item.url" @click="itemClick(item)">' +
                    '<q-item-section v-if="item.icon" avatar><q-icon :name="item.icon"></q-icon></q-item-section>' +
                    '<q-item-section>' +
                        '<q-item-label>{{ item.title }}</q-item-label>' +
                        '<q-item-label v-if="item.caption" caption>{{ item.caption }}</q-item-label>' +
                    '</q-item-section>' +
                    '<q-item-section v-if="item.meta != null && item.meta !== \'\'" side>' +
                        '<q-item-label caption>{{ item.meta }}</q-item-label>' +
                    '</q-item-section>' +
                '</q-item>' +
                '<q-item v-if="!items || !items.length"><q-item-section class="text-grey-7 text-caption">No items</q-item-section></q-item>' +
            '</q-list>'
    });

    registerDash('m-dash-progress', {
        name: 'mDashProgress',
        props: {
            label: { type: String, 'default': '' },
            value: { type: Number, 'default': 0 },
            max: { type: Number, 'default': 100 },
            color: { type: String, 'default': 'primary' }
        },
        computed: {
            pct: function() {
                var max = this.max > 0 ? this.max : 100;
                var p = (Number(this.value) / max) * 100;
                if (!isFinite(p)) return 0;
                return Math.max(0, Math.min(100, p));
            },
            qColor: function() {
                var qc = dash().quasarColor;
                return qc ? qc(this.color) : this.color;
            },
            displayValue: function() {
                var fmt = dash().formatStatText;
                var v = fmt ? fmt(this.value) : String(this.value);
                var m = fmt ? fmt(this.max) : String(this.max);
                return v + ' / ' + m;
            }
        },
        template:
            '<div class="m-dash-progress q-mb-sm">' +
                '<div class="row items-center q-mb-xs">' +
                    '<div class="col text-caption">{{ label }}</div>' +
                    '<div class="col-auto text-caption text-grey-7">{{ displayValue }}</div>' +
                '</div>' +
                '<q-linear-progress :value="pct / 100" :color="qColor" track-color="grey-3" size="8px" rounded></q-linear-progress>' +
            '</div>'
    });

    registerDash('m-dash-filter-bar', {
        name: 'mDashFilterBar',
        props: {
            fromDate: { type: String, 'default': '' },
            thruDate: { type: String, 'default': '' },
            presets: {
                type: Array,
                'default': function() {
                    return [
                        { label: '7d', days: 7 },
                        { label: '30d', days: 30 },
                        { label: '90d', days: 90 }
                    ];
                }
            },
            containerId: { type: String, 'default': '' }
        },
        data: function() {
            return { localFrom: this.fromDate || '', localThru: this.thruDate || '' };
        },
        watch: {
            fromDate: function(v) { this.localFrom = v || ''; },
            thruDate: function(v) { this.localThru = v || ''; }
        },
        methods: {
            pad: function(n) { return (n < 10 ? '0' : '') + n; },
            fmt: function(d) {
                return d.getFullYear() + '-' + this.pad(d.getMonth() + 1) + '-' + this.pad(d.getDate());
            },
            applyPreset: function(p) {
                var days = p.days != null ? p.days : 30;
                var thru = new Date();
                var from = new Date();
                from.setDate(from.getDate() - days);
                this.localFrom = p.from || this.fmt(from);
                this.localThru = p.thru || this.fmt(thru);
                this.apply();
            },
            apply: function() {
                var payload = { fromDate: this.localFrom, thruDate: this.localThru };
                this.$emit('change', payload);
                if (!this.containerId || !this.$root || !this.$root.containers) return;
                var c = this.$root.containers[this.containerId];
                if (!c || !c.url) return;
                var base = c.url.split('?')[0];
                var params = [];
                if (this.localFrom) params.push('fromDate=' + encodeURIComponent(this.localFrom));
                if (this.localThru) params.push('thruDate=' + encodeURIComponent(this.localThru));
                var url = params.length ? (base + '?' + params.join('&')) : base;
                if (typeof c.load === 'function') c.load(url);
                else if (typeof c.reload === 'function') { c.curUrl = url; c.reload(); }
            }
        },
        template:
            '<div class="m-dash-filter-bar row items-end q-gutter-sm q-mb-sm">' +
                '<div class="col-auto">' +
                    '<div class="text-caption text-grey-7">From</div>' +
                    '<q-input dense outlined type="date" v-model="localFrom" style="min-width:10rem"></q-input>' +
                '</div>' +
                '<div class="col-auto">' +
                    '<div class="text-caption text-grey-7">Thru</div>' +
                    '<q-input dense outlined type="date" v-model="localThru" style="min-width:10rem"></q-input>' +
                '</div>' +
                '<div class="col-auto q-gutter-xs">' +
                    '<q-btn v-for="(p, i) in presets" :key="i" dense outline no-caps size="sm" :label="p.label" @click="applyPreset(p)"></q-btn>' +
                '</div>' +
                '<div class="col-auto">' +
                    '<q-btn dense color="primary" no-caps label="Apply" icon="filter_alt" @click="apply"></q-btn>' +
                '</div>' +
            '</div>'
    });
})();
