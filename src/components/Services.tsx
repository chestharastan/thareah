import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { EASE_OUT, H2, MaskLines, SectionLabel } from './ui';

export default function Services() {
  return (
    <section id="services" className="page-x py-24 md:py-36">
      <SectionLabel index="05">Services</SectionLabel>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className={H2}>
          <MaskLines lines={['What I', 'can do']} />
        </h2>
        <p className="max-w-sm text-muted md:pb-2">
          From a logo to a full web app with AI inside: one person, from start to finish.
        </p>
      </div>

      <ul className="mt-12 border-t border-line md:mt-16">
        {SERVICES.map((service, i) => (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="group relative overflow-hidden border-b border-line"
          >
            {/* Accent fill that rises on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:scale-y-100"
            />
            <div className="relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-black md:grid-cols-[4rem_1.1fr_1fr] md:gap-8 md:px-4 md:py-12">
              <span className="type-label text-muted transition-colors duration-500 group-hover:text-black/70">
                0{i + 1}
              </span>
              <h3 className="text-[clamp(1.9rem,4vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                {service.title}
              </h3>
              <div>
                <p className="text-muted transition-colors duration-500 group-hover:text-black/80">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-sm transition-colors duration-500 group-hover:border-black/25"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
