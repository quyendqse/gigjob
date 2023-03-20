import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../Profiles/Profile.style";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { ShopResponse } from "../../api/response/ShopResponse";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { ApplicationResponse } from "../../api/response/ApplicationResponse";
import { host, port } from "../../constants/host";
import { WorkerDetailResponse } from "../../api/response/WorkerResponse";
import { JobDetailResponse } from "../../api/response/JobDetailResponse";
import { Center } from "../../components/Center/Centers";
import { Formik } from "formik";
import { Shift } from "../../constants/Shift";
import { CheckInRequest } from "../../api/request/CheckInRequest";
import { IoShieldHalfOutline } from "react-icons/io5";

function createData(data: ApplicationResponse): DataView {
  var worker: WorkerDetailResponse = data.worker;
  var job: JobDetailResponse = data.job;
  return {
    workerId: worker.id,
    jobId: job.id,
    name: `${worker.firstName} ${worker.middleName && worker.middleName + " "}${
      worker.lastName
    }`,
    phone: worker.phone,
    job: job.title,
  };
}

async function getAppliedWorker(
  shopInfoId: string,
  accessToken: string
): Promise<ApplicationResponse[] | null> {
  try {
    // var res = await axios({
    //   method: "get",
    //   url: `/v1/application/job/accepted/${shopInfoId}`,
    //   baseURL: `http://${host}:${port}/api`,
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     Accept: "*/*",
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    // });
    var res = await fetch(
      `http://${host}:${port}/api/v1/application/job/accepted/${shopInfoId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );
    var data: ApplicationResponse[] = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

interface DataView {
  workerId: string;
  jobId: number;
  name: string;
  phone: string;
  job: string;
}

async function checkIn(request: CheckInRequest, accessToken: string) {
  try {
    var res = await fetch(`http://${host}:${port}/api/v1/session/check-in`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(request),
    });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

function Schedule() {
  const [open, setOpen] = useState(false);
  const [submittingRow, setSubmittingRow] = useState<DataView | null>(null);
  const [initLoading, setInitLoading] = useState(false);
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const [rowsData, setRowsData] = useState<DataView[]>([]);
  const [session] = useSessionStorage("accessToken", null);
  const [name, setName] = useState<string | null>(null);

  const handleClickOpen = (value: DataView) => {
    setSubmittingRow(value);
    setOpen(true);
    setName(name);
  };

  const handleSubmit = (values: { hour: number; shift: Shift }) => {
    if (submittingRow == null) {
      return;
    }
    var request: CheckInRequest = {
      workerId: submittingRow!.workerId,
      jobId: submittingRow!.jobId,
      duration: values.hour,
      shift: values.shift,
    };
    checkIn(request, session).then((data) => {
      if (data != null) {
        alert("Checked in");
      } else {
        alert("Something went wrong");
      }
    });
  };

  useEffect(() => {
    setInitLoading(true);
    var shop: ShopResponse = shopInfo;
    if (shop == null) {
    }
    getAppliedWorker(shop.id, session).then((data) => {
      if (data != null) {
        setRowsData(data.map((d) => createData(d)));
      }
      setInitLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setSubmittingRow(null);
    setOpen(false);
  };

  return initLoading ? (
    <Center>
      <CircularProgress />
    </Center>
  ) : (
    <Box>
      {/* <Box
        sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Day: </Typography>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ margin: "0 1rem" }} />
            )}
          />
        </LocalizationProvider>
        <Button variant="outlined">Go</Button>
      </Box> */}
      <TableContainer component={Card} sx={{ mt: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.job}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen(row)}>
                    Check-in
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Worked hour for {name} with</DialogTitle>
        <Formik
          initialValues={{
            hour: 0,
            shift: "DAY" as Shift,
          }}
          onSubmit={(values) => handleSubmit(values)}>
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText>
                  Enter your worker working hour for tracking session and salary
                </DialogContentText>
                <Typography variant="body2">Hour</Typography>
                <TextField
                  autoFocus
                  hiddenLabel
                  margin="dense"
                  id="hour"
                  type="number"
                  fullWidth
                  value={values.hour}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography variant="body2">Shift</Typography>
                <Select
                  aria-label=""
                  id="shift"
                  fullWidth
                  name="shift"
                  value={values.shift}
                  onChange={handleChange}>
                  <MenuItem value={"DAY"}>Day</MenuItem>
                  <MenuItem value={"AFTERNOON"}>Afternoon</MenuItem>
                  <MenuItem value={"NIGHT"}>Night</MenuItem>
                  <MenuItem value={"MIDNIGHT"}>Midnight</MenuItem>
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
}

export default Schedule;
