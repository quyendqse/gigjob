import {
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import JobDescriptionContainer from "./DataContent";
import { IoAddCircle } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import {
  BoxContainer,
  ListHead,
  ListItemPadding,
} from "./PostManagement.style";
import { JobResponse } from "../../api/response/JobResponse";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShopResponse } from "../../api/response/ShopResponse";
import { host, port } from "../../constants/host";
import { useSessionStorage } from "../../hook/useSessionStorage";
import { Center } from "../../components/Center/Centers";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import moment from "moment";
import { getSessionByDate } from "../Session/SessionAPI";
import { useLocalStorage } from "../../hook/useLocalStorage";
import dayjs from "dayjs";

const JobManagement = () => {
  const [dataView, setDataview] = useState<JobResponse | null>();
  const [session] = useSessionStorage("accessToken", null);
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const [initLoading, setInitLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const handleOnclick = (job: JobResponse) => {
    const index = jobs.indexOf(job);
    if (index >= 0 && index < jobs.length) {
      setDataview(job);
    }
  };

  useEffect(() => {
    if (location.pathname === "/job") {
      const shopInfo: ShopResponse = JSON.parse(
        localStorage.getItem("shopInfo")!
      );
      fetch(`http://${host}:${port}/api/v1/job/shop/` + shopInfo.id, {
        headers: {
          Authorization: "Bearer " + session,
          "Content-type": "application/json; charset=UTF-8",
          Connection: "keep-alive",
          Accept: "*/*",
        },
      })
        .then((res) => res.json())
        .then((values: JobResponse[]) => {
          values.forEach((value) => {
            value.createdDate = new Date(value.createdDate);
            value.updatedDate = new Date(value.updatedDate);
            value.expiredDate = new Date(value.expiredDate);
            return value;
          });
          setJobs([...values.filter((date) => date.expiredDate > new Date())]);
          setDataview(jobs[0]);
          setInitLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (jobId: number) => {
    axios({
      method: "delete",
      baseURL: `http://${host}:${port}/api`,
      url: "/v1/job",
      data: jobId,
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        if (data.status === 200) {
          setDataview(null);
          setJobs(jobs.filter((j) => j.id !== jobId));
        }
      })
      .catch((err) => console.error(err));
  };

  const openNewPost = () => {
    navigate("/job/create");
  };

  const getSelectedItem = (jobId: number) => {
    return dataView?.id === jobId;
  };

  if (location.pathname !== "/job") {
    return <Outlet />;
  } else
    return (
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <BoxContainer sx={{ backgroundColor: "white" }}>
            <Box>
              <ListHead>
                <Typography variant="h5"> All post </Typography>
                <IconContext.Provider value={{ size: "2rem" }}>
                  <Button onClick={openNewPost}>
                    <IoAddCircle /> New Post
                  </Button>
                </IconContext.Provider>
              </ListHead>
              <Divider
                orientation="horizontal"
                sx={{ margin: "1rem -2rem 0 -2rem" }}
              />
              <List>
                {initLoading ? (
                  <Center
                    style={{
                      height: "auto",
                      width: "100%",
                      marginTop: "2rem",
                    }}>
                    <CircularProgress />
                  </Center>
                ) : jobs === null || jobs.length === 0 ? (
                  <Center style={{ height: "300px", width: "100%" }}>
                    <caption>Your shop has no job</caption>
                  </Center>
                ) : (
                  jobs.map((ite, index) => (
                    <>
                      <ListItemButton
                        key={`job-${index}`}
                        selected={getSelectedItem(ite.id)}
                        onClick={() => {
                          handleOnclick(ite);
                        }}>
                        <ListItemPadding
                          style={{ overflow: "hidden", padding: "0" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold" }}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            noWrap>
                            {ite.title}
                          </Typography>
                          <Typography>{`Created on: ${moment(
                            ite.createdDate.toDateString()
                          ).format("DD/MM/YYYY")}`}</Typography>
                          <Typography>{`Expired ${moment(
                            ite.expiredDate.toDateString()
                          ).fromNow()} - ${moment(
                            ite.expiredDate.toDateString()
                          ).format("DD/MM/YYYY")}`}</Typography>
                        </ListItemPadding>
                      </ListItemButton>
                      {jobs.slice(-1)[0] !== ite && (
                        <Divider orientation="horizontal" />
                      )}
                    </>
                  ))
                )}
              </List>
            </Box>
          </BoxContainer>
        </Grid>
        <Grid item xs={7}>
          {dataView && (
            <JobDescriptionContainer
              job={dataView}
              handleDelete={() => handleDelete(dataView.id)}
            />
          )}
        </Grid>
      </Grid>
    );
};

export default JobManagement;
