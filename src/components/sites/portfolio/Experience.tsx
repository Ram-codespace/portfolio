"use client";

import React from "react";
import { certifications, timeline } from "./data";
import { SectionTitle } from "./SectionTitle";
import { useGsapReveal } from "./useGsapReveal";

export function Experience() {
  const containerRef = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={containerRef}
      id="experience"
      className="bg-[#050505] text-white py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle lines={["EXPERIENCE &", "EDUCATION"]} eyebrow="Where I've learned" />

        <div className="relative space-y-6 pl-6 md:pl-10">
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent"
          />

          {timeline.map((item) => (
            <article
              key={item.role}
              data-reveal="up"
              className="relative rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[29px] md:-left-[45px] top-8 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[#050505]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
                <span className="text-[var(--accent)]">{item.type}</span>
                <span>
                  {item.period}
                  {item.location ? ` · ${item.location}` : ""}
                </span>
              </div>

              <h3 className="mt-4 text-xl md:text-3xl font-bold tracking-tight">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{item.organization}</p>

              {item.highlight && (
                <p className="mt-4 text-sm text-[var(--accent)]">{item.highlight}</p>
              )}

              {item.details.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm md:text-base font-light leading-relaxed text-gray-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3
            data-reveal="up"
            className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6"
          >
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                data-reveal="up"
                data-reveal-delay={String(index * 0.08)}
                className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 transition-colors duration-300 hover:border-white/25"
              >
                <h4 className="text-lg font-bold tracking-tight leading-snug">
                  {cert.title}
                </h4>
                <p className="mt-2 text-sm text-gray-400">{cert.issuer}</p>
                {cert.detail && (
                  <p className="mt-3 text-sm text-gray-300 font-light">{cert.detail}</p>
                )}
                {cert.year && (
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    {cert.year}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
