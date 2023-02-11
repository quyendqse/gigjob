import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../views/Home";
import SignIn from "../views/SignIn/SignIn";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={routes} />;
}

export default AppRoutes;
