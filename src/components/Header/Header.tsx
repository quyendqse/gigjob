import { Avatar, Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IoCreate, IoLogOut, IoSettings } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { useLocation } from "react-router-dom";
import { menu } from "../../constants/menu_sidebar";
import { logOut } from "../../firebase/firebase";
import { FlexHeader, HeaderName } from "./Header.style";

function Header() {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FlexHeader>
      <HeaderName variant="h3">
        {
          menu.filter((m) => {
            return (
              (m.path === "/home" && location.pathname === "/") ||
              m.path === location.pathname
            );
          })[0].label
        }
      </HeaderName>
      <Avatar
        component={Button}
        sx={{ width: "auto", height: "80%", p: 0 }}
        src="/assets/logo2.png"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <IconContext.Provider value={{ size: "1.4rem" }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <IoSettings />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <IoCreate />
            </ListItemIcon>
            Edit Profile
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              logOut();
              handleClose();
            }}>
            <ListItemIcon>
              <IoLogOut />
            </ListItemIcon>
            Logout
          </MenuItem>
        </IconContext.Provider>
      </Menu>
    </FlexHeader>
  );
}

export default Header;
