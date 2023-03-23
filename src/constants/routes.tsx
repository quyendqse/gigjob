import Home from "../pages/Home/Home";
import { EditProfile } from "../pages/Profiles/EditProfile";
import Profile from "../pages/Profiles/Profile";
import JobManagement from "../pages/PostManagement/PostManagement";

import Schedule from "../pages/Schedule/Schedule";
import CreatePostPage from "../pages/PostManagement/CreatePost";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import { NewProfile } from "../pages/Profiles/NewProfile";
import Session from "../pages/Session/Session";
import TopUp from "../pages/TopUp/TopUp";

export const publicRoutes = [
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
];

export const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Home />} path={"/"} />
        <Route element={<Schedule />} path={"/schedule"} />
        <Route element={<Session />} path={"/session"} />
        <Route element={<TopUp />} path={"/topUp"} />
        <Route element={<Profile />} path={"/profile"}>
          <Route element={<EditProfile />} path={"edit"} />
        </Route>
        <Route element={<JobManagement />} path={"/job"}>
          <Route element={<CreatePostPage />} path={"create"} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route element={<NewProfile />} path={"/new"} />
        <Route element={<SignIn />} path={"/login"} />
        <Route element={<SignUp />} path={"/register"} />
      </Route>
      <Route
        path="*"
        errorElement={
          <div>
            Something went wrong. <a href={"/"}>Go back</a>
          </div>
        }
      />
    </Route>
  )
);
