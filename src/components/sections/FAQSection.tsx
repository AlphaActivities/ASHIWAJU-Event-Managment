import { LuxFadeIn } from "../ui/LuxFadeIn";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Where will I pay for the session?",
    answer: "Payment is made in person at your face-to-face Clarity Session, so you know exactly who you\u2019re paying and who you\u2019re working with.",
  },
  {
    id: 2,
    question: "What happens after I fill out the form?",
    answer: "The owner will call or text you within 24 hours to schedule your Clarity Session.",
  },
  {
    id: 3,
    question: "Is the Planning Clarity Session free?",
    answer: "No. The session costs \u20a660,000.\nIf you choose to work with us, your \u20a660,000 is deducted from your package.\nIf we don\u2019t work together, you still leave with a clear vision for your wedding, practical next steps, and guidance you can use moving forward.",
  },
  {
    id: 4,
    question: "What other wedding services do you offer?",
    answer: "We also offer full wedding coordination, decoration, venue selection, and stage setup.",
  },
  {
    id: 5,
    question: "What happens during the Planning Clarity Session?",
    answer: "We\u2019ll talk through your vision, challenges, priorities, and next steps, so you know what matters most and what to do next.",
  },
  {
    id: 6,
    question: "What if I\u2019m still early in planning?",
    answer: "That\u2019s actually the best time to have your Clarity Session. Getting clear early helps you avoid rushed decisions, unnecessary spending, and stress later.",
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
      className="bg-[#F8F5EF] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <LuxFadeIn delay={0.05}>
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#C99524] mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium tracking-tight text-[#151515]">
              We've got your back
            </h2>
          </div>
        </LuxFadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <LuxFadeIn key={faq.id} delay={0.1 + index * 0.05}>
              <div className="rounded-2xl bg-[#EFE8DA]/70 border border-[#C99524]/20 overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#EFE8DA] transition-colors"
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
