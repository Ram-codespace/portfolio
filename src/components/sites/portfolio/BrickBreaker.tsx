"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface BrickBreakerProps {
  lines?: string[];
  caption?: string;
  startingLives?: number;
  autoPlay?: boolean;
  speed?: number;
  className?: string;
  panelClassName?: string;
  onWin?: () => void;
}

const CELL_EMPTY = 0;
const CELL_SOLID = 1;
const CELL_BROKEN = 2;
const CHAR_W = 5;
const CHAR_H = 7;
const CHAR_GAP = 1;
const LINE_GAP = 3;

const BITMAP_FONT: Record<string, string> = {
  A: ".###./#...#/#...#/#####/#...#/#...#/#...#",
  B: "####./#...#/#...#/####./#...#/#...#/####.",
  C: ".####/#..../#..../#..../#..../#..../.####",
  D: "####./#...#/#...#/#...#/#...#/#...#/####.",
  E: "#####/#..../#..../####./#..../#..../#####",
  F: "#####/#..../#..../####./#..../#..../#....",
  G: ".###./#...#/#..../#..##/#...#/#...#/.###.",
  H: "#...#/#...#/#...#/#####/#...#/#...#/#...#",
  I: "#####/..#../..#../..#../..#../..#../#####",
  J: "..###/...#./...#./...#./...#./#..#./.##..",
  K: "#...#/#..#./#.#../##.../#.#../#..#./#...#",
  L: "#..../#..../#..../#..../#..../#..../#####",
  M: "#...#/##.##/#.#.#/#...#/#...#/#...#/#...#",
  N: "#...#/##..#/#.#.#/#..##/#...#/#...#/#...#",
  O: ".###./#...#/#...#/#...#/#...#/#...#/.###.",
  P: "####./#...#/#...#/####./#..../#..../#....",
  Q: ".###./#...#/#...#/#...#/#.#.#/#..#./.##.#",
  R: "####./#...#/#...#/####./#.#../#..#./#...#",
  S: ".####/#..../#..../.###./....#/....#/####.",
  T: "#####/..#../..#../..#../..#../..#../..#..",
  U: "#...#/#...#/#...#/#...#/#...#/#...#/.###.",
  V: "#...#/#...#/#...#/#...#/#...#/.#.#./..#..",
  W: "#...#/#...#/#...#/#...#/#.#.#/##.##/#...#",
  X: "#...#/#...#/.#.#./..#../.#.#./#...#/#...#",
  Y: "#...#/#...#/.#.#./..#../..#../..#../..#..",
  Z: "#####/....#/...#./..#../.#.../#..../#####",
  0: ".###./#...#/#..##/#.#.#/##..#/#...#/.###.",
  1: "..#../.##../..#../..#../..#../..#../.###.",
  2: ".###./#...#/....#/...#./..#../.#.../#####",
  3: "#####/...#./..#../...#./....#/#...#/.###.",
  4: "...#./..##./.#.#./#..#./#####/...#./...#.",
  5: "#####/#..../####./....#/....#/#...#/.###.",
  6: "..##./.#.../#..../####./#...#/#...#/.###.",
  7: "#####/....#/...#./..#../.#.../.#.../.#...",
  8: ".###./#...#/#...#/.###./#...#/#...#/.###.",
  9: ".###./#...#/#...#/.####/....#/...#./.##..",
  ".": "...../...../...../...../...../.##../.##..",
  ",": "...../...../...../...../.##../.##../#....",
  "!": "..#../..#../..#../..#../..#../...../..#..",
  "?": ".###./#...#/....#/..##./..#../...../..#..",
  "-": "...../...../...../#####/...../...../.....",
  "'": "..#../..#../...../...../...../...../.....",
  "&": ".##../#..#./#..#./.##../#.#.#/#..#./.##.#",
  "/": "....#/....#/...#./..#../.#.../#..../#....",
  "+": "...../..#../..#../#####/..#../..#../.....",
  ":": "...../..#../..#../...../..#../..#../.....",
};

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

