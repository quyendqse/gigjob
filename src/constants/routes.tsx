import { ApplyManagement } from "../pages/ApplyManagement/ApplyManagement";
import { JobManagement } from "../pages/JobManagement/JobManagement";
import { PayWage } from "../pages/PayWage/PayWage";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import { EditProfile} from "../pages/Profiles/EditProfile";
import Profile from "../pages/Profiles/Profile";
import PostManagement from "../pages/PostManagement/PostManagement";


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
    path: "/apply-management",
    element: <ApplyManagement />,
  },
  {
    path: "/pay-wage",
    element: <PayWage />,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/edit-profile",
    element: <EditProfile/>,
  },
  {
    path: "/post",
    element: <PostManagement/>,
  },
];
