"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface WebGLMosaicProps {
  src: string;
  thumbs: string[];
  anchorRef: React.RefObject<HTMLImageElement | null>;
  play: boolean;
  label?: string;
  className?: string;
}

const ATLAS_W = 1024;
const ATLAS_H = 640;
const TILE_PITCH = 56;
const DUST_RATIO = 0.07;

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 aHome;   // 0..1 inside the anchor rect
in vec3 aAir;    // x,y 0..1 over the canvas, z = depth (0 near, 1 far)
in vec4 aInfo;   // brightness, delay, duration, phase
in vec3 aCell;   // atlas window origin (uv), kind (0 tile, 1 dust)

uniform vec2 uRes;       // canvas, CSS px
uniform vec4 uRect;      // anchor x, y, w, h in canvas CSS px
uniform float uCell;     // tile pitch, CSS px
uniform float uDpr;
uniform float uTime;     // seconds, always running
uniform float uReveal;   // seconds since play
uniform float uScatter;  // 0 = face, 1 = blown back into the air
uniform vec2 uMouse;     // CSS px, far away when absent

out vec2 vCell;
out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;

float inOut(float t) { return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }

void main() {
  float bright = aInfo.x;
  float delay  = aInfo.y;
  float dur    = aInfo.z;
  float phase  = aInfo.w;
  float depth  = aAir.z;
  bool dust    = aCell.z > 0.5;

  // Air position: a slow float, nearer specks drift further.
  vec2 drift = vec2(sin(uTime*0.31 + phase*6.283), cos(uTime*0.23 + phase*9.1))
             * (6.0 + 22.0*(1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  // Reveal: fade in as a speck (staggered), then fly home.
  float appear = smoothstep(0.0, 0.8, uReveal - delay*0.35);
  float fly    = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  // Scroll: tiles leave in a ragged order rather than all at once.
  float q = clamp(uScatter*1.7 - phase*0.7, 0.0, 1.0);
  q = q*q;

  float k = e * (1.0 - q);              // 1 = sitting in the face
  vec2 pos = mix(air, home, k);

  // A curved path reads as gathered, a straight one as tweened.
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.18 * sin(3.14159*k) * (phase - 0.5);

  // The pointer parts the tiles it passes over.
  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m/ml : vec2(0.0)) * smoothstep(110.0, 0.0, ml) * 16.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.2, 0.9, depth);
  float tile  = uCell * (0.25 + 0.7*bright);
  float size  = mix(speck, tile, land);

  float dustA = dust ? mix(0.55, 0.22, smoothstep(2.0, 4.0, uReveal)) : 1.0;
  vAlpha  = appear * mix(0.25 + 0.55*(1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vCell   = aCell.xy;
  vPhase  = phase;

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uAtlas;
uniform vec2 uWin;     // window size in atlas uv
uniform float uTime;

in vec2 vCell;
in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;
out vec4 outColor;

void main() {
  vec3 c = texture(uAtlas, vCell + gl_PointCoord * uWin).rgb;
  float peak = max(max(c.r, c.g), max(c.b, 0.06));
  vec3 hue = c / peak;
  vec3 tile = mix(hue, min(c * 1.8, 1.0), 0.35);
  tile = mix(tile, vec3(1.0), 0.15);
  float twinkle = 0.9 + 0.1*sin(uTime*1.6 + vPhase*47.0);
  tile *= (0.1 + 0.95*vBright) * twinkle;

  vec3 speck = vec3(0.9, 0.92, 1.0);
  vec3 rgb = mix(speck, tile, vLand);
  outColor = vec4(rgb * vAlpha, vAlpha);
}
`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "shader error";
    gl.deleteShader(shader);
    throw new Error(info);
  }
  return shader;
}

const ATLAS_CROPS = [
  [0.26, 0.17, 0.48, 0.37],
  [0.53, 0.08, 0.15, 0.55],
  [0.4, 0.14, 0.16, 0.72],
  [0.2, 0.22, 0.4, 0.4],
];

function buildAtlas(images: HTMLImageElement[]): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_W;
  canvas.height = ATLAS_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const halfW = ATLAS_W / 2;
  const halfH = ATLAS_H / 2;

  images.slice(0, 4).forEach((img, i) => {
    const [cx, cy, cw, ch] = ATLAS_CROPS[i] ?? [0, 0, 1, 1];
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    ctx.drawImage(
      img,
      cx * nw,
      cy * nh,
      cw * nw,
      ch * nh,
      (i % 2) * halfW,
      Math.floor(i / 2) * halfH,
      halfW,
      halfH
    );
  });

  return canvas;
}

function smoothHermite(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function samplePortrait(
  img: HTMLImageElement,
  anchorWidth: number,
  progress: number
) {
  const cell = Math.min(6, Math.max(3.5, anchorWidth / 200));
  const cols = Math.max(20, Math.round(anchorWidth / cell));
  const rows = Math.round((cols * img.naturalHeight) / img.naturalWidth);

  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, cols, rows);
  const data = ctx.getImageData(0, 0, cols, rows).data;

  const home: number[] = [];
  const air: number[] = [];
  const info: number[] = [];
  const cellAttr: number[] = [];

  const uvPitchX = TILE_PITCH / ATLAS_W;
  const uvPitchY = TILE_PITCH / ATLAS_H;
  let maxSettle = 0;

  const addParticle = (x: number, y: number, brightness: number, isDust: boolean) => {
    home.push(x, y);
    air.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random());
    const delay = 0.35 + Math.random() * 1 + y * 0.45;
    const dur = 1.35 + Math.random() * 0.55;
    if (!isDust) {
      maxSettle = Math.max(maxSettle, delay + dur);
    }
    info.push(brightness, delay, dur, Math.random());
    cellAttr.push(
      Math.random() * (1 - uvPitchX),
      Math.random() * (1 - uvPitchY),
      isDust ? 1 : 0
    );
  };

  const lum = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const idx = i * 4;
    lum[i] =
      ((0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2]) / 255) *
      (data[idx + 3] / 255);
  }

  const valid = Array.from(lum).filter((v) => v >= 0.035).sort((a, b) => a - b);
  const minL = valid[Math.floor(valid.length * 0.02)] ?? 0;
  const maxL = valid[Math.floor(valid.length * 0.97)] ?? 1;

  const activeRows = Math.min(rows, Math.ceil(rows * progress));
  for (let r = 0; r < activeRows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = lum[r * cols + c];
      if (v < 0.035 || (v < 0.08 && Math.random() < 0.45)) continue;
      const normalized = Math.min(1, Math.max(0, (v - minL) / (maxL - minL)));
      const bright = 0.2 * normalized + 0.8 * smoothHermite(0.1, 0.55, normalized);
      addParticle((c + 0.5) / cols, (r + 0.5) / rows, bright, false);
    }
  }

  const tileCount = home.length / 2;
  for (let i = 0; i < Math.round(tileCount * DUST_RATIO); i++) {
    addParticle(0.5, 0.5, 0.3, true);
  }

  return {
    settle: maxSettle,
    cell,
    count: home.length / 2,
    home: new Float32Array(home),
    air: new Float32Array(air),
    info: new Float32Array(info),
    cellAttr: new Float32Array(cellAttr),
  };
}

export function WebGLMosaic({
  src,
  thumbs,
  anchorRef,
  play,
  label = "Portrait of Raman made of tiles from his projects",
  className = "",
}: WebGLMosaicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (play && playTimeRef.current === null) {
      const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      playTimeRef.current = performance.now() / 1000 - (reduced ? 100 : 0);
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !anchor) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    const fallback = () => {
      anchor.style.visibility = "visible";
      canvas.style.display = "none";
    };

    if (!gl) return fallback();

    let destroyed = false;
    let tickerActive = false;
    let inView = true;
    let particleCount = 0;
    let cellPitch = 6;

    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    const buffers: WebGLBuffer[] = [];

    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

      program = gl.createProgram();
      if (!program) throw new Error("Could not create program");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "link error");
      }

      gl.useProgram(program);
      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      const attribNames = ["aHome", "aAir", "aInfo", "aCell"];
      const attribSizes = [2, 3, 4, 3];

      attribNames.forEach((name, i) => {
        const buf = gl.createBuffer();
        if (!buf) return;
        buffers.push(buf);
        const loc = gl.getAttribLocation(program!, name);
        if (loc >= 0) {
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, attribSizes[i], gl.FLOAT, false, 0, 0);
        }
      });

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      return fallback();
    }

    const uniforms = {
      res: gl.getUniformLocation(program, "uRes"),
      rect: gl.getUniformLocation(program, "uRect"),
      cell: gl.getUniformLocation(program, "uCell"),
      dpr: gl.getUniformLocation(program, "uDpr"),
      time: gl.getUniformLocation(program, "uTime"),
      reveal: gl.getUniformLocation(program, "uReveal"),
      scatter: gl.getUniformLocation(program, "uScatter"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      atlas: gl.getUniformLocation(program, "uAtlas"),
      win: gl.getUniformLocation(program, "uWin"),
    };

    gl.uniform2f(uniforms.win, TILE_PITCH / ATLAS_W, TILE_PITCH / ATLAS_H);

    let portraitImg: HTMLImageElement | null = null;
    let lastWidth = -1;
    const startTime = performance.now() / 1000;

    const recomputeParticles = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const w = anchorRect.width;
      if (!portraitImg || w < 10 || Math.abs(w - lastWidth) < 1) return;
      lastWidth = w;

      const canvasRect = canvas.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (canvasRect.bottom - anchorRect.top) / anchorRect.height));
      const sampled = samplePortrait(portraitImg, w, progress);
      if (!sampled) return;

      particleCount = sampled.count;
      cellPitch = sampled.cell;

      [sampled.home, sampled.air, sampled.info, sampled.cellAttr].forEach((arr, idx) => {
        if (buffers[idx]) {
          gl.bindBuffer(gl.ARRAY_BUFFER, buffers[idx]);
          gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
        }
      });
    };

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };

    const onPointerLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const render = () => {
      if (!particleCount || playTimeRef.current === null) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasRect = canvas.getBoundingClientRect();
      const cw = Math.round(canvasRect.width * dpr);
      const ch = Math.round(canvasRect.height * dpr);

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      recomputeParticles();

      const anchorRect = anchor.getBoundingClientRect();
      const now = performance.now() / 1000;
      const scatter = Math.min(1, Math.max(0, -canvasRect.top / (canvasRect.height * 0.7)));

      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      gl.viewport(0, 0, cw, ch);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.res, canvasRect.width, canvasRect.height);
      gl.uniform4f(
        uniforms.rect,
        anchorRect.left - canvasRect.left,
        anchorRect.top - canvasRect.top,
        anchorRect.width,
        anchorRect.height
      );
      gl.uniform1f(uniforms.cell, cellPitch);
      gl.uniform1f(uniforms.dpr, dpr);
      gl.uniform1f(uniforms.time, now - startTime);
      gl.uniform1f(uniforms.reveal, now - playTimeRef.current);
      gl.uniform1f(uniforms.scatter, scatter);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);

      gl.drawArrays(gl.POINTS, 0, particleCount);
    };

    const setTicker = (active: boolean) => {
      if (active !== tickerActive) {
        tickerActive = active;
        if (active) {
          gsap.ticker.add(render);
        } else {
          gsap.ticker.remove(render);
        }
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      setTicker(inView && particleCount > 0);
    });
    observer.observe(canvas);

    Promise.all([loadImage(src), Promise.all(thumbs.map(loadImage))])
      .then(([portrait, thumbImgs]) => {
        if (destroyed) return;
        portraitImg = portrait;

        const atlasTex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, atlasTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          buildAtlas(thumbImgs)
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.uniform1i(uniforms.atlas, 0);

        recomputeParticles();
        setTicker(inView && particleCount > 0);
      })
      .catch((err) => {
        console.warn("Failed to load mosaic assets:", err);
        fallback();
      });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      destroyed = true;
      setTicker(false);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (vao) gl.deleteVertexArray(vao);
      if (program) gl.deleteProgram(program);
    };
  }, [src, thumbs, anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
