import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="md:hidden fixed bottom-24 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#8B6F47]/90 border border-[#c29f63]/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-[#7A5F3C] hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300"
    >
      <ArrowUp className="w-5 h-5 text-[#F5E6C8]" strokeWidth={2.5} />
    </button>
  );
}
