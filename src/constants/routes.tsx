import Dashboard from "../components/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
// the first path will be chosen when router redirect
export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
];
// the first path will be chosen when router redirect
export const protectedRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
];
