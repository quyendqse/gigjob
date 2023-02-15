import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../firebase/firebase";
import SideBar from "../../components/Sidebar/SideBar";
// import { Main } from "./SignIn/Main";

function Home() {
  const navigate = useNavigate();

  // const logout = () => {
  //   logOut().then(() => navigate("/"));
  // };

  return (
    <Box
      sx={{
        backgroundColor: "gray",
        width: "1000px",
        ml: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "20px",
        height: "100px",
      }}>
      Homepage
      {/* <button type="button" onClick={logout}>
        Log out
      </button> */}
    </Box>
  );
}

export default Home;
