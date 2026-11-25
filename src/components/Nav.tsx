export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M3 13a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 13c3.2 4.6 16.8 4.6 20 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="13" cy="13" r="2.2" fill="currentColor" />
      </svg>
      <span className="font-serif text-[1.55rem] leading-none tracking-tight">openwide</span>
    </span>
  );
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
        <a href="#top" aria-label="Openwide home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-9 text-[0.82rem] md:flex">
          <a href="#story" className="opacity-80 transition hover:opacity-100">The night shift</a>
          <a href="#craft" className="opacity-80 transition hover:opacity-100">What we automate</a>
          <a href="#care" className="opacity-80 transition hover:opacity-100">Guardrails</a>
          <a href="#proof" className="opacity-80 transition hover:opacity-100">Practices</a>
        </nav>
        <a
          href="#book"
          className="rounded-full border border-white/70 px-4 py-2 text-[0.8rem] transition hover:bg-white hover:text-black"
        >
          Book a walkthrough
        </a>
      </div>
    </header>
  );
}
