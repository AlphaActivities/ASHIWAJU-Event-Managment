import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

const processCards = [
  {
    number: "01",
    title: "Finding Your Perfect Venue",
    description:
      "We help you find a venue that fits your vision, guest list, and budget, then arrange the visits so you can confidently choose the right setting for your day.",
  },
  {
    number: "02",
    title: "Bringing Your Vision to Life",
    description:
      "From colours and décor to the smallest details, your vision guides the design, supplier selection, and coordination, bringing everything together beautifully just as you imagined.",
  },
  {
    number: "03",
    title: "Making Your Budget Work for You",
    description:
      "We create a detailed budget around your priorities, with recommended allocations for each supplier. We review and adjust quotes to help you stay within budget without compromising what matters most.",
  },
  {
    number: "04",
    title: "Creating an Unforgettable Experience",
    description:
      "From menu, cake, and drink tastings to music and entertainment with personal touches, we select and coordinate each element around the atmosphere you want, creating moments your guests will remember.",
  },
  {
    number: "05",
    title: "Making Your Day Feel Effortless",
    description:
      "We create and manage a detailed timeline so vendors, bridal party, and MC know exactly what to do, allowing you to stay fully present and enjoy your special day without worry.",
  },
];

export default function OfferSection() {
  return (
    <section className="bg-[#F8F5EF] py-20 md:py-24 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* HEADLINE — preserved exactly */}
        <LuxFadeIn delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-6">
            <div className="mx-auto h-[1px] w-14 bg-[#C99524]/40 mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-serif font-medium tracking-tight text-[#151515]">
              You'll never feel like you're planning a wedding
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-base text-[#151515]/70 leading-relaxed">
              For 10 years, we've refined our approach to wedding planning, handling everything from planning to execution with you in mind, so you can stay relaxed and enjoy every moment of your special day.
            </p>
          </div>
        </LuxFadeIn>
      </div>

      {/* STACKING PROCESS CARDS — desktop */}
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          {processCards.map((card, index) => (
            <div
              key={card.number}
              className="sticky"
              style={{ top: `${80 + index * 24}px`, marginTop: index === 0 ? "0" : "-1px" }}
            >
              <div className="rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 px-8 py-8 lg:px-10 lg:py-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-6">
                  <span className="text-2xl lg:text-3xl font-serif font-semibold text-[#C99524] flex-shrink-0">
                    {card.number}
                  </span>
                  <div>
                    <h3 className="text-lg lg:text-xl font-serif font-semibold tracking-tight text-[#151515] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[15px] lg:text-base leading-[1.6] text-[#151515]/75">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS CARDS — mobile/tablet (simple stacked, no sticky) */}
      <div className="md:hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          {processCards.map((card) => (
            <div
              key={card.number}
              className="rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 px-6 py-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start gap-4">
                <span className="text-xl font-serif font-semibold text-[#C99524] flex-shrink-0">
                  {card.number}
                </span>
                <div>
                  <h3 className="text-base font-serif font-semibold tracking-tight text-[#151515] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[#151515]/75">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn delay={0.4}>
          <div className="text-center mt-8 lg:mt-6">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-base md:text-lg font-bold text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              Book Your Free Clarity Session
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
