import { motion } from 'motion/react';
import { EXPERIENCE } from '../data';
import { EASE_OUT, H2, MaskLines, SectionLabel } from './ui';

export default function Experience() {
  return (
    <section id="experience" className="page-x py-24 md:py-36">
      <SectionLabel index="06">Experience</SectionLabel>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className={H2}>
          <MaskLines lines={['Journey']} />
        </h2>
        <p className="max-w-sm text-muted md:pb-2">Research, client work and the experiments in between.</p>
      </div>

      <ol className="mt-12 border-t border-line md:mt-16">
        {EXPERIENCE.map((item) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[12rem_1fr_1fr] md:gap-8 md:py-10"
          >
            <span className="type-label pt-1 text-accent-ink">{item.year}</span>
            <div>
              <h3 className="text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">{item.title}</h3>
              <p className="mt-2 text-muted">
                {item.role}
                <br />
                {item.organization}
              </p>
            </div>
            <div>
              <p className="text-muted">{item.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
