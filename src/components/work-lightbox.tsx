"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BrowserFrame } from "./browser-frame";
import type { Work } from "@/lib/works";

interface WorkLightboxProps {
  work: Work | null;
  onClose: () => void;
}

export function WorkLightbox({ work, onClose }: WorkLightboxProps) {
  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          key={work.slug}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
          />

          <motion.article
            className="relative z-10 flex max-h-[90vh] w-[min(1200px,92vw)] flex-col gap-6 overflow-hidden border border-line-strong bg-bg-elev p-6 md:flex-row md:gap-8 md:p-8"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <div className="md:w-[55%]">
              <BrowserFrame url={work.url}>
                <Image
                  src={work.image}
                  alt={`${work.client} — ${work.title}`}
                  width={3006}
                  height={1844}
                  className="h-auto w-full"
                  priority
                  unoptimized
                />
              </BrowserFrame>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8 overflow-y-auto">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                  <span className="text-accent">{work.index}</span>
                  <span>{work.client}</span>
                  <span className="ml-auto">{work.year}</span>
                </div>

                <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.02em] text-fg">
                  {work.title}
                </h3>

                <p className="max-w-md text-sm leading-relaxed text-fg/70">
                  {work.blurb}
                </p>

                <ul className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                  {work.scope.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line-strong px-3 py-1"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6 border-t border-line pt-6">
                {work.hasCaseStudy ? (
                  <Link
                    href={`/work/${work.slug}`}
                    onClick={onClose}
                    className="group inline-flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg transition hover:text-accent"
                  >
                    <span>View full case study</span>
                    <span className="block h-px flex-1 bg-line-strong transition group-hover:bg-accent" />
                    <span>→</span>
                  </Link>
                ) : null}

                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                  <button
                    type="button"
                    onClick={onClose}
                    className="transition hover:text-fg"
                  >
                    ← Close
                  </button>
                  <span className="opacity-50">Esc</span>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
