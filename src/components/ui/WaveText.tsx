import { useEffect, useRef, useState } from "react";

type WaveTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayStep?: number;
};

export default function WaveText({
  text,
  as: Tag = "h2",
  className = "",
  delayStep = 30,
}: WaveTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  let charIndex = 0;

  return (
    <Tag
      ref={ref as any}
      className={`wave-text ${inView ? "in-view" : ""} ${className}`}
    >
      {text.split(" ").map((word, wordIndex) => {
        return (
          <span className="wave-word" key={`word-${wordIndex}`}>
            {word.split("").map((char, i) => {
              const currentIndex = charIndex++;
              return (
                <span
                  key={`char-${wordIndex}-${i}`}
                  className="wave-char"
                  style={{ transitionDelay: `${currentIndex * delayStep}ms` }}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < text.split(" ").length - 1 && (
              <span className="wave-space">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}