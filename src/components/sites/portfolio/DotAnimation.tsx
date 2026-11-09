"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

interface DotAnimationProps {
  word: string;
  pivotIndex?: number;
  className?: string;
  letterClassName?: string;
  dotClassName?: string;
  loop?: boolean;
  speed?: number;
  onComplete?: () => void;
}

let measureCanvas: HTMLCanvasElement | null = null;

function measureChar(char: string, el: HTMLElement, parentHeight: number) {
  try {
    if (!measureCanvas) {
      measureCanvas = document.createElement("canvas");
    }
    const ctx = measureCanvas.getContext("2d");
    if (!ctx) return null;

    const style = window.getComputedStyle(el);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = ctx.measureText(char);

    if (!Number.isFinite(metrics.actualBoundingBoxLeft)) return null;

    const ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent || 20;
    const descent = metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent || 5;
    const offset = (parentHeight - (ascent + descent)) / 2 + ascent;

    return {
      cx: (metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft) / 2,
      bottom: offset + descent,
      height: ascent + descent,
    };
  } catch {
    return null;
  }
}

export function DotAnimation({
  word,
  pivotIndex,
  className = "",
  letterClassName = "",
  dotClassName = "bg-white",
  loop = false,
  speed = 1,
  onComplete,
}: DotAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const [, setCycle] = useState(0);
  const chars = useMemo(() => Array.from(word), [word]);

  const targetIdx = useMemo(() => {
    if (typeof pivotIndex === "number" && chars[pivotIndex]?.trim()) {
      return pivotIndex;
    }
    const idx = chars.findIndex((c) => "Iil1".includes(c));
    return idx === -1 ? 0 : idx;
  }, [chars, pivotIndex]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!container || !heading || !dot || !glow) return;

    const targetEl = letterRefs.current[targetIdx];
    if (!targetEl) return;

    let reverted = false;

    const ctx = gsap.context(() => {
      const parentRect = heading.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const metrics = measureChar(chars[targetIdx], targetEl, parentRect.height);

      const dotSize = Math.max(8, Math.round(targetRect.width * 0.28));
      const dotX = targetRect.left - parentRect.left + (metrics ? metrics.cx : targetRect.width / 2) - dotSize / 2;
      const targetY = targetRect.top - parentRect.top;

      gsap.set(container, { opacity: 1 });
      gsap.set(dot, {
        width: dotSize,
        height: dotSize,
        left: dotX,
        top: targetY - dotSize * 2,
        scaleX: 1,
        scaleY: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          if (!reverted) {
            onCompleteRef.current?.();
            if (loop) {
              setCycle((c) => c + 1);
            }
          }
        },
      });

      // Bouncing dot drops and lands on the stem
      tl.to(dot, {
        y: dotSize * 1.8,
        duration: 0.45 / speed,
        ease: "power2.in",
      })
        .to(dot, {
          scaleX: 1.35,
          scaleY: 0.65,
          duration: 0.08 / speed,
        })
        .to(dot, {
          y: -dotSize * 0.7,
          scaleX: 0.9,
          scaleY: 1.15,
          duration: 0.22 / speed,
          ease: "power1.out",
        })
        .to(dot, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.35 / speed,
          ease: "bounce.out",
        });

      // Word letters reveal
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.from(
          el,
          {
            opacity: 0,
            y: 30,
            duration: 0.3 / speed,
            ease: "power2.out",
          },
          (0.1 + i * 0.04) / speed
        );
      });
    }, container);

    const onResize = () => {
      setCycle((c) => c + 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      reverted = true;
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [chars, targetIdx, loop, speed]);

  return (
    <div ref={containerRef} className="relative select-none pointer-events-none opacity-0">
      <h1 ref={headingRef} className={className}>
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className={`inline-block will-change-transform ${letterClassName}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <span ref={dotRef} className={`absolute rounded-full pointer-events-none ${dotClassName}`} />
      <span
        ref={glowRef}
        className="absolute rounded-full opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
    </div>
  );
}
