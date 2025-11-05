"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";

const variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

type Props = {
  affirmations: string[];
};

export function AffirmationCarousel({ affirmations }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
    }, 3800);
    return () => clearInterval(id);
  }, [affirmations.length]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-transparent to-sky-400/10 p-8 shadow-glow">
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-12 -right-16 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <span className="rounded-full bg-accent/30 p-3 text-accent">
          <HeartIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Flirty Broadcast</p>
          <h2 className="text-3xl font-semibold text-foreground">Dil-Se Affirmations</h2>
        </div>
      </div>

      <div className="relative mt-8 h-24">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-slate-100"
          >
            {affirmations[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
