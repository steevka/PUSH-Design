"use client";

import { useState } from "react";
import { works, type Work } from "@/lib/works";
import { WorkCursorPreview } from "./work-cursor-preview";
import { WorkLightbox } from "./work-lightbox";
import { WorkRow } from "./work-row";

export function SelectedWork() {
  const [hovered, setHovered] = useState<Work | null>(null);
  const [open, setOpen] = useState<Work | null>(null);

  return (
    <section id="work" className="relative bg-bg">
      <div className="border-b border-line px-6 pt-24 pb-12 md:px-10 md:pt-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
              <span className="text-accent">§</span> Selected work
              <span className="ml-3 text-fg-dim">
                /{String(works.length).padStart(2, "0")}
              </span>
            </p>
            <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.03em]">
              Recent work, owned end to end.
            </h2>
          </div>
          <p className="hidden max-w-xs font-mono text-[11px] leading-relaxed uppercase tracking-[0.18em] text-fg-muted md:block">
            Designed, built, wired,
            <br />
            and shipped under one roof.
            <br />
            2024—now.
          </p>
        </div>
      </div>

      <div>
        {works.map((work) => (
          <WorkRow
            key={work.slug}
            work={work}
            active={hovered?.slug === work.slug}
            onHover={() => setHovered(work)}
            onLeave={() =>
              setHovered((prev) => (prev?.slug === work.slug ? null : prev))
            }
            onClick={() => setOpen(work)}
          />
        ))}
      </div>

      <WorkCursorPreview work={hovered} enabled={!open} />
      <WorkLightbox work={open} onClose={() => setOpen(null)} />
    </section>
  );
}
