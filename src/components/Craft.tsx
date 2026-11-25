import { useState, type ReactNode } from "react";
import { Reveal } from "../lib/hooks";

/* -------------------------- artefacts -------------------------- */

const Label = ({ children }: { children: ReactNode }) => (
  <p className="eyebrow mb-4 text-[0.62rem] text-mint/80">{children}</p>
);

function ArtBooking() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];
  const taken = new Set(["0-0", "0-2", "1-1", "1-4", "2-0", "2-3", "3-0", "3-2", "3-3", "4-1", "4-2", "0-5", "2-5"]);
  return (
    <div>
      <Label>Live availability · Dr Tan</Label>
      <div className="grid grid-cols-5 gap-2">
        {days.map((d, di) => (
          <div key={d} className="space-y-2">
            <p className="text-center text-[11px] text-cream/50">{d}</p>
            {times.map((t, ti) => {
              const k = `${di}-${ti}`;
              const picked = di === 3 && ti === 1;
              return (
                <div
                  key={k}
                  className={`rounded-lg py-2 text-center font-mono text-[11px] ${
                    picked
                      ? "animate-pop bg-sun font-semibold text-ink shadow-[0_0_30px_rgba(245,182,107,0.5)]"
                      : taken.has(k)
                      ? "bg-white/[0.04] text-cream/20 line-through"
                      : "border border-white/15 text-cream/80"
                  }`}
                >
                  {t}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-cream/60">
        Reads your real diary, so there are no double-bookings. Cancellations are offered to the waitlist within minutes.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-cream/70">
        {["Exact", "Dental4Windows", "Core Practice", "Praktika", "Oasis", "Cliniko"].map((s) => (
          <span key={s} className="rounded-full border border-white/15 px-3 py-1">{s}</span>
        ))}
      </div>
    </div>
  );
}

function Bubble({ me, children, d = 0 }: { me?: boolean; children: ReactNode; d?: number }) {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"} animate-pop`} style={{ animationDelay: `${d}ms` }}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${
          me ? "rounded-br-sm bg-mint text-pine" : "rounded-bl-sm bg-white/10 text-cream"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ArtReceptionist() {
  return (
    <div>
      <Label>Answering for Fitzroy Family Dental · Saturday 6:12 am</Label>
      <div className="space-y-3">
        <Bubble me>Do you take kids on the Child Dental Benefits Schedule?</Bubble>
        <Bubble d={250}>We do! 😊 Eligible kids can have a check-up and clean under CDBS at no cost. Which suburb are you in, and how old is your little one?</Bubble>
        <Bubble me d={500}>Brunswick. She’s 7 and has a wobbly tooth that hurts a bit.</Bubble>
        <Bubble d={750}>Thanks. A sore wobbly tooth is worth a look. Dr Okafor has Monday at 3:40 pm. Want me to hold it? If the pain gets worse or her face swells, call us on 03 5550 0142 straight away.</Bubble>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-cream/70">
        {["Web chat", "WhatsApp", "SMS", "Facebook & Instagram DMs", "Email"].map((s) => (
          <span key={s} className="rounded-full border border-white/15 px-3 py-1">{s}</span>
        ))}
      </div>
    </div>
  );
}

function ArtQualify() {
  const leads = [
    { n: "Priya R.", s: 92, t: "Clear aligners · wedding Oct", a: "Book consult", c: "bg-mint" },
    { n: "Tom B.", s: 88, t: "Cracked tooth, pain overnight", a: "Urgent · call now", c: "bg-dawn" },
    { n: "Lena K.", s: 63, t: "Implant, 6 months out, comparing", a: "Nurture · send guide", c: "bg-sun" },
    { n: "Mei W.", s: 31, t: "Whitening price check", a: "Auto follow-up", c: "bg-cream/40" },
  ];
  return (
    <div>
      <Label>Tonight’s enquiries, ranked by intent</Label>
      <div className="space-y-2.5">
        {leads.map((l, i) => (
          <div key={l.n} className="animate-pop rounded-2xl border border-white/10 bg-white/[0.05] p-4" style={{ animationDelay: `${i * 120}ms` }}>
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-medium">{l.n}</p>
              <p className="font-serif text-2xl tabular-nums">{l.s}</p>
            </div>
            <p className="text-[12px] text-cream/55">{l.t}</p>
            <div className="mt-2.5 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full ${l.c}`} style={{ width: `${l.s}%` }} />
              </div>
              <span className="text-[11px] text-cream/70">{l.a}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtFollow() {
  const steps = [
    ["Day 0", "Instant reply and a question or two", true],
    ["Day 1", "Email: Dr Tan’s guide to clear aligners", true],
    ["Day 3", "WhatsApp: “Any questions I can help with?”", true],
    ["Day 7", "“A few Thursday mornings just opened up”", false],
    ["Day 21", "Gentle check-in, then we stop. No nagging.", false],
  ] as const;
  return (
    <div>
      <Label>Follow-up sequence · stops the moment she books</Label>
      <div className="relative ml-2 border-l border-white/15 pl-7">
        {steps.map(([d, t, done], i) => (
          <div key={d} className="relative pb-6 animate-rise last:pb-0" style={{ animationDelay: `${i * 130}ms` }}>
            <span className={`absolute -left-[37px] top-0.5 grid h-5 w-5 place-items-center rounded-full text-[9px] ${done ? "bg-mint text-pine" : "border border-white/30 bg-pine"}`}>
              {done ? "✓" : ""}
            </span>
            <p className="font-mono text-[11px] text-sun">{d}</p>
            <p className="mt-0.5 text-[14px] text-cream/85">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtQuote() {
  return (
    <div>
      <Label>Treatment enquiry · quote draft</Label>
      <div className="rounded-3xl bg-cream p-6 text-ink">
        <p className="text-[12px] text-ink/50">For Priya R. · Clear aligners · upper arch</p>
        <p className="display mt-2 text-[44px]">$4,500 – $7,500</p>
        <div className="mt-4 space-y-2 text-[12.5px]">
          {[
            ["Consult + 3D scan", "$180"],
            ["Aligner plan (upper, ~14 wks)", "from $4,100"],
            ["Retainers", "$320"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between border-b border-ink/10 pb-2">
              <span className="text-ink/65">{a}</span>
              <span className="font-medium">{b}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink/50">Built from your own fee guide. Medibank HICAPS estimate shown separately.</p>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-mint/30 bg-mint/10 px-4 py-3 text-[12.5px] text-mint">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-mint text-[10px] text-pine">✓</span>
        Estimate only. Dr Tan reviews and confirms before anything is final.
      </div>
    </div>
  );
}

function ArtChannels() {
  return (
    <div>
      <Label>Messages that sound like you</Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#d4efc8] p-4 text-ink">
          <p className="eyebrow text-[0.58rem] text-ink/50">WhatsApp · recall</p>
          <p className="mt-2 text-[13px] leading-snug">
            Hi Sam 👋 it’s been about six months since your last clean at Glenelg Dental Studio. Tuesday arvo or Friday morning work better for you?
          </p>
          <p className="mt-3 text-[11px] text-ink/50">Sam replied in 4 minutes</p>
        </div>
        <div className="rounded-2xl bg-cream p-4 text-ink">
          <p className="eyebrow text-[0.58rem] text-ink/50">Email · after treatment</p>
          <p className="mt-2 text-[13px] font-medium leading-snug">Looking after your tooth tonight</p>
          <p className="mt-1 text-[12px] leading-snug text-ink/65">
            No hot drinks for two hours, soft foods tomorrow, and here’s who to call if anything feels off…
          </p>
          <p className="mt-3 text-[11px] text-ink/50">Sent 20 minutes after the appointment</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          ["94%", "WhatsApp read rate"],
          ["212", "recalls booked, Q1"],
          ["0", "reminder calls made"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-white/10 py-4">
            <p className="font-serif text-3xl">{n}</p>
            <p className="mt-1 text-[10.5px] text-cream/55">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtRecommend() {
  const recs = [
    ["Clear aligners", "Matches “straightening, top teeth, before October”", "Primary"],
    ["Whitening, after treatment", "She mentioned wedding photos", "Add-on"],
    ["Retainer & check-in plan", "Protects the result once aligners finish", "Add-on"],
  ];
  return (
    <div>
      <Label>Suggested next steps for Priya</Label>
      <div className="space-y-3">
        {recs.map(([t, w, tag], i) => (
          <div key={t} className="animate-pop flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4" style={{ animationDelay: `${i * 140}ms` }}>
            <span className="font-serif text-3xl text-sun">{i + 1}</span>
            <div className="flex-1">
              <p className="text-[14px] font-medium">{t}</p>
              <p className="mt-0.5 text-[12px] text-cream/55">{w}</p>
            </div>
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-cream/70">{tag}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12.5px] leading-relaxed text-cream/60">
        Suggestions are drawn from what the patient asked for and the treatments you offer. A clinician decides what’s appropriate. Always.
      </p>
    </div>
  );
}

/* -------------------------- section -------------------------- */

const ITEMS = [
  {
    t: "Booking automation",
    h: "The diary fills itself.",
    d: "Patients pick from live availability on the channel they’re already using. Cancellations are refilled from the waitlist before anyone picks up a phone.",
    art: <ArtBooking />,
  },
  {
    t: "AI receptionist",
    h: "A front desk that never clocks off.",
    d: "Fees, parking, CDBS, “do you do Saturdays?”. Answered accurately in your voice, around the clock, and handed to a human the moment it should be.",
    art: <ArtReceptionist />,
  },
  {
    t: "Lead qualification",
    h: "Know who’s ready before anyone calls.",
    d: "Every conversation is scored for intent and urgency, so your team’s first call of the day goes to the patient who most needs it.",
    art: <ArtQualify />,
  },
  {
    t: "Lead management",
    h: "No enquiry goes quiet.",
    d: "Considerate, well-timed follow-up that picks up where a busy week left off, and stops the moment someone books.",
    art: <ArtFollow />,
  },
  {
    t: "Quotes & treatment enquiries",
    h: "Ballparks in minutes, not days.",
    d: "Patients get an honest range built from your own fee guide. Your dentist confirms the details. Nothing is promised that you haven’t approved.",
    art: <ArtQuote />,
  },
  {
    t: "WhatsApp & email",
    h: "Meet patients where they already are.",
    d: "Recalls, reminders, forms, aftercare and reactivation, written once in your tone and sent at the right moment.",
    art: <ArtChannels />,
  },
  {
    t: "Treatment recommendations",
    h: "The right next step, suggested.",
    d: "Relevant treatments and products surfaced from what the patient actually said. Presented as options, with the clinician in charge.",
    art: <ArtRecommend />,
  },
];

export default function Craft() {
  const [open, setOpen] = useState(0);
  return (
    <section id="craft" className="relative bg-paper px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 text-moss">What we automate</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-[clamp(2.8rem,6.6vw,6.4rem)]">
                Seven things that stop <em className="text-dawn">falling through the cracks.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-[1.02rem] leading-relaxed text-ink/65">
              Not software for your team to learn. A quiet layer underneath your practice that handles the repetitive parts, and plugs into the practice management system you already use.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-6">
            {ITEMS.map((it, i) => {
              const active = open === i;
              return (
                <li key={it.t} className="border-t border-ink/15 last:border-b">
                  <button
                    onClick={() => setOpen(i)}
                    className="group flex w-full items-start gap-5 py-6 text-left md:gap-8 md:py-7"
                    aria-expanded={active}
                  >
                    <span className={`eyebrow pt-2 transition ${active ? "text-dawn" : "text-ink/35"}`}>0{i + 1}</span>
                    <span className="flex-1">
                      <span className={`block text-[0.78rem] uppercase tracking-[0.14em] transition ${active ? "text-moss" : "text-ink/45"}`}>
                        {it.t}
                      </span>
                      <span className={`display mt-1 block text-[clamp(1.7rem,3vw,2.7rem)] transition ${active ? "text-ink" : "text-ink/45 group-hover:text-ink/70"}`}>
                        {it.h}
                      </span>
                      <span
                        className={`grid transition-all duration-500 ${active ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-md text-[0.95rem] leading-relaxed text-ink/65">{it.d}</span>
                        </span>
                      </span>
                    </span>
                    <span
                      className={`mt-2 grid h-8 w-8 place-items-center rounded-full border text-sm transition ${
                        active ? "rotate-45 border-dawn bg-dawn text-white" : "border-ink/25 text-ink/50"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {/* mobile artefact */}
                  {active && (
                    <div className="mb-6 rounded-[1.75rem] bg-pine p-5 text-cream lg:hidden" key={`m${i}`}>
                      {it.art}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <div className="grain relative min-h-[600px] overflow-hidden rounded-[2.2rem] bg-pine p-9 text-cream shadow-[0_40px_90px_-30px_rgba(23,59,55,0.6)]">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(238,138,94,0.35),transparent_70%)]" />
                <div className="relative" key={open}>
                  {ITEMS[open].art}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
