import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { JobResponse } from "../../api/response/JobResponse";
import { SessionResponse } from "../../api/response/SessionResponse";
import { Center } from "../../components/Center/Centers";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../Profiles/Profile.style";
import { getSessionByDate } from "../Session/SessionAPI";

interface SessionTableProps {
  job: JobResponse | undefined;
}

function SessionTab({ job }: SessionTableProps) {
  const [initLoading, setInitLoading] = useState(false);
  const [rowsData, setRowsData] = useState<SessionResponse[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { session, shopInfo } = useAuth();
  const refreshData = () => {
    getSessionByDate(shopInfo?.id!, session!, date!).then((data) => {
      if (data != null) {
        setRowsData(
          data.filter((d) => d.duration !== -1 && d.job.id === job?.id)
        );
      }
      setInitLoading(false);
    });
  };

  useEffect(() => {
    setInitLoading(true);
    var shop = shopInfo;
    if (shop != null) {
      refreshData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);
  return initLoading ? (
    <Center style={{ height: "100px" }}>
      <CircularProgress />
    </Center>
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          ml: "1rem",
          mt: "1rem",
        }}>
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
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {rowsData.length === 0 || rowsData == null ? (
            <caption>No record</caption>
          ) : null}
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Duration(hour)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">
                  {row.worker.lastName +
                    " " +
                    (row.worker.middleName ? row.worker.middleName + " " : "") +
                    row.worker.firstName}
                </TableCell>
                <TableCell>{row.shift}</TableCell>
                <TableCell>{dayjs(row.date).format("HH:mm:ss")}</TableCell>
                <TableCell>
                  {dayjs(row.date)
                    .add(row.duration, "hours")
                    .format("HH:mm:ss")}
                </TableCell>
                <TableCell>{row.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SessionTab;
