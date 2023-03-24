import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  clockNumberClasses,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { date } from "yup";
import { CheckoutOutRequest } from "../../api/request/CheckOutRequest";
import { JobResponse } from "../../api/response/JobResponse";
import { SessionResponse } from "../../api/response/SessionResponse";
import { Center } from "../../components/Center/Centers";
import TabPanel from "../../components/TabPanel/TabPanel";
import { host, port } from "../../constants/host";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
import { Card } from "../Profiles/Profile.style";
import { getSessionByDate } from "../Session/SessionAPI";
import { BoxContainer } from "./PostManagement.style";
import PostOption from "./PostOption";
import SessionTab from "./SessionTab";

const Title = styled.p`
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.75rem;
  margin: 0 0 1rem 0;
`;
const SubTitle = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
`;

export type props = {
  job: JobResponse | undefined;
  handleDelete: () => void;
};
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const JobDescriptionContainer = ({ job, handleDelete }: props) => {
  const shopProfile = useAppSelector(selectShop);
  const [value, setValue] = useState(0);
  const [accessToken] = useSessionStorage("accessToken", null);
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [onGoingSession, setOnGoingSession] = useState<SessionResponse[]>([]);
  const refreshData = () => {
    getSessionByDate(shopInfo?.id!, accessToken!, dayjs()).then((data) => {
      if (data != null) {
        setOnGoingSession(
          data.filter((d) => d.job.id === job?.id && d.duration === -1)
        );
      }
      setSessionLoading(false);
    });
  };

  useEffect(() => {
    setSessionLoading(true);
    var shop = shopInfo;
    if (shop != null) {
      refreshData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const checkOut = (session: SessionResponse) => {
    const request: CheckoutOutRequest = {
      sessionId: session.id,
      jobId: session.job.id,
      workerId: session.worker.id,
    };
    axios({
      method: "post",
      baseURL: `http://${host}:${port}/api`,
      url: "/v1/session/check-out",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: request,
    }).then((data) => {
      if (data.status === 200) {
        var res = data.data as SessionResponse;
        setOnGoingSession([...onGoingSession.filter((s) => s.id !== res.id)]);
      }
    });
  };

  return (
    <BoxContainer sx={{ position: "relative" }}>
      <Title>{job?.title}</Title>

      <Tabs value={value} onChange={handleChange} aria-label="job tabs">
        <Tab label="Detail" {...a11yProps(0)} />
        <Tab label="Checkout" {...a11yProps(1)} />
        <Tab label="Session" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SubTitle>{`Location: ${shopProfile.account.addresses[0].city}`}</SubTitle>
        <SubTitle>{`Job Type: ${job!.jobType!.name}`}</SubTitle>
        <SubTitle>
          Salary:
          <strong>{` ${job!.salary}đ`}</strong>
        </SubTitle>
        <Typography variant="h5" sx={{ paddingBottom: "12px" }}>
          Description
        </Typography>
        <Typography variant="body1" align="justify">
          {job!.description}
        </Typography>
        <Typography variant="h5" sx={{ paddingBottom: "12px", mt: "14px" }}>
          Skill
        </Typography>
        <Typography variant="body1" align="justify">
          {job!.skill}
        </Typography>
        <Typography variant="h5" sx={{ paddingBottom: "12px", mt: "14px" }}>
          Benefit
        </Typography>
        <Typography variant="body1" align="justify">
          {job!.benefit}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {onGoingSession.length === 0 || onGoingSession == null ? (
              <caption>No one is working on this job right now</caption>
            ) : null}
            <TableHead className="tableHeader">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Start at</TableCell>
                <TableCell align="center">Shift</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessionLoading ? (
                <Center>
                  <CircularProgress />
                </Center>
              ) : (
                onGoingSession.map((session, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell scope="row">
                      {session.worker.lastName +
                        " " +
                        (session.worker.middleName
                          ? session.worker.middleName + " "
                          : "") +
                        session.worker.firstName}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(session.date).format("hh:mm:ss")}
                    </TableCell>
                    <TableCell align="center">{session.shift}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          checkOut(session);
                        }}>
                        Check out
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SessionTab job={job} />
      </TabPanel>
      <PostOption job={job} handleDelete={handleDelete} />
    </BoxContainer>
  );
};

export default JobDescriptionContainer;
