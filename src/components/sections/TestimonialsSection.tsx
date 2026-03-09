import { LuxFadeIn } from "../ui/LuxFadeIn";
import { Star } from 'lucide-react';

const testimonials = [
{
coupleImage: "/images/testimonials/couple-1.jpg",
chatImage: "/images/testimonials/whatsapp-1.jpg",
badge: "Ashiwaju Couple"
},
{
coupleImage: "/images/testimonials/couple-2.jpg",
chatImage: "/images/testimonials/whatsapp-2.jpg",
badge: "Ashiwaju Couple"
}
]

export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="lux-section bg-transparent text-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 space-y-10">

        {/* HEADER */}
        <LuxFadeIn delay={0.05}>
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">
            Why Lagos couples trust us
          </h2>
        </LuxFadeIn>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 max-w-2xl mx-auto gap-8">
          {testimonials.map((testimonial, index) => (
            <LuxFadeIn key={testimonial.id} delay={0.1 + index * 0.08}>
              <article className="group relative h-full rounded-2xl bg-gradient-to-br from-[#8B6F47]/90 via-[#7A5F3C]/90 to-[#6B5335]/90 border border-[#c29f63]/30 backdrop-blur-2xl px-6 py-7 flex flex-col shadow-[0_18px_45px_rgba(0,0,0,0.7)]">

  {/* WHATSAPP TESTIMONIAL */}
  <img
    src={testimonial.chatImage}
    alt="Client WhatsApp testimonial"
    className="w-full rounded-lg mb-5 shadow-md"
  />

  {/* CLIENT IDENTITY ROW */}
  <div className="flex items-center gap-3 pt-4 border-t border-white/20">

    <img
      src={testimonial.coupleImage}
      alt="Happy couple"
      className="w-10 h-10 rounded-full object-cover"
    />

    <div className="flex items-center gap-1">
      <Star size={14} fill="#F5E6C8" stroke="#F5E6C8" strokeWidth={1.5} />
      <span className="text-sm text-white font-medium">
        Ashiwaju Happy Couple
      </span>
    </div>

  </div>

</article>
            </LuxFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
