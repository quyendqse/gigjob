import { BrowserRouter, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((r) => (
            <Route path={r.path} element={r.element} />
          ))}
        </Route>
        <Route element={<PublicRoute />}>
          {publicRoutes.map((r) => (
            <Route path={r.path} element={r.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
