import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";
import { Check } from "lucide-react";

const card3Checklist = [
  "A clear picture of your wedding vision in 3D",
  "Top priorities mapped out to avoid confusion",
  "Allocation of your budget to avoid unnecessary spending",
  "Guidance on trusted vendors and key decisions",
  "A roadmap for the next steps",
  "Clarity on how to bring your vision to reality without chaos",
];

export default function OfferSection() {
  return (
    <section className="bg-[#F8F5EF] py-20 md:py-24 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* HEADLINE */}
        <LuxFadeIn delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-6">
            <div className="mx-auto h-[1px] w-14 bg-[#C99524]/40 mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-serif font-medium tracking-tight text-[#151515]">
              You’ll never have to feel like you're planning a wedding 
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-base text-[#151515]/70 leading-relaxed">
              With 10+ years of experience, we’ve learned that couples just want everything to go as they imagined without sacrificing what matters to them; that's why we created the clarity session
            </p>
          </div>
        </LuxFadeIn>

        {/* THREE OFFER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-8 lg:mt-6">
          {/* CARD 1 */}
          <LuxFadeIn delay={0.1}>
            <div className="h-full flex flex-col rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 p-6 md:p-8 lg:p-8">
              <h3 className="text-lg md:text-xl font-serif font-semibold tracking-tight text-[#151515] mb-3">
                For Bride who..
              </h3>
              <p className="text-[15px] md:text-base leading-[1.6] text-[#151515]/75">
                Know what they want, and want to know what it takes to bring their vision to reality without losing sight of their relationship, values, or sanity.
              </p>
            </div>
          </LuxFadeIn>

          {/* CARD 2 */}
          <LuxFadeIn delay={0.15}>
            <div className="h-full flex flex-col rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 p-6 md:p-8 lg:p-8">
              <h3 className="text-lg md:text-xl font-serif font-semibold tracking-tight text-[#151515] mb-3">
                During your Clarity session...
              </h3>
              <p className="text-[15px] md:text-base leading-[1.6] text-[#151515]/75">
                we'll sit down one-on-one to understand your vision, budget, priorities, and challenges. We'll work through what's confusing you, help you make the important decisions, and map out what needs to happen next to achieve your dream wedding
              </p>
            </div>
          </LuxFadeIn>

          {/* CARD 3 */}
          <LuxFadeIn delay={0.2}>
            <div className="h-full flex flex-col rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 p-6 md:p-8 lg:p-8">
              <h3 className="text-lg md:text-xl font-serif font-semibold tracking-tight text-[#151515] mb-3">
                You walk away with…
              </h3>
              <ul className="space-y-2.5">
                {card3Checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C99524]/15 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#C99524]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[14px] md:text-[15px] leading-[1.5] text-[#151515]/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </LuxFadeIn>
        </div>

        {/* WIDE HIGHLIGHTED CARD */}
        <LuxFadeIn delay={0.3}>
          <div className="mt-6 lg:mt-5 w-full bg-[#EFE8DA] rounded-2xl border border-[#C99524]/25 p-8 md:p-10 lg:p-10 text-center">
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
          <div className="text-center mt-8 lg:mt-6">
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
