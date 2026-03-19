import { LuxFadeIn } from "../ui/LuxFadeIn";
import { Sparkles, MapPin, Palette, Users, ClipboardCheck } from "lucide-react";

const services = [
  {
    title: "Wedding Planning and Strategy",
    description:
      "We help you clarify your wedding vision from the start, so every decision, from decor to vendors, stays aligned and stress-free.",
    icon: Sparkles,
  },
  {
    title: "Venue Guidance and Budget Control",
    description:
      "Using our local advantage, we guide you to choose a venue that fits your style, guest size, and budget, while helping you avoid unnecessary costs and last-minute surprises.",
    icon: MapPin,
  },
  {
    title: "Wedding Decor, Styling, and Production",
    description:
      "We design and execute your decor, stage, and lighting ourselves. Every design is intentional, personal, and never repeated",
    icon: Palette,
  },
  {
    title: "Family and Decision Support",
    description:
      "We help you manage family opinions and expectations, so you can make decisions calmly without guilt, pressure, or unnecessary conflict.",
    icon: Users,
  },
  {
    title: "Wedding Day Coordination",
    description:
      "We manage timelines, decor setup, vendors, and on-the-day logistics, so you're not fixing problems or running around; you're fully present and enjoying your wedding.",
    icon: ClipboardCheck,
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
            const Icon = item.icon;
            return (
              <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
                <div className="h-full flex flex-col rounded-[1.75rem] bg-[#fbfaf7] border border-[#e9ddc2] shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-5 sm:p-6 lg:p-7">
                  <div className="flex items-start gap-3">

                    <div className="shrink-0 rounded-2xl bg-[#111111] text-[#f1d598] p-3">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#111111]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] md:text-[16px] leading-[1.6] text-[#3b3b3b]/90">
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
