import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/firebase";
import SideBar from "./SignIn/SideBar";
// import { Main } from "./SignIn/Main";

function Home() {
  const navigate = useNavigate();

  // const logout = () => {
  //   logOut().then(() => navigate("/"));
  // };

  return (
    <div>
       <SideBar/>
      {/* <button type="button" onClick={logout}>
        Log out
      </button> */}
    </div> 



  );
}

export default Home;
