import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { FormContainer, secondaryStyle, SideImage } from "./SignIn.style";

import { TextField } from "../../components/TextField";

import { RoundedButton } from "../../components/RoundedButton";
import GoogleIcon from "../../components/GoogleIcon";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../../firebase/firebase";

interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const initFormValue: SignInForm = { email: "", password: "" };

function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (values: SignInForm) => {
    login(
      values.email,
      values.password,
      (u) => {
        if (u) {
          navigate("/home");
        } else {
          alert("Email or password is incorrect");
        }
      },
      (reason) => console.log(JSON.stringify(reason))
    );
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle(
      (user) => {
        if (user) {
          navigate("/home");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      },
      (r) => {
        console.log(JSON.stringify(r, null, 2));
      },
      (e) => console.log(e)
    );
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
        <FormContainer>
          <Box maxWidth={500} sx={{ margin: "0 auto" }}>
            <Typography variant="h3">Sign in</Typography>
            <Formik initialValues={initFormValue} onSubmit={handleSignIn}>
              {({
                values,
                handleSubmit,
                isSubmitting,
                handleBlur,
                handleChange,
              }) => (
                <form onSubmit={handleSubmit}>
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
                  <Grid container sx={{ margin: "1rem auto" }}>
                    <Grid item xs={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch />}
                          label="Remember me"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Button variant="text">Forgot Password?</Button>
                    </Grid>
                  </Grid>
                  <RoundedButton
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}>
                    SIGN IN
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
              onClick={handleGoogleSignIn}>
              <GoogleIcon />
              Continue with Google
            </RoundedButton>
          </Box>
        </FormContainer>
      </Grid>
    </Grid>
  );
}

export default SignIn;
