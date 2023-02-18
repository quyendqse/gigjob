import { Box } from "@mui/system";
import { logOut } from "../../firebase/firebase";
function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "gray",
        width: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "20px",
        height: "100px",
      }}>
      Homepage
      <button type="button" onClick={() => logOut()}>
        Log out
      </button>
    </Box>
  );
}

export default Home;
