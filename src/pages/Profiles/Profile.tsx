import {
  Avatar,
  Button,
  Divider,
  Grid,
  Link,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "../../components/Stack/Stack";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
import { DataProfile } from "./DataProfile";

export default function Profile() {
  const navigate = useNavigate();

  const shop = useAppSelector(selectShop);

  const click = () => {
    navigate("/profile/edit");
  };

  return (
    <Box>
      <Stack>
        {/* <Thumbnail image="/assets/logo3.png" /> */}
        <Tooltip
          title="Edit Profile"
          sx={{ position: "absolute", right: "16px", top: "16px" }}>
          <Button variant="contained" component="label" onClick={click}>
            Edit
          </Button>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            left: "30px",
            position: "absolute",
            bottom: "-60px",
            alignItems: "end",
          }}>
          <Avatar
            draggable={"false"}
            sx={{ width: 120, height: 120, marginRight: "20px" }}
            src="/assets/logo2.png"
          />
          <Typography variant="h1">{shop.name}</Typography>
        </Box>
      </Stack>
      <Grid container spacing={2} sx={{ marginTop: "4rem" }}>
        <Grid item lg={8} xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              marginBottom: "1rem",
            }}>
            About Company
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "justify",
            }}>
            {shop.description}
          </Typography>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ margin: "0 2rem", display: { xs: "none", lg: "inherit" } }}
        />
        <Grid item lg={3} xs={12}>
          <Typography
            variant="h4"
            sx={{ fontSize: "24px", marginBottom: "1rem" }}>
            Detail Information
          </Typography>

          <Typography variant="h4"> Website </Typography>
          <Link href="https://nab-vietnam.apac.positivethinking">
            https://nab-vietnam.apac.positivethinking
          </Link>
          <Box>
            <Typography variant="h4"> Location </Typography>
            <List>
              {DataProfile.map((data) => {
                return <Typography> {data.location} </Typography>;
              })}
              <Typography variant="h4"> Images </Typography>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
