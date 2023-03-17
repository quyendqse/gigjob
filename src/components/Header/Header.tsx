import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoCreate, IoLogOut, IoSettings } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccountImage } from "../../api/data/query/account";
import { defaultImg } from "../../constants/defaultValues";
import { host, port } from "../../constants/host";
import { menu } from "../../constants/menu_sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { FlexHeader, HeaderName } from "./Header.style";

function Header() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shopInfo, setShopInfo] = useLocalStorage("shopInfo", null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
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

  useEffect(() => {
    setLoading(true);
    getAccountImage(shopInfo.account.id).then((res) => {
      if (res) {
        setAvatar(res);
        setLoading(false);
      } else {
        setAvatar(defaultImg);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {loading ? (
        <CircularProgress
          sx={{
            alignSelf: "center",
            margin: "0 1rem",
          }}
          size={20}
        />
      ) : (
        <>
          <Avatar
            component={IconButton}
            sx={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              alignSelf: "center",
              margin: "0 1rem",
            }}
            src={avatar!}
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
                  mr: 0.5,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 24,
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
                  logout();
                  handleClose();
                }}>
                <ListItemIcon>
                  <IoLogOut />
                </ListItemIcon>
                Logout
              </MenuItem>
            </IconContext.Provider>
          </Menu>
        </>
      )}
    </FlexHeader>
  );
}

export default Header;
