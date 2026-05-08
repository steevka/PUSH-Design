const capabilities = [
  "Brand systems",
  "Interface design",
  "Web & product",
  "Software & APIs",
  "Automation & workflows",
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-bg border-b border-line"
    >
      <div className="grid grid-cols-12 gap-6 px-6 pt-24 pb-24 md:px-10 md:pt-40 md:pb-40">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
            <span className="text-accent">§</span> About
          </p>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-fg">
            PUSH works at the seam of design and engineering. Brands,
            websites, interfaces, software —{" "}
            <span className="font-serif italic font-normal text-fg-muted">
              designed, built, and shipped under one roof.
            </span>
          </h2>

        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
            Capabilities / 05
          </p>
          <ul className="mt-6 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/70">
            {capabilities.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 border-b border-line py-2 last:border-b-0"
              >
                <span className="text-accent">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
