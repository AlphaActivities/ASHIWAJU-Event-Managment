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
    ? 'bg-[#F8F5EF]/95 shadow-[0_2px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl'
    : isInHero
    ? 'bg-transparent'
    : 'opacity-0 pointer-events-none';

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
          className="group relative flex items-center gap-4 rounded-full bg-[#EFE8DA] px-6 md:px-8 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-[#C99524]/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(201,149,36,0.12)] hover:ring-[#C99524]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
        >
          <img
            src="/images/ashiwaju-logo.webp"
            alt="Ashiwaju"
            width="56"
            height="56"
            loading="eager"
            decoding="async"
            className="h-12 md:h-14 w-auto object-contain"
          />

          <div className="leading-tight">
            <div className="font-serif text-lg md:text-2xl tracking-[0.25em] uppercase font-medium text-[#151515] whitespace-nowrap">
              ASHIWAJU
            </div>
            <div className="text-[0.65rem] md:text-xs tracking-[0.14em] md:tracking-[0.18em] uppercase text-[#151515]/70 whitespace-nowrap leading-tight">
              <span className="md:hidden">EVENTS</span>
              <span className="hidden md:inline">EVENT MANAGEMENT & CONSULTANT</span>
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center rounded-full bg-[#EFE8DA] shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-[#C99524]/20 px-6 py-2.5">
          <ul className="flex items-center gap-6 lg:gap-8 text-[0.8rem] tracking-[0.24em] uppercase text-[#151515]/80 font-semibold">
            {navItems.map((item) => (
              <li key={item.label} className="group">
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="relative px-1 py-1.5 transition-colors duration-300 hover:text-[#151515] text-[#151515]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C99524]/60"
                >
                  <span>{item.label}</span>
                  <span
                    className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-[#C99524] transition-transform duration-300 group-hover:scale-x-100"
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
          className="mx-auto max-w-md rounded-3xl border border-[#C99524]/20 bg-[#F8F5EF] shadow-[0_20px_60px_rgba(0,0,0,0.12)] px-5 py-5 space-y-4"
        >
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-[#151515]/50">
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
                  className="w-full text-left rounded-2xl px-4 py-3 text-[0.8rem] tracking-[0.24em] uppercase text-[#151515]/80 hover:text-[#C99524] transition flex items-center justify-between bg-[#EFE8DA]/60 hover:bg-[#EFE8DA]"
                >
                  <span>{item.label}</span>
                  <span className="h-[1px] w-8 bg-[#C99524]/40" />
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
