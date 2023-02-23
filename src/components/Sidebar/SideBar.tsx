import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Outlet } from "react-router-dom";
import { menu } from "../../constants/menu_sidebar";
import { IconContext } from "react-icons/lib";
import Header from "../Header/Header";
const drawerWidth = 240;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const logoAsset = "/assets/logo.png";
  const drawer = (
    <Box style={{ borderRight: "none" }}>
      <img
        style={{ width: drawerWidth, height: "130px", objectFit: "cover" }}
        src={logoAsset}
        alt="logo"
      />

      <IconContext.Provider value={{ color: "black", size: "1.4rem" }}>
        <List>
          {menu.map((menu, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton href={menu.path}>
                  <div style={{ marginRight: "8px" }}>{menu.icon}</div>
                  {menu.label}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </IconContext.Provider>

      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "unset",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
        }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}
