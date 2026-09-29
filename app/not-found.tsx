import { MagneticButton } from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-16 pt-[calc(var(--nav-h)+4rem)]">
      <p className="label text-muted">404</p>
      <h1 className="mt-6 text-display font-medium">
        This page
        <br />
        doesn&apos;t exist.
      </h1>
      <div className="mt-12">
        <MagneticButton href="/">Back home</MagneticButton>
      </div>
    </section>
  );
}
