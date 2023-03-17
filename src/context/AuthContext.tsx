import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createNewShopInfo } from "../api/data/query/ProfileQM";
import { getShopByAccountId } from "../api/data/query/shop";
import { AccountRequest } from "../api/request/AccountRequest";
import { ShopRequest } from "../api/request/ShopRequest";
import { host, port } from "../constants/host";
import { auth } from "../firebase/firebase";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useSessionStorage } from "../hook/useSessionStorage";
interface AuthenticationContext {
  user: User | null | undefined;
  loading: boolean;
  authLoading: boolean;
  isLoggedIn: boolean;
  session: string | null | undefined;
  shopInfo: any;
  loginGoogleFirebase: () => Promise<SignInStatus>;
  loginEmailPassword: (
    email: string,
    password: string
  ) => Promise<SignInStatus>;
  signUpEmailPassword: (request: AccountRequest) => Promise<SignInStatus>;
  createNewShopProfile: (request: ShopRequest) => Promise<SignInStatus>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext({} as AuthenticationContext);

const googleProvider = new GoogleAuthProvider();

export interface SignInStatus {
  status: "error" | "success" | "new_user";
  message?: string;
}

export const AuthProvider = ({ children }: any) => {
  const [user, loading] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState(false);
  const [session, setSession] = useSessionStorage("accessToken", null);
  const [shopInfoLocal, setShopInfoLocal] = useLocalStorage("shopInfo", null);

  const loginGoogleFirebase = async (): Promise<SignInStatus> => {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      setAuthLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const res = await loginGoogleBackend(user);
      if (res.status === 200) {
        const { accessToken } = await res.json();
        setSession(accessToken);
        const shopInfo = await getShopByAccountId(result.user.uid);
        if (shopInfo) {
          setShopInfoLocal(shopInfo);
          setAuthLoading(false);
          return { status: "success" } as SignInStatus;
        } else {
          await signOut(auth);
          setSession(null);
          setAuthLoading(false);
          return {
            status: "error",
            message: "Permission denied",
          } as SignInStatus;
        }
      } else {
        setAuthLoading(false);
        return {
          status: "new_user",
          message: "Shop doesn't appear",
        } as SignInStatus;
      }
    } catch (error: any) {
      setAuthLoading(false);
      return {
        status: "error",
        message:
          error.code !== "auth/popup-closed-by-user"
            ? "Can't connect to authentication server."
            : "",
      } as SignInStatus;
    }
  };

  const loginGoogleBackend = async (user: User) => {
    const idToken = await user.getIdToken();
    return await fetch(`http://${host}:${port}/api/v1/account/login/google`, {
      method: "POST",
      headers: {
        idTokenString: idToken,
        "Content-type": "application/json; charset=UTF-8",
        Connection: "keep-alive",
        Accept: "*/*",
      },
    });
  };
  //? the flow sign in backend and firebase with email and password to get accessToken and uid respectively. Then get shop info
  const loginEmailPassword = async (
    email: string,
    password: string
  ): Promise<SignInStatus> => {
    try {
      setAuthLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      var res = await fetch(`http://${host}:${port}/api/v1/account/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Connection: "keep-alive",
          Accept: "*/*",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        var { accessToken } = await res.json();
        setSession(accessToken);
        const shopInfo = await getShopByAccountId(user.uid);
        if (shopInfo) {
          setAuthLoading(false);
          setSession(accessToken);
          setShopInfoLocal(shopInfo);
          return { status: "success" } as SignInStatus;
        } else {
          await signOut(auth);
          setSession(null);
          setAuthLoading(false);
          return {
            status: "error",
            message: "Something went wrong.Please try again",
          } as SignInStatus;
        }
      } else {
        setAuthLoading(false);
        return {
          status: "error",
          message: "Incorrect email or password",
        } as SignInStatus;
      }
    } catch (error) {
      setAuthLoading(false);
      return {
        status: "error",
        message: "Something went wrong. Please try again later",
      } as SignInStatus;
    }
  };

  const signUpEmailPassword = async (
    request: AccountRequest
  ): Promise<SignInStatus> => {
    try {
      setAuthLoading(true);
      var res = await createUserWithEmailAndPassword(
        auth,
        request.email,
        request.password
      );
      var user = res.user;
      const conn = `http://${host}:${port}/api/v1/account/register/shop`;
      request.id = user.uid;
      const response = await fetch(conn, {
        method: "post",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Connection: "keep-alive",
          Accept: "*/*",
        },
      });
      if (response.status === 200) {
        setAuthLoading(false);
        return await loginEmailPassword(request.email, request.password);
      } else {
        setAuthLoading(false);
        return {
          status: "error",
          message: "Sign up unsuccessful",
        } as SignInStatus;
      }
    } catch (error) {
      setAuthLoading(false);
      return {
        status: "error",
        message: "Cannot connect to authentication server",
      } as SignInStatus;
    }
  };

  // call this function to sign out logged in user
  const logout = async (): Promise<boolean> => {
    var result;
    try {
      setAuthLoading(true);
      await signOut(auth);
      setSession(null);
      result = true;
    } catch (error) {
      result = false;
    }
    setShopInfoLocal(null);
    setAuthLoading(false);
    return result;
  };

  const createNewShopProfile = async (
    values: ShopRequest
  ): Promise<SignInStatus> => {
    setAuthLoading(true);
    var resShop = await createNewShopInfo(values);
    if (resShop != null) {
      if (user != null) {
        const res = await loginGoogleBackend(user);
        if (res.ok) {
          setSession(await res.json());
          setShopInfoLocal(resShop);
          setAuthLoading(false);
          return {
            status: "success",
          };
        } else {
          setAuthLoading(false);
          return {
            status: "error",
            message:
              "Error while getting data from the server. Please try again later",
          };
        }
      } else {
        setAuthLoading(false);
        return {
          status: "error",
          message: "You have signed out.",
        };
      }
    }
    setAuthLoading(false);
    return {
      status: "error",
      message: "Something went wrong. Please try again later",
    };
  };

  const isLoggedIn =
    user !== null && session !== null && shopInfoLocal !== null;

  const value = useMemo(
    () => ({
      user,
      authLoading,
      loading,
      isLoggedIn,
      session,
      shopInfo: shopInfoLocal,
      loginGoogleFirebase,
      loginEmailPassword,
      signUpEmailPassword,
      createNewShopProfile,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, user, loading, authLoading, isLoggedIn, shopInfoLocal]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthenticationContext => {
  return useContext(AuthContext);
};
