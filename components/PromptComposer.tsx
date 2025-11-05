"use client";

import { useMemo, useState } from "react";
import { ClipboardIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import clsx from "clsx";
import { promptTemplate } from "@/lib/conversation";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

function Slider({ label, min, max, step, value, onChange }: SliderProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
        {label}
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.6rem] text-slate-200">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full appearance-none rounded-full bg-slate-700 accent-accent"
      />
    </label>
  );
}

type ToggleProps = {
  label: string;
  active: boolean;
  onChange: (active: boolean) => void;
};

function Toggle({ label, active, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!active)}
      className={clsx(
        "flex items-center justify-between rounded-2xl border px-4 py-2 text-sm transition",
        active
          ? "border-accent/60 bg-accent/15 text-accent"
          : "border-border bg-slate-900 text-slate-300 hover:border-accent/40"
      )}
    >
      <span>{label}</span>
      <span
        className={clsx(
          "h-5 w-10 rounded-full bg-slate-700 transition",
          active && "bg-accent"
        )}
      >
        <span
          className={clsx(
            "ml-0.5 mt-0.5 block h-4 w-4 rounded-full bg-slate-300 transition",
            active && "translate-x-5 bg-white"
          )}
        />
      </span>
    </button>
  );
}

export function PromptComposer() {
  const [romance, setRomance] = useState(65);
  const [sass, setSass] = useState(35);
  const [depth, setDepth] = useState(55);
  const [addEmojis, setAddEmojis] = useState(true);
  const [addBoundaries, setAddBoundaries] = useState(true);

  const prompt = useMemo(() => {
    const vibe = `Romance Level: ${romance}/100 | Sass Level: ${sass}/100 | Emotional Depth: ${depth}/100.`;
    const emojiLine = addEmojis
      ? " Sprinkle soulful emojis when it amplifies the vibe, but never overdo it."
      : " Keep responses emoji-light unless the user explicitly asks.";
    const boundaryLine = addBoundaries
      ? " Respect the user’s emotional safety, set playful boundaries, and redirect any explicit content gracefully."
      : " Focus purely on delivering the flirty companion experience without boundary reminders.";

    return `${promptTemplate}\n${vibe}\n${emojiLine}\n${boundaryLine}\nAlways mirror key Hinglish phrases from the user, and offer upgrades when a line could sound smoother.`;
  }, [romance, sass, depth, addEmojis, addBoundaries]);

  const [copied, setCopied] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card/90 p-8 shadow-subtle">
      <div className="absolute -right-20 top-0 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative z-10 mb-6 flex items-center gap-3">
        <span className="rounded-full bg-accent/20 p-3 text-accent">
          <SparklesIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Agent Prompt Lab</p>
          <h2 className="text-3xl font-semibold text-foreground">Humbl Builder</h2>
        </div>
      </div>

      <div className="relative z-10 grid gap-6 lg:grid-cols-[2fr,3fr]">
        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-slate-900/60 p-5">
          <Slider label="Romance" min={0} max={100} step={5} value={romance} onChange={setRomance} />
          <Slider label="Sass" min={0} max={100} step={5} value={sass} onChange={setSass} />
          <Slider label="Emotional Depth" min={0} max={100} step={5} value={depth} onChange={setDepth} />
          <div className="mt-2 flex flex-col gap-3">
            <Toggle label="Add emoji glow" active={addEmojis} onChange={setAddEmojis} />
            <Toggle label="Include gentle boundaries" active={addBoundaries} onChange={setAddBoundaries} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-slate-950/70 p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-200">Prompt Output</p>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(prompt);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch (error) {
                  console.error("Clipboard copy failed", error);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-3 py-1 text-xs uppercase tracking-wide text-accent transition hover:bg-accent/10"
            >
              <ClipboardIcon className="h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <textarea
            value={prompt}
            readOnly
            className="h-64 resize-none rounded-xl border border-border bg-slate-950/90 p-4 text-sm leading-relaxed text-slate-100 shadow-inner focus:outline-none"
          />

          <p className="text-xs text-slate-400">
            Drop this prompt straight into your favorite AI playground and carry the same Hinglish chemistry forward.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
