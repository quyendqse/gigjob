import Home from "../pages/Home/Home";
import { EditProfile } from "../pages/Profiles/EditProfile";
import Profile from "../pages/Profiles/Profile";
import JobManagement from "../pages/PostManagement/PostManagement";

import Schedule from "../pages/Schedule/Schedule";
import CreatePostPage from "../pages/PostManagement/CreatePost";
// the first path will be chosen when router redirect
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/schedule",
    //TODO: replace
    element: <Schedule />,
  },
  {
    path: "/job",
    //TODO: replace
    element: <JobManagement />,
    children: [
      {
        path: "./create",
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: "/payment",
    element: <div>Payment</div>,
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "./edit",
        element: <EditProfile />,
      },
    ],
  },
];
