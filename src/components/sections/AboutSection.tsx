import { useState, useEffect } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";

export default function AboutSection() {
  const [currentImage, setCurrentImage] = useState(0);
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
          {/* LEFT - Image Placeholder */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-neutral-200 w-full h-full min-h-[520px] flex items-center justify-center">
            <span className="text-neutral-500 tracking-wide text-sm">
              Image Placeholder
            </span>
          </div>

          {/* RIGHT - Body Copy */}
          <div className="h-full flex flex-col justify-center text-[0.98rem] sm:text-base leading-relaxed text-[#3b3b3b]/90 space-y-6">
            <p>
              With over 10 years of turning weddings into unforgettable celebrations, we've learned how to guide couples through planning without feeling overwhelmed.
            </p>

            <p>
              We handle the hard parts, the decisions, and the details that truly matter, so you can enjoy the journey and show up calm on your wedding day, without unnecessary spending or regret.
            </p>

            <p>
              From our very first meeting, we take time to understand you.
              <br />
              We listen to your ideas and help you visualize the full picture.
            </p>

            <p>
              Then we clearly communicate the steps, the process, and the cost involved, with no hidden fees or surprises.
              <br />
              Every detail of your event is designed to reflect your story.
              <br />
              Not just seen and felt on the day, but remembered long after.
            </p>

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
