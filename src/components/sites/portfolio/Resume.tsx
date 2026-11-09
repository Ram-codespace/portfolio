"use client";

import React from "react";
import { developer, resumeFile } from "./data";
import { SectionTitle } from "./SectionTitle";
import { useGsapReveal } from "./useGsapReveal";

export function Resume() {
  const containerRef = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={containerRef}
      id="resume"
      className="bg-[#050505] text-white py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle lines={["MY", "RESUME"]} eyebrow="The short version" />

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start">
          <div data-reveal="up">
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
              Java Full Stack Software Developer with a B.Sc. in Computer Science
              (2025) and hands-on experience building end-to-end web applications
              across Java, Spring Boot, React.js, PHP, and MySQL.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              {developer.email} · {developer.phone} · {developer.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={resumeFile.href}
                download={resumeFile.downloadName}
                className="px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-sm font-medium transition-colors duration-300 hover:bg-[var(--accent-hover)]"
              >
                Download PDF
              </a>
              <a
                href={resumeFile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-white/25 text-white text-sm transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Open in new tab
              </a>
            </div>
          </div>

          <div
            data-reveal="up"
            data-reveal-delay="0.1"
            className="hidden md:block h-[70vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f]"
          >
            <iframe
              src={`${resumeFile.href}#toolbar=0&view=FitH`}
              title={`${developer.name} resume`}
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
