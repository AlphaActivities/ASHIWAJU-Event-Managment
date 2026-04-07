import { useState, useEffect } from "react";
import { scrollToSection } from "../../utils/scrollToSection";
import WaveText from "../ui/WaveText";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="bg-[#f7f3ea] py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* HEADLINE */}
        <div className="text-center mb-12">
          <WaveText
            text="You need someone who understands your taste and brings it to life."
            as="h2"
            className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif font-medium tracking-tight text-[#111111]"
            delayStep={30}
          />
        </div>

        <div className="mt-10 grid gap-10 lg:gap-12 lg:grid-cols-2 items-stretch">
          {/* LEFT - Profile Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-neutral-200 w-full h-full min-h-[520px]">
            <img
              src="/images/About-photo.webp"
              alt="Ashiwaju Event Planning Team"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT - Body Copy */}
          <div className="h-full flex flex-col justify-center text-[0.98rem] sm:text-base leading-relaxed text-[#3b3b3b]/90">
            <div className="space-y-6">
              {/* Always visible paragraphs */}
              <p>
                With over 10 years helping 50+ couples plan an unforgettable celebration that reflects their vision and stays on budget, we've learned our clients want a beautiful day, but don't know how to bring it all together without stress or overspending.
              </p>

              <p>
                That's why in the Wedding Clarity Session, we take the time to understand you, your vision, and what truly matters to you. Then we show you how it all comes together and guide you on how to achieve your dream wedding with no hidden fees, no surprises.
              </p>

              {/* Toggle link - works on both desktop and mobile */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-[#8B6F47] hover:text-[#7A5F3C] transition-colors"
              >
                {isExpanded ? 'See less' : 'See more...'}
              </button>

              {/* Expandable final paragraph */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-6 pt-0">
                  <p>
                    We're with you every step of the way to make sure you have the wedding you deserve, without regrets. You deserve a day worth remembering for years.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button - always visible and stable */}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[#f5e3b6] via-[#e7c78a] to-[#c89c4f] px-6 sm:px-8 py-3 text-[0.9rem] font-semibold tracking-[0.18em] uppercase text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:brightness-105 hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] hover:scale-[1.01] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e3b6]/80"
            >
              BOOK YOUR WEDDING CLARITY SESSION
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
