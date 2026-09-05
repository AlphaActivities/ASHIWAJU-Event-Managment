import { LuxFadeIn } from "../ui/LuxFadeIn";

const services = [
  {
    title: "Wedding Planning and Strategy",
    description:
      "We help you clarify your wedding vision from the start, so every decision, from decor to vendors, stays aligned and stress-free.",
    image: "/images/service/service01.jpeg",
  },
  {
    title: "Venue Guidance and Budget Control",
    description:
      "Using our local advantage, we guide you to choose a venue that fits your style, guest size, and budget, while helping you avoid unnecessary costs and last-minute surprises.",
    image: "/images/service/service-02.webp",
  },
  {
    title: "Wedding Decor, Styling, and Production",
    description:
      "We design and execute your decor, stage, and lighting ourselves. Every design is intentional, personal, and never repeated",
    image: "/images/service/service03.jpeg",
  },
  {
    title: "Family and Decision Support",
    description:
      "We help you manage family opinions and expectations, so you can make decisions calmly without guilt, pressure, or unnecessary conflict.",
    image: "/images/service/service04.jpeg",
  },
  {
    title: "Wedding Day Coordination",
    description:
      "We manage timelines, decor setup, vendors, and on-the-day logistics, so you're not fixing problems or running around; you're fully present and enjoying your wedding.",
    image: "/images/service/service05.jpeg",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#EFE8DA] py-20 md:py-24 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-8">
            <div className="mx-auto h-[1px] w-14 bg-[#C99524]/40 mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-serif font-medium tracking-tight text-[#151515]">
              How we help you say "I do" with peace of mind
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-base text-[#151515]/70">
              We carry the weight, so nothing falls on you.
            </p>
          </div>
        </LuxFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {services.map((item, index) => {
            return (
              <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
                <div className="h-full flex flex-col rounded-2xl bg-[#F8F5EF] border border-[#C99524]/15 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-4 sm:p-5 lg:p-6 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group">
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-[240px] md:h-[260px] lg:h-[240px] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-[1.2rem] font-serif font-semibold tracking-tight text-[#151515] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#151515]/75">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </LuxFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
