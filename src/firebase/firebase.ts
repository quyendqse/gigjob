import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { firebaseConfig } from "../constants/firebaseConfig";

let app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const googleProvider = new GoogleAuthProvider().setCustomParameters({
  prompt: "select_account",
});

export function login(
  email: string,
  password: string,
  onSuccess: (u: UserCredential) => void | PromiseLike<void>,
  onReject: (reason: any) => void
): Promise<void> {
  return signInWithEmailAndPassword(auth, email, password).then(
    onSuccess,
    onReject
  );
}

export const currentUser = () => {
  return auth.currentUser;
};

export function loginWithGoogle(
  onSuccess: (u: UserCredential) => void,
  onReject: (r: any) => void,
  onError?: (e: any) => void
): Promise<void> {
  return signInWithPopup(auth, googleProvider)
    .then(onSuccess, onReject)
    .catch(onError);
}

export const logOut = async () => {
  await auth.signOut();
};
