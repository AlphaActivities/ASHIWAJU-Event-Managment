import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

const offerCards = [
  {
    title: "Get Clear On Your Vision",
    description: "Know what truly matters so decisions become easy.",
  },
  {
    title: "Avoid Expensive Mistakes",
    description: "Learn where couples overspend and how to protect your budget.",
  },
  {
    title: "Choose The Right Vendors",
    description: "Identify trustworthy vendors and avoid the stressful ones.",
  },
];

export default function OfferSection() {
  return (
    <section className="bg-[#F8F5EF] py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* HEADLINE */}
        <LuxFadeIn delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="mx-auto h-[1px] w-14 bg-[#C99524]/40 mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium tracking-tight text-[#151515]">
              What to expect in your Clarity Session
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-base text-[#151515]/70 leading-relaxed">
              A focused 60-minute session designed to give you clarity, confidence, and a clear path forward.
            </p>
          </div>
        </LuxFadeIn>

        {/* THREE OFFER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {offerCards.map((card, index) => (
            <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
              <div className="h-full flex flex-col rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 p-8 md:p-10">
                <h3 className="text-lg md:text-xl font-serif font-semibold tracking-tight text-[#151515] mb-3">
                  {card.title}
                </h3>
                <p className="text-[15px] md:text-base leading-[1.6] text-[#151515]/75">
                  {card.description}
                </p>
              </div>
            </LuxFadeIn>
          ))}
        </div>

        {/* WIDE HIGHLIGHTED CARD */}
        <LuxFadeIn delay={0.3}>
          <div className="mt-8 w-full bg-[#EFE8DA] rounded-2xl border border-[#C99524]/25 p-10 md:p-14 text-center">
            <div className="text-[#151515] leading-relaxed text-lg space-y-3 max-w-2xl mx-auto">
              <p>
                Get expert guidance, a clear plan, and stress-free decision-making all in one 60-minute session for just{" "}
                <span className="text-[#C99524] font-semibold">₦60,000</span>.
              </p>
              <p>
                If you work with us afterward, we deduct this from your package
              </p>
            </div>
          </div>
        </LuxFadeIn>

        {/* CTA BUTTON */}
        <LuxFadeIn delay={0.4}>
          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-base md:text-lg font-bold text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              BOOK YOUR WEDDING CLARITY SESSION
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
