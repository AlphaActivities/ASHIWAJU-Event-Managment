import { useState, useEffect } from 'react';
import { LuxFadeIn } from '../ui/LuxFadeIn';
import { scrollToSection } from '../../utils/scrollToSection';
import WaveText from '../ui/WaveText';

const HERO_IMAGES = [
  "/images/hero/hero-07.webp",
  "/images/hero/hero-01.webp",
  "/images/hero/hero-03.webp",
  "/images/hero/hero-02.webp",
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
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center scale-110 md:scale-105 transition-opacity duration-[1500ms] ease-in-out ${
  index === heroIndex ? "opacity-100" : "opacity-0"
}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/25"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="lux-content max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 md:pt-32">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-transparent blur-3xl -z-10 scale-110"></div>
            <LuxFadeIn delay={0.1}>
              <WaveText
                text="Have the wedding you've always imagined without overspending"
                as="h1"
                className="max-w-[600px] text-3xl md:text-5xl leading-tight text-center font-serif font-medium tracking-[0.02em] md:tracking-[0.03em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                delayStep={25}
              />
            </LuxFadeIn>

            <LuxFadeIn delay={0.15}>
            <p className="text-lg md:text-xl text-white/95 mt-6 md:mt-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Get clear on your vision, and plan your day with confidence
              </p>
            </LuxFadeIn>

            <LuxFadeIn delay={0.2}>
            <div className="flex justify-center mt-8 md:mt-10 mb-8">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-block bg-[#C4A46A] text-black font-medium px-7 py-3 rounded-full shadow-[0_0_20px_rgba(196,164,106,0.4)] hover:shadow-[0_0_35px_rgba(196,164,106,0.7)] transition-all"
                >
                  BOOK YOUR WEDDING CLARITY SESSION
                </button>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.25}>
              <div className="flex flex-row items-center justify-center gap-3 flex-nowrap">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="/images/avatar/avatar-1.jpeg"
                    alt="Happy couple"
                    width="40"
                    height="40"
                    loading="eager"
                    decoding="async"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="/images/avatar/avatar-2.jpeg"
                    alt="Happy couple"
                    width="40"
                    height="40"
                    loading="eager"
                    decoding="async"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="/images/avatar/avatar-3.jpg"
                    alt="Happy couple"
                    width="40"
                    height="40"
                    loading="eager"
                    decoding="async"
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
