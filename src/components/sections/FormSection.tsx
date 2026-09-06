import { useState } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";

export default function FormSection() {
  const [weddingDate, setWeddingDate] = useState("");
  const [plannedBudget, setPlannedBudget] = useState("");
  const [guestSize, setGuestSize] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [preferredSessionDate, setPreferredSessionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        window.location.href = '/thank-you.html';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('We encountered an issue submitting your form. Please try again or contact us directly.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#EFE8DA] text-[#151515] py-20 md:py-24 lg:py-20 pb-24 md:pb-28 lg:pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-serif font-medium leading-tight text-[#151515]">
              BOOK YOUR WEDDING CLARITY SESSION
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-base text-[#151515]/70">
              Share a few details with us, and we'll reach out to you in less than 24 hours to schedule your personalized session. Your information is kept private and secure.
            </p>
          </div>

          {/* LUXURY FORM CARD */}
          <LuxFadeIn delay={0.12}>
            <div className="relative max-w-2xl mx-auto">
              <div className="relative rounded-3xl bg-[#F8F5EF] border border-[#C99524]/25 shadow-[0_8px_40px_rgba(0,0,0,0.06)] px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-8">

<form
  name="contact"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
  className="space-y-4"
>
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="text" name="bot-field" style={{ display: 'none' }} />

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs md:text-sm font-medium tracking-wide text-[#151515]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Smith"
                      className="w-full rounded-xl bg-[#EFE8DA]/60 border border-[#C99524]/20 px-4 py-3.5 text-sm md:text-[15px] text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#C99524]/50 focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs md:text-sm font-medium tracking-wide text-[#151515]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="john@email.com"
                      className="w-full rounded-xl bg-[#EFE8DA]/60 border border-[#C99524]/20 px-4 py-3.5 text-sm md:text-[15px] text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#C99524]/50 focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs md:text-sm font-medium tracking-wide text-[#151515]"
                    >
                      Phone number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      className="w-full rounded-xl bg-[#EFE8DA]/60 border border-[#C99524]/20 px-4 py-3.5 text-sm md:text-[15px] text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#C99524]/50 focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium tracking-wide text-[#151515]">
                      Preferred contact method
                    </label>
                    <input type="hidden" name="preferredContactMethod" value={contactMethod} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {['WhatsApp', 'Text message', 'Phone call'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                            contactMethod === option
                              ? 'bg-[#C99524] text-[#151515] ring-2 ring-[#C99524]/50'
                              : 'bg-[#EFE8DA]/60 text-[#151515]/80 border border-[#C99524]/20 hover:bg-[#EFE8DA]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactMethodRadio"
                            value={option}
                            checked={contactMethod === option}
                            onChange={() => setContactMethod(option)}
                            required
                            className="accent-[#C99524] w-4 h-4 flex-shrink-0"
                          />
                          <span className="text-xs md:text-sm font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-preferred-session-date"
                      className="text-xs md:text-sm font-medium tracking-wide text-[#151515]"
                    >
                      Preferred Clarity Session date
                    </label>
                    <input type="hidden" name="preferredSessionDate" value={preferredSessionDate} />
                    <div className="min-w-0 max-w-full overflow-hidden">
                      <input
                        id="contact-preferred-session-date"
                        name="preferredSessionDateInput"
                        type="date"
                        min={todayStr}
                        value={preferredSessionDate}
                        onChange={(e) => setPreferredSessionDate(e.target.value)}
                        className="w-full min-w-0 max-w-full rounded-xl bg-[#EFE8DA]/60 border border-[#C99524]/20 px-4 py-3.5 text-sm md:text-[15px] text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#C99524]/50 focus:border-transparent transition appearance-none"
                        style={{ colorScheme: 'light' }}
                      />
                    </div>
                    <p className="text-[11px] md:text-xs text-[#151515]/50 mt-1.5">
                      Choose the date that works best for you. We&rsquo;ll confirm availability when we contact you.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-wedding-date"
                      className="text-xs md:text-sm font-medium tracking-wide text-[#151515]"
                    >
                      Wedding Date (Optional)
                    </label>
                    <div className="min-w-0 max-w-full overflow-hidden">
                      <input
                        id="contact-wedding-date"
                        name="weddingDate"
                        type="date"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full min-w-0 max-w-full rounded-xl bg-[#EFE8DA]/60 border border-[#C99524]/20 px-4 py-3.5 text-sm md:text-[15px] text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#C99524]/50 focus:border-transparent transition appearance-none"
                        style={{ colorScheme: 'light' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium tracking-wide text-[#151515]">
                      Planned Budget (Estimate)
                    </label>
                    <input type="hidden" name="plannedBudget" value={plannedBudget} />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {['Under ₦3M', '₦3M – ₦5M', '₦5M – ₦10M', '₦10M – ₦20M', 'Above ₦20M'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={(e) => {
                            setPlannedBudget(option);
                            e.currentTarget.blur();
                          }}
                          className={`px-3.5 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${
                            plannedBudget === option
                              ? 'bg-[#C99524] text-[#151515] ring-2 ring-[#C99524]/50'
                              : 'bg-[#EFE8DA]/60 text-[#151515]/80 border border-[#C99524]/20 hover:bg-[#EFE8DA]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] md:text-xs text-[#151515]/50 mt-1.5">
                      Tap one option (optional)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium tracking-wide text-[#151515]">
                      Estimated Guest Size
                    </label>
                    <input type="hidden" name="guestSize" value={guestSize} />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {['Under 100', '100 – 200', '200 – 300', '300 – 500', 'Above 500'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={(e) => {
                            setGuestSize(option);
                            e.currentTarget.blur();
                          }}
                          className={`px-3.5 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${
                            guestSize === option
                              ? 'bg-[#C99524] text-[#151515] ring-2 ring-[#C99524]/50'
                              : 'bg-[#EFE8DA]/60 text-[#151515]/80 border border-[#C99524]/20 hover:bg-[#EFE8DA]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] md:text-xs text-[#151515]/50 mt-1.5">
                      Tap one option (optional)
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center rounded-[18px] bg-[#C99524] px-8 py-4 min-h-[56px] text-sm md:text-[15px] font-bold text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'BOOK MY WEDDING CLARITY SESSION'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </LuxFadeIn>
        </div>
      </div>
    </section>
  );
}
