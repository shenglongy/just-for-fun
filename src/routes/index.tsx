import { RouteConfig } from "./types";

import About from "@/views/about";
import Home from "@/views/home";
import Login from "@/views/login";
import NotFound from "@/views/not-found";
import Weektime from "@/views/weektime";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/weektime",
    component: <Weektime />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export default routes;
