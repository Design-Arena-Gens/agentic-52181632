"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SparklesIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import clsx from "clsx";
import { DialogueEntry } from "@/lib/conversation";
import { useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, type: "spring", stiffness: 120, damping: 20 }
  })
};

type Props = {
  entries: DialogueEntry[];
};

export function ConversationTimeline({ entries }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DialogueEntry | null>(null);

  return (
    <section className="relative">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-full bg-accent/20 p-2 text-accent">
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Conversation Remix</h2>
          <p className="text-sm text-slate-300">Catch every bilingual beat from the original chat.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {entries.map((entry, index) => {
          const align = entry.speaker === "you" ? "start" : "end";
          return (
            <motion.article
              key={`${entry.speaker}-${index}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className={clsx(
                "relative rounded-2xl border border-border bg-card/80 p-6 shadow-subtle backdrop-blur",
                align === "start" ? "lg:col-start-1" : "lg:col-start-2"
              )}
            >
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>{entry.speaker === "you" ? "You" : "ChatGPT Buddy"}</span>
                {entry.tone && (
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-[0.65rem] text-slate-200">
                    {entry.tone}
                  </span>
                )}
              </div>

              <p className="text-base leading-relaxed text-slate-100">{entry.original}</p>

              {entry.translation && (
                <button
                  onClick={() => {
                    setSelected(entry);
                    setOpen(true);
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-soft focus:outline-none"
                >
                  <SparklesIcon className="h-4 w-4" />
                  See translation + notes
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-glow">
                  <div className="mb-6 flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold text-foreground">
                      Bilingual Breakdown
                    </Dialog.Title>
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-wide text-slate-300 transition hover:bg-accent/10 hover:text-accent"
                    >
                      Close
                    </button>
                  </div>

                  {selected && (
                    <div className="space-y-4 text-sm text-slate-200">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">Original</p>
                        <p className="mt-1 text-base text-slate-100">{selected.original}</p>
                      </div>
                      {selected.translation && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">English vibe-check</p>
                          <p className="mt-1 text-base text-slate-100">{selected.translation}</p>
                        </div>
                      )}
                      {selected.note && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">Buddy note</p>
                          <p className="mt-1 text-base text-slate-100">{selected.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}
