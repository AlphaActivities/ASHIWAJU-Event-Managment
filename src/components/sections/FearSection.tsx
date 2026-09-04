import React from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

export default function FearSection() {
  return (
    <section
      id="fear"
      className="bg-[#F8F5EF] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="h-[1px] w-16 mx-auto bg-[#C99524]/40 mb-6"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium tracking-tight text-[#151515]">
            Mistakes most brides make and regret later
          </h2>
        </div>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center">

          {/* LEFT — IMAGE */}
          <LuxFadeIn delay={0.1}>
            <div className="relative">
              <img
                src="/images/fear.webp"
                alt="Bride feeling overwhelmed before wedding"
                loading="lazy"
                decoding="async"
                className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
              />
            </div>
          </LuxFadeIn>

          {/* RIGHT — FEAR COPY */}
          <LuxFadeIn delay={0.2}>
            <div className="flex flex-col justify-center gap-6 lg:gap-7">

              {/* GOLD ACCENT RULE */}
              <div className="h-[1px] w-14 bg-[#C99524]/50 mb-2"></div>

              {/* COPY */}
              <div className="text-left text-[0.98rem] sm:text-base leading-relaxed text-[#151515] space-y-5 max-w-prose">
                <p>Many think they can handle it all themselves with checklists, YouTube videos, and advice everywhere.</p>

                <p>
                  What they don't see is how small details get missed, problems show up at the last minute, and suddenly they're running around, calling vendors,fixing issues, missing moments they'll never get back.
                </p>

                <p>Their makeup fades. Energy is gone. The day they should feel most confident becomes exhausting.</p>

                <div className="pt-3 mt-2 border-l-2 border-[#C99524]/50 pl-4">
                  <p className="text-[#151515] font-serif font-semibold text-lg">
                    The brides who stayed calm on their day didn't get lucky. They got clear early and made the right decisions
                  </p>
                </div>
              </div>

              {/* CTA BUTTON */}
              <div className="mt-4 sm:mt-6">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center rounded-full bg-[#C99524] px-7 sm:px-9 py-3 text-sm sm:text-[0.95rem] font-semibold tracking-[0.16em] uppercase text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
                  >
                    BOOK YOUR WEDDING CLARITY SESSION
                  </button>
                </div>
                <p className="mt-4 text-sm text-[#151515]/60 leading-relaxed max-w-md">
                  see how easy planning your dream wedding can be
                </p>
              </div>

            </div>
          </LuxFadeIn>

        </div>
      </div>
    </section>
  );
}
