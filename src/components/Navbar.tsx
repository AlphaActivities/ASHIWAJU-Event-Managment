import React, { useEffect, useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      setIsScrolled(scrollY > 20);
      setIsInHero(scrollY < heroHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const shellClasses = isInHero && isScrolled
    ? 'bg-[#f9f7f3]/95 shadow-[0_0_40px_rgba(234,200,108,0.45)] backdrop-blur-2xl'
    : isInHero
    ? 'bg-transparent'
    : 'opacity-0 pointer-events-none';

  const textTone = 'text-slate-900';

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Services', target: 'services' },
    { label: 'Works', target: 'works' },
    { label: 'About', target: 'about' },
    { label: 'Book', target: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${shellClasses}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-3.5 md:py-4 gap-4">
        {/* Logo + Wordmark */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group relative flex items-center gap-4 rounded-full bg-[#C4A46A]/70 px-6 md:px-8 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.15)] ring-1 ring-[#e3c58a]/40 transition-all duration-500 hover:shadow-[0_15px_50px_rgba(196,164,106,0.45),0_0_60px_rgba(227,197,138,0.3)] hover:ring-[#f5e3b6]/60 hover:bg-[#d4b47a]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c98f]/80"
        >
          <img
            src="/images/ashiwaju-logo.webp"
            alt="Ashiwaju"
            width="56"
            height="56"
            loading="eager"
            decoding="async"
            className="h-12 md:h-14 w-auto object-contain drop-shadow-lg"
          />

          <div className="leading-tight">
            <div className="font-serif text-lg md:text-2xl tracking-[0.25em] uppercase font-medium text-black whitespace-nowrap">
              ASHIWAJU
            </div>
            <div className="text-[0.65rem] md:text-xs tracking-[0.14em] md:tracking-[0.18em] uppercase text-black/80 whitespace-nowrap leading-tight">
              <span className="md:hidden">EVENTS</span>
              <span className="hidden md:inline">EVENT MANAGEMENT & CONSULTANT</span>
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center rounded-full bg-[#C4A46A]/70 backdrop-blur-[18px] shadow-[0_8px_24px_rgba(15,23,42,0.15)] ring-1 ring-[#e3c58a]/40 px-6 py-2.5">
          <ul className="flex items-center gap-6 lg:gap-8 text-[0.8rem] tracking-[0.24em] uppercase text-black/85 font-semibold">
            {navItems.map((item) => (
              <li key={item.label} className="group">
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="relative px-1 py-1.5 transition-colors duration-300 hover:text-black text-black/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e5c98f]/80"
                >
                  <span>{item.label}</span>
                  <span
                    className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#e2c88d] via-[#f6e6bf] to-[#c79c4d] transition-transform duration-300 group-hover:scale-x-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile nav panel – only on small screens */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] z-[50] px-4 pb-6 transition-all duration-250 ease-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-w-md rounded-3xl border border-white/14 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.95)] px-5 py-5 space-y-4"
        >
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-white/60">
            Main Navigation
          </p>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection(item.target);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left rounded-2xl px-4 py-3 text-[0.8rem] tracking-[0.24em] uppercase text-white/85 hover:text-[#f5e3b6] transition flex items-center justify-between bg-white/5 hover:bg-white/10"
                >
                  <span>{item.label}</span>
                  <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#f5e3b6] to-transparent opacity-70" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
