/**
 * Height of the case-study hero frame: the image at full width (inside the matte padding),
 * capped at --case-hero-h. Shared by CaseHero and the project transition so they always agree.
 */
export function caseHeroHeight(ratio: number) {
  const inner = "min(100vw, var(--max-w)) - 2 * var(--gutter) - 2 * var(--case-hero-pad)";
  return `min(var(--case-hero-h), calc((${inner}) / ${ratio} + 2 * var(--case-hero-pad)))`;
}
