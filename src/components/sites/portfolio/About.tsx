"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { introWords } from "./data";
import { EASE_OUT, useGsapReveal } from "./useGsapReveal";


export function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const containerRef = useGsapReveal<HTMLElement>(({ scope, desktop }) => {
    // Reveal for the Intro title
    gsap.from("[data-intro]", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: scope,
        start: "top 70%",
        once: true,
      },
    });

    // Word scrub animation
    if (paragraphRef.current) {
      const words = paragraphRef.current.querySelectorAll(".word");
      if (desktop) {
        gsap.fromTo(
          words,
          { color: "#52525b", opacity: 0.2 },
          {
            color: "#ffffff",
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 85%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      } else {
        gsap.from(paragraphRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: EASE_OUT,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-[#050505] text-white pt-24 pb-16 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left Title Column */}
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-4 md:mb-6">
              About me
            </span>
            <h2
              data-intro="true"
              className="text-[18vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.85]"
            >
              Intro
            </h2>
          </div>

          {/* Right Frosted Card */}
          <div className="relative bg-white/5 backdrop-blur-md px-5 py-7 md:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/[0.07] transition-colors duration-300 text-left">
            <p
              ref={paragraphRef}
              lang="en"
              className="text-gray-300 text-[15px] sm:text-base md:text-lg lg:text-xl leading-[1.7] md:leading-relaxed font-light text-pretty hyphens-auto"
            >
              {introWords.map((item, index) => (
                <React.Fragment key={index}>
                  <span className={`word ${item.className || ""}`}>
                    {item.text}
                  </span>
                  {index < introWords.length - 1 && " "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
