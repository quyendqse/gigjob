import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { TextField } from "../../components/TextField";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useAuth } from "../../context/AuthContext";
import { Center } from "../../components/Center/Centers";
import { useState } from "react";
import { ShopRequest } from "../../api/request/ShopRequest";
import Address from "../../model/Address";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { geocode } from "../../api/data/query/geocode";

const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

const newProfileSchema = Yup.object().shape({
  username: Yup.string().required("Required").max(50, "Too long"),
  name: Yup.string().required("Required").max(50, "Too long"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.object().shape({
    street: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  }),
  phone: Yup.string()
    .required("Required")
    .matches(/[0-9]/, "Can only contains number")
    .max(10, "Phone start with 0 and 10 characters long."),
  description: Yup.string().required("Required"),
});

export const NewProfile = () => {
  const { user, loading, logout, createNewShopProfile } = useAuth();
  const [loadingNetwork, setLoadingNetwork] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (
    request: ShopRequest,
    setSubmitting: (value: boolean) => void
  ) => {
    setLoadingNetwork(true);
    geocode(
      request.address,
      (data) => {
        request.longitude = data.data.items[0].position.lng;
        request.latitude = data.data.items[0].position.lat;
        createNewShopProfile(request).then(({ status, message }) => {
          switch (status) {
            case "success":
              navigate("/", { replace: true });
              break;

            default:
              break;
          }
          setLoadingNetwork(false);
        });
      },
      (reason) => alert(reason)
    );
  };

  return loading || loadingNetwork ? (
    <Center>
      <CircularProgress />
    </Center>
  ) : user === null ? (
    <Navigate to="/login" replace />
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Formik
        validationSchema={newProfileSchema}
        initialValues={
          {
            name: "",
            accountId: user!.uid,
            email: user!.email,
            username: "",
            phone: "",
            description: "",
            address: {
              id: 0,
              country: "Vietnam",
              street: "",
              district: "",
              city: "",
              province: "",
            } as Address,
          } as ShopRequest
        }
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }>
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
              <Typography variant="h2">New shop profile</Typography>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={labelStyle}>
                    Email
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="email"
                    disabled
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Typography variant="h5" sx={labelStyle}>
                    Username
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="username"
                    error={errors.username !== undefined && touched.username}
                    helperText={touched.username && errors.username}
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                  />
                  <Typography variant="h5" sx={labelStyle}>
                    Shop Name
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="name"
                    error={errors.name !== undefined && touched.name}
                    helperText={touched.name && errors.name}
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
                    error={errors.phone !== undefined && touched.phone}
                    helperText={touched.phone && errors.phone}
                    id="phone"
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                  />
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
                error={errors.description !== undefined && touched.description}
                helperText={touched.description && errors.description}
                id="description"
                type={"text"}
                margin="normal"
                minRows={10}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "2rem 1rem",
                }}>
                <Tooltip title="Back To Page Profile">
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ width: "100px" }}
                    onClick={logout}>
                    Log out
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
