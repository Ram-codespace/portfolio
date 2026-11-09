"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { developer } from "./data";
import { EASE_OUT, useGsapReveal } from "./useGsapReveal";

const CONTACT_BG_VIDEO = "/portfolio/assets/contact_bg-BZTj-iD6.mp4";
const WHATSAPP_LINK = `https://wa.me/${developer.whatsapp}?text=Hi%20${developer.name}%2C%20I%20found%20your%20portfolio%20and%20I'd%20like%20to%20connect.`;

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project" },
  { label: "Services", href: "#service" },
  { label: "Resume", href: "#resume" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: developer.socials.github,
    fill: false,
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  {
    label: "LinkedIn",
    href: developer.socials.linkedin,
    fill: false,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-gray-500 opacity-0 -translate-x-2 transition-[opacity,transform,color] duration-500 ease-out group-hover/row:opacity-100 group-hover/row:translate-x-0 group-hover/row:text-white group-focus-visible/row:opacity-100 group-focus-visible/row:translate-x-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href?: string;
  breakAll?: boolean;
}

function ContactRow({ label, value, href, breakAll }: ContactRowProps) {
  const content = (
    <>
      <span data-row-inner="true" className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-2">
          {label}
        </span>
        <span
          className={`block text-base md:text-lg tracking-wide text-white/85 transition-colors duration-500 group-hover/row:text-white ${
            breakAll ? "break-all" : ""
          }`}
        >
          {value}
        </span>
      </span>
      {href && <ArrowIcon />}
    </>
  );

  const baseClass =
    "group/row flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 overflow-hidden transition-colors duration-500";

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass} hover:bg-white/[0.05] focus-visible:bg-white/[0.05] outline-none`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClass}>{content}</div>;
}

export function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useGsapReveal<HTMLDivElement>(({ scope, desktop }) => {
    const panel = scope.querySelector<HTMLElement>("[data-contact-panel]");
    const cleanups: (() => void)[] = [];

    if (panel) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            once: true,
          },
        })
        .from(panel, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: EASE_OUT,
        })
        .from(
          panel.querySelectorAll("[data-row-inner]"),
          {
            yPercent: 105,
            opacity: 0,
            duration: 0.85,
            ease: EASE_OUT,
            stagger: 0.08,
          },
          "-=0.75"
        );

      if (desktop) {
        gsap.fromTo(
          panel,
          { yPercent: 3.5 },
          {
            yPercent: -3.5,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }

    // Magnetic pointer effect on buttons
    if (window.matchMedia("(pointer: fine)").matches) {
      scope.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const factor = parseFloat(el.dataset.magnetic || "0.3") || 0.3;
        const quickX = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
        const quickY = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          quickX((e.clientX - (rect.left + rect.width / 2)) * factor);
          quickY((e.clientY - (rect.top + rect.height / 2)) * factor);
        };

        const onLeave = () => {
          quickX(0);
          quickY(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("blur", onLeave);

        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("blur", onLeave);
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  });

  return (
    <div
      ref={containerRef}
      id="contact"
      className="relative min-h-screen text-white font-sans flex flex-col overflow-hidden [clip-path:inset(0)]"
    >
      {/* Background Video with Atmosphere Gradients */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-[100vh] object-cover z-0"
      >
        <source src={CONTACT_BG_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-black/70 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 md:pt-32 flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row gap-14 lg:gap-24">
          {/* Left Hero Pitch */}
          <div className="w-full lg:w-6/12 flex flex-col">
            <div data-reveal="true" className="mb-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-gray-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-halo" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
            </div>

            <h2
              data-reveal-lines="true"
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl mb-7 leading-[0.95]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                  Get in touch
                </span>
              </span>
            </h2>

            <p
              data-reveal="true"
              data-reveal-delay="0.15"
              className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-md"
            >
              Open for Java Full Stack opportunities, software engineering roles,
              and technical collaborations — Spring Boot & React web applications
              in particular. WhatsApp or email gets the fastest reply.
            </p>

            <div data-reveal-group="0.12" className="flex flex-wrap gap-3 mt-10">
              <a
                data-magnetic="0.28"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-sm font-medium inline-flex items-center gap-2.5 transition-[background-color,transform] duration-300 ease-out hover:bg-[var(--accent-hover)] shadow-[0_0_36px_-8px_var(--accent)]"
              >
                Chat on WhatsApp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29z" />
                </svg>
              </a>

              <a
                data-magnetic="0.28"
                href={`mailto:${developer.email}`}
                className="group px-6 py-3.5 rounded-full border border-white/25 text-white text-sm inline-flex items-center gap-2.5 backdrop-blur-md transition-[background-color,color,border-color] duration-300 ease-out hover:bg-white hover:text-black hover:border-white"
              >
                Send an email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Glass Card */}
          <div className="w-full lg:w-6/12 flex lg:items-center">
            <div
              data-contact-panel="true"
              className="w-full rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl shadow-[0_24px_70px_-20px_rgba(0,0,0,0.7)] overflow-hidden divide-y divide-white/[0.08]"
            >
              <ContactRow
                label="Email"
                value={developer.email}
                href={`mailto:${developer.email}`}
                breakAll
              />
              <ContactRow
                label="Phone"
                value={developer.phone}
                href={`tel:${developer.phone.replace(/\s/g, "")}`}
              />
              <ContactRow label="Based in" value={developer.location} />

              {/* Social Channels */}
              <div className="px-6 md:px-8 py-6 md:py-7 overflow-hidden">
                <div data-row-inner="true">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-4">
                    Elsewhere
                  </p>
                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((item) => (
                      <a
                        key={item.label}
                        data-magnetic="0.35"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        title={item.label}
                        className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.07] flex items-center justify-center transition-[background-color,color,border-color] duration-300 ease-out hover:bg-white hover:text-black hover:border-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill={item.fill ? "currentColor" : "none"}
                          stroke={item.fill ? "none" : "currentColor"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-7 sm:pb-9">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:inset-x-16" />

        <div className="grid gap-10 py-10 sm:py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
          <div className="flex flex-col items-start">
            <a
              href="#home"
              aria-label={`${developer.name} home`}
              className="text-4xl font-black tracking-[-0.08em] text-white transition-colors duration-300 hover:text-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-5xl"
            >
              {developer.wordmark}
              <span className="text-white/35">.</span>
            </a>
            <p className="mt-3 text-sm text-gray-400">
              {developer.role.bold} {developer.role.light}
            </p>
            <p className="mt-1 text-xs tracking-wide text-gray-500">
              {developer.location}
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-8 sm:gap-12">
            <nav aria-label="Footer" className="min-w-0">
              <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                Explore
              </p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                {FOOTER_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-fit text-xs text-gray-400 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                Connect
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill={item.fill ? "currentColor" : "none"}
                      stroke={item.fill ? "none" : "currentColor"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {developer.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex w-fit items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to top
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7 7-7 7 7" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
