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
    <section id="guide" className="relative py-20 md:py-28 lg:py-32 bg-[#EFE8DA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <LuxFadeIn>
          <div className="relative rounded-[2rem] overflow-hidden border border-[#C99524]/20 bg-[#F8F5EF] shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(201,149,36,0.08),transparent_55%)]" />
            <div className="relative p-10 sm:p-12 md:p-14 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#151515]">
                Not sure if this is right for you?
              </h2>
              <p className="mt-5 text-[0.98rem] sm:text-base leading-relaxed text-[#151515]/80 max-w-3xl mx-auto">
                Discover 18 things most couples overlook early, and how to protect your vision before opinions, pressure, and rushed decisions take over.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="inline-flex items-center rounded-full bg-[#C99524] px-6 sm:px-8 py-3 text-[0.9rem] font-semibold tracking-[0.18em] uppercase text-[#151515] shadow-[0_8px_30px_rgba(201,149,36,0.25)] hover:bg-[#B07D1A] hover:shadow-[0_12px_40px_rgba(201,149,36,0.35)] hover:-translate-y-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99524]/60"
                >
                  📘 Download the free wedding planning guide
                </button>
              </div>
            </div>
          </div>
        </LuxFadeIn>
      </div>

      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
          <div className="w-full max-w-md rounded-3xl bg-[#F8F5EF] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#C99524]/25 relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(201,149,36,0.06),transparent_65%)] rounded-3xl" />

            <button
              type="button"
              onClick={() => setIsGuideOpen(false)}
              className="absolute top-5 right-5 text-[#151515]/50 hover:text-[#151515] transition-colors duration-200 z-10"
            >
              ✕
            </button>

            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-[#151515] mb-2 whitespace-nowrap">
                Download the Wedding Guide
              </h3>
              <p className="text-sm text-[#151515]/70 mb-6 leading-relaxed">
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
                  if (typeof window.fbq !== "undefined") {
  window.fbq("trackCustom", "GuideDownload");
}

                  const link = document.createElement("a");
                  link.href = "/guide/ashiwaju-wedding-guide.pdf";
                  link.download = "ashiwaju-wedding-guide.pdf";
                  link.click();

        const { data, error } = await supabase
  .from("guide_downloads")
  .insert([
    {
      full_name: guideName,
      email: guideEmail,
      phone: guidePhone,
    },
  ])

console.log("Guide insert data:", data);
console.log("Guide insert error:", error);

if (error) {
  setGuideError(error.message || "Failed to save your details.");
  setIsSubmitting(false);
  return;
}
                  setIsGuideOpen(false);
                  setGuideName("");
                  setGuideEmail("");
                  setGuidePhone("");
                  setIsSubmitting(false);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  className="w-full rounded-lg border border-[#C99524]/25 bg-[#EFE8DA]/50 px-4 py-3 text-[#151515] placeholder:text-[#151515]/40 focus:border-[#C99524] focus:ring-2 focus:ring-[#C99524]/20 focus:outline-none transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#C99524]/25 bg-[#EFE8DA]/50 px-4 py-3 text-[#151515] placeholder:text-[#151515]/40 focus:border-[#C99524] focus:ring-2 focus:ring-[#C99524]/20 focus:outline-none transition-all duration-200"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={guidePhone}
                  onChange={(e) => setGuidePhone(e.target.value)}
                  className="w-full rounded-lg border border-[#C99524]/25 bg-[#EFE8DA]/50 px-4 py-3 text-[#151515] placeholder:text-[#151515]/40 focus:border-[#C99524] focus:ring-2 focus:ring-[#C99524]/20 focus:outline-none transition-all duration-200"
                />

                {guideError && <p className="text-sm text-red-600 font-medium">{guideError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#C99524] py-3 font-semibold text-[#151515] shadow-[0_8px_24px_rgba(201,149,36,0.2)] hover:bg-[#B07D1A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Download Guide"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
