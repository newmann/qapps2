/* qapps2 standalone login boot. Loaded after Vue 3 + Quasar 2 UMD. */
(function() {
    function readVal(id) {
        var el = document.getElementById(id);
        return (el && el.value) ? el.value : '';
    }
    function applyLocale(locale) {
        var htmlLang = String(locale || '').replace(/_/g, '-');
        if (!htmlLang) htmlLang = 'en';
        if (htmlLang.toLowerCase().indexOf('zh') === 0) htmlLang = 'zh-CN';
        document.documentElement.lang = htmlLang;
        var QLang = window.Quasar && (Quasar.Lang || Quasar.lang);
        if (QLang && QLang.set && htmlLang.indexOf('zh') === 0) {
            var pack = QLang.zhCN || QLang['zh-CN'];
            if (pack) {
                if (pack.label) {
                    pack.label.expand = function(e) { return e ? ('展开 "' + e + '"') : '展开'; };
                    pack.label.collapse = function(e) { return e ? ('折叠 "' + e + '"') : '折叠'; };
                }
                if (pack.date) pack.date.format24h = true;
                QLang.set(pack);
            }
        }
    }
    function langFamily(s) {
        s = String(s || '').replace(/-/g, '_').toLowerCase();
        if (!s) return '';
        if (s.indexOf('zh') === 0) return 'zh';
        return s.split('_')[0];
    }
    function osLocaleParam() {
        var raw = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        if (!raw && window.Intl && Intl.DateTimeFormat) {
            try { raw = Intl.DateTimeFormat().resolvedOptions().locale || ''; } catch (e) {}
        }
        if (String(raw).toLowerCase().indexOf('zh') === 0) return 'zh_CN';
        return String(raw || 'en_US').replace(/-/g, '_');
    }
    function syncOsLocale(serverLocale) {
        try {
            var params = new URLSearchParams(location.search || '');
            if (params.has('locale')) return false;
            var os = osLocaleParam();
            if (langFamily(os) === langFamily(serverLocale)) return false;
            params.set('locale', os);
            var q = params.toString();
            location.replace(location.pathname + (q ? ('?' + q) : '') + (location.hash || ''));
            return true;
        } catch (e) { return false; }
    }
    function readDark() {
        try {
            var stored = localStorage.getItem('qapps2-dark');
            if (stored === 'true' || stored === 'false') return stored === 'true';
        } catch (e) {}
        if (window.matchMedia) return window.matchMedia('(prefers-color-scheme: dark)').matches;
        return false;
    }
    function boot() {
        var root = document.getElementById('login-root');
        if (!root || !window.Vue || !window.Quasar) return;
        var serverLocale = readVal('confLoginLocale');
        if (syncOsLocale(serverLocale)) return;
        applyLocale(serverLocale);
        var initialTab = readVal('confLoginTab') || 'login';
        var app = Vue.createApp({
            data: function() {
                return { tab: initialTab, dark: readDark() };
            },
            mounted: function() {
                this.$q.dark.set(this.dark);
                root.style.display = '';
                var canvas = document.getElementById('qapps2-login-bg');
                var photo = document.getElementById('qapps2-login-photo');
                var overlay = document.getElementById('qapps2-login-photo-overlay');
                var credit = document.getElementById('qapps2-login-credit');
                function startStars() {
                    if (window.qapps2LoginBg && canvas) window.qapps2LoginBg.start(canvas);
                }
                function showPhoto(src) {
                    if (!photo) return;
                    photo.style.backgroundImage = 'url("' + src.replace(/"/g, '\\"') + '")';
                    photo.removeAttribute('hidden');
                    if (overlay) overlay.removeAttribute('hidden');
                    if (credit) credit.removeAttribute('hidden');
                    if (window.qapps2LoginBg) window.qapps2LoginBg.stop();
                    if (canvas) canvas.style.display = 'none';
                }
                startStars();
                var src = photo && photo.getAttribute('data-src');
                if (!src) return;
                var img = new Image();
                img.onload = function() { showPhoto(src); };
                img.onerror = function() { /* keep starfield */ };
                img.src = src;
            },
            unmounted: function() {
                if (window.qapps2LoginBg) window.qapps2LoginBg.stop();
            },
            methods: {
                toggleDark: function() {
                    this.$q.dark.toggle();
                    this.dark = this.$q.dark.isActive;
                    try { localStorage.setItem('qapps2-dark', this.dark ? 'true' : 'false'); } catch (e) {}
                }
            }
        });
        app.use(Quasar, { config: window.quasarConfig || {} });
        applyLocale(readVal('confLoginLocale'));
        app.mount('#login-root');
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
