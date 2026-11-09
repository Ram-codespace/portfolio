/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { projects } from "./data";
import { useGsapReveal } from "./useGsapReveal";

interface ProjectsProps {
  onCtaClick?: () => void;
}

export function Projects({ onCtaClick }: ProjectsProps) {
  const containerRef = useGsapReveal<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      id="project"
      className="bg-[#050505] w-full text-white pt-10 md:pt-20 pb-24 px-6 md:px-16"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-12 lg:gap-0 mb-20 lg:mb-32">
        <div className="w-full lg:w-7/12 overflow-visible">
          <h2
            data-reveal-lines="true"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase whitespace-nowrap"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="line flex items-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                  Selected
                </span>
                <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-2 md:pt-4">
                  work
                </span>
              </span>
            </span>
          </h2>
        </div>

        <div
          data-reveal-group="true"
          className="w-full lg:w-4/12 flex flex-col items-start lg:mt-4"
        >
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8">
            Full stack software developer building reliable, high-performance
            web applications with clean RESTful architectures, responsive
            interfaces, and robust database design.
          </p>
          <button
            type="button"
            onClick={onCtaClick}
            className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black font-medium text-xs md:text-sm hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] transition-colors flex items-center gap-2"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Project Cards List */}
      <div className="flex flex-col gap-24 lg:gap-40 w-full">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.name}
              className={`flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center justify-between gap-12 lg:gap-16 w-full group`}
            >
              {/* Media Container with Parallax Effect */}
              <div
                data-reveal={isEven ? "left" : "right"}
                data-parallax-frame="true"
                className="w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    data-parallax="60"
                    className="w-full h-[112%] -mt-[6%] object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={project.name}
                    className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#26262b_0%,#0b0b0d_70%)] transition-transform duration-700 ease-out group-hover:scale-105"
                  >
                    <span className="text-[22vw] lg:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/30 via-white/10 to-transparent select-none">
                      {project.badge ?? project.prefix.trim().slice(0, 3)}
                    </span>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div
                data-reveal-group="0.1"
                className="w-full lg:w-5/12 flex flex-col items-start"
              >
                <span className="text-[var(--accent)] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
                  0{index + 1}
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.1] uppercase mb-6">
                  {project.prefix}
                  {project.serif && (
                    <span className="font-light italic text-gray-300 lowercase font-serif">
                      {project.serif}
                    </span>
                  )}
                  <br />
                  {project.suffix}
                </h3>

                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10">
                  {project.description}
                </p>

                {/* Action Links */}
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={project.live || "#contact"}
                    target={project.live ? "_blank" : undefined}
                    rel={project.live ? "noopener noreferrer" : undefined}
                    className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black text-xs md:text-sm font-medium hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] transition-colors inline-flex items-center gap-2"
                  >
                    {project.liveLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