function computeTextDimensions(lines: string[]) {
  const lineLengths = lines.map((l) => Math.max(0, l.length * 6 - CHAR_GAP));
  return {
    w: Math.max(1, ...lineLengths),
    h: lines.length * CHAR_H + (lines.length - 1) * LINE_GAP,
  };
}

function buildGrid(
  lines: string[],
  cols: number,
  rows: number,
  verticalCenter: number
): Uint8Array {
  const grid = new Uint8Array(cols * rows);
  const dims = computeTextDimensions(lines);
  const startY = Math.max(0, Math.round(rows * verticalCenter - dims.h / 2));

  lines.forEach((line, lineIdx) => {
    const lineW = Math.max(0, line.length * 6 - CHAR_GAP);
    const startX = Math.round((cols - lineW) / 2);
    const curY = startY + lineIdx * 10;

    Array.from(line.toUpperCase()).forEach((char, charIdx) => {
      const glyph = BITMAP_FONT[char];
      if (!glyph) return;
      const charX = startX + charIdx * 6;
      glyph.split("/").forEach((rowStr, rowIdx) => {
        for (let colIdx = 0; colIdx < CHAR_W; colIdx++) {
          if (rowStr[colIdx] !== "#") continue;
          const gx = charX + colIdx;
          const gy = curY + rowIdx;
          if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
            grid[gy * cols + gx] = CELL_SOLID;
          }
        }
      });
    });
  });

  return grid;
}

