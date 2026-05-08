import type { ReactNode } from "react";

interface BrowserFrameProps {
  url?: string;
  children: ReactNode;
}

export function BrowserFrame({ url, children }: BrowserFrameProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-line-strong bg-bg-elev shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-3 border-b border-line-strong bg-bg/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-fg-dim/80" />
          <span className="block h-2.5 w-2.5 rounded-full bg-fg-dim/80" />
          <span className="block h-2.5 w-2.5 rounded-full bg-fg-dim/80" />
        </div>
        {url ? (
          <div className="ml-2 inline-flex max-w-[60%] items-center gap-2 truncate rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            <span className="text-fg-dim">↗</span>
            <span className="truncate">{url}</span>
          </div>
        ) : null}
      </div>
      <div className="bg-bg-elev">{children}</div>
    </div>
  );
}
