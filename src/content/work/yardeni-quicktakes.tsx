import { BrowserFrame } from "@/components/browser-frame";
import type { WorkMetadata } from "./types";

export const metadata: WorkMetadata = {
  slug: "yardeni-quicktakes",
  index: "02",
  client: "Yardeni QuickTakes",
  title:
    "Institutional design language, ported to a retail publication.",
  year: 2026,
  scope: ["Brand", "Web", "Conversion"],
  blurb:
    "A custom Ghost theme rewrite that brings Yardeni's premium research design system to a publication for retail investors. 23,000+ subscribers, two-person operation, free and premium tiers under one identity.",
  image: "/cases/yardeni-quicktakes/hero.png",
  url: "yardeniquicktakes.com",
  hasCaseStudy: true,
};

export default function YardeniQuicktakesCaseStudy() {
  return (
    <>
      <section>
        <h2>The brief</h2>
        <p>
          QuickTakes is Dr. Ed Yardeni&rsquo;s standalone publication for
          retail investors. Five to eight market commentaries a week, a free
          tier on Mondays, members on Wednesdays, and a webcast on Fridays.
          The site had been running on a generic Ghost theme; the brief was
          to port the institutional design language from yardeni.com into a
          retail surface that takes itself seriously about both reading
          experience and revenue.
        </p>
      </section>

      <section>
        <h2>What it is</h2>
        <p>
          A custom Ghost theme written from the ground up. Handlebars
          templating, Tailwind, server-rendered, no React. Premium type and
          editorial chrome on top of a paywall, a member hub, and a pricing
          surface that all have to move the needle. Free tier and premium
          subscribers live under one navigation, one identity, one design
          system.
        </p>
      </section>

      <figure>
        <BrowserFrame url="yardeniquicktakes.com/members">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/yardeni-quicktakes/screen-02.png"
            alt="Yardeni QuickTakes member hub"
          />
        </BrowserFrame>
        <figcaption>
          Member hub: latest QuickTake, reading queue, webcasts, and a member
          Q&amp;A surface.
        </figcaption>
      </figure>

      <section>
        <h2>Highlights</h2>
        <ul>
          <li>
            Custom Ghost theme written in Handlebars and Tailwind, forked from
            TryGhost/Source as a clean foundation.
          </li>
          <li>
            Branded paywall override replacing Ghost&rsquo;s default with a
            conversion-focused CTA — the single biggest lever in the build.
          </li>
          <li>
            Logged-in member hub: latest QuickTake, reading queue, webcast
            replays, free book downloads, and a Q&amp;A surface.
          </li>
          <li>
            Two-tier pricing surface with a monthly and yearly toggle that
            visually steers toward Premium.
          </li>
          <li>
            Live S&amp;P 500 sparkline (Twelve Data) and editorial mini-chart
            component for inline financial context.
          </li>
          <li>
            Editorial identity with italic-serif emphasis, an &ldquo;Issue
            No.&rdquo; masthead, a warm cream and charcoal palette, and a
            dark-mode toggle.
          </li>
        </ul>
      </section>

      <section>
        <h2>Stack</h2>
        <p>
          Ghost CMS on Pikapod managed hosting. Handlebars templates,
          Tailwind CSS 3, PostCSS, Gulp build pipeline. Self-hosted Source
          Serif 4 and Inter. Vanilla JavaScript for dark mode and chart
          hydration. Native Ghost transactional email and member auth. Zapier
          for social auto-publish.
        </p>
      </section>

      <section>
        <h2>Outcome</h2>
        <p>
          A retail publication that takes itself as seriously as the writing.
          The branded paywall, member hub, and pricing surface all share one
          design system. Free readers, premium subscribers, and the editorial
          team finally use the same site.
        </p>
      </section>
    </>
  );
}
