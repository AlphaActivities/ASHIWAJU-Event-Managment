import { useState, useEffect } from 'react';
import { LuxFadeIn } from '../ui/LuxFadeIn';
import { scrollToSection } from '../../utils/scrollToSection';

const HERO_IMAGES = [
  "/images/hero/hero-01.jpg",
  "/images/hero/hero-02.jpg",
  "/images/hero/hero-03.jpg",
  "/images/hero/hero-04.jpg"
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-transparent" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="lux-content max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 md:pt-32">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            <LuxFadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight">
                <span className="block text-white">We handle the stress, so you enjoy your day without the chaos</span>
              </h1>
            </LuxFadeIn>

            <LuxFadeIn delay={0.15}>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                Experience how calm and enjoyable wedding planning can feel with Ashiwaju Event.
              </p>
            </LuxFadeIn>

            <LuxFadeIn delay={0.05}>
              <p className="text-xs md:text-sm text-neutral-300 mb-6">
                Trusted by over 50 Lagos couples who had a stress-free wedding, their guests still talk about.
              </p>
            </LuxFadeIn>

            <LuxFadeIn delay={0.25}>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-block bg-[#C4A46A] text-black font-medium px-7 py-3 rounded-full shadow-[0_0_20px_rgba(196,164,106,0.4)] hover:shadow-[0_0_35px_rgba(196,164,106,0.7)] transition-all"
                >
                  Book your planning clarity session
                </button>
              </div>
            </LuxFadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
