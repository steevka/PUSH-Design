import { HeroCanvas } from "./hero-canvas";

const HERO_VIDEO = "/hero.mp4";

export function Hero() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-bg">
      <HeroCanvas src={HERO_VIDEO} video />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 md:px-10">
        <div
          aria-label="PUSH"
          role="img"
          className="w-[65vw] max-w-[1050px] md:w-[56vw]"
          style={{
            aspectRatio: "921.2646 / 325",
            maskImage: "url(/push-mask.svg)",
            WebkitMaskImage: "url(/push-mask.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            backdropFilter: "blur(28px) brightness(1.9) saturate(1.4)",
            WebkitBackdropFilter: "blur(28px) brightness(1.9) saturate(1.4)",
            backgroundColor: "rgba(255, 255, 255, 0.22)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45vh] bg-gradient-to-b from-transparent via-bg/50 to-bg"
      />

      <div className="pointer-events-none relative z-30 flex h-full flex-col justify-between px-6 pt-28 pb-10 md:px-10 md:pb-16">
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60">
          <span>
            Studio online <span className="ml-2 text-accent">●</span>
          </span>
          <span className="text-right">
            Independent
            <br />
            Est. 2019
          </span>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-fg/65">
            A studio that owns the work end to end —
            <br className="hidden md:block" />
            brand systems, interfaces, software,
            <br className="hidden md:block" />
            and the automations between.
          </p>
          <a
            href="#work"
            className="group pointer-events-auto inline-flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70 transition hover:text-fg md:self-auto"
          >
            <span>Selected work</span>
            <span className="block h-px w-12 bg-fg/40 transition group-hover:w-20 group-hover:bg-fg" />
          </a>
        </div>
      </div>
    </section>
  );
}
