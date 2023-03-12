import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import SideBar from "../components/Sidebar/SideBar";
import { auth } from "../firebase/firebase";
import SignIn from "../pages/SignIn/SignIn";

function ProtectedRoute() {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  console.log(user);
  return loading ? (
    <Loading />
  ) : user &&
    (sessionStorage.getItem("accessToken") ||
      location.pathname === "/profile/edit") ? (
    <SideBar />
  ) : (
    <SignIn />
  );
}

export default ProtectedRoute;
