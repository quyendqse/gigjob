import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import { JobRequest } from "../../api/request/JobRequest";
import { ShopResponse } from "../../api/response/ShopResponse";
import { host, port } from "../../constants/host";
import { useSessionStorage } from "../../hook/useSessionStorage";
import * as Yup from "yup";
import { Grid } from "@mui/joy";
import { BsCurrencyDollar } from "react-icons/bs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { forwardRef } from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";
const labelStyle = {
  marginTop: "1rem",
  marginBottom: "-0.5rem",
  marginLeft: "0.25rem",
};

const initValue = {
  id: 0,
  shopId: "",
  jobTypeId: 1,
  title: "",
  description: "",
  skill: "",
  benefit: "",
  expiredDate: dayjs(new Date()).add(1, "month"),
  salary: "",
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  jobTypeId: Yup.number().required("Required"),
  salary: Yup.number().required("Required").min(0, "Cannot be negative number"),
  description: Yup.string().required("Required").max(5000, "Too long"),
  skill: Yup.string().required("Required").max(5000, "Too long"),
  benefit: Yup.string().required("Required").max(5000, "Too long"),
  expiredDate: Yup.date().min(
    dayjs(new Date()),
    "Expire date cannot before today"
  ),
});

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

function CreatePostPage() {
  const [accessToken] = useSessionStorage("accessToken", null);
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const handleSubmit = (values: JobRequest) => {
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

  const mapDate = (values: any): JobRequest => {
    console.log(JSON.stringify(values, null, 2));
    return {
      id: 0,
      shopId: shopInfo.id,
      jobTypeId: values.jobTypeId,
      title: values.title,
      description: values.description,
      skill: values.skill,
      benefit: values.benefit,
      salary: +values.salary,
      expiredDate: values.expiredDate.toDate(),
    };
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Formik
        initialValues={initValue}
        onSubmit={(values) => handleSubmit(mapDate(values))}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" sx={{ ...labelStyle }}>
                    Title
                  </Typography>
                  <TextField
                    sx={{ mt: "20px" }}
                    hiddenLabel
                    fullWidth
                    id="title"
                    error={errors.title !== undefined && touched.title}
                    helperText={touched.title && errors.title}
                    type={"text"}
                    margin="normal"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" sx={labelStyle}>
                    Job type
                  </Typography>
                  <Select
                    fullWidth
                    name="jobTypeId"
                    sx={{
                      marginTop: "20px",
                    }}
                    id="jobTypeId"
                    value={values.jobTypeId}
                    onChange={handleChange}>
                    {select.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" sx={labelStyle}>
                    Salary
                  </Typography>
                  <TextField
                    hiddenLabel
                    fullWidth
                    inputProps={{ inputMode: "numeric", pattern: "[0-9,]*" }}
                    id="salary"
                    name="salary"
                    error={errors.salary !== undefined && touched.salary}
                    helperText={touched.salary && errors.salary}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                      startAdornment: (
                        <InputAdornment position="start">
                          <BsCurrencyDollar />
                        </InputAdornment>
                      ),
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salary}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography variant="h5" sx={labelStyle}>
                    Expired day
                  </Typography>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"en"}
                    dateFormats={{ keyboardDate: "DD/MM/YYYY" }}>
                    <DatePicker
                      value={values.expiredDate}
                      disablePast
                      onChange={(value) =>
                        setFieldValue("expiredDate", value, true)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ margin: "16px 0" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                error={errors.description !== undefined && touched.description}
                helperText={touched.description && errors.description}
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
                error={errors.skill !== undefined && touched.skill}
                helperText={touched.skill && errors.skill}
                minRows={10}
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
                multiline
                error={errors.benefit !== undefined && touched.benefit}
                helperText={touched.benefit && errors.benefit}
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
