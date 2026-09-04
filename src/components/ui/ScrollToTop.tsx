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
      className="md:hidden fixed bottom-24 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#EFE8DA] border border-[#C99524]/30 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-[#C99524] hover:shadow-[0_8px_30px_rgba(201,149,36,0.2)] active:scale-95 transition-all duration-300"
    >
      <ArrowUp className="w-5 h-5 text-[#C99524] hover:text-[#151515]" strokeWidth={2.5} />
    </button>
  );
}
