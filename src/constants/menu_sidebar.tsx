import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const menu = [
  {
    label: "Dashboard",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    label: "Job Management",
    icon: <WorkIcon />,
    path: "/job-management",
  },
  {
    label: "Apply Management",
    icon: <MarkAsUnreadIcon />,
    path: "/apply-management",
  },
  {
    label: "Pay wage",
    icon: <PaymentIcon />,
    path: "/pay-wage",
  },
  {
    label: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
];
