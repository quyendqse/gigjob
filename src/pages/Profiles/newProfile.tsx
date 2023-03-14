import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { TextField } from "../../components/TextField";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useAuth } from "../../context/AuthContext";

const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

export const NewProfile = () => {
  const { logout } = useAuth();
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
        onSubmit={(values) => {}}>
        {({ values, handleBlur, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography variant="h2">New shop profile</Typography>
              <Grid container spacing={5}>
                <Grid item xs={12}>
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
                {/* <Grid item xl={4} xs={12}>
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
                </Grid> */}
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
                      logout();
                    }}>
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
          <input hidden accept="image/*" type="file" />
        </IconButton>
      </Box> */}
    </Container>
  );
};
