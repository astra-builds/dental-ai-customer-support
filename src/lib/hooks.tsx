import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Progress (0..1) through a tall section whose child is sticky. */
export function useStickyProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const next = clamp(-r.top / Math.max(1, total));
      setP((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

/** Progress of an element passing through the viewport (0 = entering bottom, 1 = leaving top). */
export function useViewProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = clamp((vh - r.top) / (vh + r.height));
      setP((prev) => (Math.abs(prev - next) > 0.002 ? next : prev));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "li" | "span";
}) {
  const [ref, seen] = useInView<HTMLElement>(0.12);
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

export function useCountUp(target: number, run: boolean, duration = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const from = 0;
    const tick = (t: number) => {
      const k = clamp((t - t0) / duration);
      setV(lerp(from, target, ease(k)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return v;
}

/** Smoothly tween a number toward a target (for calculators). */
export function useTween(target: number, duration = 500) {
  const [v, setV] = useState(target);
  const vRef = useRef(target);
  useEffect(() => {
    let raf = 0;
    const from = vRef.current;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = clamp((t - t0) / duration);
      const val = lerp(from, target, ease(k));
      vRef.current = val;
      setV(val);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

/** Scales a fixed-size design box to fit its parent. */
export function Fit({
  w,
  h,
  children,
  className = "",
}: {
  w: number;
  h: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const r = el.getBoundingClientRect();
      setS(Math.min(1.08, r.width / w, r.height / h));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className={`relative h-full w-full ${className}`}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: w, height: h, transform: `translate(-50%,-50%) scale(${s})` }}
      >
        {children}
      </div>
    </div>
  );
}

export function mixColor(stops: [number, string][], p: number) {
  const parse = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  let a = stops[0];
  let b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (p >= stops[i][0] && p <= stops[i + 1][0]) {
      a = stops[i];
      b = stops[i + 1];
      break;
    }
  }
  if (p <= stops[0][0]) return stops[0][1];
  if (p >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  const t = (p - a[0]) / (b[0] - a[0]);
  const ca = parse(a[1]);
  const cb = parse(b[1]);
  const c = ca.map((v, i) => Math.round(lerp(v, cb[i], t)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
