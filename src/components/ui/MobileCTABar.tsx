import { scrollToSection } from '../../utils/scrollToSection';

export default function MobileCTABar() {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#8B6F47] via-[#7A5F3C] to-[#6B5335] border-t border-[#c29f63]/30 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.5)] px-4 py-3">
      <button
        type="button"
        onClick={() => scrollToSection('contact')}
        className="w-full rounded-full bg-gradient-to-r from-[#F5E6C8] via-[#F2D9A3] to-[#E9C88A] px-4 py-3.5 text-[11px] leading-tight font-bold text-black shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 tracking-wide"
      >
        BOOK YOUR WEDDING CLARITY SESSION
      </button>
    </div>
  );
}
