/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { developer, navItems } from "./data";
import { DotAnimation } from "./DotAnimation";
import { WebGLMosaic } from "./WebGLMosaic";

interface HeroProps {
  onPreloadComplete?: () => void;
}

const HERO_IMG = "/portfolio/assets/hero_center.webp";
const PROJECT_THUMBS = [
  "/portfolio/projects/medbook.webp",
  "/portfolio/projects/bank.webp",
  "/portfolio/projects/url-shortener.webp",
  "/portfolio/projects/quiz-engine.webp",
];

const HEADING_STYLE =
  "flex items-baseline text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase";
const GRADIENT_TEXT =
  "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800";

export function Hero({ onPreloadComplete }: HeroProps) {
  const [displayText, setDisplayText] = useState(developer.wordmark);
  const [dotFinished, setDotFinished] = useState(false);
  const [showDotAnim, setShowDotAnim] = useState(true);
  const [playMosaic, setPlayMosaic] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLHeadingElement>(null);
  const leftHalfRef = useRef<HTMLSpanElement>(null);
  const rightHalfRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const anchorImgRef = useRef<HTMLImageElement>(null);
  const onPreloadCompleteRef = useRef(onPreloadComplete);

  useEffect(() => {
    onPreloadCompleteRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  const preloadPromise = useMemo(() => {
    return new Promise<void>((resolve) => {
      if (typeof window === "undefined") return resolve();
      const img = new window.Image();
      img.src = HERO_IMG;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!dotFinished) return;

    const targetWord = "PORTFOLIO";
    const sourceWord = developer.wordmark;
    let step = 0;
    let timer: NodeJS.Timeout | undefined;
    let cancelled = false;
    let ctx: gsap.Context | undefined;

    preloadPromise.then(() => {
      if (cancelled) return;

      timer = setInterval(() => {
        setDisplayText(() =>
          targetWord
            .split("")
            .map((_, i) =>
              i < Math.floor(step)
                ? targetWord[i]
                : i < sourceWord.length
                ? sourceWord[i]
                : ""
            )
            .join("")
        );

        if (step >= 9) {
          clearInterval(timer);

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = "auto";
                onPreloadCompleteRef.current?.();
              },
            });

            const isMobile = window.innerWidth < 768;

            tl.to(
              containerRef.current,
              {
                top: isMobile ? "20%" : "74%",
                duration: 1.5,
                ease: "power3.inOut",
              },
              "+=0.2"
            );

            tl.fromTo(
              [roleRef.current, ctaRef.current],
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
              },
              "-=1.0"
            );

            tl.call(() => setPlayMosaic(true), undefined, "-=1.2");

            const splitDist = isMobile
              ? window.innerWidth * 0.2
              : Math.min(300, window.innerWidth * 0.2);

            tl.to(
              leftHalfRef.current,
              { x: -splitDist / 2, duration: 1.5, ease: "power3.out" },
              "<"
            );
            tl.to(
              rightHalfRef.current,
              { x: splitDist / 2, duration: 1.5, ease: "power3.out" },
              "<"
            );
          });
        }

        step += 1 / 3;
      }, 50);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      ctx?.revert();
    };
  }, [dotFinished, preloadPromise]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        background: "radial-gradient(circle, #222222 0%, #000000 80%)",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Home menu: links to every section */}
      <nav
        aria-label="Main Navigation"
        className={`absolute top-0 left-0 right-0 z-30 px-6 md:px-16 pt-6 md:pt-8 flex flex-col md:flex-row items-center md:justify-between gap-4 transition-opacity duration-700 ${
          playMosaic ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="#home"
          className="text-lg md:text-xl font-bold tracking-tight text-white outline-none"
        >
          {developer.name.split(" ")[0]}
          <span className="font-light italic text-gray-300 font-serif">
            {developer.name.split(" ").slice(1).join(" ")}
          </span>
        </a>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-7">
          {navItems
            .filter((item) => item.href !== "#home")
            .map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative block py-1 text-[11px] md:text-sm uppercase tracking-wider font-medium text-gray-300 transition-colors duration-300 hover:text-[var(--accent)] outline-none focus-visible:text-[var(--accent)]"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
                </a>
              </li>
            ))}
        </ul>
      </nav>

      {/* Main Title Container */}
      <div
        ref={containerRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={titleWrapperRef}
          className={`${HEADING_STYLE} ${GRADIENT_TEXT} transition-opacity duration-300 ${
            dotFinished ? "opacity-100" : "opacity-0"
          }`}
        >
          <span ref={leftHalfRef}>{displayText.slice(0, 4)}</span>
          <span ref={rightHalfRef}>{displayText.slice(4)}</span>
        </h1>

        {showDotAnim && (
          <div
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              dotFinished ? "opacity-0" : "opacity-100"
            }`}
          >
            <DotAnimation
              word={developer.wordmark}
              className={HEADING_STYLE}
              letterClassName={GRADIENT_TEXT}
              dotClassName="bg-gray-200"
              speed={1.15}
              onComplete={() => {
                setDotFinished(true);
                setTimeout(() => setShowDotAnim(false), 320);
              }}
            />
          </div>
        )}

        {/* Role Subhead */}
        <p
          ref={roleRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-4xl drop-shadow-md z-10 opacity-0 w-max"
        >
          <span className="font-bold">{developer.role.bold}</span>{" "}
          <span className="font-light italic text-gray-300 font-serif">
            {developer.role.light}
          </span>
        </p>

        {/* Contact Quick Button */}
        <div
          ref={ctaRef}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-auto md:right-20 flex items-center gap-2 md:gap-4 pointer-events-auto z-10 opacity-0 w-max"
        >
          <a
            href="#contact"
            aria-label={`Contact ${developer.name}`}
            className="group w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4 text-gray-300 transition-transform duration-300 group-hover:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 7L7 17M7 17H16M7 17V8"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all cursor-pointer"
          >
            <span className="text-gray-300 text-xs md:text-base italic font-light tracking-wider font-serif">
              Contact
            </span>
          </a>
        </div>
      </div>

      {/* Hidden Anchor Image for WebGL Layout Calibration */}
      <div className="absolute inset-x-0 top-[30vh] md:top-[2vh] z-10 text-center text-white flex flex-col items-center w-full pointer-events-none">
        <img
          ref={anchorImgRef}
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="invisible w-auto max-w-none h-[110vh] md:h-[143vh]"
        />
      </div>

      {/* WebGL Particle Mosaic Canvas */}
      <WebGLMosaic
        src={HERO_IMG}
        thumbs={PROJECT_THUMBS}
        anchorRef={anchorImgRef}
        play={playMosaic}
        label={`Portrait of ${developer.name} made of tiles from his full-stack projects`}
        className="z-10"
      />
    </section>
  );
}
