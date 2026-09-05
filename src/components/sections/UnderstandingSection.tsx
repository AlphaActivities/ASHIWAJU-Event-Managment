import React from "react";
import { Check } from "lucide-react";
import WaveText from "../ui/WaveText";
import { LuxFadeIn } from "../ui/LuxFadeIn";

const statements = [
  "Family chiming in with their opinion and ideas",
  "Vendors not being transparent with their prices",
  "No one listens to you or understands what you want",
  "Every single decision you make is questioned.",
  "You've got the vision; you just don't know how to bring it together within your budget",
];

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-24 lg:py-20 bg-[#EFE8DA]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* HEADLINE — full width at top */}
        <div className="mb-8 lg:mb-6">
          <WaveText
            text="It's your wedding; you're the one getting married"
            as="h2"
            className="text-4xl md:text-6xl lg:text-[2.75rem] font-serif text-[#151515] leading-tight"
            delayStep={30}
          />
        </div>

        {/* 2-COLUMN LAYOUT — desktop: list+paragraph left, image right; mobile: image then list then paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* IMAGE — order-first on mobile, right column on desktop */}
          <LuxFadeIn delay={0.1}>
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full min-h-[360px] md:min-h-[420px] lg:min-h-[400px] lg:max-h-[460px]">
              <img
                src="/images/hero/hero-05.webp"
                alt="Elegant wedding celebration"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </LuxFadeIn>

          {/* INTRO LINE + LIST + PARAGRAPH — order-second on mobile, left column on desktop */}
          <LuxFadeIn delay={0.2}>
            <div className="order-2 lg:order-1 w-full">
              <p className="text-lg md:text-xl lg:text-[1.15rem] font-serif text-[#151515] leading-snug mb-6 lg:mb-6">
                Planning your wedding shouldn't feel like a full-time job.
              </p>

              <ul className="space-y-4 md:space-y-5 lg:space-y-4">
                {statements.map((statement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1">
                      <Check
                        className="w-5 h-5 text-[#C99524]"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="text-[15px] md:text-lg leading-relaxed text-[#151515] font-sans">
                      {statement}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 lg:mt-7 text-[15px] md:text-lg lg:text-[1.05rem] leading-relaxed text-[#151515] font-sans">
                You're not alone. It's time you take control of your special day and make decisions that align with your vision.
              </p>
            </div>
          </LuxFadeIn>
        </div>
      </div>
    </section>
  );
}
