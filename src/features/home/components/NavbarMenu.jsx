import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "../../../shared/hooks/useTranslation";

const NAV_ITEMS = [
  { key: "about", path: "/about" },
  { key: "game", path: "/game" },
  { key: "project", path: "/project" },
  { key: "skills", path: "/skills" },
  { key: "space", path: "/space" },
  { key: "blog", path: "/blog" },
];

const NavbarMenu = () => {
  const { t } = useTranslation();

  const items = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        label: t(`navigation.${item.key}`),
      })),
    [t]
  );

  return (
    <nav className="w-full">
      <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {items.map(({ path, label }) => (
          <li key={path} className="w-full sm:w-auto">
            <NavLink
              to={path}
              className={({ isActive }) => {
                const baseClass =
                  "inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-ring)]";
                const stateClass = isActive
                  ? "shadow-md"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]";
                return `${baseClass} ${stateClass}`;
              }}
              style={({ isActive }) => ({
                background: isActive ? "var(--accent-gradient)" : "var(--accent-soft)",
                color: isActive ? "var(--accent-contrast)" : "var(--text-primary)",
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
