import { UserCredential } from "@firebase/auth";
import { logOut } from "../../firebase/firebase";
async function loginGoogle(user: UserCredential) {
  var res = await fetch(
    "http://54.179.205.85:8080/api/v1/account/login/google",
    {
      method: "POST",
      headers: {
        idTokenString: await user.user.getIdToken(),
      },
    }
  );
  if (res.status === 200) {
    let data = await res.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    return true;
  } else {
    logOut();
    sessionStorage.removeItem("accessToken");
    return false;
  }
}

export { loginGoogle };
