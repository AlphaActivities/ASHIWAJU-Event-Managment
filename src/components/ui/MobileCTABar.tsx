import { scrollToSection } from '../../utils/scrollToSection';

export default function MobileCTABar() {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8F5EF] border-t border-[#C99524]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 py-3">
      <button
        type="button"
        onClick={() => scrollToSection('contact')}
        className="w-full rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-[11px] leading-tight font-bold text-[#151515] shadow-[0_8px_24px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] active:scale-[0.98] transition-all duration-200 tracking-wide"
      >
        BOOK YOUR WEDDING CLARITY SESSION
      </button>
    </div>
  );
}
