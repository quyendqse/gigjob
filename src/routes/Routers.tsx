import { config } from "process";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { ApplyManagement } from "../components/pages/ApplyManagement";
import { JobManagement } from "../components/pages/JobManagement";
import { PayWage } from "../components/pages/PayWage";
import { protectedRoutes, publicRoutes } from "../constants/routes";
import Home from "../views/Home";
import SideBar from "../views/SignIn/SideBar";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
   <SideBar/>
      <Routes>
        {/* <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((r, index) => (
            <Route key={`proRoute${index}`} path={r.path} element={r.element} />
          ))}
        </Route> */}
        <Route element={<PublicRoute />}>
          {publicRoutes.map((r, index) => (
            <Route key={`pubRoute${index}`} path={r.path} element={r.element} />
          ))}
        </Route>
        <Route> <Route path="/home" element={<Home />}/>  </Route> 
        <Route> <Route path="/job-management" element={<JobManagement />}/>  </Route> 
        <Route> <Route path="/pay-wage" element={<PayWage />}/>  </Route> 
        <Route> <Route path="/apply-management" element={<ApplyManagement />}/>  </Route> 
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
