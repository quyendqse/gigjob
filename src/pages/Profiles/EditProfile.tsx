import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { IoAddOutline } from "react-icons/io5";
import { Container } from "@mui/system";

const labelStyle = {
  fontSize: "1rem",
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

export const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Box>
        <Typography variant="h2">Edit shop profile</Typography>
        <Typography variant="h5" sx={labelStyle}>
          Name
        </Typography>
        <TextField
          hiddenLabel
          fullWidth
          id="name"
          required
          type={"text"}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h5" sx={labelStyle}>
          Description
        </Typography>
        <TextField
          hiddenLabel
          multiline
          fullWidth
          id="description"
          required
          type={"text"}
          margin="normal"
          minRows={10}
          variant="outlined"
        />
        <Typography variant="h5" sx={labelStyle}>
          Website
        </Typography>
        <TextField
          hiddenLabel
          fullWidth
          id="website"
          type={"text"}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h5" sx={labelStyle}>
          Address
        </Typography>
        <TextField
          hiddenLabel
          fullWidth
          id="address"
          type={"text"}
          margin="normal"
          variant="outlined"
        />
      </Box>
      <Typography variant="h5" sx={labelStyle}>
        Images
      </Typography>
      <Box>
        <IconButton
          sx={{
            height: "120px",
            width: "120px",
            borderRadius: "16px",
            margin: "1rem 0",
          }}
          color="primary"
          aria-label="upload picture"
          component="label">
          <IoAddOutline />
          <input hidden accept="image/*" type="file" />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: "2rem 1rem",
        }}>
        <Tooltip title="Back To Page Profile">
          <Button
            variant="contained"
            component="label"
            sx={{ width: "100px" }}
            onClick={() => {
              navigate("/profile");
            }}>
            Cancel
          </Button>
        </Tooltip>
        <Button variant="contained" component="label" sx={{ width: "80px" }}>
          Save
        </Button>
      </Box>
    </Container>
  );
};
