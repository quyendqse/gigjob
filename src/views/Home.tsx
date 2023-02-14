import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/firebase";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    logOut().then(() => navigate("/"));
  };

  return (
    <div>
      Homepage
      <button type="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Home;
