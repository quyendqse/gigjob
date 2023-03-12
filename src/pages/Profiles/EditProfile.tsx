import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { IoAddCircle, IoAddOutline } from "react-icons/io5";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { Card, CenterColumn, Image } from "./Profile.style";
import { shopAccount } from "../../mockData/accountData";
import { ShopRequest } from "../../api/request/shop";
import { AccountResponse } from "../../api/response/AccountResponse";
import { getCurrentUser } from "../../firebase/firebase";

const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

export const EditProfile = () => {
  const navigate = useNavigate();

  window.onbeforeunload = () => {
    return window.confirm("Changes you made may not be saved.");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          imgUrl: "",
          address: "",
          description: "",
        }}
        onSubmit={(values) => {
          var currentUser = getCurrentUser();
          var account: AccountResponse = {
            id: currentUser?.uid!,
            email: currentUser?.email!,
            password: "12345678",
            imageUrl: "",
            createdDate: new Date(),
            updatedDate: new Date(),
            username: currentUser!.email!,
            isDisable: false,
            isLocked: false,
            role: "SHOP",
          };

          fetch("http://54.179.205.85:8080/api/v1/register", {
            method: "post",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
              "Content-type": "application/json; charset=UTF-8",
              Connection: "keep-alive",
              Accept: "*/*",
            },
            body: JSON.stringify(account),
          }).then((res) => {
            if (res.status === 200) {
              var request: ShopRequest = {
                accountId: localStorage.getItem("accountId")!,
                description: values.description,
                name: values.name,
                jobIds: [],
              };
              fetch("http://54.179.205.85:8080/api/v1/shop", {
                method: "post",
                headers: {
                  // Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                  "Content-type": "application/json; charset=UTF-8",
                  Connection: "keep-alive",
                  Accept: "*/*",
                },
                body: JSON.stringify(request),
              }).then((res) => {
                if (res.status === 200) {
                }
              });
            }
          });
        }}>
        {({ values, handleBlur, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography variant="h2">Edit shop profile</Typography>
              <Grid container spacing={5}>
                <Grid item xl={8} xs={12}>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  <Typography variant="h5" sx={labelStyle}>
                    Phone Number
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="phone"
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                  />
                </Grid>
                <Grid item xl={4} xs={12}>
                  <Typography variant="h5" sx={labelStyle}>
                    Logo
                  </Typography>
                  <Card
                    style={{
                      marginTop: "2rem",
                      height: "80%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {}}>
                    {shopAccount.imageUrl ? (
                      <Image src={shopAccount.imageUrl} />
                    ) : (
                      <CenterColumn>
                        <IoAddCircle size={50} />
                      </CenterColumn>
                    )}
                  </Card>
                </Grid>
              </Grid>
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
            </form>
          );
        }}
      </Formik>
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
              window.location.href = "/profile";
            }}>
            Cancel
          </Button>
        </Tooltip>
        <Button
          onClick={() => {
            window.onbeforeunload = null;
            navigate("/");
          }}
          variant="contained"
          type="submit"
          sx={{ width: "80px" }}>
          Save
        </Button>
      </Box>
    </Container>
  );
};
