import Link from "next/link";

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-fg"
          aria-label="PUSH home"
        >
          PUSH
        </Link>
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#about" className="opacity-70 transition hover:opacity-100">
                About
              </a>
            </li>
            <li>
              <a href="#work" className="opacity-70 transition hover:opacity-100">
                Work
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@workwithpush.com"
                className="opacity-70 transition hover:opacity-100"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
