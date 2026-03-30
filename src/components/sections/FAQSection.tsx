import { LuxFadeIn } from "../ui/LuxFadeIn";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Is a wedding planner really necessary?",
    answer: "If you want peace of mind, clear decisions, and a wedding day you can actually enjoy, yes.",
  },
  {
    id: 2,
    question: "Will this make my wedding more expensive?",
    answer: "No. Our planning helps you avoid overspending by making smarter decisions early.",
  },
  {
    id: 3,
    question: "What happens during the planning clarity session?",
    answer: "We talk through your vision, challenges, priorities, and next steps, so everything feels clear instead of overwhelming.",
  },
  {
    id: 4,
    question: "What if I'm still early in planning?",
    answer: "That's the best time. Most stress starts when clarity comes too late, and decisions are rushed.",
  },
  {
    id: 5,
    question: "Is the planning clarity session free?",
    answer: "No. The session costs ₦60,000.\nIf you choose to work with us, this amount is deducted from your package.\nIf we don't work together, you still leave with a clear vision for your wedding, practical next steps, and guidance you can use moving forward.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="bg-[#f7f3ea] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#111111]/70 mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#111111]">
              We've got your back
            </h2>
          </div>
        </LuxFadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <LuxFadeIn key={faq.id} delay={0.1 + index * 0.05}>
              <div className="rounded-2xl bg-white/60 border border-[#d4c5a0]/30 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/30 transition-colors"
                >
                  <span className="text-base md:text-lg font-semibold text-[#111111] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-[#111111]/70 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-1">
                    <p className="text-[0.95rem] leading-relaxed text-[#3b3b3b]/90 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </LuxFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
