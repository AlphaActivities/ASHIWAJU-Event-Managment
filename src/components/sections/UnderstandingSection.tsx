import React from "react";

export default function UnderstandingSection() {
  return (
    <section
      id="understanding"
      className="relative w-full py-20 md:py-28 bg-[#f7f4ee]"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2c2821] leading-tight">
            You've got impeccable taste.
            <br />
            You've got grand ideas.
          </h2>

          <p className="mt-6 text-lg md:text-xl text-[#4b463e] max-w-3xl">
            You just need the right partner that puts it all together without pressure or confusion.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-[#c9a961] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12">
          <div className="space-y-4 text-[15px] md:text-lg leading-relaxed text-[#2c2821]">
            <p>You already know what you like.</p>
            <p>You have ideas you've imagined and pictures you saved.</p>
            <p>What makes planning hard isn't vision.</p>
            <p>It's the pressure, the opinions, and the fear of getting it wrong.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
