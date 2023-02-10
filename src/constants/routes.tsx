import Dashboard from "../components/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
];

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
