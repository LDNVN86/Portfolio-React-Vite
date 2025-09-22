import config from "./config";

import About from "../components/pages/About/about";
import Game from "../components/pages/Game/game";
import Project from "../components/pages/Project/project";
import Skills from "../components/pages/Skills/skills";
import Space from "../components/pages/space/space";
import Error404 from "../components/pages/Error404/error";

const Communities = [
  { path: config.routes.Home, component: About },
  { path: config.routes.About, component: About },
  { path: config.routes.Game, component: Game },
  { path: config.routes.Space, component: Space },
  { path: config.routes.Skills, component: Skills },
  { path: config.routes.Project, component: Project },
  { path: config.routes.error, component: Error404 },
];

export default Communities;
