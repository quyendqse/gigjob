import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { menu } from "../../constants/menu_sidebar";
import { IconContext } from "react-icons/lib";
import Header from "../Header/Header";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { Padding } from "./Sidebar.style";
const drawerWidth = 320;
const mainLayoutStyle = {
  flexGrow: 1,
  width: { sm: `calc(100vw - ${drawerWidth}px)` },
};
const drawerStyle = {
  display: { xs: "none", sm: "block" },
  "& .Mui-selected": {
    "& .MuiListItemIcon-root": {
      color: "#A23F00",
    },
    "& .MuiListItemText-primary": {
      color: "#A23F00",
      fontFamily: "Open Sans",
      fontWeight: "700",
      fontSize: "18px",
    },
  },
};

export default function SideBar() {
  const logoAsset = "https://iweb.tatthanh.com.vn/pic/3/blog/images/logo-shop-dien-thoai-7.jpg";
  const location = useLocation();
  console.log(location.hash);

  const getSelectedItem = (path: string, num: number) => {
    return (
      (num === 0 && location.pathname === "/") ||
      (num !== 0 && location.pathname === path)
    );
  };
  const drawer = (
    <Box style={{ borderRight: "none" }}>
      <img className="logoBrandStyle" src={logoAsset} alt="logo" />
      <IconContext.Provider value={{ size: "1.6rem" }}>
        <List>
          {menu.map((menu, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton
                  selected={getSelectedItem(menu.path, index)}
                  href={menu.path}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText>{menu.label}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </IconContext.Provider>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="permanent" sx={drawerStyle} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={mainLayoutStyle}>
        <Header />
        <Padding>
          <Outlet />
        </Padding>
      </Box>
    </Box>
  );
}
