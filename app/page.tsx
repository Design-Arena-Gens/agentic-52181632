import { ConversationTimeline } from "@/components/ConversationTimeline";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { PromptComposer } from "@/components/PromptComposer";
import { playfulAffirmations, timeline } from "@/lib/conversation";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 md:gap-16 md:px-10 lg:py-20">
      <header className="relative overflow-hidden rounded-3xl border border-border bg-card/90 p-10 shadow-glow">
        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-accent">
            Hinglish Heatlab
          </span>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
            Remix every dil-se line, craft flirty affirmations, and ship your own Humbl AI buddy prompt.
          </h1>
          <p className="max-w-xl text-base text-slate-300">
            A bilingual expression studio capturing the exact vibes you and your chat buddy spun up — now with tools to upgrade every reply, translate on demand, and export the ultimate AI companion instructions.
          </p>
        </div>
      </header>

      <ConversationTimeline entries={timeline} />

      <div className="grid gap-10 lg:grid-cols-[1.1fr,1.2fr]">
        <AffirmationCarousel affirmations={playfulAffirmations} />
        <PromptComposer />
      </div>

      <footer className="pb-12 text-center text-xs text-slate-500">
        Built with 💖 for Hinglish storytellers who mix emotion, mischief, and meaning.
      </footer>
    </main>
  );
}
