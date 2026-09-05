import { scrollToSection } from "../../utils/scrollToSection";
import { Check } from "lucide-react";
import WaveText from "../ui/WaveText";

const checklistItems = [
  "100% Client satisfaction",
  "Attention to details",
  "Commitment to your Goals",
  "On-the-day support",
  "Personal touch",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#F8F5EF] py-20 md:py-24 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* HEADLINE */}
        <div className="text-center mb-10 lg:mb-8">
          <WaveText
            text="We are not just good planners; we are better humans"
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
              <p>
                We work tirelessly to give you the day you envisioned
              </p>
              <p>
                Every wedding we take on is our reputation on the line; we can't afford to compromise, even when doing what's right for you doesn't make us a profit.
              </p>
              <p>
                What matters to us is seeing our clients happy, confident, and fully present on their wedding day.
              </p>
              <p>
                When we receive their thank-you messages after a peaceful, unforgettable celebration, it reminds us why we do what we do.
              </p>
              <p>
                But the best part?
              </p>
              <p className="text-lg sm:text-xl font-serif font-medium text-[#C99524]">
                When your guests ask, &ldquo;Who planned this wedding?&rdquo;
              </p>
              <p>
                That's the standard you should expect from us.
              </p>

              {/* CHECKLIST */}
              <ul className="space-y-3 pt-3">
                {checklistItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C99524]/15 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#C99524]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[0.95rem] sm:text-base text-[#151515]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-6 lg:mt-7 inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-[0.9rem] font-bold tracking-[0.18em] uppercase text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
            >
              BOOK YOUR WEDDING CLARITY SESSION
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
