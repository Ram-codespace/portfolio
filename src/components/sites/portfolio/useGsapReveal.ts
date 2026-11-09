"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState === "complete") {
    refresh();
  } else {
    window.addEventListener("load", refresh, { once: true });
  }
  document.fonts?.ready?.then(refresh);
}

export const EASE_OUT = "power3.out";
export const DURATION_DEFAULT = 0.9;
export const TRIGGER_START = "top 88%";

export const REVEAL_VARS: Record<string, gsap.TweenVars> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.94 },
  fade: {},
};

export function initReveals(container: HTMLElement) {
  // data-reveal
  gsap.utils.toArray<HTMLElement>("[data-reveal]", container).forEach((el) => {
    const type = el.dataset.reveal || "up";
    const baseVars = REVEAL_VARS[type] ?? REVEAL_VARS.up;
    const delay = parseFloat(el.dataset.revealDelay || "0") || 0;

    gsap.from(el, {
      ...baseVars,
      opacity: 0,
      duration: DURATION_DEFAULT,
      delay,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: el,
        start: TRIGGER_START,
        once: true,
      },
    });
  });

  // data-reveal-group
  gsap.utils.toArray<HTMLElement>("[data-reveal-group]", container).forEach((el) => {
    const children = gsap.utils.toArray<HTMLElement>(":scope > *", el);
    if (children.length) {
      const stagger = parseFloat(el.dataset.revealGroup || "0.08") || 0.08;
      gsap.from(children, {
        y: 32,
        opacity: 0,
        duration: DURATION_DEFAULT,
        ease: EASE_OUT,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: TRIGGER_START,
          once: true,
        },
      });
    }
  });

  // data-reveal-lines
  gsap.utils.toArray<HTMLElement>("[data-reveal-lines]", container).forEach((el) => {
    const lines = gsap.utils.toArray<HTMLElement>(".line", el);
    if (lines.length) {
      gsap.from(lines, {
        yPercent: 110,
        duration: 1.1,
        ease: EASE_OUT,
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    }
  });

  // data-parallax
  gsap.utils.toArray<HTMLElement>("[data-parallax]", container).forEach((el) => {
    const factor = parseFloat(el.dataset.parallax || "40") || 40;
    const trigger = el.closest("[data-parallax-frame]") || el;
    gsap.fromTo(
      el,
      { yPercent: -factor / 10 },
      {
        yPercent: factor / 10,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  callback?: (context: { scope: T; desktop: boolean; mobile: boolean }) => (() => void) | void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as {
          motion: boolean;
          desktop: boolean;
        };

        if (motion) {
          initReveals(scope);
          return callback?.({ scope, desktop, mobile: !desktop });
        }
      }
    );

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
