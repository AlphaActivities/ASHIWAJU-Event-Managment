import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

export default function FearSection() {
  return (
    <section
      id="fear"
      className="bg-[#F8F5EF] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn delay={0.05}>
          <div className="rounded-2xl bg-[#EFE8DA] border border-[#C99524]/15 px-8 py-12 md:px-16 md:py-20 lg:px-20 lg:py-24 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <p className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.5] text-[#151515] tracking-tight">
              This is the first decision you&rsquo;ll make that will determine
            </p>
            <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-[1.5] text-[#151515]/75 mt-6">
              If you will look back years after your wedding with tears of disappointment
            </p>
            <p className="font-serif text-lg sm:text-xl text-[#C99524] my-10">
              Or
            </p>
            <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-[1.5] text-[#151515]/75">
              If you will look back with joy and wish if can do it again
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="mt-12 inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-sm sm:text-[0.95rem] font-bold tracking-[0.16em] uppercase text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
            >
              Book your clarity session
            </button>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
