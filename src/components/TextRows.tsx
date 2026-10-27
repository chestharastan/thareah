const ROWS = [
  ['Branding', 'Web design', 'Web apps', 'Posters'],
  ['AI agents', 'Telegram bots', 'RAG chatbots', 'OCR'],
];

/** Two rows of big words that slide in opposite directions on their own */
export default function TextRows() {
  return (
    <section aria-label="What I do" className="flex flex-col gap-1 overflow-x-clip py-16 md:gap-3 md:py-24">
      <h2 className="sr-only">What I do</h2>
      <Row words={ROWS[0]} />
      <Row words={ROWS[1]} reverse className="text-muted" />
    </section>
  );
}

function Row({ words, reverse = false, className = '' }: { words: string[]; reverse?: boolean; className?: string }) {
  return (
    <div
      className={`flex w-max animate-marquee max-md:[animation-duration:24s] motion-reduce:animate-none ${
        reverse ? '[animation-direction:reverse]' : ''
      } ${className}`}
    >
      {/* Two identical halves so the loop is seamless */}
      {[0, 1].map((half) => (
        <p key={half} aria-hidden={half === 1} className="flex shrink-0">
          {[...words, ...words].map((word, i) => (
            <span
              key={i}
              className="pr-[0.7em] text-[clamp(3rem,9vw,9rem)] font-light leading-[1.05] tracking-[-0.04em] whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
