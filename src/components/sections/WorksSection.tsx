import { useState } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";

const WORK_IMAGES = [
  "/images/work/work-12.jpg",
  "/images/work/work-02.jpg",
  "/images/work/work-13.jpg",
  "/images/work/work-04.jpg",
  "/images/work/work-05.jpg",
  "/images/work/work-06.jpg",
  "/images/work/work-18.jpg",
  "/images/work/work-03.jpg",
  "/images/work/work-16.jpg",
  "/images/work/work-10.jpg",
  "/images/work/work-17.jpg",
  "/images/work/work-15.jpg"
];

export default function WorksSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section
      id="works"
      className="lux-section bg-transparent text-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-neutral-200 mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              A look at what <span className="text-[#F5E6C8]">we've created</span>
            </h2>
          </div>
        </LuxFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WORK_IMAGES.map((img, index) => (
            <LuxFadeIn key={index} delay={0.1 + index * 0.05}>
              <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm hover:shadow-[0_18px_45px_rgba(0,0,0,0.20)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group">
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
