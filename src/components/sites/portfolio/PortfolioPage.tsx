"use client";

import React, { useState } from "react";
import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Services } from "./Services";
import { BrickBreaker } from "./BrickBreaker";
import { Contact } from "./Contact";
import { Resume } from "./Resume";
import { ComingSoon } from "./ComingSoon";

export function PortfolioPage() {
  const [preloaded, setPreloaded] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  if (comingSoon) {
    return <ComingSoon onBack={() => setComingSoon(false)} />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero & Preloader */}
      <Hero onPreloadComplete={() => setPreloaded(true)} />

      {/* Main Content Sections revealed after preloader */}
      {preloaded && (
        <div className="animate-fade-in-up">
          <About />
          <Skills />
          <Experience />
          <Projects onCtaClick={() => setComingSoon(true)} />
          <Services />

          {/* Interactive Breakout Game Section */}
          <section
            id="play"
            className="bg-[#050505] text-white py-24 md:py-32 px-4 sm:px-6 md:px-16"
          >
            <div className="mx-auto max-w-5xl">
              <BrickBreaker
                lines={["JAVA", "SPRING"]}
                caption="Break it if you can. It still ships."
                panelClassName="aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9]"
              />
            </div>
          </section>

          <Resume />
          <Contact />
        </div>
      )}
    </main>
  );
}
