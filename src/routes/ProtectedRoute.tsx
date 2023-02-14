import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  return user != null ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
