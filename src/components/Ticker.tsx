const EVENTS = [
  ["TUE 9:47 PM", "Bondi Junction, NSW", "clear aligner enquiry answered in 8s"],
  ["WED 6:12 AM", "Fitzroy, VIC", "CDBS question answered, check-up booked"],
  ["SAT 11:03 PM", "Subiaco, WA", "dental emergency flagged, on-call dentist alerted"],
  ["SUN 2:30 PM", "Paddington, QLD", "whitening quote sent, consult booked"],
  ["MON 5:58 AM", "Glenelg, SA", "recall reply received, Friday 9am filled"],
  ["THU 7:41 PM", "Sandy Bay, TAS", "implant enquiry qualified, intent 84"],
  ["FRI 10:15 PM", "Newtown, NSW", "cancellation refilled from waitlist in 3 min"],
];

export default function Ticker() {
  const row = [...EVENTS, ...EVENTS];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-bone py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-[0.74rem] uppercase tracking-[0.1em] text-ink/70">
        {row.map(([t, w, e], i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-dawn" />
            <span className="text-ink">{t}</span>
            <span className="text-moss">{w}</span>
            <span className="normal-case tracking-normal text-ink/60">{e}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
