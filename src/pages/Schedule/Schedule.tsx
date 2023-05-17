import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { TextField } from "../../components/TextField";
import { Card } from "../Profiles/Profile.style";
import Account from "../../model/Account";
import Job from "../../model/Job";
import Session from "../../model/Session";
import moment from "moment";
import { workerAccount } from "../../mockData/accountData";
import { jobData } from "../../mockData/jobData";
import { sessionData } from "../../mockData/sessionData";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
function createData(account: Account, job: Job, session: Session) {
  const mntStart = moment(session.startShift);
  const mntEnd = mntStart.clone().add(session.duration, "hours");
  var status: "Pending" | "Paid" | "Done" | "Absent" = "Pending";
  const mntCurrent = moment();
  if (mntCurrent.isAfter(mntStart)) {
    if (mntCurrent.isBefore(mntEnd)) {
      status = "Paid";
    } else {
      status = "Done";
    }
  } else {
  }
  return {
    name: account.username,
    phone: account.phone,
    job: job.title,
    shift: `${mntStart.format("HH:mm")}-${mntEnd.format("HH:mm")}`,
    status: status,
  };
}
const rows = [
  createData(workerAccount, jobData, sessionData[0].session),
  createData(workerAccount, jobData, sessionData[0].session),
  createData(workerAccount, jobData, sessionData[0].session),
  createData(workerAccount, jobData, sessionData[0].session),
  createData(workerAccount, jobData, sessionData[0].session),
  createData(workerAccount, jobData, sessionData[0].session),
];

function Schedule() {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <Box>
      <Box
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
      </Box>
      <TableContainer component={Card} sx={{ mt: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.job}</TableCell>
                <TableCell>{row.shift}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button variant="contained">Accept</Button>
                
                  <IconButton>
                    <IoEllipsisVerticalCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Schedule;
