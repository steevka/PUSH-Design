import { BrowserFrame } from "@/components/browser-frame";
import type { WorkMetadata } from "./types";

export const metadata: WorkMetadata = {
  slug: "yardeni-research",
  index: "01",
  client: "Yardeni Research",
  title: "Fifteen years of financial research, rebuilt as a modern platform.",
  year: 2026,
  scope: ["Brand", "Web", "Software"],
  blurb:
    "End-to-end build of Ed Yardeni's research platform. Next.js 16, Sanity, Typesense hybrid search, and a Claude-powered research assistant covering a fifteen-year archive of daily institutional commentary.",
  image: "/cases/yardeni-research/hero.png",
  url: "yardeni.com",
  hasCaseStudy: true,
};

export default function YardeniResearchCaseStudy() {
  return (
    <>
      <section>
        <h2>The brief</h2>
        <p>
          Yardeni Research publishes daily institutional-grade market
          commentary, backed by a fifteen-year archive of morning briefings,
          sector studies, chart books, and Fed commentary. The goal was to
          build a platform fast enough for daily delivery, smart enough to
          surface the full archive on demand, and extensible enough for the
          kind of tooling a modern research desk actually needs.
        </p>
      </section>

      <section>
        <h2>What it is</h2>
        <p>
          A managed-service platform serving paid subscribers and public SEO
          surfaces. Every piece of research lives in a single content model
          with full-text and semantic search: morning briefings, sector
          QuickTakes, chart books, Beige Book commentary, and Ed&rsquo;s
          movie reviews. Authentication runs through HubSpot with magic links
          and SMS fallback. Content authoring runs through Sanity. AI
          research tools run on Claude.
        </p>
      </section>

      <figure>
        <BrowserFrame url="yardeni.com/charts">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/yardeni-research/charts-search.png"
            alt="Yardeni Research charts search interface"
          />
        </BrowserFrame>
        <figcaption>
          Hybrid keyword and vector search across 1,500+ interactive charts.
        </figcaption>
      </figure>

      <section>
        <h2>Highlights</h2>
        <ul>
          <li>
            Single content model spanning roughly 3,000 items, including
            1,700+ morning briefings, 1,264 QuickTakes, and 672 curated film
            reviews.
          </li>
          <li>
            534 chart pages housing 1,500+ interactive charts with a custom
            lightbox, drawing tools, and per-user annotations.
          </li>
          <li>
            Hybrid keyword and vector search across all content via Typesense,
            with on-page result highlighting.
          </li>
          <li>
            Internal AI research assistant for staff, combining semantic
            search with Claude Haiku for Q&amp;A over the entire archive.
          </li>
          <li>
            Beige Book Monitor that visualizes Fed economic signals across 12
            districts as a traffic-light dashboard.
          </li>
          <li>
            Daily automated extraction pipeline (Claude plus GitHub Actions)
            that publishes sector QuickTakes from raw source documents.
          </li>
        </ul>
      </section>

      <figure>
        <BrowserFrame url="yardeni.com/research">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/yardeni-research/ai-assistant.png"
            alt="Yardeni Research internal AI assistant"
          />
        </BrowserFrame>
        <figcaption>
          Internal AI research assistant. Claude Haiku over the entire archive.
        </figcaption>
      </figure>

      <section>
        <h2>Stack</h2>
        <p>
          Next.js 16 (App Router, React Server Components), TypeScript, Sanity
          headless CMS, Typesense for hybrid search, OpenAI embeddings,
          Anthropic Claude (Haiku for retrieval, Sonnet for generation),
          HubSpot for subscriber state, Resend and Twilio for transactional
          messaging, Vercel for hosting.
        </p>
      </section>

      <section>
        <h2>Outcome</h2>
        <p>
          A research platform the team can maintain, extend, and reason about.
          Daily content velocity is up. Search relevance is up. The archive
          lives as a single searchable corpus across morning briefings,
          QuickTakes, chart books, and Fed commentary.
        </p>
      </section>
    </>
  );
}
