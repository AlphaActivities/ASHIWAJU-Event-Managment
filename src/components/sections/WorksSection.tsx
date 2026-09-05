import { useState } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";

const WORK_IMAGES = [
  "/images/work/work-01.jpg",
  "/images/work/work-02.jpg",
  "/images/work/work-13.jpg",
  "/images/work/work-04.jpg",
  "/images/work/work-05.jpg",
  "/images/work/work-11.jpg",
  "/images/work/work-18.jpg",
  "/images/work/work-10.jpeg",
  "/images/work/work-16.jpg",
  "/images/work/work-07.webp",
  "/images/work/work-17.jpg",
  "/images/work/work-15.jpg"
];

export default function WorksSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section
      id="works"
      className="lux-section bg-[#EFE8DA] text-[#151515] py-20 md:py-24 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-10 lg:mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-serif font-medium leading-tight text-[#151515]">
              Curating unforgettable experiences since 2016
            </h2>
          </div>
        </LuxFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-6">
          {WORK_IMAGES.map((img, index) => (
            <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
              <div className="rounded-2xl overflow-hidden border border-[#C99524]/15 bg-[#F8F5EF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt="Wedding past work"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                  />
                </div>
              </div>
            </LuxFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
