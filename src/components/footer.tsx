export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="px-6 pt-24 pb-10 md:px-10 md:pt-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
          <span className="text-accent">§</span> Contact
        </p>
        <div className="mt-8 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <a
            href="mailto:hello@workwithpush.com"
            className="block text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-fg transition hover:text-accent"
          >
            hello@
            <br />
            <span className="font-serif italic font-normal">workwithpush</span>
            .com
          </a>
          <ul className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted md:text-right">
            <li>
              <a
                href="https://twitter.com/_workwithpush"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-fg"
              >
                Twitter ↗
              </a>
            </li>
            <li>
              <a
                href="https://www.are.na/push-design"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-fg"
              >
                Are.na ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/workwithpush"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-fg"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim md:flex-row md:items-center">
          <span>© PUSH Design — Independent studio</span>
          <span>Made with care · Berlin / NY</span>
          <span>v0.1.0</span>
        </div>
      </div>
    </footer>
  );
}
