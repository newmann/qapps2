/* qapps2 login nebula background. Original WebGL1 shader (not a Shadertoy port). */
(function() {
    var VERT =
        'attribute vec2 aPos;\n' +
        'void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';

    var FRAG =
        'precision mediump float;\n' +
        'uniform vec2 uResolution;\n' +
        'uniform float uTime;\n' +
        'float hash(vec2 p){\n' +
        '    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\n' +
        '}\n' +
        'float noise(vec2 p){\n' +
        '    vec2 i = floor(p);\n' +
        '    vec2 f = fract(p);\n' +
        '    f = f * f * (3.0 - 2.0 * f);\n' +
        '    float a = hash(i);\n' +
        '    float b = hash(i + vec2(1.0, 0.0));\n' +
        '    float c = hash(i + vec2(0.0, 1.0));\n' +
        '    float d = hash(i + vec2(1.0, 1.0));\n' +
        '    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);\n' +
        '}\n' +
        'float fbm(vec2 p){\n' +
        '    float v = 0.0;\n' +
        '    float a = 0.5;\n' +
        '    for (int i = 0; i < 4; i++) {\n' +
        '        v += a * noise(p);\n' +
        '        p *= 2.03;\n' +
        '        a *= 0.5;\n' +
        '    }\n' +
        '    return v;\n' +
        '}\n' +
        'float starShape(vec2 uv, float spike){\n' +
        '    float d2 = dot(uv, uv);\n' +
        '    float core = exp(-d2 * 22.0);\n' +
        '    float glow = exp(-d2 * 4.0) * 0.26;\n' +
        '    float hx = exp(-abs(uv.x) * 16.0) * exp(-abs(uv.y) * 2.4);\n' +
        '    float hy = exp(-abs(uv.y) * 16.0) * exp(-abs(uv.x) * 2.4);\n' +
        '    return core + glow + max(hx, hy) * spike;\n' +
        '}\n' +
        'float starLayer(vec2 frag, float invCell, float power, float spike, float size){\n' +
        '    vec2 scaled = frag * invCell;\n' +
        '    vec2 cell = floor(scaled);\n' +
        '    vec2 f = fract(scaled);\n' +
        '    vec2 starPos = 0.25 + 0.5 * vec2(hash(cell), hash(cell + 17.0));\n' +
        '    float h = hash(cell + 4.2);\n' +
        '    float twinkle = 0.55 + 0.45 * sin(uTime * 1.7 + hash(cell + 19.0) * 20.0);\n' +
        '    vec2 uv = (f - starPos) * size;\n' +
        '    return starShape(uv, spike) * pow(h, power) * twinkle;\n' +
        '}\n' +
        'void main(){\n' +
        '    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;\n' +
        '    float t = uTime * 0.035;\n' +
        '    float cs = cos(t * 0.12);\n' +
        '    float sn = sin(t * 0.12);\n' +
        '    p = mat2(cs, -sn, sn, cs) * p;\n' +
        '    vec2 q = vec2(fbm(p * 1.6 + vec2(t, t * 0.28)), fbm(p * 1.6 + vec2(4.8, -t * 0.22)));\n' +
        '    vec2 r = vec2(\n' +
        '        fbm(p * 2.2 + 3.6 * q + vec2(1.4, 8.7) + t * 0.4),\n' +
        '        fbm(p * 2.2 + 3.6 * q + vec2(7.9, 2.1) - t * 0.32)\n' +
        '    );\n' +
        '    float n = fbm(p * 1.8 + 3.8 * r);\n' +
        '    float nebula = smoothstep(0.28, 0.86, n);\n' +
        '    float band = smoothstep(0.22, 0.9, r.x);\n' +
        '    vec3 col = vec3(0.02, 0.028, 0.07);\n' +
        '    col += vec3(0.086, 0.467, 1.0) * nebula * 0.58;\n' +
        '    col += vec3(0.075, 0.761, 0.761) * band * nebula * 0.38;\n' +
        '    col += vec3(0.447, 0.180, 0.820) * r.y * nebula * 0.42;\n' +
        '    col *= 1.0 - 0.42 * dot(p, p);\n' +
        '    col += vec3(0.88, 0.93, 1.0) * starLayer(gl_FragCoord.xy, 0.48, 36.0, 0.12, 4.5) * 1.8;\n' +
        '    col += vec3(0.96, 0.97, 1.0) * starLayer(gl_FragCoord.xy, 0.085, 10.0, 0.85, 3.2) * 2.0;\n' +
        '    gl_FragColor = vec4(col, 1.0);\n' +
        '}';

    var raf = 0;
    var gl = null;
    var canvasEl = null;
    var uResolution = null;
    var uTime = null;
    var startMs = 0;
    var running = false;
    var reduced = false;

    function compile(ctx, type, src) {
        var sh = ctx.createShader(type);
        ctx.shaderSource(sh, src);
        ctx.compileShader(sh);
        if (!ctx.getShaderParameter(sh, ctx.COMPILE_STATUS)) {
            if (typeof console !== 'undefined') console.warn('qapps2 login bg shader', ctx.getShaderInfoLog(sh));
            ctx.deleteShader(sh);
            return null;
        }
        return sh;
    }

    function resize() {
        if (!canvasEl || !gl) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        var scale = 0.7;
        var w = Math.max(1, Math.floor((canvasEl.clientWidth || window.innerWidth) * dpr * scale));
        var h = Math.max(1, Math.floor((canvasEl.clientHeight || window.innerHeight) * dpr * scale));
        if (canvasEl.width !== w || canvasEl.height !== h) {
            canvasEl.width = w;
            canvasEl.height = h;
            gl.viewport(0, 0, w, h);
        }
    }

    function frame(now) {
        if (!running || !gl) return;
        resize();
        gl.uniform2f(uResolution, canvasEl.width, canvasEl.height);
        gl.uniform1f(uTime, (now - startMs) * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onVis() {
        if (!running || reduced) return;
        if (document.hidden) {
            if (raf) { cancelAnimationFrame(raf); raf = 0; }
        } else {
            raf = requestAnimationFrame(frame);
        }
    }

    function stop() {
        running = false;
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('resize', resize);
        if (gl) {
            var lose = gl.getExtension('WEBGL_lose_context');
            if (lose) lose.loseContext();
        }
        gl = null;
        canvasEl = null;
        uResolution = null;
        uTime = null;
    }

    function start(el) {
        stop();
        if (!el || !el.getContext) return;
        var opts = { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' };
        var ctx = el.getContext('webgl', opts) || el.getContext('experimental-webgl', opts);
        if (!ctx) return;
        var vs = compile(ctx, ctx.VERTEX_SHADER, VERT);
        var fs = compile(ctx, ctx.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;
        var prog = ctx.createProgram();
        ctx.attachShader(prog, vs);
        ctx.attachShader(prog, fs);
        ctx.bindAttribLocation(prog, 0, 'aPos');
        ctx.linkProgram(prog);
        if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
            if (typeof console !== 'undefined') console.warn('qapps2 login bg link', ctx.getProgramInfoLog(prog));
            return;
        }
        ctx.useProgram(prog);
        var buf = ctx.createBuffer();
        ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
        ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
        ctx.enableVertexAttribArray(0);
        ctx.vertexAttribPointer(0, 2, ctx.FLOAT, false, 0, 0);
        uResolution = ctx.getUniformLocation(prog, 'uResolution');
        uTime = ctx.getUniformLocation(prog, 'uTime');
        gl = ctx;
        canvasEl = el;
        startMs = (window.performance && performance.now) ? performance.now() : Date.now();
        reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        running = true;
        document.addEventListener('visibilitychange', onVis);
        window.addEventListener('resize', resize);
        raf = requestAnimationFrame(frame);
    }

    window.qapps2LoginBg = { start: start, stop: stop };
})();
