import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, Outlet } from "react-router";
import { protectedRoutes } from "../constants/routes";

function PublicRoute() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  return user == null ? <Outlet /> : <Navigate to={protectedRoutes[0].path} />;
}

export default PublicRoute;
