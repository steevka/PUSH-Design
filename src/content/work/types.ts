export interface WorkMetadata {
  slug: string;
  index: string;
  client: string;
  title: string;
  year: number;
  scope: string[];
  blurb: string;
  image: string;
  href?: string;
  url?: string;
  hasCaseStudy?: boolean;
}
