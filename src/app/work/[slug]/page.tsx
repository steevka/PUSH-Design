import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudySlugs, getWork } from "@/content/work";
import { BrowserFrame } from "@/components/browser-frame";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) return {};
  const { metadata } = entry;
  return {
    title: `${metadata.client} — PUSH`,
    description: metadata.blurb,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const entry = getWork(slug);

  if (!entry || !entry.Body || !entry.metadata.hasCaseStudy) {
    notFound();
  }

  const { metadata, Body } = entry;

  return (
    <>
      <TopBar />

      <main className="bg-bg">
        <div className="px-6 pt-28 md:px-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted transition hover:text-fg"
          >
            <span className="block h-px w-8 bg-fg-muted transition group-hover:bg-fg" />
            <span>← All work</span>
          </Link>
        </div>

        <header className="px-6 pt-16 pb-16 md:px-10 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                <span className="text-accent">{metadata.index}</span>{" "}
                {metadata.client}
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
                {metadata.title}
              </h1>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                <span>
                  <span className="text-fg-dim">Year</span>{" "}
                  <span className="text-fg">{metadata.year}</span>
                </span>
                <span>
                  <span className="text-fg-dim">Scope</span>{" "}
                  <span className="text-fg">{metadata.scope.join(" · ")}</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <BrowserFrame url={metadata.url}>
              <Image
                src={metadata.image}
                alt={`${metadata.client} — hero`}
                width={3006}
                height={1844}
                className="h-auto w-full"
                priority
                unoptimized
              />
            </BrowserFrame>
          </div>
        </div>

        <div className="px-6 pt-24 pb-32 md:px-10 md:pt-32 md:pb-40">
          <div className="mx-auto max-w-[1400px]">
            <p className="mx-auto mb-12 max-w-[56rem] font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
              <span className="text-accent">§</span> Case study
            </p>
            <article className="case-prose">
              <Body />
            </article>
          </div>
        </div>

        <NextCaseStudy currentSlug={metadata.slug} />
      </main>

      <Footer />
    </>
  );
}

function NextCaseStudy({ currentSlug }: { currentSlug: string }) {
  const slugs = getCaseStudySlugs();
  if (slugs.length < 2) return null;
  const idx = slugs.indexOf(currentSlug);
  const nextSlug = slugs[(idx + 1) % slugs.length];
  const next = getWork(nextSlug);
  if (!next) return null;

  return (
    <section className="border-t border-line">
      <Link
        href={`/work/${next.metadata.slug}`}
        className="group block px-6 py-16 transition-colors hover:bg-bg-elev md:px-10 md:py-20"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
              <span className="text-accent">→</span> Next case study
            </p>
            <h3 className="mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg transition group-hover:text-accent">
              {next.metadata.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
            {next.metadata.client} / {next.metadata.year}
          </span>
        </div>
      </Link>
    </section>
  );
}
