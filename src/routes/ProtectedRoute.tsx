import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Center } from "../components/Center/Centers";
import SideBar from "../components/Sidebar/SideBar";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { loading, isLoggedIn } = useAuth();
  return loading === true ? (
    <Center>
      <CircularProgress />
    </Center>
  ) : isLoggedIn === true ? (
    <SideBar />
  ) : (
    <Navigate to={"/login"} />
  );
}
export default ProtectedRoute;
