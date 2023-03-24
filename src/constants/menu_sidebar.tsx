import {
  IoBriefcase,
  IoCalendar,
  IoDocument,
  IoStorefront,
  IoWallet,
} from "react-icons/io5";

export const menu = [
  {
    label: "Applications",
    icon: <IoDocument />,
    path: "/",
  },
  {
    label: "Schedule",
    icon: <IoCalendar />,
    path: "/schedule",
  },
  {
    label: "Job Management",
    icon: <IoBriefcase />,
    path: "/job",
  },
  // {
  //   label: "Session",
  //   icon: <IoWallet />,
  //   path: "/session",
  // },
  {
    label: "Profile",
    icon: <IoStorefront />,
    path: "/profile",
  },
];
