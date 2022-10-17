import React, { FC } from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "@/store";

interface PrivateRouteProps {
  authenticated: boolean;
  redirectPath: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ authenticated, redirectPath }: PrivateRouteProps) => {
  const status: AsyncStatus = useSelector((state: RootState) => state.system.status);
  switch (status) {
    case "pending":
      return <>Loading...</>;
    case "error":
      return <Navigate to={redirectPath} replace />;
    case "success":
      return authenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
    default:
      return null;
  }
};

export default PrivateRoute;
