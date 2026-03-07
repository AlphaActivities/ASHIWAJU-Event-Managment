export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f7f3ea] px-6 py-20">
      <div className="max-w-2xl text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-semibold">
          You’re In.
        </h1>

        <p className="text-lg">
          Thank you for submitting your details.
        </p>

        <p className="text-lg">
          We’ll personally call you within the next 24 hours to confirm your Planning Clarity Session and learn more about your wedding.
        </p>

        <p className="text-lg">During the session, we will:</p>

        <ul className="space-y-2 text-left max-w-md mx-auto">
          <li>• Review your vision</li>
          <li>• Discuss your budget priorities</li>
          <li>• Identify potential planning risks early</li>
          <li>• Give you clear direction on your next steps</li>
        </ul>

        <p>Please keep your phone close.</p>

        <p>
          discover how it feels to have a partner that pays attention to your vision and brings it to life as you imagined it
        </p>

        <a
          href="/"
          className="inline-block mt-6 rounded-full bg-[#C4A46A] px-8 py-3 text-sm tracking-wider uppercase"
        >
          Back Home
        </a>

      </div>
    </section>
  );
}