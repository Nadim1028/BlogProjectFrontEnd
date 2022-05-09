import { Navigate, Outlet } from "react-router";
import { useContext } from "react";

import AuthContext from "./AuthContext";
import RegisterUserPage from "../pages/RegisterUserPage";

function ProtectedRoutes() {
  const authCtx = useContext(AuthContext);

  const isAuth = authCtx.token !== "";

  return isAuth ? <Outlet /> : <Navigate to="/register" />;
}

export default ProtectedRoutes;