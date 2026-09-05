import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";
import { ChecklistCard } from "../ui/ChecklistCard";

export default function ClaritySessionSection() {
  return (
    <section className="relative bg-[#EFE8DA] text-[#151515] py-20 md:py-24 lg:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <LuxFadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-serif font-medium text-center mb-10 lg:mb-8 text-[#151515]">
            What to expect in your Clarity Session
          </h2>
        </LuxFadeIn>

        <div className="space-y-4 lg:space-y-5 mb-10 lg:mb-8">
          <ChecklistCard
            title="Get Clear On Your Vision"
            description="Know what truly matters so decisions become easy."
            delay={0.15}
          />
          <ChecklistCard
            title="Avoid Expensive Mistakes"
            description="Learn where couples overspend and how to protect your budget."
            delay={0.2}
          />
          <ChecklistCard
            title="Choose The Right Vendors"
            description="Identify trustworthy vendors and avoid the stressful ones."
            delay={0.25}
          />
          <ChecklistCard
            title="Handle Family Pressure Calmly"
            description="Set clear boundaries without guilt or conflict."
            delay={0.3}
          />
          <ChecklistCard
            title="Leave With A Clear Plan"
            description="Walk away knowing exactly what to do next."
            delay={0.35}
          />
        </div>

        <LuxFadeIn delay={0.4}>
          <div className="bg-[#F8F5EF] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#C99524]/25 p-6 md:p-8 lg:p-8 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div className="text-[#151515] leading-relaxed text-lg space-y-3">
              <p>
                Get expert guidance, a clear plan, and stress-free decision-making all in one 60-minute session for just <span className="text-[#C99524] font-semibold">₦60,000</span>.
              </p>
              <p>
                If you work with us afterward, we deduct this from your package
              </p>
            </div>
          </div>
        </LuxFadeIn>

        <LuxFadeIn delay={0.45}>
          <div className="text-center mt-10 lg:mt-8">
            <p className="text-[#151515] text-lg md:text-xl mb-6 lg:mb-5 max-w-3xl mx-auto">
              Want guests talking about the little details that made your day special?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
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
