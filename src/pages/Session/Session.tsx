import {
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Center } from "../../components/Center/Centers";
import { Shift } from "../../constants/Shift";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../context/AuthContext";
import "dayjs/locale/fr";
import { getSessionByDate } from "./SessionAPI";
import { SessionResponse } from "../../api/response/SessionResponse";
import { WorkerDetailResponse } from "../../api/response/WorkerResponse";
import { Card } from "../Profiles/Profile.style";
interface DataView {
  worker: string;
  phone: string;
  email: string;
  shift: Shift;
  duration: number;
  date: Date;
  salary: number;
}

function createData(data: SessionResponse): DataView {
  var worker: WorkerDetailResponse = data.worker;
  return {
    worker: `${worker.firstName} ${
      worker.middleName && worker.middleName + " "
    }${worker.lastName}`,
    phone: worker.phone,
    email: worker.email,
    shift: data.shift,
    duration: data.duration,
    date: data.date,
    salary: data.salary,
  };
}

function Session() {
  const [initLoading, setInitLoading] = useState(false);
  const [rowsData, setRowsData] = useState<DataView[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { session, shopInfo, logout } = useAuth();
  
  const refreshData = () => {
    getSessionByDate(shopInfo?.id!, session!, date!).then((data) => {
      if (data != null) {
        setRowsData(data.map(createData)); 
      }
      setInitLoading(false);
    });
  };

  useEffect(() => {
    setInitLoading(true);
    var shop = shopInfo;
    if (shop != null) {
      refreshData();
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return initLoading ? (
    <Center>
      <CircularProgress />
    </Center>
  ) : (
    <Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Day: </Typography>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue ?? dayjs());
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ margin: "0 1rem" }} />
            )}
          />
        </LocalizationProvider>
        <Button variant="outlined" onClick={refreshData}>
          Go
        </Button>
      </Box>
      <TableContainer component={Card} sx={{ mt: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {rowsData.length === 0 || rowsData == null ? (
            <caption>No record</caption>
          ) : null}
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration(hour)</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{row.worker}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.shift}</TableCell>
                <TableCell>
                  {dayjs(row.date).format("DD-MM-YYYY hh:mm:ss")}
                </TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(row.salary)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Session;
