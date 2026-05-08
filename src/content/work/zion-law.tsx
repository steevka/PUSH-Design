import { BrowserFrame } from "@/components/browser-frame";
import type { WorkMetadata } from "./types";

export const metadata: WorkMetadata = {
  slug: "zion-law",
  index: "03",
  client: "Zion Law",
  title: "A law firm with both halves in the same design language.",
  year: 2025,
  scope: ["Brand", "Web", "Ops"],
  blurb:
    "Brand identity, public website, and an internal operations layer for a Northeast Ohio law firm covering business, M&A, real estate, and estate planning.",
  image: "/cases/zion-law/hero.png",
  url: "zionlaw.llc",
  hasCaseStudy: true,
};

export default function ZionLawCaseStudy() {
  return (
    <>
      <section>
        <h2>The brief</h2>
        <p>
          Zion Law is a Northeast Ohio firm covering business law, M&amp;A and
          succession, real estate, and estate planning. The mandate spanned
          both surfaces of a modern practice: a public website that earns
          trust without performing it, and an internal operations layer that
          gives the firm room to move.
        </p>
      </section>

      <section>
        <h2>What it is</h2>
        <p>
          A custom identity built around a geometric serif wordmark and a
          warm-neutral palette accented in gold. An Astro-first marketing
          site with four practice areas rendered as numbered cards, a
          spam-protected intake flow, and a blog with proper RSS and sitemap
          generation. A separate React admin dashboard for the firm itself,
          living on its own Vercel project, that handles authoring,
          analytics, and live integrations into the tools the practice
          already runs on.
        </p>
      </section>

      <figure>
        <BrowserFrame url="zionlaw.llc">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/zion-law/screen-02.png"
            alt="Zion Law practice area surface"
          />
        </BrowserFrame>
        <figcaption>
          A second surface inside the marketing site.
        </figcaption>
      </figure>

      <section>
        <h2>Highlights</h2>
        <ul>
          <li>
            Custom identity built around a geometric serif wordmark and a
            four-color palette of cream, warm grey, ink, and gold.
          </li>
          <li>
            Astro-first marketing site for speed and SEO. Markdown-based
            content, dynamic blog routing, RSS, and sitemap generation
            included.
          </li>
          <li>
            Cloudflare Turnstile on every intake form to keep spam volume
            quiet.
          </li>
          <li>
            Internal ops dashboard on a separate Vercel project, covering
            blog authoring (Tiptap), analytics, and OAuth bridges into Clio
            and Microsoft 365 for SSO and draft automation.
          </li>
          <li>
            AI intake decision briefs powered by Claude Sonnet, summarizing
            new matter conversations into structured triage notes.
          </li>
          <li>
            Staged authentication rollout, from shared password to Microsoft
            Entra SSO with email allowlist, then Conditional Access and
            Intune.
          </li>
        </ul>
      </section>

      <section>
        <h2>Stack</h2>
        <p>
          Marketing site: Astro 5, Tailwind CSS, Geist Variable, hosted on
          Vercel. Ops layer: React 19, Vite, Tiptap, Neon Postgres, Vercel
          Blob for media, Clio and Microsoft 365 OAuth, Claude Sonnet for
          AI-assisted intake. Identity drawn in code; wordmark shipped as a
          custom SVG component.
        </p>
      </section>

      <section>
        <h2>Outcome</h2>
        <p>
          A firm with both halves of its operation living in the same design
          language. The public site reads as a serious practice. The internal
          tools share the same vocabulary. Spam volume is down. Authoring
          overhead is down. New matter intake comes pre-summarized.
        </p>
      </section>
    </>
  );
}
