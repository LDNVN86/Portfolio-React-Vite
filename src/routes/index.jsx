import { lazy } from "react";
import config from "./config";

const About = lazy(() => import("../components/pages/About/about"));
const Game = lazy(() => import("../components/pages/Game/game"));
const Project = lazy(() => import("../components/pages/Project/project"));
const Skills = lazy(() => import("../components/pages/Skills/skills"));
const Space = lazy(() => import("../components/pages/space/space"));
const Error404 = lazy(() => import("../components/pages/Error404/error"));

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
