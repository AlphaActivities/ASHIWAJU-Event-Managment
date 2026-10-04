import WaveText from "../ui/WaveText";
import { LuxFadeIn } from "../ui/LuxFadeIn";

const statements = [
  "Is your family constantly weighing in with their opinions and ideas?",
  "Are you struggling to get clear, transparent prices from vendors?",
  "Do you feel like no one is really listening to you or understanding what you want?",
  "Does every single decision you make get questioned?",
  "Do you have the vision, but just don\u2019t know how to bring it all together within your budget?",
];

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-24 lg:py-20 bg-[#EFE8DA]"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        {/* 1. HEADLINE */}
        <div className="mb-8 lg:mb-10">
          <WaveText
            text="Planning your wedding shouldn't feel like a full-time job."
            as="h2"
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif text-[#151515] leading-tight"
            delayStep={30}
          />
        </div>

        {/* 2. EXISTING PICTURE */}
        <LuxFadeIn delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full min-h-[360px] md:min-h-[420px] lg:min-h-[400px] lg:max-h-[460px] mb-8 lg:mb-10">
            <img
              src="/images/hero/hero-05.webp"
              alt="Elegant wedding celebration"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </LuxFadeIn>

        {/* 3. SUBHEADLINE + 4. PROBLEM POINTS + 5. CLOSING STATEMENT */}
        <LuxFadeIn delay={0.2}>
          <div className="w-full">
            <p className="text-lg md:text-xl lg:text-[1.15rem] font-serif text-[#151515] leading-snug mb-5 lg:mb-6">
              Do any of these sound familiar?
            </p>

            <ul className="space-y-4 md:space-y-5 lg:space-y-4 list-disc pl-6">
              {statements.map((statement, index) => (
                <li
                  key={index}
                  className="text-[15px] md:text-lg leading-relaxed text-[#151515] font-sans text-left"
                >
                  {statement}
                </li>
              ))}
            </ul>

            <p className="mt-6 lg:mt-7 text-[15px] md:text-lg lg:text-[1.05rem] leading-relaxed text-[#151515] font-sans">
              It's your wedding; you're the one getting married. It's time to take control and make decisions that align with your vision.
            </p>
          </div>
        </LuxFadeIn>
      </div>
    </section>
  );
}
