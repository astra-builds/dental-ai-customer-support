import { useState, type FormEvent } from "react";
import { Reveal } from "../lib/hooks";
import { Logo } from "./Nav";

const inputCls =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-[0.95rem] text-cream placeholder:text-cream/35 outline-none transition focus:border-sun focus:bg-white/10";

export default function Finale() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <section id="book" className="grain relative overflow-hidden bg-ink px-5 pb-0 pt-28 text-cream md:px-10 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_20%,rgba(70,140,130,0.2),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(70%_100%_at_50%_130%,rgba(238,138,94,0.7),rgba(245,182,107,0.25)_40%,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 pb-40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 text-mint/80">Tonight at 9:47</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-[clamp(3.2rem,8vw,8rem)]">
                Someone’s about to <em className="text-sun">message you.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-[1.1rem] leading-relaxed text-cream/65">
                Book a 20-minute walkthrough. We’ll show you Openwide answering as your practice, using your services and your fees, and put a real number on what you’re leaving unanswered.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <ul className="mt-10 space-y-3 text-[0.95rem] text-cream/75">
                {["No obligation, no hard sell", "A working demo trained on your practice’s public website", "60-day pilot, then month-to-month"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-mint text-[10px] text-pine">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5">
            <div className="rounded-[2rem] border border-white/10 bg-ink/60 p-7 backdrop-blur-xl md:p-9">
              {sent ? (
                <div className="animate-pop py-10 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint text-xl text-pine">✓</span>
                  <p className="display mt-6 text-4xl">Thanks{name ? `, ${name.split(" ")[0]}` : ""}.</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/60">
                    We’ll reply within one business hour. Fittingly, you’ll get a message in about eight seconds confirming this one.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <p className="display text-3xl">See it answer as <em className="text-sun">you.</em></p>
                  <input required className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input required className={inputCls} placeholder="Practice name and suburb" />
                  <input required type="email" className={inputCls} placeholder="Work email" />
                  <select className={`${inputCls} appearance-none`} defaultValue="">
                    <option value="" disabled>Enquiries a month (roughly)</option>
                    <option className="text-ink">Under 60</option>
                    <option className="text-ink">60 – 150</option>
                    <option className="text-ink">150 – 300</option>
                    <option className="text-ink">300+</option>
                  </select>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-sun px-7 py-4 text-[0.95rem] font-medium text-ink transition hover:bg-cream"
                  >
                    Book my walkthrough
                    <span className="transition group-hover:translate-x-1">→</span>
                  </button>
                  <p className="text-center text-[11.5px] text-cream/40">We’ll only use your details to arrange the walkthrough.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="relative bg-[#070e10] px-5 py-14 text-cream/60 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-cream" />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">AI front-desk automation for Australian dental practices. Made in Naarm (Melbourne) and Gadigal Country (Sydney).</p>
          </div>
          <div className="text-[13px] leading-relaxed lg:col-span-5">
            <p className="text-cream/80">Acknowledgement of Country</p>
            <p className="mt-2">
              We acknowledge the Traditional Custodians of the lands on which we work and live, and pay our respects to Elders past and present.
            </p>
          </div>
          <div className="flex gap-8 text-[13px] lg:col-span-3 lg:justify-end">
            <div className="space-y-2">
              <a href="#story" className="block hover:text-cream">The night shift</a>
              <a href="#craft" className="block hover:text-cream">What we automate</a>
              <a href="#care" className="block hover:text-cream">Guardrails</a>
            </div>
            <div className="space-y-2">
              <a href="#maths" className="block hover:text-cream">Do the maths</a>
              <a href="#proof" className="block hover:text-cream">Practices</a>
              <a href="#book" className="block hover:text-cream">Book</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1500px] flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[11.5px] text-cream/35">
          <p>© Openwide Pty Ltd · ABN 00 000 000 000 · Placeholder company for design purposes.</p>
          <p>All practices, people, conversations and statistics are fictional. *Industry reply-time figure is illustrative.</p>
        </div>
      </footer>
    </>
  );
}
