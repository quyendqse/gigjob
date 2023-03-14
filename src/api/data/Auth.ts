import { UserCredential } from "@firebase/auth";
import { host, port } from "../../constants/host";
async function loginGoogleBackend(user: UserCredential) {
  var res = await fetch(`http://${host}:${port}/api/v1/account/login/google`, {
    method: "POST",
    headers: {
      idTokenString: await user.user.getIdToken(),
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
      referer: `http://${host}:${port}`,
    },
  });
  console.log("login backend result" + res.status);
  if (res.status === 200) {
    var data = await res.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("notify", "accessTokenVerified");
    return true;
  } else {
    sessionStorage.removeItem("accessToken");
    localStorage.setItem("notify", "401");
    return false;
  }
}

async function loginEmailPasswordBackend(user: {
  email: string;
  password: string;
}) {
  var res = await fetch(`http://${host}:${port}/api/v1/account/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  });
  console.log("login backend result" + res.status);
  if (res.status === 200) {
    var data = await res.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    console.log("accesstoken saved in session storage");
    localStorage.setItem("notify", "accessTokenVerified");
    console.log("notify saved to localstorage to trigger useHook");
    return true;
  } else {
    sessionStorage.removeItem("accessToken");
    localStorage.setItem("notify", "401");
    return false;
  }
}

export { loginGoogleBackend, loginEmailPasswordBackend };
