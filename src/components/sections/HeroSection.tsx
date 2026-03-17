import { useState, useEffect } from 'react';
import { LuxFadeIn } from '../ui/LuxFadeIn';
import { scrollToSection } from '../../utils/scrollToSection';

const HERO_IMAGES = [
  "/images/hero/hero-01.jpg",
  "/images/hero/hero-02.jpg",
  "/images/hero/hero-03.jpg",
  "/images/hero/hero-04.jpg",
  "/images/hero/hero-05.jpg",
  "/images/hero/hero-06.jpg"
];

export default function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="lux-section bg-transparent relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, index) => (
          <img
            key={img}
            src={img}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
              index === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/25"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="lux-content max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 md:pt-32">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            <LuxFadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-[0.08em] leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="block text-white">Have the wedding you've always imagined without overspending</span>
              </h1>
            </LuxFadeIn>

            <LuxFadeIn delay={0.15}>
             <p className="text-lg md:text-xl text-white/90 mt-4">
                Enjoy every single moment of your day stress free
              </p>
            </LuxFadeIn>

            <LuxFadeIn delay={0.2}>
              <div className="flex justify-center mb-8">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-block bg-[#C4A46A] text-black font-medium px-7 py-3 rounded-full shadow-[0_0_20px_rgba(196,164,106,0.4)] hover:shadow-[0_0_35px_rgba(196,164,106,0.7)] transition-all"
                >
                  Book your planning clarity session
                </button>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.25}>
              <div className="flex flex-row items-center justify-center gap-3 flex-nowrap">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="/images/avatar/avatar-1.jpeg"
                    alt="Happy couple"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="/images/avatar/avatar-2.jpeg"
                    alt="Happy couple"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="/images/avatar/avatar-3.jpg"
                    alt="Happy couple"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <p className="text-sm md:text-base text-white text-left leading-snug max-w-[220px]">
                  50+ couples planned their wedding stress free after one clarity session
                </p>
              </div>
            </LuxFadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
