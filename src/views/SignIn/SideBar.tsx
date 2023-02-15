import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import WorkIcon from "@mui/icons-material/Work";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { protectedRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { Image } from "@mui/icons-material";
import { fontSize } from "@mui/system";
const drawerWidth = 240;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu = [
    {
      lable: "Dashboard",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      lable: "Job Management",
      icon: <WorkIcon />,
      path: "/job-management",
    },
    {
      lable: "Apply Management",
      icon: <MarkAsUnreadIcon />,
      path: "/apply-management",
    },
    {
      lable: "Pay wage",
      icon: <PaymentIcon />,
      path: "/pay-wage",
    },
    {
      lable: "Profile",
      icon: <AccountCircleIcon />,
      path: "/profile",
    },
  ];
  const drawer = (
    <Box>
      <img style={{ width: "260px", height: "100px", marginLeft:'-20px', }} src="/assets/logo.png" />

      <List>
        {menu.map((menu) => {
          return (
            <ListItem>
              <ListItemButton>
                <Link
                  style={{ textDecoration: "none" }}
                  type="button"
                  to={menu.path}
                >
                  <Box sx={{ display: "flex" }}>
                    <ListItemIcon> {menu.icon} </ListItemIcon>
                    <Typography>{menu.lable}</Typography>
                  </Box>
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
