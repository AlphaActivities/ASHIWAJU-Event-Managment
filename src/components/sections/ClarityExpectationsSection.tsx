import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

const steps = [
  {
    number: "01",
    title: "We Listen to What You Want",
    description:
      "Tell us about your vision, what matters most to you, and what you want your wedding to feel like.",
  },
  {
    number: "02",
    title: "We Work Through Your Challenges",
    description:
      "We'll discuss your ideas, concerns, family expectations, and anything you're currently unsure about.",
  },
  {
    number: "03",
    title: "Leave With Clear Direction",
    description:
      "You’ll have a clearer idea of what matters most, where to focus your budget, what decisions need to be made, and the next steps for bringing your wedding vision together.",
  },
];

export default function ClarityExpectationsSection() {
  return (
    <section className="bg-[#EFE8DA] py-20 md:py-24 lg:py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-10 lg:mb-8">
            <div className="mx-auto h-[1px] w-14 bg-[#C99524]/40 mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-serif font-medium tracking-tight text-[#151515]">
              What to Expect During Your Clarity Session
            </h2>
          </div>
        </LuxFadeIn>

        <div className="space-y-5 lg:space-y-6">
          {steps.map((step, index) => (
            <LuxFadeIn key={step.number} delay={0.1 + index * 0.08}>
              <div className="rounded-2xl bg-[#F8F5EF] border border-[#C99524]/15 px-8 py-7 md:px-10 md:py-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-5">
                  <span className="text-xl lg:text-2xl font-serif font-semibold text-[#C99524] flex-shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-base lg:text-lg font-serif font-semibold tracking-tight text-[#151515] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[15px] lg:text-base leading-[1.6] text-[#151515]/75">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </LuxFadeIn>
          ))}
        </div>

        <LuxFadeIn delay={0.35}>
          <div className="mt-10 lg:mt-8 text-center">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 lg:mt-10 inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-base md:text-lg font-bold text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              Book Your Free Clarity Session
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
