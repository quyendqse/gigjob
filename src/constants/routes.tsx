import Home from "../views/Home";
import SignIn from "../views/SignIn/SignIn";

// the first path will be chosen when router redirect
export const publicRoutes = [
  {
    path: "/",
    element: <SignIn />,
  },
];
// the first path will be chosen when router redirect
export const protectedRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
];
