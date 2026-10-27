export type ProjectCategory = 'web' | 'ai' | 'branding' | 'poster';

export interface Project {
  /** Unique id: lowercase words joined by dashes */
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  /** One sentence, shown in cards and lists */
  summary: string;
  /** Longer text, shown when the project is opened */
  description?: string;
  /** Main image, e.g. '/images/work/my-project.webp'. Leave it out to get a generated cover. */
  image?: string;
  /** Optional 4:3 picture for cards and lists (e.g. a mockup). Without it, `image` is used. */
  cover?: string;
  /** Extra images, shown when the project is opened */
  gallery?: string[];
  tags?: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  /** Also show this project in the "Selected work" scroller */
  featured?: boolean;
}

export type PillarId = 'design' | 'web' | 'ai';

/** A group of work shown in the About cards and the project filters */
export interface Pillar {
  id: PillarId;
  title: string;
  text: string;
  categories: ProjectCategory[];
  /** Ids of the three projects pictured on the card (the middle one sits in front) */
  showcase?: string[];
}

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Experience {
  year: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  tech: string[];
}
