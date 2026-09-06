import WaveText from "../ui/WaveText";
import { LuxFadeIn } from "../ui/LuxFadeIn";

const statements = [
  { text: "Is your family constantly weighing in with their opinions and ideas?", bold: false },
  { text: "Are you struggling to get clear, transparent prices from vendors?", bold: true },
  { text: "Do you feel like no one is really listening to you or understanding what you want?", bold: true },
  { text: "Does every single decision you make get questioned?", bold: true },
  { text: "Do you have the vision, but just don\u2019t know how to bring it all together within your budget?", bold: true },
];

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-24 lg:py-20 bg-[#EFE8DA]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* HEADLINE — full width at top */}
        <div className="mb-8 lg:mb-6">
          <WaveText
            text="It's your wedding; you're the one getting married"
            as="h2"
            className="text-4xl md:text-6xl lg:text-[2.75rem] font-serif text-[#151515] leading-tight"
            delayStep={30}
          />
        </div>

        {/* 2-COLUMN LAYOUT — desktop: list+paragraph left, image right; mobile: image then list then paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* IMAGE — order-first on mobile, right column on desktop */}
          <LuxFadeIn delay={0.1}>
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full min-h-[360px] md:min-h-[420px] lg:min-h-[400px] lg:max-h-[460px]">
              <img
                src="/images/hero/hero-05.webp"
                alt="Elegant wedding celebration"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </LuxFadeIn>

          {/* INTRO LINE + LIST + PARAGRAPH — order-second on mobile, left column on desktop */}
          <LuxFadeIn delay={0.2}>
            <div className="order-2 lg:order-1 w-full">
              <p className="text-lg md:text-xl lg:text-[1.15rem] font-serif text-[#151515] leading-snug mb-4 lg:mb-4">
                Planning your wedding shouldn't feel like a full-time job.
              </p>

              <p className="text-[15px] md:text-lg lg:text-[1.05rem] font-serif text-[#151515] leading-snug mb-5 lg:mb-5">
                Do these sound familiar?
              </p>

              <ul className="space-y-4 md:space-y-5 lg:space-y-4 list-disc pl-6">
                {statements.map((item, index) => (
                  <li
                    key={index}
                    className={`text-[15px] md:text-lg leading-relaxed text-[#151515] font-sans text-left ${item.bold ? "font-bold" : ""}`}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>

              <p className="mt-6 lg:mt-7 text-[15px] md:text-lg lg:text-[1.05rem] leading-relaxed text-[#151515] font-sans">
                You're not alone. It's time you take control of your special day and make decisions that align with your vision.
              </p>
            </div>
          </LuxFadeIn>
        </div>
      </div>
    </section>
  );
}
