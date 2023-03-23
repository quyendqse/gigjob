import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { JobRequest } from "../../api/request/JobRequest";
// import {  } from "../../components/TextField";
import { ShopResponse } from "../../api/response/ShopResponse";
import { host, port } from "../../constants/host";
import { useSessionStorage } from "../../hook/useSessionStorage";
const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

const initValue: JobRequest = {
  id: 0,
  salary: 0,
  shopId: "",
  jobTypeId: 1,
  title: "",
  description: "",
  skill: "",
  benefit: "",
};

const select = [
  {
    id: 1,
    name: "Việc khối văn phòng",
  },
  {
    id: 2,
    name: "Việc ở siêu thị, kho",
  },
];

function CreatePostPage() {
  const [accessToken] = useSessionStorage("accessToken", null);

  const handleSubmit = (values: JobRequest) => {
    const shopInfo: ShopResponse = JSON.parse(
      localStorage.getItem("shopInfo")!
    );
    values.shopId = shopInfo.id;
    const headers = {
      Authorization: "Bearer " + accessToken,
      "Content-type": "application/json; charset=UTF-8",
      Connection: "keep-alive",
      Accept: "*/*",
    };
    fetch(`http://${host}:${port}/api/v1/job`, {
      method: "post",
      body: JSON.stringify(values),
      headers: headers,
    }).then((res) => {
      if (res.status !== 200) {
        res.text().then((data) => console.log(data));
      } else {
        window.location.href = "/job";
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
                Job type
              </Typography>
              <Select
                fullWidth
                name="jobTypeId"
                sx={{ marginTop: "20px" }}
                id="jobTypeId"
                value={values.jobTypeId}
                onChange={handleChange}>
                {select.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
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
                multiline
                id="skill"
                type={"text"}
                minRows={10}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.skill}
              />
              <Typography variant="h5" sx={labelStyle}>
                Salary per hour
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="salary"
                name="salary"
                type={"number"}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
              />
              <Typography variant="h5" sx={labelStyle}>
                Benefit
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="benefit"
                multiline
                minRows={10}
                type={"text"}
                margin="normal"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.benefit}
              />
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
