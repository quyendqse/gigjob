import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getShopByAccountId } from "../api/data/query/shop";
import { AccountRequest } from "../api/request/account";
import { host, port } from "../constants/host";
import { auth } from "../firebase/firebase";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useSessionStorage } from "../hook/useSessionStorage";
const AuthContext = createContext(
  {} as {
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
    logout: () => Promise<boolean>;
  }
);

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
      const res = await fetch(
        `http://${host}:${port}/api/v1/account/login/google`,
        {
          method: "POST",
          headers: {
            idTokenString: await user.getIdToken(),
            "Content-type": "application/json; charset=UTF-8",
            Connection: "keep-alive",
            Accept: "*/*",
          },
        }
      );
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
            message: "Something went wrong.Please try again",
          } as SignInStatus;
        }
      } else {
        //? - if logged in to firebase but cannot get accessToken from backend, this mean this google account is new
        //? - redirect to new shop
        //? - This function need to be implemented
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
      const conn = `http://${host}:${port}/api/v1/account/register`;
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

  const isLoggedIn = user !== null && session !== null;

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
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, user, loading, authLoading, isLoggedIn, shopInfoLocal]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
