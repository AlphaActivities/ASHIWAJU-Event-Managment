import { useState } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";

export default function FormSection() {
  const [weddingDate, setWeddingDate] = useState("");
  const [plannedBudget, setPlannedBudget] = useState("");
  const [guestSize, setGuestSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      className="relative bg-transparent text-white py-24 md:py-32 lg:py-40 pb-32 md:pb-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              BOOK YOUR WEDDING CLARITY SESSION
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-base text-neutral-200/90">
              Share a few details with us, and we'll reach out to you in less than 24 hours to schedule your personalized session. Your information is kept private and secure.
            </p>
          </div>

          {/* LUXURY FORM CARD */}
          <LuxFadeIn delay={0.12}>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-[#8B6F47]/40 blur-[80px] pointer-events-none" />
              <div className="relative rounded-3xl bg-gradient-to-br from-[#8B6F47]/95 via-[#7A5F3C]/95 to-[#6B5335]/95 border border-[#c29f63]/40 backdrop-blur-[40px] shadow-[0_24px_60px_rgba(0,0,0,0.85)] px-6 py-7 md:px-8 md:py-9 lg:px-10 lg:py-10">

<form
  name="contact"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
  className="space-y-5"
>
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="text" name="bot-field" style={{ display: 'none' }} />

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs md:text-sm font-medium tracking-wide text-neutral-100"
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
                      className="w-full rounded-xl bg-white/5 border border-white/18 px-4 py-3.5 text-sm md:text-[15px] text-neutral-50 placeholder:text-neutral-300/60 focus:outline-none focus:ring-2 focus:ring-[#F5E6C8] focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs md:text-sm font-medium tracking-wide text-neutral-100"
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
                      className="w-full rounded-xl bg-white/5 border border-white/18 px-4 py-3.5 text-sm md:text-[15px] text-neutral-50 placeholder:text-neutral-300/60 focus:outline-none focus:ring-2 focus:ring-[#F5E6C8] focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs md:text-sm font-medium tracking-wide text-neutral-100"
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
                      className="w-full rounded-xl bg-white/5 border border-white/18 px-4 py-3.5 text-sm md:text-[15px] text-neutral-50 placeholder:text-neutral-300/60 focus:outline-none focus:ring-2 focus:ring-[#F5E6C8] focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-wedding-date"
                      className="text-xs md:text-sm font-medium tracking-wide text-neutral-100"
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
                        className="w-full min-w-0 max-w-full rounded-xl bg-white/5 border border-white/18 px-4 py-3.5 text-sm md:text-[15px] text-neutral-50 placeholder:text-neutral-300/60 focus:outline-none focus:ring-2 focus:ring-[#F5E6C8] focus:border-transparent transition appearance-none"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium tracking-wide text-neutral-100">
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
                              ? 'bg-[#F5E6C8]/90 text-black ring-2 ring-[#F5E6C8]/50'
                              : 'bg-white/5 text-neutral-100 border border-white/18 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] md:text-xs text-neutral-300/70 mt-1.5">
                      Tap one option (optional)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium tracking-wide text-neutral-100">
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
                              ? 'bg-[#F5E6C8]/90 text-black ring-2 ring-[#F5E6C8]/50'
                              : 'bg-white/5 text-neutral-100 border border-white/18 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] md:text-xs text-neutral-300/70 mt-1.5">
                      Tap one option (optional)
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6C8] via-[#F2D9A3] to-[#E9C88A] px-6 py-3.5 text-sm md:text-[15px] font-semibold text-black shadow-[0_14px_35px_rgba(0,0,0,0.65)] hover:brightness-110 hover:shadow-[0_16px_45px_rgba(0,0,0,0.75)] hover:-translate-y-[2px] hover:scale-[1.01] active:translate-y-px transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-60 disabled:cursor-not-allowed"
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
