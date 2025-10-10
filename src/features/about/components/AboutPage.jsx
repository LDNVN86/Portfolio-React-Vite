import { useEffect, useMemo } from "react";
import { useTranslation } from "../../../shared/hooks/useTranslation";
import AboutAccordion from "./AboutAccordion";

const JOURNEY_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/Elaina.jpg?width=960";
const JOURNEY_IMAGE_SRCSET = [
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/Elaina.jpg?width=640 640w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/Elaina.jpg?width=960 960w",
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/render/image/public/ldn86dev/Elaina.jpg?width=1280 1280w",
].join(", ");
const JOURNEY_IMAGE_SIZES = "(min-width: 768px) 20rem, 100vw";

const AboutPage = () => {
  const { t } = useTranslation();
  const aboutContent = useMemo(() => t("about"), [t]);

  useEffect(() => {
    if (aboutContent?.documentTitle) {
      document.title = aboutContent.documentTitle;
    }
  }, [aboutContent]);

  const sections = Array.isArray(aboutContent?.sections)
    ? aboutContent.sections
    : [];
  const accordionItems = Array.isArray(aboutContent?.accordion)
    ? aboutContent.accordion
    : [];
  const galleryImageAlt = aboutContent?.galleryImageAlt || "";

  return (
    <article className="flex flex-col gap-6">
      <div className="theme-card theme-card--strong p-4 md:p-6">
        <header className="flex items-center gap-3">
          <div
            className="h-9 w-1.5 rounded-full"
            style={{ background: "var(--accent-gradient)" }}
          />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {aboutContent?.title ?? "About"}
          </h2>
        </header>

        <div className="mt-6 space-y-10">
          {sections.map((section, index) => {
            const hasImage = index === 1;
            return (
              <section
                key={`${section.heading}-${index}`}
                className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8"
              >
                <div className="flex-1 space-y-3 text-base leading-relaxed text-[var(--text-muted)]">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {section.heading}
                  </h3>
                  {Array.isArray(section.body) &&
                    section.body.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="[&_a]:text-[var(--accent-color)] [&_a]:font-semibold [&_a]:underline-offset-4 hover:[&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                </div>
                {hasImage && (
                  <div className="mx-auto w-full max-w-xs md:mx-0">
                    <img
                      src={JOURNEY_IMAGE}
                      srcSet={JOURNEY_IMAGE_SRCSET}
                      sizes={JOURNEY_IMAGE_SIZES}
                      fetchpriority="high"
                      decoding="async"
                      loading="eager"
                      width="640"
                      height="640"
                      alt={section.imageAlt || ""}
                      className="h-full w-full rounded-2xl border-4 border-[var(--accent-soft)] object-cover shadow-lg"
                    />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <div className="theme-card p-4 md:p-6">
        <AboutAccordion items={accordionItems} imageAlt={galleryImageAlt} />
      </div>
    </article>
  );
};

export default AboutPage;
