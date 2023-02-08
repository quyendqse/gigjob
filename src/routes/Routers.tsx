import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }, 
  { 
    path: "/Dashboard",
    element: <Dashboard/>
  }
]);

function AppRoutes() {
  return <RouterProvider router={routes} />;
}

export default AppRoutes;
