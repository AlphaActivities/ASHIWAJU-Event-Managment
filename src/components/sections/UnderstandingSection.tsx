import React from "react";
import WaveText from "../ui/WaveText";
import { LuxFadeIn } from "../ui/LuxFadeIn";

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-28 bg-[#f7f4ee]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 md:mb-14">
          <WaveText
            text="You've got impeccable taste and grand ideas."
            as="h2"
            className="text-4xl md:text-6xl font-serif text-[#2c2821] leading-tight"
            delayStep={30}
          />
        </div>

        <LuxFadeIn delay={0.2}>
          <div className="w-full rounded-3xl border border-[#c9a961] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div className="space-y-4 text-[15px] md:text-lg leading-relaxed text-[#2c2821]">
              <p>You already know what you like.</p>
              <p>You have ideas you've imagined and pictures you saved.</p>
              <p>What makes planning hard isn't vision.</p>
              <p>It's the pressure, the opinions, and the fear of getting it wrong.</p>
            </div>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
