import { Navigate, Outlet } from "react-router";
import { protectedRoutes } from "../constants/routes";
import { currentUser } from "../firebase/firebase";

function PublicRoute() {
  return currentUser() == null ? (
    <Outlet />
  ) : (
    <Navigate to={protectedRoutes[0].path} />
  );
}

export default PublicRoute;
