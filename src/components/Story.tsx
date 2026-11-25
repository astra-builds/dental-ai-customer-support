import { useMemo, type ReactNode } from "react";
import { Fit, clamp, ease, lerp, mixColor, seg, useStickyProgress } from "../lib/hooks";

const CHAPTERS = [
  {
    time: "9:47",
    ampm: "pm",
    where: "Tuesday night · Bondi, NSW",
    kicker: "Without an answer",
    title: "The enquiry nobody saw.",
    body: "Priya is getting married in October and comparing three practices for clear aligners. She messages all three. She’ll book with whichever answers first. Your front desk closed at five.",
  },
  {
    time: "9:47",
    ampm: "pm",
    where: "Eight seconds later",
    kicker: "Intelligent response",
    title: "An answer, in your practice’s voice.",
    body: "Openwide replies straight away. Warm, plain English, never a diagnosis. It knows your services, your hours and your dentists, and it asks what your best receptionist would ask.",
  },
  {
    time: "9:52",
    ampm: "pm",
    where: "Five minutes in",
    kicker: "Qualified patient",
    title: "A conversation becomes a patient worth calling back.",
    body: "What she wants, when she wants it, how she’ll pay. Captured, scored for intent and written to the chart. No forms, no phone tag, no sticky notes.",
  },
  {
    time: "9:53",
    ampm: "pm",
    where: "Before she’s closed the app",
    kicker: "Booked appointment",
    title: "Booked, confirmed, reminded.",
    body: "The best available slot is held and confirmed on WhatsApp and email, with pre-visit forms and a reminder queued. Your team simply finds her in the diary at 8am.",
  },
  {
    time: "12",
    ampm: "months on",
    where: "A practice that grew",
    kicker: "Growing practice",
    title: "No enquiry waits. So the diary fills.",
    body: "More new patients, a calmer front desk, and a team with the time to do what they trained for. Multiply Priya by every enquiry, every night, all year.",
  },
];

const SKY: [number, string][] = [
  [0, "#0b1517"],
  [0.25, "#0e2022"],
  [0.5, "#27433f"],
  [0.58, "#6e4a45"],
  [0.68, "#f0c29f"],
  [0.8, "#f3e3cc"],
  [1, "#f6f0e5"],
];
const TEXT: [number, string][] = [
  [0, "#fbf8f1"],
  [0.57, "#fbf8f1"],
  [0.62, "#0b1517"],
  [1, "#0b1517"],
];
const FLOOR: [number, string][] = [
  [0, "#070e10"],
  [0.5, "#0c1b1b"],
  [0.58, "#3b2a2a"],
  [0.68, "#b9805f"],
  [0.8, "#d9c2a0"],
  [1, "#ece3d2"],
];

/* ------------------------------------------------------------------ */
/* Phone                                                               */
/* ------------------------------------------------------------------ */

type Msg = { at: number; me?: boolean; text: string; time: string };
const MSGS: Msg[] = [
  { at: 0.12, me: true, time: "9:47 pm", text: "Hi! Do you do clear aligners? Roughly how much, and can I get in soon? 🙂" },
  {
    at: 1.22,
    time: "9:47 pm",
    text: "Hi Priya! Thanks for messaging Bondi Junction Dental 😊 Yes, Dr Tan offers clear aligners. A first consult is 30 minutes and includes a 3D scan.",
  },
  {
    at: 1.5,
    time: "9:48 pm",
    text: "So I can point you to the right appointment: is this mainly about straightening, or something quicker like a few front teeth?",
  },
  { at: 1.7, me: true, time: "9:50 pm", text: "Straightening, mostly my top teeth. Hoping to start before my wedding in October!" },
  {
    at: 1.9,
    time: "9:50 pm",
    text: "Congratulations! 🎉 Plenty of time. Aligners are typically $4,500–$7,500 depending on the plan. Dr Tan confirms your exact quote at the consult.",
  },
  { at: 3.2, time: "9:52 pm", text: "I’ve held Thu 13 Aug, 8:30 am with Dr Tan. Shall I lock it in?" },
  { at: 3.45, me: true, time: "9:52 pm", text: "Yes please! 🙌" },
  {
    at: 3.62,
    time: "9:53 pm",
    text: "Booked ✓ Confirmation is on its way by email, and I’ll message a reminder Wednesday evening. See you Thursday, Priya!",
  },
];

