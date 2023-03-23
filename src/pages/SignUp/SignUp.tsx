import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { RoundedButton } from "../../components/RoundedButton";
import { TextField } from "../../components/TextField";
import { Card2, styles } from "./SignUp.style";
import * as Yup from "yup";
import { AccountRequest } from "../../api/request/AccountRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import Address from "../../model/Address";
import { geocode } from "../../api/data/query/geocode";

interface Form {
  email: string;
  username: string;
  password: string;
  rePassword: string;
  phone: string;
  address: Address;
  imageUrl: string;
  name: string;
  description: string;
}

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(5, "Your password is too short.")
    .matches(/[a-zA-Z0-9@_-]/, "Password can only contain Latin letters."),
  rePassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords doesn't match"
  ),
  address: Yup.object().shape({
    street: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  }),
  phone: Yup.string()
    .required("Required")
    .matches(/[0-9]/, "Can only contains number")
    .max(10, "Phone start with 0 and 10 characters long."),
  name: Yup.string()
    .required("Required")
    .max(100, "Your shop name is too long"),
  description: Yup.string().required("Required"),
});
const formRequest: Form = {
  username: "",
  password: "",
  rePassword: "",
  address: {
    id: 0,
    country: "Việt Nam",
    district: "",
    street: "",
    city: "",
    province: "",
  },
  email: "",
  phone: "",
  imageUrl: "",
  name: "",
  description: "",
};
const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signUpEmailPassword } = useAuth();

  const handleSubmit = (
    request: AccountRequest,
    setSubmitting: (value: boolean) => void
  ) => {
    setLoading(true);
    geocode(
      request.address,
      (data) => {
        if (data.data.items.length !== 0) {
          request.longitude = data.data.items[0].position.lng;
          request.latitude = data.data.items[0].position.lat;
          signUpEmailPassword(request).then(({ status, message }) => {
            switch (status) {
              case "success":
                navigate("/", { replace: true });
                break;
              default:
                alert(message);
                break;
            }
            setLoading(false);
          });
        }
      },
      (reason) => alert(reason)
    );
  };

  const toRequest = (values: Form): AccountRequest => {
    return {
      id: "",
      email: values.email,
      username: values.username,
      password: values.password,
      address: values.address,
      phone: values.phone,
      name: values.name,
      description: values.description,
      imageUrl: "",
    };
  };

  return (
    <Box sx={styles.paperContainer}>
      <Card2>
        <Typography variant="h3" align="center">
          Sign Up
        </Typography>
        <Formik
          initialValues={formRequest}
          onSubmit={(values: Form, { setSubmitting }) => {
            var request: AccountRequest = toRequest(values);
            handleSubmit(request, setSubmitting);
          }}
          validationSchema={SignUpSchema}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Email
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="email"
                  name="email"
                  type={"email"}
                  margin="normal"
                  error={errors.email !== undefined && touched.email}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Username
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="username"
                  name="username"
                  type={"text"}
                  margin="normal"
                  error={errors.username !== undefined && touched.username}
                  helperText={touched.username && errors.username}
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                />
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Password
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="password"
                  name="password"
                  type={"password"}
                  error={errors.password !== undefined && touched.password}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />

                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Retype password
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="rePassword"
                  name="rePassword"
                  error={errors.rePassword !== undefined && touched.rePassword}
                  helperText={touched.rePassword && errors.rePassword}
                  type={"password"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rePassword}
                />

                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Phone
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="phone"
                  name="phone"
                  error={errors.phone !== undefined && touched.phone}
                  helperText={touched.phone && errors.phone}
                  type={"text"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                />

                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Shop name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="name"
                  name="name"
                  error={errors.name !== undefined && touched.name}
                  helperText={touched.name && errors.name}
                  type={"text"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
                <Typography variant="h6" sx={{ mb: "-12px" }}>
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
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Shop description
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="description"
                  name="description"
                  type={"text"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  error={
                    errors.description !== undefined && touched.description
                  }
                  helperText={touched.description && errors.description}
                  onChange={handleChange}
                  minRows={10}
                  multiline
                  value={values.description}
                />
                <RoundedButton
                  type="submit"
                  variant="contained"
                  sx={{ mt: "32px" }}
                  disabled={loading}>
                  {loading ? <CircularProgress /> : <>Register</>}
                </RoundedButton>
              </form>
            );
          }}
        </Formik>
      </Card2>
    </Box>
  );
};

export default SignUp;
