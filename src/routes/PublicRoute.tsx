import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, Outlet } from "react-router-dom";
import { Center } from "../components/Center/Centers";
import { useAuth } from "../context/AuthContext";

function PublicRoute() {
  const { isLoggedIn, loading } = useAuth();
  if (loading === true) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }
  if (isLoggedIn === true) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export default PublicRoute;
