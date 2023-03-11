import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoCreate, IoTrashBin } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { ListItemIcon } from "@mui/material";

const options = [
  {
    icon: <IoCreate />,
    label: "Edit",
  },
  {
    icon: <IoTrashBin />,
    label: "Delete",
  },
];

const ITEM_HEIGHT = 48;

export default function PostOption() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ position: "absolute", top: "32px", right: "32px" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <IconContext.Provider value={{ size: "1.4rem" }}>
          {options.map((option) => (
            <MenuItem onClick={() => {}}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              {option.label}
            </MenuItem>
          ))}
        </IconContext.Provider>
      </Menu>
    </div>
  );
}
