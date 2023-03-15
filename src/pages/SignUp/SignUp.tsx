import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, replace } from "formik";
import { RoundedButton } from "../../components/RoundedButton";
import { TextField } from "../../components/TextField";
import { Card2, styles } from "./SignUp.style";
import * as Yup from "yup";
import { AccountRequest } from "../../api/request/AccountRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

interface Form {
  email: string;
  username: string;
  password: string;
  rePassword: string;
  phone: string;
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
  };

  const toRequest = (values: Form): AccountRequest => {
    return {
      id: "",
      email: values.email,
      username: values.username,
      password: values.password,
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
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Password
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="password"
                  name="password"
                  type={"password"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Retype password
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="rePassword"
                  name="rePassword"
                  type={"password"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rePassword}
                />
                {errors.rePassword && touched.rePassword ? (
                  <div>{errors.rePassword}</div>
                ) : null}
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Phone
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="phone"
                  name="phone"
                  type={"text"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <div>{errors.phone}</div>
                ) : null}
                <Typography variant="h6" sx={{ mb: "-12px" }}>
                  Shop name
                </Typography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="name"
                  name="name"
                  type={"text"}
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
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
                  onChange={handleChange}
                  minRows={10}
                  multiline
                  value={values.description}
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
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
