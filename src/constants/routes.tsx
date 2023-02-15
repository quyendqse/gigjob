import { ApplyManagement } from "../components/pages/ApplyManagement";
import { JobManagement } from "../components/pages/JobManagement";
import { PayWage } from "../components/pages/PayWage";
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
  {
    path: "/job-management",
    element: <JobManagement />,
  },
  {
    path: "/apply-manangement",
    element: <ApplyManagement />,
  },
  {
    path: "/pay-wage",
    element: <PayWage />,
  },
];
