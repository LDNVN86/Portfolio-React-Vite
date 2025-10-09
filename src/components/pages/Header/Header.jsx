
import IconHomePage from "./icon";
import User from "../../../APIs/users";
import Text from "../../contents/text";
import { useTranslation } from "../../../hooks/useTranslation";

const Header = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
        <div className="flex justify-center md:justify-start">
          <img
            className="h-36 w-36 rounded-3xl border-4 border-[var(--accent-soft)] object-cover shadow-lg md:h-44 md:w-44"
            src="https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Ava.jpg"
            alt={t("header.name")}
            loading="lazy"
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
            <Text />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 shadow-sm">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-primary)]">
          {t("header.statusLabel")}
        </div>
        <User />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <IconHomePage />
      </div>
    </section>
  );
};

export default Header;
