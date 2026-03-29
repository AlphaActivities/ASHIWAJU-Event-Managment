import { useState, useEffect } from "react";
import { scrollToSection } from "../../utils/scrollToSection";
import { Check } from "lucide-react";

export default function AboutSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const images = ["/images/fear.png", "/images/fear.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="bg-[#f7f3ea] py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* HEADLINE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif font-medium tracking-tight text-[#111111]">
            You need someone who understands your taste
            <br />
            and brings it to life.
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:gap-12 lg:grid-cols-2 items-stretch">
          {/* LEFT - Profile Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-neutral-200 w-full h-full min-h-[520px]">
            <img
              src="/images/About-photo.jpg"
              alt="Ashiwaju Event Planning Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT - Body Copy */}
          <div className="h-full flex flex-col justify-center text-[0.98rem] sm:text-base leading-relaxed text-[#3b3b3b]/90">
            <div className="space-y-6">
              {/* Always visible intro paragraphs */}
              <p>
                With over 10 years of turning 50+ weddings into unforgettable celebrations, we've learned how to guide couples through planning that stays true to their vision and budget.
              </p>

              <p>
                We take care of the hard decisions, the moving parts, and the details that truly matter, so you can enjoy the journey, show up confident, and fully present on your wedding day, without unnecessary spending or regret.
              </p>

              {/* Expandable extra paragraphs */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-6 pt-0">
  <h3 className="text-lg font-semibold text-[#111111]">
    From our very first meeting:
  </h3>

  <div className="space-y-5">

    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
        <Check className="w-4 h-4 text-white" />
      </div>
      <p>
        We take time to understand you, your vision, your priorities, and what this day means to you
      </p>
    </div>

    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
        <Check className="w-4 h-4 text-white" />
      </div>
      <p>
        We help you clearly see how everything comes together
      </p>
    </div>

    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
        <Check className="w-4 h-4 text-white" />
      </div>
      <p>
        We guide you step by step through the entire process with clarity on every decision and every cost. No hidden fees. No surprises
      </p>
    </div>

  </div>
</div>
                  <p>
                    Every detail is thoughtfully planned to reflect your vision, so when your guests walk in, everything feels intentional, elegant, and exactly how you imagined it.
                  </p>
                </div>
              </div>

              {/* Toggle link - works on both desktop and mobile */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-[#8B6F47] hover:text-[#7A5F3C] transition-colors"
              >
                {isExpanded ? 'See less' : 'See more...'}
              </button>
            </div>

            {/* CTA Button - always visible and stable */}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[#f5e3b6] via-[#e7c78a] to-[#c89c4f] px-6 sm:px-8 py-3 text-[0.82rem] tracking-[0.22em] uppercase text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:brightness-105 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e3b6]/80"
            >
              Book your planning clarity session
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
