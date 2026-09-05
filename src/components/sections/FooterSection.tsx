import { scrollToSection } from '../../utils/scrollToSection';

export default function FooterSection() {
  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Communities', target: 'communities' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <footer className="bg-[#151515] text-[#F8F5EF] py-12 lg:py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <img
          src="/images/ashiwaju-logo.webp"
          alt="Ashiwaju Event Management"
          className="mx-auto mb-5 h-16 md:h-20 lg:h-16 w-auto object-contain"
        />

        <div className="mb-6">
          <div className="font-serif tracking-[0.25em] uppercase text-[#C99524] text-lg md:text-xl">
            ASHIWAJU
          </div>
          <div className="text-xs md:text-sm tracking-[0.18em] uppercase text-[#F8F5EF]/70">
            Event Management & Consultant
          </div>
        </div>

        <div className="space-y-2 text-sm tracking-wide">
  <p><span className="text-[#F8F5EF]/60">Location:</span> <span className="text-[#F8F5EF]">Lagos, Nigeria</span></p>
  <p>
    <span className="text-[#F8F5EF]/60">Email:</span>{" "}
    <a
      href="mailto:ashiwajueventmanagement@gmail.com?subject=Wedding Inquiry"
      className="text-[#F8F5EF] underline underline-offset-4 hover:text-[#C99524] transition"
    >
      ashiwajueventmanagement@gmail.com
    </a>
  </p>
  <p>
    <span className="text-[#F8F5EF]/60">Phone:</span>{" "}
    <a
      href="tel:+2348028336686"
      className="text-[#F8F5EF] hover:text-[#C99524] transition-colors"
    >
      +234 802 833 6686
    </a>
  </p>
  <p>
    <span className="text-[#F8F5EF]/60">Instagram:</span>{" "}
    <a
      href="https://instagram.com/ashiwaju_eventmanagement"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#C99524] hover:text-[#D4A84A] underline underline-offset-4"
    >
      @ashiwaju_eventmanagement
    </a>
  </p>
</div>
        <div className="mt-8 lg:mt-6 text-[#F8F5EF]/50 text-xs">
          © {new Date().getFullYear()} Ashiwaju Event Management. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
