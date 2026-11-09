"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skillGroups } from "./data";
import { SectionTitle } from "./SectionTitle";
import { useGsapReveal } from "./useGsapReveal";

const AUTO_ADVANCE_SECONDS = 4;

export function Skills() {
  const containerRef = useGsapReveal<HTMLElement>();
  const panelRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  // Chips pop in (staggered) whenever the category changes, then float gently.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const chips = gsap.utils.toArray<HTMLElement>(".skill-chip", panel);
      gsap.fromTo(
        chips,
        { opacity: 0, y: 28, scale: 0.8, rotate: () => gsap.utils.random(-7, 7) },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.7)",
          onComplete: () => {
            chips.forEach((chip) => {
              gsap.to(chip, {
                y: gsap.utils.random(-5, 5),
                duration: gsap.utils.random(1.8, 3),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              });
            });
          },
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [active]);

  // Progress bar under the active category drives the auto-advance.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTO_ADVANCE_SECONDS,
        ease: "none",
        onComplete: () => setActive((i) => (i + 1) % skillGroups.length),
      }
    );
    if (pausedRef.current) tween.pause();
    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, [active]);

  const pause = () => {
    pausedRef.current = true;
    tweenRef.current?.pause();
  };
  const resume = () => {
    pausedRef.current = false;
    tweenRef.current?.resume();
  };

  const group = skillGroups[active];

  return (
    <section
      ref={containerRef}
      id="skills"
      className="bg-[#050505] text-white py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle lines={["TECHNICAL", "SKILLS"]} eyebrow="Tools I work with" />

        <div
          data-reveal="up"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start"
        >
          {/* Category list */}
          <div role="tablist" aria-label="Skill categories" className="flex lg:flex-col flex-wrap gap-x-6 gap-y-3 lg:gap-3">
            {skillGroups.map((g, i) => {
              const isActive = i === active;
              return (
                <button
                  key={g.label}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="group relative text-left cursor-pointer outline-none"
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`text-[10px] md:text-xs font-mono transition-colors duration-300 ${
                        isActive ? "text-[var(--accent)]" : "text-gray-600"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none transition-colors duration-500 ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500"
                          : "text-gray-700 group-hover:text-gray-400 group-focus-visible:text-gray-400"
                      }`}
                    >
                      {g.label}
                    </span>
                  </span>
                  <span className="mt-2 block h-px w-full bg-white/10">
                    {isActive && (
                      <span
                        ref={progressRef}
                        className="block h-px w-full origin-left bg-[var(--accent)]"
                        style={{ transform: "scaleX(0)" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated skill chips */}
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0f] p-6 md:p-10 min-h-[18rem]">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">
              {group.label} · {group.items.length} skills
            </p>
            <ul ref={panelRef} aria-live="polite" className="flex flex-wrap gap-3 md:gap-4">
              {group.items.map((item) => (
                <li
                  key={`${group.label}-${item}`}
                  className="skill-chip rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-lg font-light text-gray-100 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
