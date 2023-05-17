import { Payment } from "@mui/icons-material";
import Home from "../pages/Home/Home";
import PayMent from "../pages/Payment/PayMent";
import { ProductsManagement } from "../pages/ProductsManagement.style.ts/ProductsManagement";
import { EditProfile } from "../pages/Profiles/EditProfile";
import Profile from "../pages/Profiles/Profile";
import Schedule from "../pages/Schedule/Schedule";
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
    element: <ProductsManagement/>,
  },
  {
    path: "/payment",
    element: <PayMent/> ,
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
