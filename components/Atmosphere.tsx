"use client";

/**
 * Quiet atmosphere: a faint radial wash plus fine grain.
 * No pointer tracking — the glow stays put so the page feels still.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none">
      <span className="atmosphere-glow" />
      <span className="atmosphere-grain" />
    </div>
  );
}
