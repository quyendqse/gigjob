import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoCreate, IoTrashBin } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
} from "@mui/material";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { JobResponse } from "../../api/response/JobResponse";
import { jobData } from "../../mockData/jobData";
import { useNavigate } from "react-router-dom";
interface PostOptionProps {
  job: JobResponse | undefined;
  handleDelete: () => void;
}
export default function PostOption(props: PostOptionProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeConfirm = () => setConfirm(false);

  const handleEdit = () => {
    navigate("/job/edit", { state: { jobId: props.job?.id } });
  };

  const confirmDelete = () => {
    setConfirm(true);
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
          {/* <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <IoCreate />
            </ListItemIcon>
            Edit
          </MenuItem> */}
          <MenuItem onClick={confirmDelete}>
            <ListItemIcon>
              <IoTrashBin />
            </ListItemIcon>
            Delete
          </MenuItem>
        </IconContext.Provider>
      </Menu>
      <Dialog
        open={confirm}
        onClose={closeConfirm}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete job <strong>{props.job!.title}</strong>?
          </DialogContentText>
          <DialogContentText>This action can not undo.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeConfirm}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ color: "white" }}
            onClick={() => {
              props.handleDelete();
              closeConfirm();
            }}
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
