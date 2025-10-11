import SocialLinks from "./HeaderSocialLinks";
import DynamicText from "../../../shared/components/typography/DynamicText";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const HERO_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=320";
const HERO_IMAGE_SRCSET = [
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=160 160w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=240 240w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=320 320w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/MonicaAva.webp?width=400 400w",
].join(", ");
const HERO_IMAGE_SIZES = "(min-width: 768px) 8rem, 32vw";

const Header = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
        <div className="flex justify-center md:justify-start">
          <img
            className="h-24 w-24 rounded-3xl border-4 border-[var(--accent-soft)] object-cover shadow-lg md:h-32 md:w-32"
            src={HERO_IMAGE}
            srcSet={HERO_IMAGE_SRCSET}
            sizes={HERO_IMAGE_SIZES}
            alt={t("header.name")}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="128"
            height="128"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {t("header.greeting")}
            </p>
            <h1
              className="text-3xl font-black text-[var(--text-primary)] md:text-4xl"
              style={{ fontFamily: "Chinacat" }}
            >
              {t("header.name")}
            </h1>
            <div
              className="mt-2 h-1 w-24 rounded-full"
              style={{ background: "var(--accent-gradient)" }}
            />
          </div>
          <p className="text-base leading-relaxed text-[var(--text-muted)]">
            {t("header.tagline")}
          </p>
          <div
            className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-base font-semibold text-[var(--text-primary)] shadow-sm"
            style={{ fontFamily: "Poetsen One" }}
          >
            <DynamicText />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SocialLinks />
      </div>
    </section>
  );
};

export default Header;
