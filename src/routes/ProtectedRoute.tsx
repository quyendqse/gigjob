import { Navigate } from "react-router";
import SideBar from "../components/Sidebar/SideBar";
import { currentUser } from "../firebase/firebase";

function ProtectedRoute() {
  return currentUser() != null ? <SideBar /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
