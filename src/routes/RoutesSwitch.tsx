import React, { FC } from "react";

import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { RouteConfig } from "./types";

import { isLoggedIn } from "@/store/system/systemSlice";

interface Props {
  routes?: RouteConfig[];
  defaultRedirectPath?: string;
}

const RoutesSwitch: FC<Props> = ({ routes, defaultRedirectPath = "/login", ...restProps }: Props) => {
  const loggedIn = useSelector(isLoggedIn);
  if (!routes || routes.length === 0) {
    return null;
  }
  return (
    <Routes {...restProps}>
      {routes.map((route, index) => {
        if (route.requireAuth) {
          return (
            <Route
              key={index}
              element={
                <PrivateRoute authenticated={loggedIn} redirectPath={route.redirectPath ?? defaultRedirectPath} />
              }
            >
              <Route key={index} path={route.path} element={route.component} />
            </Route>
          );
        } else {
          return <Route key={index} path={route.path} element={route.component} />;
        }
      })}
    </Routes>
  );
};

export default RoutesSwitch;
