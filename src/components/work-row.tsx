"use client";

import type { Work } from "@/lib/works";

interface WorkRowProps {
  work: Work;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export function WorkRow({
  work,
  active,
  onHover,
  onLeave,
  onClick,
}: WorkRowProps) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      className="group relative block w-full cursor-pointer border-b border-line text-left"
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 bottom-0 w-px bg-accent transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-top ${
          active ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <div
        className={`grid grid-cols-12 items-center gap-4 px-6 py-6 transition-colors duration-500 md:px-10 md:py-8 ${
          active ? "bg-bg-elev" : ""
        }`}
      >
        <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent md:col-span-1">
          {work.index}
        </span>

        <span
          className={`col-span-10 font-mono text-[11px] uppercase tracking-[0.22em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:col-span-2 ${
            active
              ? "translate-x-2 text-fg"
              : "translate-x-0 text-fg-muted"
          }`}
        >
          {work.client}
        </span>

        <span
          className={`col-span-12 text-[clamp(1.1rem,2vw,1.55rem)] leading-[1.1] tracking-[-0.02em] transition-[color,transform,letter-spacing] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:col-span-7 md:col-start-4 ${
            active ? "translate-x-2 text-fg" : "translate-x-0 text-fg/85"
          }`}
        >
          {work.title}
        </span>

        <span className="col-span-9 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted md:col-span-1 md:col-start-11 md:text-right">
          {work.scope.join(" · ")}
        </span>

        <span
          className={`col-span-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] transition-[color,transform] duration-500 md:col-span-1 md:col-start-12 ${
            active ? "-translate-x-2 text-fg" : "translate-x-0 text-fg-muted"
          }`}
        >
          {work.year}
        </span>
      </div>
    </button>
  );
}
