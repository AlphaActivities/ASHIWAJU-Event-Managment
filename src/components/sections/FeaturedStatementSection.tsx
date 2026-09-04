import { LuxFadeIn } from "../ui/LuxFadeIn";

export default function FeaturedStatementSection() {
  return (
    <section className="bg-[#EFE8DA] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn delay={0.1}>
          <div className="w-full bg-[#F8F5EF] rounded-2xl border border-[#C99524]/20 px-8 md:px-16 py-12 md:py-16 text-center">
            <p className="font-serif text-xl md:text-2xl lg:text-[1.75rem] leading-relaxed text-[#151515] max-w-3xl mx-auto">
              Imagine being relaxed, going to bed knowing everything is handled perfectly; on that day, you just wake up, get dressed, show up, and enjoy every moment of your day without worry.
            </p>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
