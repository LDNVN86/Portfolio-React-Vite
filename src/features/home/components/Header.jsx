import SocialLinks from "./HeaderSocialLinks";
import DynamicText from "../../../shared/components/typography/DynamicText";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const HERO_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp";
const HERO_IMAGE_SRCSET = [
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 160w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 240w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 320w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp 400w",
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

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 ml-auto">
          <a
            href="/project"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-lg transition hover:scale-105 hover:shadow-xl"
            style={{ background: "var(--accent-gradient)" }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {t("header.viewProjects") || "Xem Dự Án"}
          </a>
          <a
            href="https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/CV_LeDucNghia.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent-color)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[var(--accent-color)] transition hover:bg-[var(--accent-soft)] hover:scale-105"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {t("header.downloadCV") || "Tải CV"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
