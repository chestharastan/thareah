import { useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { SITE } from '../data';
import { SectionLabel } from './ui';

const NEEDS = ['Branding', 'Website', 'Web app', 'AI agent', 'Telegram shop', 'Something else'];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const socials = SITE.socials.filter((social) => social.url);

  // The two headline lines slide in from opposite sides
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] });
  const fromRight = useTransform(scrollYProgress, [0, 1], [still ? '0%' : '28%', '0%']);
  const fromLeft = useTransform(scrollYProgress, [0, 1], [still ? '0%' : '-28%', '0%']);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the email is still visible to copy by hand.
    }
  };

  const toggleNeed = (need: string) =>
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));

  // No backend needed: the form opens the visitor's email app with everything filled in
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name')).trim();
    const email = String(form.get('email')).trim();
    const message = String(form.get('message')).trim();
    const body = [
      `Hi ${SITE.name},`,
      '',
      message,
      '',
      needs.length > 0 ? `I need: ${needs.join(', ')}` : '',
      `${name} (${email})`,
    ].join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `New project inquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="overflow-x-clip rounded-t-[2rem] bg-accent pb-16 pt-20 text-black md:rounded-t-[3.5rem] md:pb-24 md:pt-28"
    >
      <div className="page-x">
        <SectionLabel index="07" onAccent>
          Contact
        </SectionLabel>
      </div>

      <h2 className="mt-8 type-display text-[clamp(3.25rem,12.5vw,13rem)] md:mt-12">
        <motion.span style={{ x: fromRight }} className="block page-x">
          Let's work
        </motion.span>
        <motion.span style={{ x: fromLeft }} className="block page-x text-right">
          together
        </motion.span>
      </h2>

      <div className="mt-14 grid gap-14 page-x md:mt-20 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div className="flex flex-col gap-10">
          <p className="max-w-md text-xl leading-snug md:text-2xl">
            Have a project in mind? Tell me a little about it and I'll get back to you soon.
          </p>
          <div>
            <p className="type-label text-black/70">Email me</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="break-all text-[clamp(1.4rem,3vw,2.5rem)] font-bold tracking-tight underline decoration-2 underline-offset-[6px] transition-colors hover:decoration-transparent"
              >
                {SITE.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/25 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black hover:text-accent"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          {socials.length > 0 && (
            <div>
              <p className="type-label text-black/70">Elsewhere</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-black/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="contact-form flex flex-col gap-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <Field label="Your name" name="name" autoComplete="name" placeholder="Jane Doe" />
            <Field label="Your email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" />
          </div>
          <fieldset>
            <legend className="type-label text-black/70">I need</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {NEEDS.map((need) => {
                const selected = needs.includes(need);
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      selected ? 'border-black bg-black text-accent' : 'border-black/25 hover:border-black'
                    }`}
                  >
                    {need}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2">
            <span className="type-label text-black/70">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project…"
              className="resize-none border-b border-black/25 bg-transparent py-2 text-lg outline-none transition-colors placeholder:text-black/45 focus:border-black"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold uppercase tracking-wide text-accent"
            >
              Send message
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            {sent && (
              <p className="max-w-xs text-sm">
                Your email app should open now. If it doesn't, write to {SITE.email}.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, ...input }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="type-label text-black/70">{label}</span>
      <input
        required
        {...input}
        className="border-b border-black/25 bg-transparent py-2 text-lg outline-none transition-colors placeholder:text-black/45 focus:border-black"
      />
    </label>
  );
}
