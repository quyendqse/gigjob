import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading/Loading";
import SideBar from "../components/Sidebar/SideBar";
import { auth } from "../firebase/firebase";
import SignIn from "../pages/SignIn/SignIn";

function ProtectedRoute() {
  const [user, loading] = useAuthState(auth);

  return loading ? <Loading /> : user ? <SideBar /> : <SignIn />;
}

export default ProtectedRoute;
