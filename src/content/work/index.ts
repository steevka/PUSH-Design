import type { ComponentType } from "react";
import type { WorkMetadata } from "./types";

import { metadata as yardeniMeta } from "./yardeni-research";
import YardeniBody from "./yardeni-research";
import { metadata as quicktakesMeta } from "./yardeni-quicktakes";
import QuicktakesBody from "./yardeni-quicktakes";
import { metadata as zionMeta } from "./zion-law";
import ZionBody from "./zion-law";

interface WorkEntry {
  metadata: WorkMetadata;
  Body?: ComponentType;
}

const entries: WorkEntry[] = [
  { metadata: yardeniMeta, Body: YardeniBody },
  { metadata: quicktakesMeta, Body: QuicktakesBody },
  { metadata: zionMeta, Body: ZionBody },
];

export const works: WorkMetadata[] = entries.map((e) => e.metadata);

export function getWork(slug: string): WorkEntry | undefined {
  return entries.find((e) => e.metadata.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return entries
    .filter((e) => e.metadata.hasCaseStudy && e.Body)
    .map((e) => e.metadata.slug);
}

export type { WorkMetadata } from "./types";
