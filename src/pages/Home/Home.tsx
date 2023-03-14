import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import {
  acceptApplication,
  getApplicationsOfShop,
  rejectApplication,
} from "../../api/data/query/application";
import { ApplicationResponse } from "../../api/response/ApplicationResponse";
import { ShopResponse } from "../../api/response/ShopResponse";
import { Center } from "../../components/Center/Centers";
function Home() {
  const [loading, setLoading] = useState(true);

  function createData(application: ApplicationResponse) {
    return {
      id: application.worker.id,
      name:
        application.worker.lastName +
        " " +
        (application.worker.middleName
          ? application.worker.middleName + " "
          : "") +
        application.worker.firstName,
      birthday: application.worker.birthday,
      job: application.job,
      status: application.status,
    };
  }
  const [workers, setWorkers] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    const values: ShopResponse = JSON.parse(localStorage.getItem("shopInfo")!);
    getApplicationsOfShop(values.id).then((values) => {
      setWorkers(values.map((v) => createData(v)));
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }
  return (
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
              {/* <TableCell>Phone</TableCell> */}
              <TableCell>Job</TableCell>
              {/* <TableCell>Birthday</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{worker.name}</TableCell>
                {/* <TableCell>{row.phone}</TableCell> */}
                <TableCell>{worker.job.title}</TableCell>
                {/* <TableCell>{row.}</TableCell> */}
                <TableCell>{worker.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      acceptApplication(worker);
                      window.location.reload();
                    }}>
                    Accept
                  </Button>
                  <Box sx={{ mx: "1rem", display: "inline" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        rejectApplication(worker);
                        window.location.reload();
                      }}>
                      Reject
                    </Button>
                  </Box>
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

export default Home;
