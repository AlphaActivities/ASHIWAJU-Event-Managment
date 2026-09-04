import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

interface ChecklistCardProps {
  title: string;
  description: string;
  delay?: number;
}

export function ChecklistCard({ title, description, delay = 0 }: ChecklistCardProps) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      {
        threshold: [0, 0.3, 0.6, 1],
        rootMargin: "-20% 0px -20% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden
        p-6 rounded-2xl bg-[#F8F5EF] border transition-all duration-500
        ${isActive
          ? 'border-[#C99524]/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
          : 'border-[#C99524]/15 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
        }
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        group
      `}
      style={{
        animation: delay > 0 ? `fadeInUp 0.6s ease-out ${delay}s both` : undefined
      }}
    >
      <div
        className={`
          absolute top-0 left-0 h-[2px] rounded-tl-2xl transition-all duration-500
          bg-[#C99524]
          ${isActive
            ? 'w-24 opacity-100'
            : 'w-16 opacity-50'
          }
          group-hover:w-32 group-hover:opacity-80
        `}
      />

      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C99524]/15 flex items-center justify-center mt-1">
          <Check className="w-5 h-5 text-[#C99524]" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="font-serif font-semibold text-lg mb-1 text-[#151515]">
            {title}
          </h3>
          <p className="text-[#151515]/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
