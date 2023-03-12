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
