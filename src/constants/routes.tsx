import Home from "../pages/Home/Home";
import Profile from "../pages/Profiles/Profile";
// the first path will be chosen when router redirect
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/schedule",
    //TODO: replace
    element: <div>Schedule</div>,
  },
  {
    path: "/job",
    //TODO: replace
    element: <div>Job post</div>,
  },
  {
    path: "/payment",
    element: <div>Payment</div>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];
