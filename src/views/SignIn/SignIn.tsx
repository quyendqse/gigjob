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

function SignIn() {
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
            <TextField
              fullWidth
              id="username"
              required
              label="Username"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              required
              id="password"
              label="Password"
              margin="normal"
              variant="outlined"
            />
            <Grid container sx={{ margin: "1rem auto" }}>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel control={<Switch />} label="Remember me" />
                </FormGroup>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Button variant="text">Forgot Password?</Button>
              </Grid>
            </Grid>
            <RoundedButton variant="contained" type="submit">
              SIGN IN
            </RoundedButton>
            <Divider sx={{ margin: "1rem 0" }}>
              <Typography variant="overline" color={"#b3b5b7"}>
                or
              </Typography>
            </Divider>
            <RoundedButton variant="contained" sx={secondaryStyle}>
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
