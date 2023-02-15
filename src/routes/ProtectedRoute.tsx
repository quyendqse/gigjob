import { Navigate, Outlet } from "react-router";
import { currentUser } from "../firebase/firebase";

function ProtectedRoute() {
  return currentUser() != null ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
