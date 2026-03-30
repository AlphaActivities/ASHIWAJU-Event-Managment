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
        p-6 rounded-2xl bg-white border transition-all duration-500
        ${isActive
          ? 'border-[#D4AF37]/40 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(212,175,55,0.1)]'
          : 'border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        }
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        group
      `}
      style={{
        animation: delay > 0 ? `fadeInUp 0.6s ease-out ${delay}s both` : undefined
      }}
    >
      <div
        className={`
          absolute top-0 left-0 h-1 rounded-tl-2xl transition-all duration-500
          bg-gradient-to-r from-[#D4AF37] via-[#F5E6C8] to-[#E9C88A]
          ${isActive
            ? 'w-24 opacity-100 shadow-[0_2px_12px_rgba(212,175,55,0.4)]'
            : 'w-16 opacity-60'
          }
          group-hover:w-32 group-hover:opacity-90 group-hover:shadow-[0_2px_12px_rgba(212,175,55,0.3)]
        `}
      />

      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F5E6C8] to-[#E9C88A] flex items-center justify-center mt-1">
          <Check className="w-5 h-5 text-neutral-800" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
