import { getAuth } from "firebase/auth";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user != null ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
