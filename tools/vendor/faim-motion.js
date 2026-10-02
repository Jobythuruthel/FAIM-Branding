/* FAIM Motion · original animation engine for FAIM screens (no dependencies)
   Backgrounds: orbs · aurora · shapes · particles · grid · none
   Components: FAIMMotion.orb(el,{state}) thinking orb · FAIMMotion.tween / stagger · beam + glass are CSS (faim-motion.css)
   Inspired by the study list in docs/UI-RESEARCH.md; all code written from scratch. Joby Thuruthel | FAIM */
(function (g) {
  'use strict';
  const hex = h => { h = String(h || '#55e039').replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const reduce = () => g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- WebGL shader backgrounds (orbs, aurora, grid) ---------------- */
  const FRAG = `precision highp float;
  uniform vec2 R; uniform float T; uniform vec3 A; uniform vec3 B; uniform vec3 V; uniform float I; uniform int M;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
  void main(){vec2 uv=(gl_FragCoord.xy-.5*R)/min(R.x,R.y);vec3 c=V;
   if(M==0){ // thinking orbs: soft metaballs orbiting a core
     float f=0.;for(int i=0;i<6;i++){float k=float(i);vec2 o=vec2(sin(T*.23*(1.+k*.13)+k*1.7),cos(T*.19*(1.+k*.11)+k*2.3))*(.28+.05*k);f+=.018/(dot(uv-o,uv-o)+.004);}
     float core=.06/(length(uv)+.12);f+=core*.35;
     float w=fbm(uv*2.5+T*.05);vec3 col=mix(A,B,clamp(w+uv.y*.6,0.,1.));
     c=mix(V,col,clamp(f*.16*I,0.,1.));c+=col*pow(clamp(f*.05,0.,1.),2.)*I*.6;}
   else if(M==1){ // aurora ribbons
     float y=uv.y+.25*sin(uv.x*1.6+T*.18)+.15*fbm(vec2(uv.x*1.2,T*.08));
     float band=exp(-pow(y*3.2,2.))+.6*exp(-pow((y-.35)*4.,2.));
     vec3 col=mix(A,B,.5+.5*sin(uv.x*1.3+T*.2));c=V+col*band*.55*I*(.6+.4*fbm(uv*3.+T*.1));}
   else { // beam grid: perspective floor with travelling light
     vec2 p=uv;p.y+=.35;float d=max(.02,-p.y+.001);vec2 gp=vec2(p.x/d,1./d+T*.6);
     vec2 gl=abs(fract(gp)-.5);float line=smoothstep(.47,.5,max(gl.x,gl.y))*(p.y<0.?1.:0.)*smoothstep(0.,.5,-p.y);
     float beam=exp(-pow((fract(gp.y*.1-T*.05)-.5)*10.,2.));c=V+A*line*.35*I+B*line*beam*.8*I;
     c+=A*.12*I*exp(-abs(p.y)*6.);}
   c+=(h(gl_FragCoord.xy+T)-.5)*.015; gl_FragColor=vec4(c,1.);}`;

  function glBackground(canvas, o) {
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return null;
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(x); return x; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = k => gl.getUniformLocation(pr, k);
    return {
      draw(t, w, h, opt) {
        gl.viewport(0, 0, w, h); gl.uniform2f(U('R'), w, h); gl.uniform1f(U('T'), t);
        gl.uniform3fv(U('A'), hex(opt.colors.accent)); gl.uniform3fv(U('B'), hex(opt.colors.accent2)); gl.uniform3fv(U('V'), hex(opt.colors.void));
        gl.uniform1f(U('I'), opt.intensity); gl.uniform1i(U('M'), { orbs: 0, aurora: 1, grid: 2 }[opt.style] || 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };
  }

  /* ---------------- 2D backgrounds (shapes, particles, fallback) ---------------- */
  function shapes2D(ctx, t, w, h, o) {
    // morphing geometric cells: each cell cycles circle > square > diamond > quarter, rotating in waves
    ctx.fillStyle = o.colors.void; ctx.fillRect(0, 0, w, h);
    const cell = Math.max(60, Math.min(w, h) / 9), cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const cx = x * cell, cy = y * cell, d = Math.hypot(x - cols / 2, y - rows / 2);
      const ph = (t * .35 - d * .18) % 4, k = ((ph % 1) + 1) % 1, stage = ((Math.floor(ph) % 4) + 4) % 4;
      const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, s = cell * .34;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate((stage + e) * Math.PI / 4);
      ctx.globalAlpha = (.08 + .22 * (1 - Math.min(1, d / (cols * .7)))) * o.intensity;
      ctx.fillStyle = (x + y) % 3 ? o.colors.accent : o.colors.accent2;
      ctx.beginPath();
      const r = s * (stage === 0 ? 1 - e : stage === 2 ? e : stage === 1 ? 0 : 1) ;
      if (ctx.roundRect) ctx.roundRect(-s, -s, s * 2, s * 2, Math.max(0, r)); else ctx.rect(-s, -s, s * 2, s * 2);
      ctx.fill(); ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  function particles2D(ctx, t, w, h, o, st) {
    ctx.fillStyle = o.colors.void; ctx.fillRect(0, 0, w, h);
    if (!st.p || st.w !== w) { st.w = w; st.p = Array.from({ length: Math.min(260, Math.round(w * h / 9000)) }, () => ({ a: Math.random() * 6.283, r: .22 + Math.random() * .26, s: (.05 + Math.random() * .12) * (Math.random() < .5 ? -1 : 1), z: Math.random() })); }
    const m = Math.min(w, h), ox = w / 2, oy = h / 2;
    for (const p of st.p) {
      const a = p.a + t * p.s, x = ox + Math.cos(a) * p.r * m * 1.1, y = oy + Math.sin(a) * p.r * m * .9;
      ctx.globalAlpha = (.15 + p.z * .6) * o.intensity; ctx.fillStyle = p.z > .7 ? o.colors.accent2 : o.colors.accent;
      ctx.beginPath(); ctx.arc(x, y, (1 + p.z * 2.4) * (w / 1200 + .5), 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  const Motion = {
    styles: ['orbs', 'aurora', 'grid', 'shapes', 'particles', 'image', 'video', 'none'],
    /** mount a full-screen animated background. returns {update(opts), destroy()} */
    background(host, opts) {
      let o = Object.assign({ style: 'orbs', intensity: .8, speed: 1, colors: { void: '#040705', accent: '#55e039', accent2: '#2fb8a6' }, image: '', video: '', overlay: .35 }, opts);
      const wrap = document.createElement('div'); wrap.className = 'fm-bg';
      wrap.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden';
      host.prepend(wrap);
      let canvas, gl, ctx, raf, st = {}, t0 = performance.now(), media, scale = 1, last = 0, slow = 0, frames = 0, frozen = false;
      function build() {
        wrap.innerHTML = ''; gl = ctx = null; cancelAnimationFrame(raf);
        wrap.style.background = o.colors.void;
        if (o.style === 'none') return;
        if (o.style === 'image' || o.style === 'video') {
          media = document.createElement(o.style === 'image' ? 'img' : 'video');
          media.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
          media.src = o.style === 'image' ? o.image : o.video;
          if (o.style === 'video') Object.assign(media, { autoplay: true, muted: true, loop: true, playsInline: true });
          const ov = document.createElement('div'); ov.style.cssText = `position:absolute;inset:0;background:${o.colors.void};opacity:${o.overlay}`;
          wrap.append(media, ov); return;
        }
        canvas = document.createElement('canvas'); canvas.style.cssText = 'width:100%;height:100%;display:block'; wrap.append(canvas);
        if (['orbs', 'aurora', 'grid'].includes(o.style)) { try { gl = glBackground(canvas, o); } catch (e) { gl = null; } }
        if (!gl) ctx = canvas.getContext('2d');
        loop();
      }
      function loop() {
        // performance guard: weak devices drop render resolution, then freeze to a still frame, so the UI stays responsive
        const nowT = performance.now(); if (last) { frames++; if (nowT - last > 40) slow++; } last = nowT;
        if (frames >= 45) { if (slow > 25) { if (scale > .35) scale /= 2; else frozen = true; } frames = slow = 0; }
        const dpr = Math.min(g.devicePixelRatio || 1, gl ? 1 : 1.5) * scale, w = Math.max(1, Math.round(wrap.clientWidth * dpr)), h = Math.max(1, Math.round(wrap.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        const t = reduce() ? 8 : (performance.now() - t0) / 1000 * o.speed;
        if (gl) gl.draw(t, w, h, o);
        else if (o.style === 'shapes') shapes2D(ctx, t, w, h, o);
        else particles2D(ctx, t, w, h, o, st);
        if (!reduce() && !frozen) raf = requestAnimationFrame(loop);
      }
      build();
      return {
        update(n) { const rebuild = n.style !== undefined && n.style !== o.style || n.image !== o.image || n.video !== o.video; o = Object.assign({}, o, n, { colors: Object.assign({}, o.colors, n.colors || {}) }); if (rebuild) build(); },
        destroy() { cancelAnimationFrame(raf); wrap.remove(); },
        get renderer() { return gl ? 'webgl' : ctx ? '2d' : o.style; }, get quality() { return frozen ? 'still' : scale; }
      };
    },

    /** thinking orb component: states idle | listening | thinking | speaking | success | error */
    orb(el, opts = {}) {
      const c = document.createElement('canvas'), x = c.getContext('2d'); el.append(c); c.style.cssText = 'width:100%;height:100%;display:block';
      let state = opts.state || 'idle', col = opts.colors || { accent: '#55e039', accent2: '#2fb8a6' }, raf, lvl = 0, t0 = performance.now();
      const speed = { idle: .4, listening: .9, thinking: 1.8, speaking: 1.2, success: .6, error: 2.4 };
      function f() {
        const d = Math.min(2, g.devicePixelRatio || 1), s = el.clientWidth * d; if (c.width !== s) c.width = c.height = s;
        const t = (performance.now() - t0) / 1000, r = s * .3, cx = s / 2;
        x.clearRect(0, 0, s, s); lvl += ((state === 'speaking' ? .5 + .5 * Math.abs(Math.sin(t * 7)) : state === 'thinking' ? .6 : state === 'listening' ? .35 : .15) - lvl) * .08;
        const a = state === 'error' ? '#ff5a6a' : col.accent;
        const glow = x.createRadialGradient(cx, cx, r * .2, cx, cx, r * 1.9); glow.addColorStop(0, a + '66'); glow.addColorStop(1, a + '00');
        x.fillStyle = glow; x.fillRect(0, 0, s, s);
        for (let k = 0; k < 3; k++) {                     // three counter-rotating blobs
          x.beginPath();
          for (let i = 0; i <= 64; i++) {
            const th = i / 64 * Math.PI * 2, wob = Math.sin(th * (3 + k) + t * speed[state] * (k % 2 ? -1 : 1) * 2) * r * (.06 + lvl * .12) + Math.sin(th * 5 - t * 1.3) * r * .03;
            const rr = r * (1 - k * .14) + wob; const px = cx + Math.cos(th) * rr, py = cx + Math.sin(th) * rr; i ? x.lineTo(px, py) : x.moveTo(px, py);
          }
          const gr = x.createLinearGradient(0, 0, s, s); gr.addColorStop(0, k === 1 ? col.accent2 : a); gr.addColorStop(1, k === 1 ? a : col.accent2);
          x.globalAlpha = .38 + k * .18; x.fillStyle = gr; x.fill();
        }
        x.globalAlpha = 1; raf = requestAnimationFrame(f);
      }
      f();
      return { set(s) { state = s; }, colors(c2) { col = c2; }, destroy() { cancelAnimationFrame(raf); c.remove(); } };
    },

    /** tiny tween (anime.js style API subset) */
    tween(el, props, { duration = 600, delay = 0, ease = 'outExpo', done } = {}) {
      const E = { linear: t => t, outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), outBack: t => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2), inOut: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 };
      const from = {}, cs = getComputedStyle(el);
      for (const k in props) from[k] = k === 'opacity' ? +cs.opacity : 0;
      setTimeout(() => {
        const s = performance.now();
        (function step(n) {
          const k = Math.min(1, (n - s) / duration), e = (E[ease] || E.outExpo)(k), tr = [];
          for (const p in props) {
            const [a, b] = Array.isArray(props[p]) ? props[p] : [from[p], props[p]], v = a + (b - a) * e;
            if (p === 'opacity') el.style.opacity = v; else if (p === 'x') tr.push(`translateX(${v}px)`); else if (p === 'y') tr.push(`translateY(${v}px)`); else if (p === 'scale') tr.push(`scale(${v})`); else if (p === 'rotate') tr.push(`rotate(${v}deg)`);
          }
          if (tr.length) el.style.transform = tr.join(' ');
          k < 1 ? requestAnimationFrame(step) : done && done();
        })(s);
      }, delay);
    },
    stagger(els, props, o = {}) { [...els].forEach((el, i) => Motion.tween(el, props, Object.assign({}, o, { delay: (o.delay || 0) + i * (o.each || 60) }))); },
    countUp(el, to, { duration = 900 } = {}) { const from = +el.dataset.v || 0, s = performance.now(); el.dataset.v = to; (function st(n) { const k = Math.min(1, (n - s) / duration), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(st); })(s); },
    burst(host, color = '#55e039', n = 80) {        // celebration confetti on the output screen
      const c = document.createElement('canvas'); c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60'; host.append(c);
      const x = c.getContext('2d'), W = c.width = innerWidth, H = c.height = innerHeight;
      const P = Array.from({ length: n }, () => ({ x: W / 2, y: H * .55, vx: (Math.random() - .5) * 18, vy: -Math.random() * 18 - 6, r: 3 + Math.random() * 6, a: Math.random() * 6, c: Math.random() < .5 ? color : '#F2F5F0' }));
      let f = 0; (function s() { x.clearRect(0, 0, W, H); for (const p of P) { p.vy += .5; p.x += p.vx; p.y += p.vy; p.a += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); x.restore(); } if (++f < 150) requestAnimationFrame(s); else c.remove(); })();
    }
  };
  g.FAIMMotion = Motion;
})(window);
