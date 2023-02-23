import {
  IoCardOutline,
  IoCubeOutline,
  IoFileTrayFullOutline,
  IoHomeOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

export const menu = [
  {
    label: "Dashboard",
    icon: <IoHomeOutline />,
    path: "/",
  },
  {
    label: "Job Management",
    icon: <IoCubeOutline />,
    path: "/job-management",
  },
  {
    label: "Apply Management",
    icon: <IoFileTrayFullOutline />,
    path: "/apply-management",
  },
  {
    label: "Pay wage",
    icon: <IoCardOutline />,
    path: "/pay-wage",
  },
  {
    label: "Profile",
    icon: <IoStorefrontOutline />,
    path: "/profile",
  },
];
