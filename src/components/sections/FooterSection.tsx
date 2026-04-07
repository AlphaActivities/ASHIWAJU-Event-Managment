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
    <footer className="bg-[#0b0b0b] text-[#f6f1e6] py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <img
          src="/images/ashiwaju-logo.webp"
          alt="Ashiwaju Event Management"
          className="mx-auto mb-6 h-16 md:h-20 w-auto object-contain drop-shadow-md"
        />

        <div className="mb-8">
          <div className="font-serif tracking-[0.25em] uppercase text-[#d6b46a] text-lg md:text-xl">
            ASHIWAJU
          </div>
          <div className="text-xs md:text-sm tracking-[0.18em] uppercase text-[#f6f1e6]/80">
            Event Management & Consultant
          </div>
        </div>

        <div className="space-y-2 text-sm tracking-wide">
  <p><span className="text-[#f6f1e6]/70">Location:</span> <span className="text-[#f6f1e6]">Lagos, Nigeria</span></p>
  <p>
    <span className="text-[#f6f1e6]/70">Email:</span>{" "}
    <a
      href="mailto:ashiwajueventmanagement@gmail.com?subject=Wedding Inquiry"
      className="text-[#f6f1e6] underline underline-offset-4 hover:text-[#c89c4f] transition"
    >
      ashiwajueventmanagement@gmail.com
    </a>
  </p>
  <p>
    <span className="text-[#f6f1e6]/70">Phone:</span>{" "}
    <a
      href="tel:+2348028336686"
      className="text-[#f6f1e6] hover:text-[#d6b46a] transition-colors"
    >
      +234 802 833 6686
    </a>
  </p>
  <p>
    <span className="text-[#f6f1e6]/70">Instagram:</span>{" "}
    <a
      href="https://instagram.com/ashiwaju_eventmanagement"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#d6b46a] hover:text-[#e7c983] underline underline-offset-4"
    >
      @ashiwaju_eventmanagement
    </a>
  </p>
</div>
        <div className="mt-10 text-[#f6f1e6]/60 text-xs">
          © {new Date().getFullYear()} Ashiwaju Event Management. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
