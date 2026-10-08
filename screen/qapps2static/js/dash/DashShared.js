/* qapps2 dashboard shared helpers (Chart.js 2.9.3 + KPI tokens). Public domain CC0. */
(function(root) {
    'use strict';
    var CHART_JS_URL = '/qapps2static/libs/Chart.js/Chart.min.js';
    var CHART_COLORS = ['#1976d2', '#26a69a', '#9c27b0', '#ef6c00', '#c62828', '#546e7a', '#7cb342', '#f9a825'];
    var CHART_MAX_SERIES = 8;
    var CHART_MAX_POINTS = 200;

    function asArray(v) {
        if (v == null) return [];
        return Array.isArray(v) ? v : [v];
    }
    function asLabels(labels) {
        return asArray(labels).map(function(l) { return l == null ? '' : String(l); }).slice(0, CHART_MAX_POINTS);
    }
    function asNumbers(values) {
        return asArray(values).map(function(v) {
            var n = typeof v === 'number' ? v : parseFloat(v);
            return isFinite(n) ? n : 0;
        }).slice(0, CHART_MAX_POINTS);
    }
    function seriesFromProp(series, fill) {
        var list = asArray(series).slice(0, CHART_MAX_SERIES);
        return list.map(function(s, i) {
            var name = '';
            var values = [];
            if (s && typeof s === 'object') {
                if (s.type === 'element' && s.props) s = s.props;
                name = s.name != null ? String(s.name)
                    : (s.category != null ? String(s.category)
                    : (s.label != null ? String(s.label) : ('Series ' + (i + 1))));
                values = asNumbers(s.values != null ? s.values : s.data);
            }
            var color = CHART_COLORS[i % CHART_COLORS.length];
            var ds = {
                label: name,
                data: values,
                backgroundColor: fill ? color : (color + '99'),
                borderColor: color,
                borderWidth: 2
            };
            if (fill) ds.fill = true;
            return ds;
        });
    }
    function xyChartConfig(type, labels, series, variant, xLabel, yLabel, fill) {
        var stacked = variant === 'stacked';
        var tension = variant === 'natural' ? 0.4 : 0;
        var stepped = variant === 'step';
        var datasets = seriesFromProp(series, fill).map(function(ds) {
            ds.lineTension = tension;
            ds.steppedLine = stepped;
            if (fill) ds.fill = true;
            return ds;
        });
        var options = {
            maintainAspectRatio: false,
            animation: { duration: 0 },
            legend: { display: datasets.length > 1 },
            scales: {
                xAxes: [{ stacked: stacked, scaleLabel: { display: !!xLabel, labelString: xLabel || '' } }],
                yAxes: [{ stacked: stacked, ticks: { beginAtZero: true },
                    scaleLabel: { display: !!yLabel, labelString: yLabel || '' } }]
            }
        };
        return { type: type, data: { labels: asLabels(labels), datasets: datasets }, options: options };
    }
    function pieChartConfig(labels, values, variant) {
        var labs = asLabels(labels);
        var vals = asNumbers(values);
        var n = Math.min(labs.length, vals.length, CHART_MAX_POINTS);
        labs = labs.slice(0, n);
        vals = vals.slice(0, n);
        var colors = labs.map(function(_, i) { return CHART_COLORS[i % CHART_COLORS.length]; });
        return {
            type: variant === 'donut' || variant === 'doughnut' ? 'doughnut' : 'pie',
            data: { labels: labs, datasets: [{ data: vals, backgroundColor: colors }] },
            options: { maintainAspectRatio: false, animation: { duration: 0 }, legend: { position: 'right' } }
        };
    }
    /** Build Chart.js 2.x config from declarative m-dash-chart / OpenUI-like props. */
    function buildChartConfig(opts) {
        opts = opts || {};
        if (opts.config && typeof opts.config === 'object') return opts.config;
        var type = (opts.type || 'bar').toLowerCase();
        var variant = opts.variant || '';
        if (type === 'pie' || type === 'doughnut' || type === 'donut') {
            return pieChartConfig(opts.labels, opts.values != null ? opts.values : opts.data, type === 'pie' ? variant : (variant || type));
        }
        var fill = type === 'area' || !!opts.fill;
        var chartType = type === 'area' ? 'line' : type;
        return xyChartConfig(chartType, opts.labels, opts.datasets || opts.series, variant, opts.xLabel, opts.yLabel, fill);
    }
    function loadChartJs(cb) {
        if (typeof moqui !== 'undefined' && moqui.loadScript) {
            moqui.loadScript(CHART_JS_URL, cb, function() { return !!root.Chart; });
        } else if (root.Chart) {
            cb(null);
        } else {
            cb(new Error('Chart.js loader unavailable'));
        }
    }
    function quasarColor(c) {
        if (!c) return 'primary';
        if (c === 'success') return 'positive';
        if (c === 'danger') return 'negative';
        if (c === 'neutral') return 'grey';
        return c;
    }
    function formatStatText(v) {
        if (v == null) return '';
        if (typeof v === 'number' && isFinite(v)) {
            if (Math.abs(v) >= 1000) {
                try { return v.toLocaleString(); } catch (e) { /* fall through */ }
            }
            return String(v);
        }
        return String(v);
    }

    var api = {
        CHART_JS_URL: CHART_JS_URL,
        CHART_COLORS: CHART_COLORS,
        CHART_MAX_SERIES: CHART_MAX_SERIES,
        CHART_MAX_POINTS: CHART_MAX_POINTS,
        asArray: asArray,
        asLabels: asLabels,
        asNumbers: asNumbers,
        seriesFromProp: seriesFromProp,
        xyChartConfig: xyChartConfig,
        pieChartConfig: pieChartConfig,
        buildChartConfig: buildChartConfig,
        loadChartJs: loadChartJs,
        quasarColor: quasarColor,
        formatStatText: formatStatText
    };
    if (typeof moqui !== 'undefined') moqui.qapps2Dash = api;
    root.Qapps2Dash = api;
})(typeof window !== 'undefined' ? window : this);
