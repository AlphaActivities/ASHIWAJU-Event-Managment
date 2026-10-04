import { LuxFadeIn } from "../ui/LuxFadeIn";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Will I pay for the Clarity Session?",
    answer: "No. It normally costs \u20a6100,000, but I decided to make it free for brides who have the vision but don\u2019t know how to bring it all together while staying within their budget, managing family expectations, and dealing with overpriced vendors.",
  },
  {
    id: 2,
    question: "What happens after the session?",
    answer: "There\u2019s no pressure to work with us. You decide whether you want to handle the planning yourself or have us take care of everything from planning to execution, while you stay relaxed and enjoy the process.",
  },
  {
    id: 3,
    question: "What if I\u2019m still early in planning?",
    answer: "That\u2019s actually the best time to have your Clarity Session. Getting clear early helps you avoid rushed decisions, unnecessary spending, and stress later.",
  },
  {
    id: 4,
    question: "Who is the Clarity Session for?",
    answer: "For brides who have started planning or are about to start, but aren\u2019t sure how to bring their vision to reality without unnecessary spending or chaos, especially with the current economy, family expectations, and unreliable vendors.",
  },
  {
    id: 5,
    question: "What other wedding services do you offer?",
    answer: "We also offer full wedding planning and coordination, on-the-day coordination, d\u00e9cor and stage setup, and venue and vendor sourcing.",
  },
  {
    id: 6,
    question: "What makes you different?",
    answer: "We don't take on every wedding. If we see that your expectations don't match your budget, we'll tell you rather than promise that everything will work and create problems later.\nOur reputation is as important to us as your wedding, so we'll always be honest about what we believe is possible.",
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
      className="bg-[#F8F5EF] py-20 md:py-24 lg:py-20"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-10 lg:mb-8">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#C99524] mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-serif font-medium tracking-tight text-[#151515]">
              We've got your back
            </h2>
          </div>
        </LuxFadeIn>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <LuxFadeIn key={faq.id} delay={0.1 + index * 0.05}>
              <div className="rounded-2xl bg-[#EFE8DA]/70 border border-[#C99524]/20 overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 lg:py-3.5 flex items-center justify-between text-left hover:bg-[#EFE8DA] transition-colors"
                >
                  <span className="text-base md:text-lg font-serif font-semibold text-[#151515] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-[#C99524] transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-1">
                    <p className="text-[0.95rem] leading-relaxed text-[#151515]/80 whitespace-pre-line">
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
