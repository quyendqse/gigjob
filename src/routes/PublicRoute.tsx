import { getAuth } from "@firebase/auth";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user == null ? <Outlet /> : <Navigate to={"/home"} />;
}

export default PublicRoute;
