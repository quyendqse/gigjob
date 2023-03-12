import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import { Formik } from "formik";
import { JobRequest } from "../../api/request/job";
import { TextField } from "../../components/TextField";
import { ShopResponse } from "../../api/response/ShopResponse";
import { useNavigate } from "react-router-dom";
const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

const initValue: JobRequest = {
  id: 0,
  shopId: "",
  jobTypeId: 1,
  title: "",
  description: "",
  skill: "",
  benefit: "",
};

// const select = [
//   "CASUAL",
//   "CONTRACTOR",
//   "EXTERNAL",
//   "FIXED_TERM_FULL_TIME",
//   "FIXED_TERM_PART_TIME",
//   "PERMANENT_TERM_FULL_TIME",
//   "PERMANENT_TERM_PART_TIME",
// ];

function CreatePostPage() {
  const navigate = useNavigate();
  const handleSubmit = (values: JobRequest) => {
    const shopInfo: ShopResponse = JSON.parse(
      localStorage.getItem("shopInfo")!
    );
    values.shopId = shopInfo.id;
    fetch("http://54.179.205.85:8080api/v1/job", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
        Connection: "keep-alive",
        Accept: "*/*",
      },
    }).then((res) => {
      if (res.status !== 200) {
        alert("error:" + res.body);
      } else {
        navigate("/job");
      }
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Formik initialValues={initValue} onSubmit={handleSubmit}>
        {({ values, handleBlur, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" sx={labelStyle}>
                Title
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="title"
                required
                type={"text"}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
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

              <Typography variant="h5" sx={labelStyle}>
                Skill
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="skill"
                type={"text"}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.skill}
              />
              <Typography variant="h5" sx={labelStyle}>
                Benefit
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="benefit"
                type={"text"}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.benefit}
              />

              {/* <Typography variant="h5" sx={labelStyle}>
                JobType
              </Typography>
              <Select
                sx={{ marginTop: "20px" }}
                id="jobTypeId"
                value={values.jobTypeId}
                onChange={({target}) => handleChange("")}>
                {select.map((s, i) => (
                  <MenuItem value={i}>{s}</MenuItem>
                ))}
              </Select> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "2rem 1rem",
                }}>
                <Tooltip title="Back To Job Post ">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ width: "100px" }}
                    onClick={() => {
                      window.location.href = "/job";
                    }}>
                    Cancel
                  </Button>
                </Tooltip>
                <Button
                  type="submit"
                  variant="contained"
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
}

export default CreatePostPage;
