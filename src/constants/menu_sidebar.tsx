import {
  IoBriefcase,
  IoCalendar,
  IoHome,
  IoStorefront,
  IoWallet,
} from "react-icons/io5";

export const menu = [
  {
    label: "Home",
    icon: <IoHome />,
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
  {
    label: "Payment",
    icon: <IoWallet />,
    path: "/payment",
  },
  {
    label: "Profile",
    icon: <IoStorefront />,
    path: "/profile",
  },
];
