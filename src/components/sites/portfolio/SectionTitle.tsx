import React from "react";

interface SectionTitleProps {
  lines: string[];
  eyebrow?: string;
}

export function SectionTitle({ lines, eyebrow }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-end w-full pb-12 text-right">
      {eyebrow && (
        <p
          data-reveal="fade"
          className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-4"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal-lines="true"
        className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[1.1] md:leading-[0.9]"
      >
        {lines.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
              {line}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
