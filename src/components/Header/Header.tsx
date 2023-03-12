import { Avatar, Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IoCreate, IoLogOut, IoSettings } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { useLocation, useNavigate } from "react-router-dom";
import { menu } from "../../constants/menu_sidebar";
import { logOut } from "../../firebase/firebase";
import { FlexHeader, HeaderName } from "./Header.style";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const moveToEditProfile = () => {
    navigate("/profile/edit");
    handleClose();
  };

  return (
    <FlexHeader>
      <HeaderName variant="h3">
        {
          menu.filter((m) => {
            return (
              (m.path === "/home" && location.pathname === "/") ||
              m.path.split(/\//g)[1] === location.pathname.split(/\//g)[1]
            );
          })[0].label
        }
      </HeaderName>
      <Avatar
        component={Button}
        sx={{ width: "70px", height: "70px", objectFit: "contain", p: 0 }}
        src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg"
        onClick={handleClick}
      />
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 28,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <IconContext.Provider value={{ size: "1.4rem" }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <IoSettings />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={moveToEditProfile}>
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
