import { BrowserRouter, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((r, index) => (
            <Route key={`proRoute${index}`} path={r.path} element={r.element} />
          ))}
        </Route>
        <Route element={<PublicRoute />}>
          {publicRoutes.map((r, index) => (
            <Route key={`pubRoute${index}`} path={r.path} element={r.element} />
          ))}
        </Route>
        <Route
          path="*"
          //this jsx is just temporary. This will be update with complete UI later.
          //TODO: update this error page to complete UI
          element={
            <div>
              Something went wrong. <a href="/">Go back</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
