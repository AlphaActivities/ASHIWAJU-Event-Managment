import React from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

export default function FearSection() {
  return (
    <section
      id="fear"
      className="bg-[#f7f3ea] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#f3d7a0] to-transparent mb-6"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#111111]">
            Mistakes most couples make and regret later
          </h2>
        </div>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center">

          {/* LEFT — IMAGE */}
          <LuxFadeIn delay={0.1}>
            <div className="relative">
              <img
                src="/images/fear.png"
                alt="Bride feeling overwhelmed before wedding"
                className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              />
            </div>
          </LuxFadeIn>

          {/* RIGHT — FEAR COPY */}
          <LuxFadeIn delay={0.2}>
            <div className="flex flex-col justify-center gap-6 lg:gap-7">

              {/* GOLD ACCENT RULE */}
              <div className="h-[1px] w-14 bg-gradient-to-r from-[#f3d7a0] via-[#f9e9c6] to-transparent mb-2"></div>

              {/* COPY */}
              <div className="text-left text-[0.98rem] sm:text-base leading-relaxed text-[#3b3b3b]/90 space-y-5 max-w-prose">
                <p>Many couples think they can handle everything themselves.</p>
                <p>After all, there are checklists and YouTube videos everywhere.</p>
                <p>
                  What they don't realize is that things can look fine on the surface and still fall apart behind the scenes.
                </p>

                <div className="pt-2 space-y-2">
                  <p>Small details get missed.</p>
                  <p>Problems show up last minute.</p>
                  <p>Suddenly, you're running around, calling vendors, fixing issues, and missing moments you'll never get back.</p>
                </div>

                <div className="pt-2 space-y-2">
                  <p>Your makeup is melting.</p>
                  <p>Your energy is gone.</p>
                  <p>The one day you should feel your most confident becomes exhausting.</p>
                  <p>It's a day you can't redo.</p>
                </div>

                <div className="pt-3 mt-2 border-l-2 border-[#f1d598]/70 pl-4">
                  <p className="text-[#111111] font-semibold">
                    The couples who stayed calm didn't get lucky. They got clear early.
                  </p>
                </div>
              </div>

              {/* CTA BUTTON */}
              <div className="mt-4 sm:mt-6">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center rounded-full bg-[#111111] px-7 sm:px-9 py-3 text-sm sm:text-[0.95rem] font-medium tracking-[0.16em] uppercase text-white shadow-[0_18px_45px_rgba(15,23,42,0.55)] hover:-translate-y-[2px] hover:scale-[1.01] hover:shadow-[0_24px_60px_rgba(15,23,42,0.7)] hover:border hover:border-[#f1d598]/80 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d598]"
                  >
                    BOOK YOUR WEDDING CLARITY SESSION
                  </button>
                </div>
              </div>

            </div>
          </LuxFadeIn>

        </div>
      </div>
    </section>
  );
}
