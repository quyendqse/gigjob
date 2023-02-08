import { Button,Divider, Fab, Grid, Input, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as S from "./Login.styled";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
function Login() {
  return (
    <Box sx={S.Root}>
      <Grid item xs={6}>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
      </Grid>
      <Grid  item xs={4}> 
      <Box> 
        <Typography
          variant="h5"
          sx={(theme) => ({
            mt: "100px",
          })}
        >
          Sign in with 
       
          <FacebookIcon color="primary" sx={{ml:'20px', mt:'40px', fontSize:'50px'}}/> 
          <EmailIcon color="error" sx={{ml:'20px' , mt:'40px', fontSize:'50px'}}/>
        </Typography>
        </Box>
     
        
        <S.Dividers>
          <Box sx={{ mt: "50px" }}>
            <Divider> <Typography variant="h5"> 
                 Or </Typography> </Divider>
          </Box>
        </S.Dividers>
        <Box sx={{ mt: "70px" }}>
          <Input
            sx={{
              width: "280px",
              height: "45px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
            placeholder="Email address"
          />

          <Grid sx={{ mt: "40px" }}>
            <Input
              placeholder="Password"
              sx={{
                width: "280px",
                height: "45px",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            />
          </Grid>
          <Box sx={{ mt: "20px" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <Link> Forgot Password ? </Link>
          </Box>
          <Box sx={{mt:'20px'}}> 
          <Fab sx={{width:'120px'}} variant="extended" color="primary">
        Login
      </Fab>
        </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Login;
