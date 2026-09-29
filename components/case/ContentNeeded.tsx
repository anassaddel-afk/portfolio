type ContentNeededProps = { prompt: string; hints?: string[] };

/** Visible placeholder for case-study content that hasn't been written yet. Never ship claims that aren't real. */
export function ContentNeeded({ prompt, hints }: ContentNeededProps) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-dashed border-border-strong bg-surface/50 p-6 md:p-8">
      <p className="label text-accent">[Content needed]</p>
      <p className="mt-4 max-w-[52ch] text-lead">{prompt}</p>
      {hints?.length ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {hints.map((hint) => (
            <li key={hint} className="label rounded-full border border-border px-3 py-1.5 text-muted">
              {hint}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function isNeeded(value: string) {
  return value.includes("[CONTENT NEEDED]");
}
