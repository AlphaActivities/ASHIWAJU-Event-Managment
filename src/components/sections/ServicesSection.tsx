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
    image: "/images/service/services02.jpeg",
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
      className="bg-[#f7f3ea] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="mx-auto h-[1px] w-14 bg-gradient-to-r from-transparent via-[#f3d7a0] to-transparent mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium tracking-tight text-[#111111]">
              How we help you say "I do" with peace of mind
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-base text-[#3b3b3b]/90">
              We carry the weight, so nothing falls on you.
            </p>
          </div>
        </LuxFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((item, index) => {
            return (
              <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
                <div className="h-full flex flex-col rounded-[1.75rem] bg-[#fbfaf7] border border-[#e9ddc2] shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-4 sm:p-5 lg:p-6 hover:shadow-[0_24px_70px_rgba(15,23,42,0.15)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group">
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-[1.25rem]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-[260px] md:h-[300px] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-[1.2rem] font-semibold tracking-tight text-[#111111] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#3b3b3b]/90">
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