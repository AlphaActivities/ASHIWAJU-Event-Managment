import { useState, useEffect, useRef } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import WaveText from "../ui/WaveText";

const testimonials = [
{
id: 1,
chatImage: "/images/testimonials /whatsapp-1.jpeg",
coupleImage: "/images/testimonials /couple-1.jpeg"
},
{
id: 2,
chatImage: "/images/testimonials /whatsapp-2.jpeg",
coupleImage: "/images/testimonials /couple-2.jpeg"
},
{
id: 3,
chatImage: "/images/testimonials /whatsapp-3.jpeg",
coupleImage: "/images/testimonials /couple-3.jpeg"
},
{
id: 4,
chatImage: "/images/testimonials /whatsapp-4.jpeg",
coupleImage: "/images/testimonials /couple-4.jpeg"
},
{
id: 5,
chatImage: "/images/testimonials /whatsapp-5.jpeg",
coupleImage: "/images/testimonials /couple-5.jpeg"
}
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideTimer = useRef<number | null>(null);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const resetAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = window.setInterval(() => {
      goToNext();
    }, 5000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      resetAutoSlide();
    }
  };

  const handlePrevClick = () => {
    goToPrev();
    resetAutoSlide();
  };

  const handleNextClick = () => {
    goToNext();
    resetAutoSlide();
  };

  return (
    <section
      id="reviews"
      className="lux-section bg-transparent text-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 space-y-10">

        {/* HEADER */}
        <LuxFadeIn delay={0.05}>
          <WaveText
            text="Why lagos couples trust us"
            as="h2"
            className="text-4xl md:text-5xl font-serif text-center mb-12"
            delayStep={30}
          />
        </LuxFadeIn>

        {/* TESTIMONIAL SLIDER */}
        <div className="relative max-w-2xl mx-auto">

          {/* SLIDER CONTAINER */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <article className="group relative h-full rounded-2xl bg-gradient-to-br from-[#8B6F47]/90 via-[#7A5F3C]/90 to-[#6B5335]/90 border border-[#c29f63]/30 backdrop-blur-2xl px-6 py-7 flex flex-col shadow-[0_18px_45px_rgba(0,0,0,0.7)]">

                    {/* WHATSAPP TESTIMONIAL */}
                    <div className="w-full aspect-[4/5] flex items-center justify-center bg-black/20 rounded-lg mb-5 overflow-hidden">
  <img
    src={testimonial.chatImage}
    alt="Client WhatsApp testimonial"
    loading="lazy"
    decoding="async"
    className="max-h-full max-w-full object-contain"
  />
</div>

                    {/* CLIENT IDENTITY ROW */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                      <img
                        src={testimonial.coupleImage}
                        alt="Happy couple"
                        width="40"
                        height="40"
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex items-center gap-1">
                        <Star size={14} fill="#F5E6C8" stroke="#F5E6C8" strokeWidth={1.5} />
                        <span className="text-sm text-white font-medium">
                         Happy Ashiwaju Couple
                        </span>
                      </div>
                    </div>

                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* NAVIGATION ARROWS - Desktop */}
          <button
            onClick={handlePrevClick}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 items-center justify-center w-12 h-12 rounded-full bg-[#8B6F47]/90 border border-[#c29f63]/40 text-white hover:bg-[#7A5F3C] transition-all shadow-lg backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextClick}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 items-center justify-center w-12 h-12 rounded-full bg-[#8B6F47]/90 border border-[#c29f63]/40 text-white hover:bg-[#7A5F3C] transition-all shadow-lg backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* DOTS INDICATOR */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    resetAutoSlide();
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#F5E6C8] w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
