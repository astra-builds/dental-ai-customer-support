import { useEffect, useRef, useState } from "react";
import { Reveal, useCountUp, useInView } from "../lib/hooks";

const STORIES = [
  {
    practice: "Bondi Junction Dental",
    place: "Sydney, NSW",
    who: "Dr Mei Lin Tan",
    role: "Principal Dentist",
    quote: "We used to arrive to a pile of voicemails and a sinking feeling. Now we arrive to bookings, and notes on every one of them.",
    stats: [["+34", "new patients a month"], ["11 s", "median first reply"]],
    tint: "bg-dawn",
  },
  {
    practice: "Fitzroy Family Dental",
    place: "Melbourne, VIC",
    who: "Jess Callahan",
    role: "Practice Manager",
    quote: "The girls on the desk aren’t glued to the phone anymore. They greet people by name and actually look up. That’s the real result.",
    stats: [["19 h", "back to the team weekly"], ["−62%", "inbound phone tag"]],
    tint: "bg-mint",
  },
  {
    practice: "Subiaco Orthodontics",
    place: "Perth, WA",
    who: "Dr Arjun Mehta",
    role: "Specialist Orthodontist",
    quote: "Quotes used to take two days. Now families get an honest ballpark and a consult booked in minutes, and nothing has gone out that I wouldn’t say myself.",
    stats: [["2.4×", "consult bookings"], ["6 min", "average to booked"]],
    tint: "bg-sun",
  },
  {
    practice: "Glenelg Dental Studio",
    place: "Adelaide, SA",
    who: "Hannah Doyle",
    role: "Owner & Hygienist",
    quote: "We’d given up on a recall list of 600 people. Openwide wrote to them like we would have. 212 came back in the first quarter.",
    stats: [["212", "patients recalled"], ["$118k", "extra production, 90 days"]],
    tint: "bg-rose",
  },
];

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="display text-5xl md:text-6xl">{n}</p>
      <p className="mt-2 text-[12.5px] text-ink/55">{l}</p>
    </div>
  );
}

function Big({ to, suffix, prefix = "", label }: { to: number; suffix: string; prefix?: string; label: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(to, seen);
  return (
    <div ref={ref} className="border-t border-ink/15 pt-6">
      <p className="display text-[clamp(3.4rem,6vw,5.6rem)] text-pine tabular-nums">
        {prefix}
        {Math.round(v)}
        {suffix}
      </p>
      <p className="mt-2 max-w-[18ch] text-[0.9rem] leading-snug text-ink/60">{label}</p>
    </div>
  );
}

export default function Proof() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(() => setI((x) => (x + 1) % STORIES.length), 8000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [i, paused]);
  const s = STORIES[i];

  return (
    <section id="proof" className="relative bg-paper px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <p className="eyebrow mb-6 text-moss">Practices like yours</p>
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative min-h-[420px] md:min-h-[400px]" key={i}>
              <span className="display absolute -left-1 -top-10 text-[9rem] leading-none text-dawn/30 md:-left-4 md:text-[13rem]">“</span>
              <blockquote className="display relative animate-rise text-[clamp(1.9rem,4vw,3.7rem)] leading-[1.05]">
                {s.quote}
              </blockquote>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <span className={`grid h-14 w-14 place-items-center rounded-full ${s.tint} font-serif text-xl text-ink`}>
                  {s.who.split(" ").slice(-2).map((w) => w[0]).join("")}
                </span>
                <div>
                  <p className="font-medium">{s.who}</p>
                  <p className="text-[13px] text-ink/55">
                    {s.role} · {s.practice}, {s.place}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {STORIES.map((x, k) => (
                <button
                  key={x.practice}
                  onClick={() => setI(k)}
                  className={`relative overflow-hidden rounded-full border px-4 py-2 text-[12.5px] transition ${
                    k === i ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink/60 hover:border-ink/50"
                  }`}
                >
                  {x.place.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-10 lg:col-span-3 lg:col-start-10" key={`s${i}`}>
            {s.stats.map(([n, l]) => (
              <div key={l} className="animate-rise border-t border-ink/15 pt-6">
                <Stat n={n} l={l} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          <Big to={11} suffix=" s" label="median time to first reply, across practices" />
          <Big to={31} suffix="%" prefix="+" label="more new-patient bookings in the first 90 days" />
          <Big to={21} suffix=" h" label="of admin handed back per practice, per week" />
          <Big to={97} suffix="%" label="of enquiries answered inside one minute" />
        </div>
        <p className="mt-10 text-[11.5px] text-ink/40">
          Practices, people and figures on this page are fictional placeholders for design purposes.
        </p>
      </div>
    </section>
  );
}
