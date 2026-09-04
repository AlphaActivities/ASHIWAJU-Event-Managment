import React from "react";
import WaveText from "../ui/WaveText";
import { LuxFadeIn } from "../ui/LuxFadeIn";

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-28 bg-[#EFE8DA]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* HEADLINE — full width at top */}
        <div className="mb-10 md:mb-14">
          <WaveText
            text="You've got impeccable taste and grand ideas."
            as="h2"
            className="text-4xl md:text-6xl font-serif text-[#151515] leading-tight"
            delayStep={30}
          />
        </div>

        {/* 2-COLUMN LAYOUT — desktop: text left, image right; mobile: image then text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* IMAGE — order-first on mobile, right column on desktop */}
          <LuxFadeIn delay={0.1} >
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full min-h-[360px] md:min-h-[480px]">
              <img
                src="/images/hero/hero-05.webp"
                alt="Elegant wedding celebration"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </LuxFadeIn>

          {/* TEXT — order-second on mobile, left column on desktop */}
          <LuxFadeIn delay={0.2}>
            <div className="order-2 lg:order-1 w-full rounded-2xl border border-[#C99524]/30 bg-[#F8F5EF] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 md:p-12 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <div className="space-y-4 text-[15px] md:text-lg leading-relaxed text-[#151515]">
                <p>You already know what you like.</p>
                <p>You have ideas you've imagined and pictures you've saved.</p>
                <p>What makes planning hard isn't vision.</p>
                <p>It's the pressure, the opinions, and the fear of getting it wrong.</p>
              </div>
            </div>
          </LuxFadeIn>
        </div>
      </div>
    </section>
  );
}
