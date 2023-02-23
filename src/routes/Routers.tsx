import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {routes.map((r, index) => (
            <Route key={index} path={r.path} element={r.element} />
          ))}
        </Route>
        <Route
          path="*"
          //this jsx is just temporary. This will be update with complete UI later.
          //TODO: update this error page to complete UI
          element={
            <div>
              Something went wrong. <a href={routes[0].path}>Go back</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