export function BrickBreaker({
  lines = ["PIXEL", "BY PIXEL"],
  caption,
  startingLives = 3,
  autoPlay = true,
  speed = 1,
  className = "",
  panelClassName = "aspect-[16/10] sm:aspect-[2/1]",
  onWin,
}: BrickBreakerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<{
    launch: () => void;
    movePaddleTo: (x: number) => void;
    nudgePaddle: (dx: number) => void;
  } | null>(null);

  const gameStateRef = useRef<{
    width: number;
    height: number;
    cell: number;
    cols: number;
    rows: number;
    grid: Uint8Array;
    standing: number;
    ox: number;
    oy: number;
    gap: number;
    accent: string;
    layer: HTMLCanvasElement;
    layerCtx: CanvasRenderingContext2D;
    layerDirty: boolean;
    radius: number;
    paddle: { x: number; y: number; w: number; h: number };
    ball: { x: number; y: number; vx: number; vy: number };
    baseSpeed: number;
    serving: boolean;
    serveDelay: number;
    lives: number;
    phase: "idle" | "attract" | "playing" | "won" | "over";
    clock: number;
    regrow: { cell: number; at: number }[];
    last: number;
    acc: number;
  } | null>(null);

  const linesRef = useRef(lines);
  const onWinRef = useRef(onWin);
  useEffect(() => {
    linesRef.current = lines;
    onWinRef.current = onWin;
  }, [lines, onWin]);

  const [phase, setPhase] = useState<"idle" | "attract" | "playing" | "won" | "over">("idle");
  const [lives, setLives] = useState(startingLives);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    let animId = 0;
    let inView = false;
    let isVisible = true;

    const renderLayer = () => {
      const state = gameStateRef.current;
      if (!state) return;
      const { layerCtx, cell, gap, cols, rows, grid, ox, oy } = state;
      layerCtx.clearRect(0, 0, state.width, state.height);
      const brickSize = cell - gap;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = grid[r * cols + c];
          if (val === CELL_EMPTY) continue;
          layerCtx.fillStyle = val === CELL_SOLID ? "#f2efe9" : "rgba(242,239,233,0.07)";
          layerCtx.fillRect(ox + c * cell, oy + r * cell, brickSize, brickSize);
        }
      }
      state.layerDirty = false;
    };

    const draw = () => {
      const state = gameStateRef.current;
      if (!state) return;
      if (state.layerDirty) renderLayer();

      ctx.clearRect(0, 0, state.width, state.height);
      ctx.drawImage(state.layer, 0, 0, state.width, state.height);

      if (state.phase !== "playing" && state.phase !== "attract") return;

      const { paddle, ball, radius } = state;
      ctx.fillStyle = state.accent;
      const px = paddle.x - paddle.w / 2;

      ctx.beginPath();
      ctx.roundRect(px, paddle.y, paddle.w, paddle.h, paddle.h / 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const resetGame = () => {
      const rect = container.getBoundingClientRect();
      const cw = Math.round(rect.width);
      const ch = Math.round(rect.height);
      if (cw < 40 || ch < 40) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAuto = autoPlay && !reduced;
      const currentLines = linesRef.current;
      const dims = computeTextDimensions(currentLines);
      const fitRatio = Math.min((cw * (cw < 520 ? 0.94 : 0.88)) / dims.w, (ch * 0.56) / dims.h);

      const cell = clamp(Math.floor(fitRatio), 4, 26);
      const cols = Math.floor(cw / cell);
      const rows = Math.floor(ch / cell);
      const grid = buildGrid(currentLines, cols, rows, clamp(0.3 + (ch / cw) * 0.12, 0.3, 0.44));

      let solidCount = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === CELL_SOLID) solidCount++;
      }

      const layerCanvas = document.createElement("canvas");
      layerCanvas.width = canvas.width;
      layerCanvas.height = canvas.height;
      const layerCtx = layerCanvas.getContext("2d")!;
      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const accent =
        getComputedStyle(container).getPropertyValue("--accent").trim() || "#e8e4dc";

      gameStateRef.current = {
        width: cw,
        height: ch,
        cell,
        cols,
        rows,
        grid,
        standing: solidCount,
        ox: (cw - cols * cell) / 2,
        oy: (ch - rows * cell) / 2,
        gap: Math.max(1, Math.round(cell * 0.22)),
        accent,
        layer: layerCanvas,
        layerCtx,
        layerDirty: true,
        radius: clamp(cell * 0.5, 4, 9),
        paddle: {
          x: cw / 2,
          w: clamp(cw * 0.26, 64, 200),
          h: clamp(cell * 0.8, 5, 14),
          y: ch - Math.max(26, cell * 2.4),
        },
        ball: { x: cw / 2, y: 0, vx: 0, vy: 0 },
        baseSpeed: clamp(ch * 0.46, 150, 420) * speed,
        serving: true,
        serveDelay: shouldAuto ? 0.6 : Infinity,
        lives: startingLives,
        phase: shouldAuto ? "attract" : "idle",
        clock: 0,
        regrow: [],
        last: 0,
        acc: 0,
      };

      setPhase(shouldAuto ? "attract" : "idle");
      setLives(startingLives);
      draw();
    };

    const checkBrickCollisions = () => {
      const state = gameStateRef.current;
      if (!state) return [];
      const { ball, radius, cell, cols, rows, ox, oy, grid } = state;
      const minC = Math.floor((ball.x - radius - ox) / cell);
      const maxC = Math.floor((ball.x + radius - ox) / cell);
      const minR = Math.floor((ball.y - radius - oy) / cell);
      const maxR = Math.floor((ball.y + radius - oy) / cell);

      const hits: number[] = [];
      for (let r = Math.max(0, minR); r <= Math.min(rows - 1, maxR); r++) {
        for (let c = Math.max(0, minC); c <= Math.min(cols - 1, maxC); c++) {
          const idx = r * cols + c;
          if (grid[idx] === CELL_SOLID) {
            hits.push(idx);
          }
        }
      }
      return hits;
    };

    const stepBall = (axis: "x" | "y", dt: number) => {
      const state = gameStateRef.current;
      if (!state) return;
      const { ball } = state;

      if (axis === "x") ball.x += ball.vx * dt;
      else ball.y += ball.vy * dt;

      const hits = checkBrickCollisions();
      if (!hits.length) return;

      const isAttract = state.phase === "attract";
      hits.forEach((idx) => {
        state.grid[idx] = CELL_BROKEN;
        state.standing--;
        if (isAttract) {
          state.regrow.push({ cell: idx, at: state.clock + 1.4 });
        }
      });
      state.layerDirty = true;

      if (axis === "x") {
        ball.x -= ball.vx * dt;
        ball.vx = -ball.vx;
      } else {
        ball.y -= ball.vy * dt;
        ball.vy = -ball.vy;
      }
    };

    const serveBall = () => {
      const state = gameStateRef.current;
      if (!state) return;
      state.serving = true;
      state.serveDelay = 0.8;
      state.ball.vx = 0;
      state.ball.vy = 0;
    };

    const setGamePhase = (next: "idle" | "attract" | "playing" | "won" | "over") => {
      if (!gameStateRef.current) return;
      gameStateRef.current.phase = next;
      setPhase(next);
      if (next === "won") onWinRef.current?.();
    };

    const updatePhysics = (dt: number) => {
      const state = gameStateRef.current;
      if (!state) return;
      const { ball, paddle, radius } = state;
      const isAttract = state.phase === "attract";

      state.clock += dt;
      while (state.regrow.length && state.regrow[0].at <= state.clock) {
        const item = state.regrow.shift()!;
        if (state.grid[item.cell] === CELL_BROKEN) {
          state.grid[item.cell] = CELL_SOLID;
          state.standing++;
          state.layerDirty = true;
        }
      }

      if (isAttract && !state.serving) {
        paddle.x = clamp(
          paddle.x + (ball.x - paddle.x) * Math.min(1, dt * 7),
          paddle.w / 2,
          state.width - paddle.w / 2
        );
      }

      if (state.serving) {
        ball.x = paddle.x;
        ball.y = paddle.y - radius - 1;
        if (Number.isFinite(state.serveDelay)) {
          state.serveDelay -= dt;
          if (state.serveDelay <= 0) {
            state.serving = false;
            ball.vx = state.baseSpeed * 0.35 * (Math.random() < 0.5 ? -1 : 1);
            ball.vy = -state.baseSpeed;
          }
        }
        return;
      }

      stepBall("x", dt);
      stepBall("y", dt);

      // Wall reflections
      if (ball.x - radius < 0) {
        ball.x = radius;
        ball.vx = Math.abs(ball.vx);
      }
      if (ball.x + radius > state.width) {
        ball.x = state.width - radius;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y - radius < 0) {
        ball.y = radius;
        ball.vy = Math.abs(ball.vy);
      }

      // Paddle hit
      const hitX = Math.abs(ball.x - paddle.x) <= paddle.w / 2 + radius;
      const hitY = ball.vy > 0 && ball.y + radius >= paddle.y && ball.y - radius <= paddle.y + paddle.h;

      if (hitX && hitY) {
        const norm = clamp((ball.x - paddle.x) / (paddle.w / 2), -1, 1) * 1.05;
        const curSpeed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.008, state.baseSpeed * 1.45);
        ball.vx = Math.sin(norm) * curSpeed;
        ball.vy = -Math.cos(norm) * curSpeed;
        ball.y = paddle.y - radius - 0.5;
      }

      // Bottom drop
      if (ball.y - radius > state.height) {
        if (isAttract) {
          serveBall();
        } else {
          state.lives--;
          setLives(state.lives);
          if (state.lives <= 0) {
            setGamePhase("over");
          } else {
            serveBall();
          }
        }
      }

      if (!isAttract && state.standing === 0) {
        setGamePhase("won");
      }
    };

    const STEP = 1 / 120;
    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);
      const state = gameStateRef.current;
      if (!state) return;

      const elapsed = state.last ? Math.min((timestamp - state.last) / 1000, 4 * STEP) : 0;
      state.last = timestamp;

      if (state.phase === "playing" || state.phase === "attract") {
        state.acc += elapsed;
        let iter = 0;
        while (state.acc >= STEP && iter < 4) {
          updatePhysics(STEP);
          state.acc -= STEP;
          iter++;
        }
        if (iter === 4) state.acc = 0;
      }

      draw();
    };

    const canRun = () => isVisible && inView;
    const startLoop = () => {
      if (!animId && canRun()) {
        if (gameStateRef.current) {
          gameStateRef.current.last = 0;
          gameStateRef.current.acc = 0;
        }
        animId = requestAnimationFrame(loop);
      }
    };
    const stopLoop = () => {
      cancelAnimationFrame(animId);
      animId = 0;
    };

    controlsRef.current = {
      launch: () => {
        let state = gameStateRef.current;
        if (!state) return;
        if (state.phase !== "playing") {
          resetGame();
          state = gameStateRef.current!;
        }
        state.phase = "playing";
        setPhase("playing");
        if (state.serving) {
          state.ball.x = state.paddle.x;
          state.ball.y = state.paddle.y - state.radius - 1;
          state.serving = false;
          state.serveDelay = Infinity;
          state.ball.vx = state.baseSpeed * 0.35;
          state.ball.vy = -state.baseSpeed;
        }
        startLoop();
      },
      movePaddleTo: (x: number) => {
        const state = gameStateRef.current;
        if (!state) return;
        state.paddle.x = clamp(x, state.paddle.w / 2, state.width - state.paddle.w / 2);
      },
      nudgePaddle: (dx: number) => {
        const state = gameStateRef.current;
        if (!state) return;
        state.paddle.x = clamp(state.paddle.x + dx, state.paddle.w / 2, state.width - state.paddle.w / 2);
      },
    };

    resetGame();
    startLoop();

    const resizeObserver = new ResizeObserver(() => resetGame());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (canRun()) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (canRun()) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      controlsRef.current = null;
    };
  }, [autoPlay, speed, startingLives]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    if (gameStateRef.current?.phase === "attract") {
      controlsRef.current?.launch();
    }
    controlsRef.current?.movePaddleTo(e.clientX - container.getBoundingClientRect().left);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = (gameStateRef.current?.cell ?? 8) * 4;
    if (gameStateRef.current?.phase === "attract") {
      controlsRef.current?.launch();
    }
    if (e.key === "ArrowLeft") {
      controlsRef.current?.nudgePaddle(-step);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      controlsRef.current?.nudgePaddle(step);
      e.preventDefault();
    } else if (e.key === " " || e.key === "Enter") {
      controlsRef.current?.launch();
      e.preventDefault();
    }
  }, []);

  const statusLabel =
    phase === "won"
      ? "Cleared"
      : phase === "over"
      ? "Out of balls"
      : phase === "playing"
      ? "Playing"
      : "Ready";

  return (
    <div className={`relative ${className}`}>
      {caption && (
        <p className="mb-5 inline-block pb-1 border-b-2 border-[var(--accent)] text-xs sm:text-sm font-medium tracking-wide text-white/80">
          {caption}
        </p>
      )}

      <div
        ref={containerRef}
        role="application"
        aria-roledescription="brick breaker"
        aria-label={`${lines.join(
          " "
        )} — a playable headline. Arrow keys move the paddle, space launches the ball.`}
        tabIndex={0}
        onPointerMove={onPointerMove}
        onPointerDown={() => controlsRef.current?.launch()}
        onKeyDown={onKeyDown}
        style={{ touchAction: phase === "playing" ? "none" : "auto" }}
        className={`relative w-full ${panelClassName} select-none outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
          phase === "playing" ? "cursor-none" : "cursor-pointer"
        }`}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
        <h2 className="sr-only">{lines.join(" ")}</h2>
        <p aria-live="polite" className="sr-only">
          {statusLabel}
        </p>

        {phase === "playing" && (
          <div className="absolute top-3 right-3 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: startingLives }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx < lives ? "bg-[var(--accent)]" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        )}

        {phase !== "playing" && (
          <div className="absolute bottom-4 right-4 flex items-center gap-4 pointer-events-none">
            {(phase === "over" || phase === "won") && (
              <span
                className={`bg-[#050505] px-2 py-1 text-xs sm:text-sm tracking-widest uppercase ${
                  phase === "won" ? "text-[var(--accent)]" : "text-white/50"
                }`}
              >
                {statusLabel}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                controlsRef.current?.launch();
              }}
              className="pointer-events-auto cursor-pointer px-5 py-2 bg-[#050505] border border-[var(--accent)]/50 text-[var(--accent)] text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {phase === "over" || phase === "won" ? "Again" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
