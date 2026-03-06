import React, { useEffect, useState, useCallback } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const shellClasses = 'bg-[#f9f7f3]/95 shadow-[0_0_40px_rgba(234,200,108,0.45)] backdrop-blur-2xl';

  const textTone = 'text-slate-900';

  const scrollToSection = useCallback((targetId: string) => {
    if (typeof window === 'undefined') return;

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const section = document.getElementById(targetId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

    const header = document.querySelector('header') as HTMLElement | null;
    const headerHeight = header?.offsetHeight ?? 0;

    const offsetPadding = 0;
    const targetPosition = Math.max(rect.top + scrollTop - headerHeight - offsetPadding, 0);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }, []);

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
      <div className="max-w-6xl mx-auto flex items-center justify-between pl-4 pr-4 sm:pl-6 sm:pr-6 md:pr-8 lg:pl-8 lg:pr-10 py-3 md:py-4 gap-3 min-w-0">
        {/* Logo + Wordmark */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group relative flex items-center gap-4 rounded-full bg-[#C4A46A]/70 px-3 sm:px-8 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.18)] ring-1 ring-[#e3c58a]/40 transition-all duration-500 hover:shadow-[0_15px_50px_rgba(196,164,106,0.45),0_0_60px_rgba(227,197,138,0.3)] hover:ring-[#f5e3b6]/60 hover:bg-[#d4b47a]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c98f]/80 min-w-0 max-w-[calc(100vw-120px)] sm:max-w-none shrink overflow-hidden"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex items-center gap-4 min-w-0 relative z-10">

            <img
              src="/images/ashiwaju-logo.png"
              alt="Ashiwaju"
              className="h-14 md:h-16 w-auto object-contain drop-shadow-lg block"
            />

            <div className="leading-tight min-w-0">
              <div className="font-serif text-xl md:text-2xl tracking-[0.25em] uppercase font-medium text-black whitespace-nowrap">
                ASHIWAJU
              </div>
              <div className="text-[0.65rem] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase text-black/80 whitespace-normal break-words leading-[1.15] max-w-[38vw] sm:max-w-none">
                Event Management <br className="sm:hidden" />& Consultant
              </div>
            </div>

          </div>
        </button>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          className="md:hidden inline-flex items-center justify-center rounded-full border border-white/18 bg-black/70 px-3.5 py-2 text-[0.65rem] tracking-[0.26em] uppercase text-white/85 shadow-[0_0_28px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition hover:border-[#f5e3b6]/70 hover:text-[#f5e3b6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e3b6]/80 z-[60]"
        >
          <span>Menu</span>
          <div className="ml-2 flex flex-col gap-[3px]">
            <span className={`h-[1px] w-4 rounded-full bg-white/80 transition ${isMobileMenuOpen ? 'translate-y-[4px] rotate-45 bg-[#f5e3b6]' : ''}`} />
            <span className={`h-[1px] w-3 rounded-full bg-white/65 transition ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[1px] w-4 rounded-full bg-white/80 transition ${isMobileMenuOpen ? '-translate-y-[4px] -rotate-45 bg-[#f5e3b6]' : ''}`} />
          </div>
        </button>

        {/* Desktop nav (keep mobile untouched – this only affects md+ screens) */}
        <div className="hidden md:flex items-center rounded-full bg-[#C4A46A]/70 backdrop-blur-[18px] shadow-[0_14px_40px_rgba(15,23,42,0.18)] ring-1 ring-[#e3c58a]/40 px-4 py-1.5">
          <ul className="flex items-center gap-3 lg:gap-5 text-[0.76rem] md:text-[0.80rem] tracking-[0.24em] uppercase text-black/85 font-semibold">
            {navItems.map((item) => (
              <li key={item.label} className="group">
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="relative px-2 py-1 transition-colors duration-300 hover:text-black text-black/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e5c98f]/80"
                >
                  <span>{item.label}</span>
                  <span
                    className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#e2c88d] via-[#f6e6bf] to-[#c79c4d] transition-transform duration-300 group-hover:scale-x-100"
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
