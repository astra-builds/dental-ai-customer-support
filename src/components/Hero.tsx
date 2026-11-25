import { useEffect, useState } from "react";

type Note = {
  id: number;
  app: string;
  time: string;
  title: string;
  body: string;
  tone: "in" | "mint" | "sun";
};

const NOTES: Note[] = [
  {
    id: 1,
    app: "WhatsApp · Bondi Jn Dental",
    time: "9:47 pm",
    title: "Priya R.",
    body: "Hi! Do you do clear aligners? Roughly how much, and can I get in soon? 🙂",
    tone: "in",
  },
  {
    id: 2,
    app: "Openwide",
    time: "9:47 pm",
    title: "Replied in 8 seconds",
    body: "Priya now has a warm, accurate answer in your practice’s voice.",
    tone: "mint",
  },
  {
    id: 3,
    app: "Openwide",
    time: "9:52 pm",
    title: "Qualified · intent 92/100",
    body: "Upper aligners. Wedding in October. Medibank extras. Ready to book.",
    tone: "mint",
  },
  {
    id: 4,
    app: "Openwide",
    time: "9:53 pm",
    title: "Booked · Thu 13 Aug, 8:30 am",
    body: "Aligner consult with Dr Tan. Notes are in the chart. Reminder set.",
    tone: "sun",
  },
];

const CLOCK = ["9:47", "9:47", "9:52", "9:53"];

function Stars() {
  const stars = Array.from({ length: 70 }, (_, i) => {
    const a = (i * 9301 + 49297) % 233280;
    const b = (i * 7919 + 12345) % 233280;
    return {
      x: (a / 233280) * 100,
      y: (b / 233280) * 70,
      s: 1 + ((i * 13) % 3) * 0.5,
      d: (i % 9) * 0.5,
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-cream"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
        />
      ))}
    </div>
  );
}

