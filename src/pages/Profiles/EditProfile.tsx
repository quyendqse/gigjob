import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { Card, Image } from "./Profile.style";
import * as Yup from "yup";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { ShopRequest } from "../../api/request/ShopRequest";
import Address from "../../model/Address";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { host, port } from "../../constants/host";
import { ChangeEvent, useEffect, useState } from "react";
import { Center } from "../../components/Center/Centers";
import axios from "axios";
import { ShopResponse } from "../../api/response/ShopResponse";
import { defaultImg } from "../../constants/defaultValues";
import * as _ from "lodash";
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

export const EditProfile = () => {
  const [shopInfo, setShopInfo] = useLocalStorage("shopInfo", null);
  const [session] = useSessionStorage("accessToken", null);
  const [processing, setProcessing] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [defaultAvatar, setDefaultAvatar] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingImage(true);
    axios({
      method: "get",
      baseURL: `http://${host}:${port}/api`,
      url: `/v1/account/avatar/${shopInfo.account.id}`,
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
      .then(({ data: imgUrl }) => {
        if (!_.isUndefined(imgUrl) && !_.isEmpty(imgUrl)) {
          setAvatarUrl(imgUrl);
          axios
            .get(imgUrl, { responseType: "blob" })
            .then((response) => {
              setAvatar(new File([response.data], "avatar"));
              setDefaultAvatar(new File([response.data], "avatar"));
            })
            .catch((err) => console.log(err));
        } else {
        }
        setLoadingImage(false);
      })
      .catch((error) => alert("image not found"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetImage = () => {
    setAvatar(defaultAvatar);
    if (_.isUndefined(defaultAvatar)) {
      setAvatarUrl("");
    } else {
      setAvatarUrl(URL.createObjectURL(defaultAvatar));
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
      setAvatarUrl(URL.createObjectURL(e.target.files?.[0]));
    }
    e.target.value = "";
  };

  const handleSubmit = (values: ShopRequest) => {
    setProcessing(true);
    axios({
      url: "/v1/shop/edit",
      baseURL: `http://${host}:${port}/api`,
      method: "post",
      headers: {
        Authorization: `Bearer ${session}`,
      },
      data: values,
    })
      .then((res) => {
        const shop = res.data as ShopResponse;
        setShopInfo(shop);
        if (avatar) {
          var formData = new FormData();
          formData.append("file", avatar);
          axios({
            method: "post",
            baseURL: `http://${host}:${port}/api`,
            url: `/v1/account/${shopInfo.account.id}/image`,
            headers: {
              Authorization: `Bearer ${session}`,
              "Content-Type": "multipart/form-data",
              "Content-Length": `${avatar.size}`,
            },
            data: formData,
          })
            .then(({ data }) => {
              var clone = { ...shopInfo };
              clone.account.imageUrl = data;
              setShopInfo(clone);
              // navigate("/profile", { replace: true });
              window.location.href = "/profile";
            })
            .catch(() => {
              alert("Error when uploading file. Please try again later");
              setProcessing(false);
            });
        } else {
          window.location.href = "/profile";
          // navigate("/profile", { replace: true });
        }
      })
      .catch((error) => {
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
          imageUrl: "",
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
                      flexDirection: "column",
                      backgroundColor: "#f9dcce",
                    }}>
                    {loadingImage ? (
                      <CircularProgress />
                    ) : (
                      <Image
                        src={!_.isEmpty(avatarUrl) ? avatarUrl : defaultImg}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "60%",
                        marginTop: "2rem",
                      }}>
                      <Button variant="contained" component="label">
                        Upload
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleAvatarChange}
                        />
                      </Button>
                      <Button
                        variant="outlined"
                        component="label"
                        onClick={resetImage}>
                        Reset
                      </Button>
                    </div>
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
              {/* <Typography variant="h5" sx={labelStyle}>
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
              </Box> */}
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
