import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { IoAddCircle, IoAddOutline } from "react-icons/io5";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { Card, CenterColumn, Image } from "./Profile.style";
import { shopAccount } from "../../mockData/accountData";
import * as Yup from "yup";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { ShopRequest } from "../../api/request/ShopRequest";
import Address from "../../model/Address";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { host, port } from "../../constants/host";
import { useState } from "react";
import { Center } from "../../components/Center/Centers";
import axios from "axios";
import { ShopResponse } from "../../api/response/ShopResponse";

const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required").max(12, "Too long"),
  address: Yup.object().shape({
    street: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  }),
  description: Yup.string().required("Required"),
});

const conn = `http://${host}:${port}/api/v1/shop/profile/edit`;
export const EditProfile = () => {
  const [shopInfo, setShopInfo] = useLocalStorage("shopInfo", null);
  const [session] = useSessionStorage("accessToken", null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: ShopRequest) => {
    setProcessing(false);
    const headers = {
      Authorization: "Bearer " + session.accessToken,
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    };
    axios({
      url: "/v1/shop/edit",
      baseURL: `http://${host}:${port}/api`,
      method: "post",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          res.data().then((data: ShopResponse) => {
            setShopInfo(data);
            setProcessing(false);
            navigate("/profile");
          });
        } else {
          setProcessing(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setProcessing(false);
      });
  };

  return processing ? (
    <Center>
      <CircularProgress />
    </Center>
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: shopInfo.account.email,
          name: shopInfo.name,
          address: (shopInfo.addresses[0] as Address) ?? {
            country: "",
            street: "",
            district: "",
            id: "",
          },
          imageUrl: "tre",
          username: shopInfo.account.username,
          description: shopInfo.description,
          phone: shopInfo.account.phone,
          accountId: shopInfo.account.id,
          password: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography variant="h2">Edit shop profile</Typography>
              <Grid container spacing={5}>
                <Grid item xl={8} xs={12}>
                  <Typography variant="h5" sx={labelStyle}>
                    Email
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="email"
                    disabled
                    type={"email"}
                    margin="normal"
                    variant="outlined"
                    value={values.email}
                  />
                  <Typography variant="h5" sx={labelStyle}>
                    Username
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="username"
                    error={
                      (errors.username !== undefined && touched.username) ===
                      true
                    }
                    helperText={
                      touched.username ? errors.username?.toString() : null
                    }
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                  />
                  <Typography variant="h5" sx={labelStyle}>
                    Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="name"
                    error={(errors.name !== undefined && touched.name) === true}
                    helperText={touched.name ? errors.name?.toString() : null}
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
                    error={
                      (errors.phone !== undefined && touched.phone) === true
                    }
                    helperText={touched.phone ? errors.phone?.toString() : null}
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
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    label="Street"
                    id="address.street"
                    type={"text"}
                    error={
                      errors.address?.street !== undefined &&
                      touched.address?.street
                    }
                    helperText={
                      touched.address?.street && errors.address?.street
                    }
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address.street}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    error={
                      errors.address?.district !== undefined &&
                      touched.address?.district
                    }
                    helperText={
                      touched.address?.district && errors.address?.district
                    }
                    label="District"
                    id="address.district"
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address.district}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    error={
                      errors.address?.city !== undefined &&
                      touched.address?.city
                    }
                    helperText={touched.address?.city && errors.address?.city}
                    label="City"
                    id="address.city"
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address.city}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    error={
                      errors.address?.province !== undefined &&
                      touched.address?.province
                    }
                    helperText={
                      touched.address?.province && errors.address?.province
                    }
                    label="Province"
                    id="address.province"
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address.province}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    label="Country"
                    id="address.country"
                    error={
                      errors.address?.country !== undefined &&
                      touched.address?.country
                    }
                    helperText={
                      touched.address?.country && errors.address?.country
                    }
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address.country}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" sx={labelStyle}>
                Description
              </Typography>
              <TextField
                hiddenLabel
                multiline
                fullWidth
                id="description"
                error={
                  (errors.description !== undefined && touched.description) ===
                  true
                }
                helperText={
                  touched.description ? errors.description?.toString() : null
                }
                required
                type={"text"}
                margin="normal"
                minRows={10}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
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
                  <input required={false} hidden accept="image/*" type="file" />
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
                  variant="contained"
                  type="submit"
                  sx={{ width: "80px" }}>
                  Save
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};
