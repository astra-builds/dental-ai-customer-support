import { useState } from "react";
import { Reveal, useTween } from "../lib/hooks";

const aud = (n: number) => "$" + Math.round(n).toLocaleString("en-AU");

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  fmt,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  fmt: (n: number) => string;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[0.95rem] text-cream/80">{label}</label>
        <span className="display text-4xl text-sun">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full text-cream/40"
        aria-label={label}
      />
      <p className="mt-2 text-[12px] text-cream/40">{hint}</p>
    </div>
  );
}

export default function Calculator() {
  const [enq, setEnq] = useState(140);
  const [missed, setMissed] = useState(35);
  const [value, setValue] = useState(1800);

  const lost = enq * (missed / 100);
  const recovered = lost * 0.32; // share of previously-missed enquiries that go on to book
  const annual = recovered * value * 12;
  const hours = Math.round((enq * 0.12 + 6) * 1.1);

  const tAnnual = useTween(annual);
  const tRec = useTween(recovered);
  const tHours = useTween(hours);

  return (
    <section id="maths" className="grain relative overflow-hidden bg-pine px-5 py-28 text-cream md:px-10 md:py-40">
      <div className="pointer-events-none absolute -bottom-60 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(238,138,94,0.35),transparent)]" />
      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <p className="eyebrow mb-6 text-mint/80">Do the maths</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display max-w-4xl text-[clamp(2.8rem,6.4vw,6.2rem)]">
            What is an unanswered enquiry <em className="text-sun">actually</em> costing you?
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-12 lg:col-span-5">
            <Slider
              label="Enquiries a month"
              value={enq}
              min={30}
              max={500}
              step={5}
              onChange={setEnq}
              fmt={(n) => String(n)}
              hint="Calls, web forms, DMs, WhatsApp and email combined."
            />
            <Slider
              label="Go unanswered or slow"
              value={missed}
              min={5}
              max={70}
              step={1}
              onChange={setMissed}
              fmt={(n) => `${n}%`}
              hint="After hours, lunch breaks, busy mornings, Saturdays."
            />
            <Slider
              label="Value of a new patient"
              value={value}
              min={400}
              max={6000}
              step={100}
              onChange={setValue}
              fmt={aud}
              hint="Average first-year value. Aligners and implants lift this."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur md:p-12">
              <p className="eyebrow text-[0.65rem] text-cream/50">Revenue waiting in your inbox, every year</p>
              <p className="display mt-4 text-[clamp(3.8rem,10vw,9rem)] tabular-nums text-cream">{aud(tAnnual)}</p>
              <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div>
                  <p className="display text-5xl text-sun tabular-nums">{Math.round(lost)}</p>
                  <p className="mt-2 text-[12.5px] leading-snug text-cream/55">enquiries slipping away each month</p>
                </div>
                <div>
                  <p className="display text-5xl text-mint tabular-nums">+{tRec.toFixed(0)}</p>
                  <p className="mt-2 text-[12.5px] leading-snug text-cream/55">extra new patients a month</p>
                </div>
                <div>
                  <p className="display text-5xl text-cream tabular-nums">{Math.round(tHours)} h</p>
                  <p className="mt-2 text-[12.5px] leading-snug text-cream/55">of admin handed back to your team, monthly</p>
                </div>
              </div>
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-cream/40">
              Illustrative estimate. Assumes about a third of currently-missed enquiries become booked new patients once answered instantly. Your walkthrough will use your own numbers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
