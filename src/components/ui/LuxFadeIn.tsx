import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LuxFadeInProps {
  children: ReactNode;
  delay?: number;
}

export const LuxFadeIn = ({ children, delay = 0 }: LuxFadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: delay,
      }}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
};
