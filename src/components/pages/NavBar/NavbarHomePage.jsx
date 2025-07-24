// NavbarHomePage.jsx
import { NavLink } from "react-router";

const Information = () => {
  const Infos = [
    { info: "About", label: "/about" },
    { info: "Game", label: "/game" },
    { info: "Project", label: "/project" },
    { info: "Skills", label: "/skills" },
    { info: "Space", label: "/space" },
  ];

  return (
    <nav className="w-full shadow-md bg-cyan-50 rounded-xl TaskBar-Content opacity-90">
      <ul className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-2 p-2">
        {Infos.map(({ info, label }, idx) => (
          <div key={idx} className="w-full sm:w-auto">
            <NavLink
              to={label}
              className={({ isActive }) =>
                `block text-center px-2 py-1 rounded-lg font-semibold text-sm sm:text-base bg-cyan-200
                ${
                  isActive
                    ? "bg-cyan-800 text-white"
                    : "bg-cyan-100 text-black hover:bg-cyan-300"
                }`
              }
            >
              {info}
            </NavLink>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Information;
