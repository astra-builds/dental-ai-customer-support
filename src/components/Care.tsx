import { Reveal, useViewProgress } from "../lib/hooks";

const IMG = {
  a: "https://images.pexels.com/photos/5355723/pexels-photo-5355723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
  b: "https://images.pexels.com/photos/3845553/pexels-photo-3845553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  c: "https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=900",
};

const NEVER = [
  ["Diagnose or give clinical advice", "It can explain what a service is. It can’t tell anyone what they need."],
  ["Pretend to be a person", "Patients are told they’re talking to the practice’s virtual assistant, in a friendly way."],
  ["Handle an emergency alone", "Swelling, bleeding, trauma or severe pain trigger an instant handover, call-now guidance and an on-call alert."],
  ["Make claims you couldn’t make yourself", "Messaging is written to respect AHPRA and National Law advertising guidelines. No testimonials, no guarantees."],
  ["Send data offshore", "Patient information stays in Australian data centres, handled in line with the Privacy Act 1988 and the APPs."],
];

export default function Care() {
  const [ref, p] = useViewProgress<HTMLDivElement>();
  const y1 = (p - 0.5) * -60;
  const y2 = (p - 0.5) * 36;
  const y3 = (p - 0.5) * -16;
  return (
    <section id="care" className="relative bg-cream px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]" ref={ref}>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6 text-moss">Humans stay human</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-[clamp(2.8rem,6vw,6rem)]">
                Automate the admin. <em className="text-dawn">Keep the care.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg text-[1.05rem] leading-relaxed text-ink/65">
                Nobody trained for five years to chase a missed call. When the enquiries answer themselves, your receptionist can greet Mrs Nguyen by name, your dentist can finish the sentence, and your nurse can sit with the nervous kid for an extra minute.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/15 pt-8">
                {[
                  ["23 h", "a week handed back"],
                  ["3×", "fewer interruptions at the desk"],
                  ["0", "patients told “call back tomorrow”"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="display text-4xl text-pine">{n}</p>
                    <p className="mt-2 text-[12px] leading-snug text-ink/55">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-7" style={{ transform: `translateY(${y1}px)` }}>
                <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-bone">
                  <img src={IMG.a} alt="A dentist smiling as she explains a treatment model to a relaxed patient" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="col-span-5 pt-24" style={{ transform: `translateY(${y2}px)` }}>
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-bone">
                  <img src={IMG.c} alt="A receptionist and clinician talking at a clinic front desk" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-4 text-[12px] leading-snug text-ink/55">Front desk, 8:40 am. A real conversation, not a ringing phone.</p>
              </div>
              <div className="col-span-12 md:col-span-9 md:col-start-4" style={{ transform: `translateY(${y3}px)` }}>
                <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-bone">
                  <img src={IMG.b} alt="A patient smiling in the dental chair while talking to the dentist" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* guardrails */}
        <div className="mt-32 grid gap-12 rounded-[2.5rem] bg-ink p-8 text-cream md:p-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5 text-mint/80">Built for healthcare</p>
              <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)]">
                What Openwide will <em className="text-sun">never</em> do.
              </h3>
              <p className="mt-6 text-[0.98rem] leading-relaxed text-cream/60">
                Trust is the whole product. These aren’t settings you have to remember to switch on. They’re how it’s built.
              </p>
            </Reveal>
          </div>
          <ul className="divide-y divide-white/10 lg:col-span-8">
            {NEVER.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="flex gap-5 py-5 first:pt-0 md:gap-8">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-rose/60 text-[11px] text-rose">✕</span>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <p className="text-[1.05rem] font-medium">{t}</p>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-cream/55 md:mt-0">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
