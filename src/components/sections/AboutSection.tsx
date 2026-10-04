import { scrollToSection } from "../../utils/scrollToSection";
import WaveText from "../ui/WaveText";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#F8F5EF] py-20 md:py-24 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* HEADLINE */}
        <div className="text-center mb-10 lg:mb-8">
          <WaveText
            text="YOUR WEDDING, OUR REPUTATION ON THE LINE"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-[2.4rem] font-serif font-medium tracking-tight text-[#151515]"
            delayStep={30}
          />
        </div>

        <div className="mt-8 lg:mt-6 grid gap-8 lg:gap-10 lg:grid-cols-2 items-stretch">
          {/* LEFT - Profile Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-[#EFE8DA] w-full h-full min-h-[360px] lg:min-h-[420px] lg:max-h-[480px]">
            <img
              src="/images/About-photo.webp"
              alt="Ashiwaju Event Planning Team"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT - Body Copy */}
          <div className="h-full flex flex-col justify-center text-[0.98rem] sm:text-base leading-relaxed text-[#151515]">
            <div className="space-y-4 lg:space-y-5">
              <p className="text-lg sm:text-xl font-serif font-medium text-[#151515]">
                We work tirelessly to give you the day you envisioned.
              </p>
              <p>
                Every wedding we take on puts our reputation on the line. We can't afford to compromise, even when doing what's right for you means sacrificing our profit.
              </p>
              <p className="font-bold text-[#151515]">
                Our reputation is what keeps us in business, not any single wedding.
              </p>
              <p>
                With clear communication, transparency, attention to detail, and a personal touch, we work closely with you from planning through execution to make sure you get the wedding you imagined.
              </p>
              <p>
                What matters to us is seeing you happy, confident, and fully present on your wedding day.
              </p>
              <p>
                But the best part?
              </p>
              <p className="text-lg sm:text-xl font-serif font-medium text-[#C99524]">
                When your guests ask, &ldquo;Who planned this wedding?&rdquo;
              </p>
              <p>
                That's the standard we hold ourselves to.
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-6 lg:mt-7 inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-[0.9rem] font-bold tracking-[0.18em] uppercase text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
            >
              Book Your Free Clarity Session
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
