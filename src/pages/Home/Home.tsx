import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
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
import { JobDetailResponse } from "../../api/response/JobDetailResponse";
import { ShopResponse } from "../../api/response/ShopResponse";
import { useAuth } from "../../context/AuthContext";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { Card } from "../Profiles/Profile.style";

export interface ApplicationViewData {
  id: number;
  workerId: string;
  name: string;
  birthday: Date;
  job: JobDetailResponse;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const [session] = useSessionStorage("accessToken", null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [workers, setWorkers] = useState<ApplicationViewData[]>([]);
  function createData(
    application: ApplicationResponse,
    index: number
  ): ApplicationViewData {
    return {
      id: index,
      workerId: application.worker.id,
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
  useEffect(() => {
    setIsLoading(true);
    var shop: ShopResponse = shopInfo;
    if (shop == null) {
    }
    getApplicationsOfShop(shop.id, session).then((ar) => {
      setWorkers(ar.map((ar, index) => createData(ar, index)));
      setIsLoading(false);
    });
  }, [session, shopInfo]);

  const handleAccept = (worker: ApplicationViewData) => {
    setIsLoading(true);
    setLoadingId(worker.id);
    const accessToken = (session as string)?.replace('"', "");
    acceptApplication(worker, accessToken).then((ar) => {
      if (ar != null) {
        var clone = [...workers];
        var index = clone.findIndex(
          (a) => a.workerId === ar?.worker.id && a.job.id === ar.job.id
        );
        clone[index] = createData(ar, index);
        setWorkers(clone);
      }
      setLoadingId(null);
      setIsLoading(false);
    });
  };

  const handleReject = (worker: ApplicationViewData) => {
    setIsLoading(true);
    setLoadingId(worker.id);
    const accessToken = (session as string)!.replace('"', "");
    rejectApplication(worker, accessToken).then((ar) => {
      if (ar != null) {
        var clone = [...workers];
        var index = clone.findIndex(
          (a) => a.workerId === ar?.worker.id && a.job.id === ar.job.id
        );
        clone[index] = createData(ar, index);
        setWorkers(clone);
      }
      setLoadingId(null);
      setIsLoading(false);
    });
  };

  return (
    <Box>
      <TableContainer component={Card} sx={{ mt: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {workers.length === 0 || workers == null ? (
            <caption>No record</caption>
          ) : null}
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Job</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{worker.name}</TableCell>
                <TableCell align="center">{worker.job.title}</TableCell>
                <TableCell align="center">
                  {isLoading && loadingId === worker.id ? (
                    <CircularProgress />
                  ) : (
                    worker.status
                  )}
                </TableCell>
                <TableCell align="center">
                  {worker.status !== "ACCEPTED" && (
                    <Box sx={{ mx: "0.5rem", display: "inline-block" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleAccept(worker)}>
                        Accept
                      </Button>
                    </Box>
                  )}
                  {worker.status !== "REJECTED" && (
                    <Box sx={{ mx: "0.5rem", display: "inline-block" }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleReject(worker)}>
                        Reject
                      </Button>
                    </Box>
                  )}
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
