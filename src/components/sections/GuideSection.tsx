import { useState } from "react";
import { LuxFadeIn } from "../ui/LuxFadeIn";
import { scrollToSection } from "../../utils/scrollToSection";
import { supabase } from "../../utils/supabase";

export default function GuideSection() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideName, setGuideName] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideError, setGuideError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <section id="guide" className="relative py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn>
          <div className="relative rounded-[2rem] overflow-hidden border border-black/10 bg-white/75 backdrop-blur-md shadow-[0_28px_80px_rgba(0,0,0,0.10)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(199,155,75,0.18),transparent_55%)]" />
            <div className="relative p-10 sm:p-12 md:p-14 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1b1b1b]">
                Want to avoid wedding regrets you can't fix later?
              </h2>

              <p className="mt-5 text-[0.98rem] sm:text-base leading-relaxed text-[#2c2c2c]/90 max-w-3xl mx-auto">
                Discover 18 things most couples overlook early, and how to protect your vision before opinions, pressure, and rushed decisions take over.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#f5e3b6] via-[#e7c78a] to-[#c89c4f] px-6 sm:px-8 py-3 text-[0.82rem] tracking-[0.22em] uppercase text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.18)] hover:brightness-105 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e3b6]/80"
                >
                  📘 Download the free wedding planning guide
                </button>
              </div>
            </div>
          </div>
        </LuxFadeIn>
      </div>

      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsGuideOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-2">Download the Wedding Guide</h3>
            <p className="text-sm text-gray-600 mb-6">
              Enter your details to instantly access your guide.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setGuideError("");

                if (!guideName || !guideEmail || !guidePhone) {
                  setGuideError("Please fill all fields.");
                  return;
                }

                setIsSubmitting(true);

                try {
                  const { error } = await supabase
                    .from('guide_downloads')
                    .insert([
                      {
                        full_name: guideName,
                        email: guideEmail,
                        phone: guidePhone
                      }
                    ]);

                  if (error) {
                    console.error('Error saving lead:', error);
                    setGuideError("An error occurred. Please try again.");
                    setIsSubmitting(false);
                    return;
                  }

                  const link = document.createElement("a");
                  link.href = "/guide/ashiwaju-wedding-guide.pdf";
                  link.download = "Ashiwaju-Wedding-Guide.pdf";
                  link.click();

                  setIsGuideOpen(false);
                  setGuideName("");
                  setGuideEmail("");
                  setGuidePhone("");
                } catch (err) {
                  console.error('Unexpected error:', err);
                  setGuideError("An unexpected error occurred. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={guideName}
                onChange={(e) => setGuideName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={guideEmail}
                onChange={(e) => setGuideEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={guidePhone}
                onChange={(e) => setGuidePhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              {guideError && <p className="text-sm text-red-500">{guideError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#C4A46A] py-3 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Download Guide"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
