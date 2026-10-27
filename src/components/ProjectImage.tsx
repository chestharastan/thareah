import { categoryLabel } from '../data';
import type { Project } from '../types';

/** A project's card picture (its cover, else its image), or a generated cover when it has neither */
export default function ProjectImage({
  project,
  className = '',
}: {
  project: Project;
  className?: string;
}) {
  const src = project.cover ?? project.image;
  if (!src) return <GeneratedCover project={project} className={className} />;
  return (
    <img
      src={src}
      alt={project.title}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}

function GeneratedCover({ project, className }: { project: Project; className: string }) {
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <div
      role="img"
      aria-label={project.title}
      className={`@container relative grid place-items-center overflow-hidden bg-fg text-bg ${className}`}
    >
      <span className="type-display text-[34cqw] text-accent">{initials}</span>
      <span className="absolute inset-x-[6cqw] bottom-[5cqw] truncate font-mono text-[3.6cqw] uppercase tracking-wider opacity-70">
        {project.title} · {categoryLabel(project.category)}
      </span>
    </div>
  );
}
