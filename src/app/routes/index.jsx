import { lazy } from "react";
import config from "./config";

const About = lazy(() => import("../../features/about"));
const Game = lazy(() => import("../../features/game"));
const Project = lazy(() => import("../../features/project"));
const Skills = lazy(() => import("../../features/skills"));
const Space = lazy(() => import("../../features/space"));
const Blog = lazy(() => import("../../features/blog"));
const Error404 = lazy(() => import("../../features/error"));

const Communities = [
  { path: config.routes.Home, component: About },
  { path: config.routes.About, component: About },
  { path: config.routes.Game, component: Game },
  { path: config.routes.Space, component: Space },
  { path: config.routes.Skills, component: Skills },
  { path: config.routes.Project, component: Project },
  { path: config.routes.Blog, component: Blog },
  { path: config.routes.error, component: Error404 },
];

export default Communities;
