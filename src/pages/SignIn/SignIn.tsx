import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import {
  FormBox,
  FormContainer,
  secondaryStyle,
  SideImage,
} from "./SignIn.style";

import { TextField } from "../../components/TextField";
import { RoundedButton } from "../../components/RoundedButton";
import GoogleIcon from "../../components/GoogleIcon";
import { Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const initFormValue: SignInForm = { email: "", password: "" };

function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"Google" | "EmailPassword" | null>();
  const { loginGoogleFirebase, loginEmailPassword } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (
    values: SignInForm,
    setSubmitting: (value: boolean) => void
  ) => {
    setLoading(true);
    setMethod("EmailPassword");
    loginEmailPassword(values.email, values.password).then(
      ({ status, message }) => {
        switch (status) {
          case "success":
            navigate("/");
            break;
          case "error":
            message && setErrorMessage(message);
            break;
          default:
            setErrorMessage("Something went wrong. Please try again");
            break;
        }
        setLoading(false);
        setMethod(null);
        setSubmitting(false);
      }
    );
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setMethod("Google");
    loginGoogleFirebase()
      .then((signInStatus) => {
        switch (signInStatus.status) {
          case "success":
            navigate("/", { replace: true });
            break;
          case "error":
            signInStatus.message && setErrorMessage(signInStatus.message);
            break;
          default:
            navigate("/new", { replace: true });
            break;
        }
        setLoading(false);
        setMethod(null);
      })
      .catch((e) => {});
  };

  return (
    <Grid container sx={{ backgroundColor: "#fafbfc" }}>
      <Box
        display={{ xs: "none", lg: "block" }}
        lg={7}
        xs={12}
        item
        component={Grid}>
        <Grid>
          <SideImage src="/side-image.png" alt="" />
        </Grid>
      </Box>
      <Grid item lg={5} xs={12}>
        <FormBox>
          <FormContainer>
            <Box maxWidth={500} sx={{ margin: "0 auto" }}>
              {errorMessage && (
                <Alert sx={{ marginBottom: "16px" }} severity="error">
                  {errorMessage}
                </Alert>
              )}
              <Typography variant="h3">Sign in</Typography>
              <Formik
                initialValues={initFormValue}
                onSubmit={(values, { setSubmitting }) =>
                  handleSignIn(values, setSubmitting)
                }>
                {({
                  values,
                  handleSubmit,
                  isSubmitting,
                  handleBlur,
                  handleChange,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    onFocus={() => setErrorMessage("")}>
                    <TextField
                      fullWidth
                      id="email"
                      required
                      type={"email"}
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <TextField
                      fullWidth
                      required
                      type={"password"}
                      id="password"
                      label="Password"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    <RoundedButton
                      sx={{ mt: "2rem" }}
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || loading}>
                      {loading === true && method === "EmailPassword" ? (
                        <CircularProgress color="warning" />
                      ) : (
                        <>Sign In</>
                      )}
                    </RoundedButton>
                  </form>
                )}
              </Formik>
              <Divider sx={{ margin: "1rem 0" }}>
                <Typography variant="overline" color={"#b3b5b7"}>
                  or
                </Typography>
              </Divider>
              <RoundedButton
                variant="contained"
                sx={secondaryStyle}
                disabled={loading}
                onClick={handleGoogleSignIn}>
                {loading === true && method === "Google" ? (
                  <CircularProgress />
                ) : (
                  <>
                    <GoogleIcon />
                    Continue with Google
                  </>
                )}
              </RoundedButton>
              <Grid container sx={{ margin: "1rem auto" }}>
                <Grid item xs={6}>
                  <Button variant="text" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Button variant="text">Forgot Password?</Button>
                </Grid>
              </Grid>
            </Box>
          </FormContainer>
        </FormBox>
      </Grid>
    </Grid>
  );
}

export default SignIn;
