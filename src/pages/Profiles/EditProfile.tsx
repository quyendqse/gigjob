import {
  Box,
  Button,
  Grid,
  IconButton,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
export const EditProfile = () => { 
  const navigate = useNavigate()

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <Typography sx={{ fontSize: "28px" }} variant="h1">
              Edit Profile
            </Typography>
            <Typography
              variant="h5"
              sx={{ mt: "10px", fontSize: "13px", ml: "10px" }}
            >
              Name
            </Typography>
            <TextField sx={{ width: "800px", ml: "10px" }} />
            <Typography variant="h5" sx={{ mt: "10px", fontSize: "13px" }}>
              Description
            </Typography>
            <TextareaAutosize
              style={{
                height: 300,
                width: 800,
                marginLeft: "10px",

                borderRadius: "8px",
              }}
            />
            <Typography
              variant="h5"
              sx={{ mt: "10px", fontSize: "13px", ml: "10px" }}
            >
              Website
            </Typography>
            <TextField sx={{ width: "800px", ml: "10px" }} />
            <Typography
              variant="h5"
              sx={{ mt: "10px", fontSize: "13px", ml: "10px" }}
            >
              Address
            </Typography>
            <TextField sx={{ width: "800px", ml: "10px" }} />
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: "10px", ml: "20px", height: "40px", width: "100px" }}
          >
            <AddIcon />
            <Typography variant="h1" sx={{ fontSize: "10px", ml: "5px" }}>
              Address
            </Typography>
          </Button>
          <Typography
            variant="h5"
            sx={{ mt: "20px", fontSize: "20px", ml: "10px" }}
          >
            Images
          </Typography>
          <Box sx={{ mt: "15px" }}>
            <IconButton
              sx={{
                backgroundColor: "grey",
                ml: "20px",
                width: "120px",
                height: "120px",
              }}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <AddIcon sx={{ fontSize: "40px", color: "white" }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "grey",
                ml: "20px",
                width: "120px",
                height: "120px",
              }}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <AddIcon sx={{ fontSize: "40px", color: "white" }} />
            </IconButton>
          </Box>
          <Box sx={{display:'flex'}}> 
          <Tooltip title='Back To Page Profile'> 
          <Button
            variant="contained"
            component="label"
            sx={{  width: "100px", ml: "700px" }}
            onClick={()=>{navigate("/profile")}}
          >  
            Cancle
          </Button>
          </Tooltip>
          <Button
            variant="contained"
            component="label"
            sx={{  width: "80px", ml:'20px' }}
          >
            Save
          </Button>
          </Box>
        </Grid>
        
        <Grid item xs={4}>
          <Box sx={{display:'flex', justifyContent:'flex-end', mt:'-70px'}}> 
          <img
            src="/assets/logo2.png"
            alt="logo"
            style={{ width: "69px", height: "69px" }}
          />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
