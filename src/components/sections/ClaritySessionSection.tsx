import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

export default function ClaritySessionSection() {
  return (
    <section className="relative bg-transparent text-white py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="space-y-12 md:space-y-16">
          <LuxFadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center">
              What to expect in your Clarity Session
            </h2>
          </LuxFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <LuxFadeIn delay={0.15}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl bg-[#8B6F47]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/70 via-[#7A5F3C]/70 to-[#6B5335]/70 border border-[#c29f63]/30 backdrop-blur-sm p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#F5E6C8]">
                    Get Clear On Your Vision
                  </h3>
                  <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
                    Define what truly matters for your wedding so every decision becomes easier.
                  </p>
                </div>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl bg-[#8B6F47]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/70 via-[#7A5F3C]/70 to-[#6B5335]/70 border border-[#c29f63]/30 backdrop-blur-sm p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#F5E6C8]">
                    Avoid Expensive Mistakes
                  </h3>
                  <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
                    Learn where couples usually overspend and how to protect your budget.
                  </p>
                </div>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.25}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl bg-[#8B6F47]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/70 via-[#7A5F3C]/70 to-[#6B5335]/70 border border-[#c29f63]/30 backdrop-blur-sm p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#F5E6C8]">
                    Choose The Right Vendors
                  </h3>
                  <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
                    Identify trustworthy vendors and avoid the ones that cause stress on your wedding day.
                  </p>
                </div>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.3}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl bg-[#8B6F47]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/70 via-[#7A5F3C]/70 to-[#6B5335]/70 border border-[#c29f63]/30 backdrop-blur-sm p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#F5E6C8]">
                    Handle Family Pressure Calmly
                  </h3>
                  <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
                    Set clear boundaries so opinions don't take over your wedding.
                  </p>
                </div>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.35}>
              <div className="relative group md:col-span-2">
                <div className="absolute inset-0 rounded-xl bg-[#8B6F47]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/70 via-[#7A5F3C]/70 to-[#6B5335]/70 border border-[#c29f63]/30 backdrop-blur-sm p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300 md:max-w-md md:mx-auto">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#F5E6C8]">
                    Leave With A Clear Plan
                  </h3>
                  <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
                    By the end of the session, you'll know exactly what to do next.
                  </p>
                </div>
              </div>
            </LuxFadeIn>
          </div>

          <LuxFadeIn delay={0.4}>
            <div className="relative max-w-3xl mx-auto mt-12 md:mt-16">
              <div className="absolute inset-0 rounded-2xl bg-[#8B6F47]/30 blur-2xl pointer-events-none" />
              <div className="relative rounded-xl bg-gradient-to-br from-[#8B6F47]/85 via-[#7A5F3C]/85 to-[#6B5335]/85 border border-[#c29f63]/40 backdrop-blur-sm shadow-lg px-8 py-10 md:px-12 md:py-12 text-center space-y-6">
                <p className="text-base md:text-lg text-neutral-100/95 leading-relaxed">
                  You can find wedding advice anywhere.
                </p>
                <p className="text-base md:text-lg text-neutral-100/95 leading-relaxed">
                  Applying it correctly to your wedding is where most couples struggle.
                </p>
                <p className="text-lg md:text-xl font-semibold text-[#F5E6C8]">
                  That's what this session solves.
                </p>

                <div className="pt-4 space-y-3">
                  <p className="text-3xl md:text-4xl font-bold text-[#F5E6C8]">
                    All of this for just ₦60,000.
                  </p>
                  <p className="text-sm md:text-base text-neutral-200/90">
                    If you work with us, the ₦60,000 is deducted.
                  </p>
                  <p className="text-sm md:text-base text-neutral-200/90">
                    If not, you still leave with a clear plan for your wedding.
                  </p>
                </div>
              </div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.45}>
            <div className="text-center space-y-6 mt-12">
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-100/95 max-w-3xl mx-auto leading-relaxed">
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
      </div>
    </section>
  );
}
