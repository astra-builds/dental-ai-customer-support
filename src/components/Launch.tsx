import { useState } from "react";
import { Reveal, useViewProgress, seg } from "../lib/hooks";

const STEPS = [
  {
    d: "Days 1–3",
    t: "We listen",
    b: "A short call with your practice manager. We learn your services, fee guide, hours, dentists and the way you talk to patients. We connect to your practice software.",
  },
  {
    d: "Days 4–10",
    t: "We teach it your voice",
    b: "Your tone, your boundaries, your handover rules. You review every kind of reply before a single patient sees one.",
  },
  {
    d: "Days 11–14",
    t: "Quiet launch",
    b: "We go live after hours first. Your team watches the first conversations in real time and says when they’re ready to widen the hours.",
  },
  {
    d: "Then, monthly",
    t: "We keep tuning",
    b: "A plain-English report each month: what patients asked, what booked, what we’d change. Nothing to log into unless you want to.",
  },
];

const FAQ = [
  ["Will patients know it’s not a person?", "Yes, and we make that clear and friendly from the first message. In practice, patients care far more about a fast, helpful answer than about who typed it. Anything sensitive goes straight to your team."],
  ["Does this replace my receptionist?", "No. It takes the 9:47pm messages, the lunch-hour backlog and the follow-ups off their plate. Most practices redeploy that time into patient experience, treatment coordination and the in-person welcome."],
  ["Which practice software does it work with?", "Exact, Dental4Windows, Core Practice, Praktika, Oasis, Cliniko and others. If you use something else, we’ll tell you honestly in the first call whether we can connect."],
  ["Where does patient data live?", "In Australian data centres, encrypted, and handled in line with the Privacy Act 1988 and the Australian Privacy Principles. You own your data. We never use it to train models for anyone else."],
  ["What if it gets something wrong?", "It’s only allowed to answer from the information you approve, and it hands off when unsure. Quotes are estimates your dentist confirms. You can read any conversation, any time."],
  ["How long are contracts?", "Month-to-month after a 60-day pilot. If it isn’t paying for itself by then, you stop. We’d rather earn it."],
];

export default function Launch() {
  const [ref, p] = useViewProgress<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);
  const line = seg(p, 0.3, 0.7);
  return (
    <section className="relative bg-cream px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div ref={ref}>
          <Reveal>
            <p className="eyebrow mb-6 text-moss">Getting started</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display max-w-4xl text-[clamp(2.8rem,6.4vw,6.2rem)]">
              Live in <em className="text-dawn">fourteen days.</em> No rip-and-replace.
            </h2>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-ink/10 lg:block" />
            <div className="absolute left-0 top-[15px] hidden h-px bg-dawn lg:block" style={{ width: `${line * 100}%` }} />
            <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 100}>
                  <span
                    className={`relative z-10 block h-[31px] w-[31px] rounded-full border-2 transition-colors duration-700 ${
                      line > i / 3 - 0.02 ? "border-dawn bg-dawn" : "border-ink/20 bg-cream"
                    }`}
                  />
                  <p className="eyebrow mt-6 text-ink/45">{s.d}</p>
                  <h3 className="display mt-3 text-[2.3rem]">{s.t}</h3>
                  <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink/60">{s.b}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-40 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6 text-moss">Fair questions</p>
              <h3 className="display text-[clamp(2.4rem,4.4vw,4.2rem)]">
                What every practice owner <em className="text-dawn">asks first.</em>
              </h3>
            </Reveal>
          </div>
          <ul className="lg:col-span-8">
            {FAQ.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <li key={q} className="border-t border-ink/15 last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="display text-[clamp(1.4rem,2.2vw,2rem)]">{q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${isOpen ? "rotate-45 border-dawn bg-dawn text-white" : "border-ink/25"}`}>
                      +
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-[1rem] leading-relaxed text-ink/65">{a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
