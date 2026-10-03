import { MagneticButton } from "@/components/MagneticButton";
import { getDictionary } from "@/lib/locale";

export default async function NotFound() {
  const { t } = await getDictionary();

  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-16 pt-[calc(var(--nav-h)+4rem)]">
      <p className="label text-muted">404</p>
      <h1 className="mt-6 text-display font-medium">
        {t.notFound.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <div className="mt-12">
        <MagneticButton href="/">{t.notFound.back}</MagneticButton>
      </div>
    </section>
  );
}
