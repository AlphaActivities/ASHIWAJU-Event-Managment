import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";
import { ChecklistCard } from "../ui/ChecklistCard";

export default function ClaritySessionSection() {
  return (
    <section className="relative bg-[#f7f3ea] text-neutral-900 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <LuxFadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            What to expect in your Clarity Session
          </h2>
        </LuxFadeIn>

        <div className="space-y-6 mb-20">
          <ChecklistCard
            title="Get Clear On Your Vision"
            description="Define what truly matters for your wedding so every decision becomes easier."
            delay={0.15}
          />
          <ChecklistCard
            title="Avoid Expensive Mistakes"
            description="Learn where couples usually overspend and how to protect your budget."
            delay={0.2}
          />
          <ChecklistCard
            title="Choose The Right Vendors"
            description="Identify trustworthy vendors and avoid the ones that cause stress on your wedding day."
            delay={0.25}
          />
          <ChecklistCard
            title="Handle Family Pressure Calmly"
            description="Set clear boundaries so opinions don't take over your wedding."
            delay={0.3}
          />
          <ChecklistCard
            title="Leave With A Clear Plan"
            description="By the end of the session, you'll know exactly what to do next."
            delay={0.35}
          />
        </div>

        <LuxFadeIn delay={0.4}>
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-10 text-center hover:shadow-[0_24px_70px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <p className="text-neutral-700 leading-relaxed mb-4">
              You can find wedding advice anywhere.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Applying it correctly to your wedding is where most couples struggle.
            </p>
            <p className="text-neutral-900 font-semibold mb-8">
              That's what this session solves.
            </p>

            <p className="text-2xl font-semibold text-black my-8">
              All of this for just ₦60,000.
            </p>

            <p className="text-neutral-600 mb-2">
              If you work with us, the ₦60,000 is deducted.
            </p>
            <p className="text-neutral-600">
              If not, you still leave with a clear plan for your wedding.
            </p>
          </div>
        </LuxFadeIn>

        <LuxFadeIn delay={0.45}>
          <div className="text-center mt-16">
            <p className="text-neutral-800 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Want guests talking about the little details that made your wedding special?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6C8] via-[#F2D9A3] to-[#E9C88A] px-8 py-4 text-base md:text-lg font-semibold text-black shadow-lg hover:brightness-110 hover:shadow-[0_16px_45px_rgba(0,0,0,0.25)] hover:-translate-y-[2px] hover:scale-[1.01] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              BOOK YOUR WEDDING CLARITY SESSION
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
