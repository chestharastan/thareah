/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  projectType: 'design' | 'webdev' | 'ai';
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  metrics?: { label: string; value: string }[];
  accentColor: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: { name: string; level: number; description: string }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  question: string;
  abstract: string;
  venue: string;
  year: string;
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  role: string;
  organization: string;
  description: string;
}

export interface ExhibitionElement {
  id: string;
  name: string;
  type: 'pedestal' | 'lighting' | 'sculpture' | 'text-panel' | 'mannequin' | 'screen' | 'prop';
  x: number; // percentage of layout width, 0-100
  y: number; // percentage of layout height, 0-100
  color: string;
  size: 'small' | 'medium' | 'large';
  description: string;
}

export interface ExhibitionLayout {
  theme: string;
  inspiration: string;
  lightingMood: string;
  colorScheme: string[];
  elements: ExhibitionElement[];
  curatorsNotes: string;
}
