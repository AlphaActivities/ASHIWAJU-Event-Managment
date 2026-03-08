import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";
import { Check } from "lucide-react";

export default function ClaritySessionSection() {
  return (
    <section className="relative bg-[#FAF8F4] text-neutral-900 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <LuxFadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            What to expect in your Clarity Session
          </h2>
        </LuxFadeIn>

        <div className="space-y-6 mb-16">
          <LuxFadeIn delay={0.15}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Get Clear On Your Vision
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Define what truly matters for your wedding so every decision becomes easier.
                </p>
              </div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.2}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Avoid Expensive Mistakes
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Learn where couples usually overspend and how to protect your budget.
                </p>
              </div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.25}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Choose The Right Vendors
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Identify trustworthy vendors and avoid the ones that cause stress on your wedding day.
                </p>
              </div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.3}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Handle Family Pressure Calmly
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Set clear boundaries so opinions don't take over your wedding.
                </p>
              </div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.35}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Leave With A Clear Plan
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  By the end of the session, you'll know exactly what to do next.
                </p>
              </div>
            </div>
          </LuxFadeIn>
        </div>

        <LuxFadeIn delay={0.4}>
          <div className="mt-16 rounded-2xl bg-neutral-50 p-10 text-center border border-neutral-200">
            <p className="text-neutral-700 leading-relaxed mb-4">
              You can find wedding advice anywhere.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Applying it correctly to your wedding is where most couples struggle.
            </p>
            <p className="text-neutral-900 font-semibold mb-6">
              That's what this session solves.
            </p>

            <p className="text-2xl font-semibold text-black my-6">
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
          <div className="text-center mt-12">
            <p className="text-white text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              Want guests talking about the little details that made your wedding special?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6C8] via-[#F2D9A3] to-[#E9C88A] px-8 py-4 text-base md:text-lg font-semibold text-black shadow-lg hover:brightness-110 hover:scale-105 active:translate-y-px transition-all duration-300"
            >
              Book your Planning Clarity Session
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