function LockScreen({ step }: { step: number }) {
  const shown = NOTES.slice(0, step).reverse();
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[radial-gradient(120%_80%_at_50%_0%,#1f4a47_0%,#0d1f21_60%,#070f10_100%)] text-white">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-4 text-[11px] font-medium opacity-90">
        <span />
        <span className="absolute left-1/2 top-3 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <span className="flex gap-1">
          <span className="h-[7px] w-[16px] rounded-[2px] border border-white/70" />
        </span>
      </div>
      <div className="pt-14 text-center">
        <p className="text-[12px] tracking-wide opacity-70">Tuesday 11 August</p>
        <p className="font-serif text-[78px] leading-[0.95] tracking-tight transition-all duration-500" key={CLOCK[Math.max(0, step - 1)]}>
          {CLOCK[Math.max(0, step - 1)]}
        </p>
      </div>
      <div className="mt-5 space-y-2 px-3">
        {shown.map((n, idx) => (
          <div
            key={n.id}
            className={`animate-pop rounded-[20px] border border-white/10 bg-white/[0.11] p-3 backdrop-blur-xl ${
              idx > 2 ? "hidden" : ""
            }`}
            style={{ opacity: idx === 0 ? 1 : 0.92 - idx * 0.12 }}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-70">
              <span className="flex min-w-0 items-center gap-1.5 truncate">
                <span
                  className={`h-2 w-2 rounded-full ${
                    n.tone === "in" ? "bg-white/70" : n.tone === "mint" ? "bg-mint" : "bg-sun"
                  }`}
                />
                {n.app}
              </span>
              <span className="shrink-0 whitespace-nowrap pl-2">{n.time}</span>
            </div>
            <p className="mt-1.5 text-[13.5px] font-medium leading-tight">{n.title}</p>
            <p className="mt-0.5 text-[12px] leading-snug opacity-75">{n.body}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-6 text-center text-[11px] tracking-wide opacity-60">
        {step >= 4 ? "Nothing needs you tonight. Sleep well, Dr Tan." : "Dr Tan is asleep."}
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/60" />
    </div>
  );
}

export default function Hero() {
  const [step, setStep] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      setStep(0);
      setSecs(0);
      timers.push(window.setTimeout(() => setStep(1), 1200));
      timers.push(window.setTimeout(() => setStep(2), 3600));
      timers.push(window.setTimeout(() => setStep(3), 6200));
      timers.push(window.setTimeout(() => setStep(4), 8200));
      timers.push(window.setTimeout(run, 14500));
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (step < 1 || step >= 2) return;
    const t0 = performance.now();
    const id = setInterval(() => {
      const el = (performance.now() - t0) / 2400;
      setSecs(Math.min(8, el * 8));
    }, 60);
    return () => clearInterval(id);
  }, [step]);

  return (
    <section id="top" className="grain relative min-h-[100svh] overflow-hidden bg-ink text-cream">
      {/* night sky */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_38%,rgba(70,140,130,0.28),transparent_70%),linear-gradient(180deg,#070e10_0%,#0b1517_55%,#1a2b27_100%)]" />
      <Stars />
      {/* horizon: the dawn to come */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[radial-gradient(60%_100%_at_50%_130%,rgba(238,138,94,0.55),rgba(238,138,94,0)_70%)]" />
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" height="90" aria-hidden>
        <path
          d="M0 120V70c60-10 90-30 150-24s90 28 160 26 110-34 190-30 120 22 190 20 120-32 200-30 110 26 180 24 120-30 190-26 90 20 180 18V120Z"
          fill="#0b1517"
          opacity="0.95"
        />
      </svg>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1500px] items-center gap-6 px-5 pb-24 pt-28 md:px-10 lg:grid-cols-12 lg:pb-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-7 flex items-center gap-3 text-mint/90 animate-rise" style={{ animationDelay: "0.1s" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-mint" />
              <span className="relative h-2 w-2 rounded-full bg-mint" />
            </span>
            AI front desk for Australian dental practices
          </p>
          <h1 className="display text-[clamp(3.4rem,9.2vw,9rem)]">
            <span className="block animate-rise" style={{ animationDelay: "0.2s" }}>
              Every enquiry
            </span>
            <span className="block animate-rise italic text-sun" style={{ animationDelay: "0.35s" }}>
              answered.
            </span>
            <span className="block animate-rise text-cream/90" style={{ animationDelay: "0.5s" }}>
              Every chair filled.
            </span>
          </h1>
          <p className="mt-9 max-w-xl text-[1.08rem] leading-relaxed text-cream/70 animate-rise" style={{ animationDelay: "0.7s" }}>
            Openwide replies to every patient in seconds, works out who’s ready, and books them in. By WhatsApp, email and web chat, at 9:47pm on a Tuesday, in your practice’s own voice. Your team stays with the people in the chair.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "0.85s" }}>
            <a
              href="#book"
              className="group inline-flex items-center gap-3 rounded-full bg-sun px-7 py-4 text-[0.95rem] font-medium text-ink transition hover:bg-cream"
            >
              Book a 20-minute walkthrough
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a href="#story" className="inline-flex items-center gap-2 px-3 py-4 text-[0.95rem] text-cream/80 transition hover:text-cream">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-cream/30">↓</span>
              Watch one enquiry, start to finish
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-6 flex w-full max-w-[420px] justify-center lg:col-span-5 lg:mt-0">
          {/* moon-glow behind phone */}
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,230,207,0.22),transparent_65%)]" />
          <div className="relative h-[600px] w-[300px] animate-rise rounded-[48px] border border-white/10 bg-black p-[7px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]" style={{ animationDelay: "0.6s" }}>
            <LockScreen step={step} />
          </div>

          {/* floating stopwatch */}
          <div
            className={`absolute -left-2 top-24 hidden rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl transition-all duration-700 sm:block lg:-left-14 ${
              step >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p className="eyebrow text-[0.6rem] text-cream/50">First response</p>
            <p className="mt-1 font-mono text-3xl tabular-nums text-mint">
              {step >= 2 ? "0:08" : `0:0${Math.floor(secs)}`}
              <span className="ml-1 text-sm text-cream/50">{step >= 2 ? "✓" : ""}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-cream/50">Industry average: 17 hrs*</p>
          </div>

          <div
            className={`absolute -right-2 bottom-28 hidden rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl transition-all duration-700 sm:block lg:-right-10 ${
              step >= 4 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p className="eyebrow text-[0.6rem] text-cream/50">Staff time spent</p>
            <p className="mt-1 font-serif text-3xl text-sun">0 minutes</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <p className="eyebrow flex items-center gap-3 text-[0.62rem] text-cream/50">
          <span className="h-px w-8 bg-cream/30" />
          Scroll to rewind the night
          <span className="h-px w-8 bg-cream/30" />
        </p>
      </div>
    </section>
  );
}