function Phone({ T }: { T: number }) {
  const visible = MSGS.filter((m) => T >= m.at);
  const typing = (T > 1.02 && T < 1.22) || (T > 1.38 && T < 1.5) || (T > 1.78 && T < 1.9) || (T > 3.05 && T < 3.2) || (T > 3.5 && T < 3.62);
  const delivered = T > 0.4;
  const morning = T > 0.92 && T < 1;
  return (
    <div className="h-[620px] w-[300px] rounded-[48px] border border-white/10 bg-black p-[7px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)]">
      <div className="relative h-full w-full overflow-hidden rounded-[41px] bg-[#e9e0d0]">
        {/* header */}
        <div className="relative z-10 bg-[#1b3a36] px-4 pb-3 pt-9 text-cream">
          <span className="absolute left-1/2 top-2.5 h-[20px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-3">
            <span className="text-lg opacity-70">‹</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mint font-serif text-lg text-pine">B</span>
            <div className="leading-tight">
              <p className="text-[13.5px] font-medium">Bondi Junction Dental</p>
              <p className="text-[10.5px] opacity-70">
                {T < 1 ? "Closed · opens 8:00 am" : "Replies instantly · Openwide"}
              </p>
            </div>
          </div>
        </div>
        {/* body */}
        <div
          className="absolute inset-x-0 bottom-0 top-[84px] flex flex-col justify-end gap-2 overflow-hidden px-3 pb-16"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0, black 36px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 36px)",
          }}
        >
          <p className="mx-auto mb-1 rounded-full bg-white/60 px-3 py-1 text-[10px] text-ink/60">
            {T < 1 ? "TUESDAY 11 AUG" : "TUESDAY 11 AUG · 9:47 PM"}
          </p>
          {visible.map((m) => (
            <div key={m.at} className={`flex animate-pop ${m.me ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[84%] rounded-2xl px-3 py-2 text-[12.3px] leading-[1.35] text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] ${
                  m.me ? "rounded-br-md bg-[#d4efc8]" : "rounded-bl-md bg-white"
                }`}
              >
                {m.text}
                <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[9.5px] text-ink/45">
                  {m.time}
                  {m.me && (
                    <span className={m.at === 0.12 && T < 1 ? "text-ink/40" : "text-[#3a9bd6]"}>
                      {m.at === 0.12 && !delivered ? "✓" : "✓✓"}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-twinkle rounded-full bg-ink/40"
                    style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
                  />
                ))}
              </div>
            </div>
          )}
          {T > 0.55 && T < 1 && (
            <p className="mx-auto mt-1 animate-rise rounded-full bg-rose/90 px-3 py-1 text-[10px] font-medium text-white">
              {morning ? "Wednesday 8:02 am · still no reply" : "Delivered · not read"}
            </p>
          )}
        </div>
        {/* composer */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-[#e9e0d0] px-3 pb-5 pt-2">
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-[12px] text-ink/35">Message</div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1b3a36] text-xs text-white">➤</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Companion cards                                                     */
/* ------------------------------------------------------------------ */

function Floating({ show, children, className = "" }: { show: boolean; children: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function fmtMins(m: number) {
  const h = Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  return h > 0 ? `${h}h ${String(mm).padStart(2, "0")}m` : `${mm}m`;
}

function MissedCard({ lp }: { lp: number }) {
  const mins = lerp(0, 615, ease(seg(lp, 0.25, 0.95)));
  return (
    <div className="w-[270px] rounded-3xl bg-cream p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <p className="eyebrow text-[0.62rem] text-rose">Unanswered</p>
      <p className="mt-2 font-serif text-[56px] leading-none tabular-nums">{fmtMins(mins)}</p>
      <p className="mt-2 text-[12px] text-ink/60">Priya has messaged three practices. Only one has replied.</p>
      <div
        className={`mt-4 rounded-2xl border border-ink/10 bg-paper p-3 transition-all duration-700 ${
          lp > 0.62 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <p className="text-[11px] text-ink/50">Bright Smile Co., 4 km away</p>
        <p className="mt-0.5 text-[12.5px] font-medium">“Hi Priya! We’d love to help…”</p>
        <p className="mt-1 text-[10.5px] text-ink/50">Replied 9:49 pm · she books Thursday</p>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-rose/10 px-3 py-2 text-[12px] text-rose">
        <span>Treatment value lost</span>
        <span className="font-medium">≈ $5,800</span>
      </div>
    </div>
  );
}

function ResponseCard({ lp }: { lp: number }) {
  const tags = ["Knows your services", "Your tone of voice", "Never diagnoses", "Hands off to staff"];
  return (
    <div className="w-[260px] rounded-3xl bg-cream p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <p className="eyebrow text-[0.62rem] text-moss">First response</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="font-serif text-[64px] leading-none">8</p>
        <p className="pb-2 text-sm text-ink/60">seconds</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-moss" style={{ width: `${Math.max(6, ease(seg(lp, 0, 0.3)) * 100)}%` }} />
      </div>
      <p className="mt-1.5 text-[10.5px] text-ink/50">vs. a typical next-business-day reply</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <span
            key={t}
            className={`rounded-full border border-moss/25 bg-moss/5 px-2.5 py-1 text-[10.5px] text-pine transition-all duration-500 ${
              lp > 0.15 + i * 0.12 ? "opacity-100" : "opacity-0"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LeadCard({ lp }: { lp: number }) {
  const rows = [
    ["Interested in", "Clear aligners · upper arch"],
    ["Timeline", "Start before 18 Oct wedding"],
    ["Budget", "Open to a payment plan"],
    ["Health cover", "Medibank extras"],
    ["Next step", "30-min consult with Dr Tan"],
  ];
  const score = Math.round(92 * ease(seg(lp, 0.05, 0.6)));
  const C = 2 * Math.PI * 26;
  return (
    <div className="w-[290px] rounded-3xl bg-cream p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-dawn/90 font-serif text-xl text-white">PR</span>
        <div className="flex-1 leading-tight">
          <p className="text-[14px] font-medium">Priya Raman</p>
          <p className="text-[11px] text-ink/50">New lead · WhatsApp · 9:52 pm</p>
        </div>
        <div className="relative h-[60px] w-[60px]">
          <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
            <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(11,21,23,0.1)" strokeWidth="5" />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#2f5a52"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - score / 100)}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[15px] font-medium tabular-nums">{score}</span>
        </div>
      </div>
      <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex items-baseline justify-between gap-3 py-2 text-[12px] transition-all duration-500 ${
              lp > 0.1 + i * 0.12 ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }`}
          >
            <span className="text-ink/50">{k}</span>
            <span className="text-right font-medium">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-moss px-3 py-1 text-[11px] font-medium text-white">High intent · ready to book</span>
        <span className="text-[10.5px] text-ink/45">Synced to chart</span>
      </div>
    </div>
  );
}

function CalendarCard({ lp }: { lp: number }) {
  const booked = lp > 0.2;
  const checks = ["Confirmation sent: WhatsApp + email", "Pre-visit form sent", "Reminder queued · Wed 6:00 pm"];
  return (
    <div className="w-[285px] rounded-3xl bg-cream p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-baseline justify-between">
        <p className="font-serif text-[26px] leading-none">Thu 13 Aug</p>
        <p className="eyebrow text-[0.6rem] text-ink/50">Dr Tan</p>
      </div>
      <div className="mt-4 space-y-1.5 text-[12px]">
        <div className="flex items-center gap-3 rounded-xl bg-ink/[0.05] px-3 py-2 text-ink/55">
          <span className="w-9 font-mono text-[10.5px]">8:00</span>Mr Cole · Check-up
        </div>
        <div
          className={`relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-all duration-700 ${
            booked ? "bg-moss text-white" : "border border-dashed border-ink/25 text-ink/40"
          }`}
        >
          <span className="w-9 font-mono text-[10.5px]">8:30</span>
          <span className="flex-1 font-medium">{booked ? "Priya R. · Aligner consult" : "Open"}</span>
          {booked && <span className="grid h-5 w-5 animate-pop place-items-center rounded-full bg-white text-[10px] text-moss">✓</span>}
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-ink/[0.05] px-3 py-2 text-ink/55">
          <span className="w-9 font-mono text-[10.5px]">9:00</span>Mrs Nguyen · Hygiene
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-ink/20 px-3 py-2 text-ink/35">
          <span className="w-9 font-mono text-[10.5px]">9:30</span>Open
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {checks.map((c, i) => (
          <li
            key={c}
            className={`flex items-center gap-2 text-[11.5px] text-pine transition-all duration-500 ${
              lp > 0.4 + i * 0.16 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-mint text-[9px]">✓</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dashboard({ lp }: { lp: number }) {
  const months = ["S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J", "A"];
  const vals = [12, 15, 19, 18, 24, 28, 31, 33, 38, 41, 44, 47];
  const stats = [
    ["+34", "new patients a month"],
    ["11 s", "median first reply"],
    ["23 h", "back to the team, weekly"],
    ["212", "recall patients returned"],
  ];
  return (
    <div className="w-[540px] rounded-[32px] bg-cream p-7 text-ink shadow-[0_40px_90px_-25px_rgba(60,40,20,0.5)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow text-[0.62rem] text-ink/50">Bondi Junction Dental · last 12 months</p>
          <p className="display mt-2 text-[40px]">
            Bookings from <em className="text-dawn">enquiries</em>
          </p>
        </div>
        <span className="rounded-full bg-mint px-3 py-1 text-[11px] font-medium text-pine">+292% on last year</span>
      </div>
      <div className="mt-6 flex h-[170px] items-end gap-2.5">
        {vals.map((v, i) => {
          const k = ease(seg(lp, i * 0.035, i * 0.035 + 0.4));
          const last = i === vals.length - 1;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <span className={`text-[10px] tabular-nums text-ink/50 ${k > 0.9 ? "opacity-100" : "opacity-0"} transition`}>{v}</span>
              <div
                className={`w-full rounded-t-lg ${last ? "bg-dawn" : "bg-moss/85"}`}
                style={{ height: `${(v / 47) * 130 * k}px` }}
              />
              <span className="font-mono text-[10px] text-ink/40">{months[i]}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {stats.map(([n, l], i) => (
          <div
            key={l}
            className={`rounded-2xl bg-paper p-3 transition-all duration-700 ${
              lp > 0.35 + i * 0.1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p className="font-serif text-[30px] leading-none">{n}</p>
            <p className="mt-1.5 text-[10.5px] leading-tight text-ink/55">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sky                                                                 */
/* ------------------------------------------------------------------ */

function Sky({ p }: { p: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        x: ((i * 9301 + 49297) % 233280) / 2332.8,
        y: ((i * 7919 + 12345) % 233280) / 3332.8,
        s: 1 + (i % 3) * 0.6,
      })),
    []
  );
  const starOp = 1 - seg(p, 0.35, 0.58);
  const moonOp = 1 - seg(p, 0.38, 0.6);
  const moonY = lerp(16, 62, seg(p, 0.25, 0.6));
  const sunOp = seg(p, 0.5, 0.64);
  const sunY = lerp(98, 20, ease(seg(p, 0.5, 0.9)));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div style={{ opacity: starOp }}>
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-cream" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: 0.7 }} />
        ))}
      </div>
      {/* moon */}
      <div className="absolute right-[10%] hidden lg:block" style={{ top: `${moonY}%`, opacity: moonOp }}>
        <div className="h-24 w-24 -translate-y-1/2 rounded-full bg-[#f4efdf] shadow-[0_0_120px_30px_rgba(244,239,223,0.25)]" />
      </div>
      {/* sun */}
      <div className="absolute right-[5%] top-0 lg:right-[8%]" style={{ top: `${sunY}%`, opacity: sunOp }}>
        <div className="h-[420px] w-[420px] -translate-y-1/2 translate-x-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.95)_0%,rgba(245,182,107,0.55)_30%,rgba(238,138,94,0)_68%)] md:h-[620px] md:w-[620px]" />
      </div>
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" height="80" aria-hidden>
        <path
          d="M0 120V70c60-10 90-30 150-24s90 28 160 26 110-34 190-30 120 22 190 20 120-32 200-30 110 26 180 24 120-30 190-26 90 20 180 18V120Z"
          fill={mixColor(FLOOR, p)}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Story() {
  const [ref, p] = useStickyProgress<HTMLDivElement>();
  const T = p * 5;
  const ci = Math.min(4, Math.floor(T));
  const lp = clamp(T - ci);
  const phoneOn = ci < 4;

  return (
    <section id="story" ref={ref} className="relative h-[620vh]">
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ background: mixColor(SKY, p), color: mixColor(TEXT, p) }}
      >
        <Sky p={p} />

        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col px-5 pb-6 pt-20 md:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6 lg:pt-16">
          {/* copy */}
          <div className="lg:col-span-5">
            <div className="grid">
              {CHAPTERS.map((c, i) => {
                const active = i === ci;
                return (
                  <div
                    key={i}
                    aria-hidden={!active}
                    className={`[grid-area:1/1] transition-all duration-700 ${
                      active ? "translate-y-0 opacity-100" : i < ci ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                    }`}
                  >
                    <p className="eyebrow flex items-center gap-3 opacity-70">
                      <span>0{i + 1} / 05</span>
                      <span className="h-px w-8 bg-current opacity-50" />
                      <span>{c.kicker}</span>
                    </p>
                    <p className="mt-3 flex items-baseline gap-3 lg:mt-6">
                      <span className="display text-[clamp(2.8rem,10vw,8.5rem)] tabular-nums">{c.time}</span>
                      <span className="font-serif text-2xl italic opacity-80 md:text-3xl">{c.ampm}</span>
                    </p>
                    <p className="eyebrow mt-1 hidden text-[0.66rem] opacity-60 sm:block">{c.where}</p>
                    <h2 className="display mt-4 max-w-[18ch] text-[clamp(1.55rem,3.4vw,3.2rem)] lg:mt-7">{c.title}</h2>
                    <p className="mt-3 max-w-md text-[0.82rem] leading-snug opacity-75 md:text-[1rem] md:leading-relaxed lg:mt-5">{c.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex gap-1.5 lg:mt-9">
              {CHAPTERS.map((_, i) => (
                <span key={i} className="h-[3px] w-12 overflow-hidden rounded-full bg-current/20">
                  <span
                    className="block h-full bg-current"
                    style={{ width: `${i < ci ? 100 : i === ci ? lp * 100 : 0}%` }}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* stage */}
          <div className="relative min-h-0 flex-1 lg:col-span-7 lg:h-[88%] lg:flex-none">
            <Fit w={600} h={660}>
              {/* phone */}
              <div
                className="absolute left-[22px] top-[20px] transition-all duration-1000 ease-out"
                style={{
                  opacity: phoneOn ? 1 : 0,
                  transform: phoneOn ? "none" : "translateX(-60px) scale(0.92)",
                  filter: phoneOn ? "none" : "blur(6px)",
                }}
              >
                <Phone T={T} />
              </div>

              <Floating show={ci === 0} className="right-0 top-[120px]">
                <MissedCard lp={ci === 0 ? lp : 0} />
              </Floating>
              <Floating show={ci === 1} className="right-0 top-[90px]">
                <ResponseCard lp={ci === 1 ? lp : 0} />
              </Floating>
              <Floating show={ci === 2} className="right-0 top-[120px]">
                <LeadCard lp={ci === 2 ? lp : 0} />
              </Floating>
              <Floating show={ci === 3} className="right-0 top-[110px]">
                <CalendarCard lp={ci === 3 ? lp : 0} />
              </Floating>
              <Floating show={ci === 4} className="left-1/2 top-[70px] -translate-x-1/2">
                <Dashboard lp={ci === 4 ? lp : 0} />
              </Floating>
            </Fit>
          </div>
        </div>
      </div>
    </section>
  );
}
