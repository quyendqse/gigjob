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

const JobManagement = () => {
  const [dataView, setDataview] = useState<JobResponse>();
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
    const shopInfo: ShopResponse = JSON.parse(
      localStorage.getItem("shopInfo")!
    );
    fetch(`http://${host}:${port}/api/v1/job/shop/` + shopInfo.id, {
      headers: {
        Authorization:
          "Bearer " +
          sessionStorage.getItem("accessToken")?.replaceAll('"', ""),
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
        return setJobs([...values]);
      });
  }, []);

  const openNewPost = () => {
    navigate("/job/create");
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
                {jobs.map((ite) => (
                  <>
                    <ListItemButton
                      onClick={() => {
                        handleOnclick(ite);
                      }}>
                      <ListItemPadding style={{ overflow: "hidden" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                          overflow={"hidden"}
                          textOverflow={"ellipsis"}
                          noWrap>
                          {ite.title}
                        </Typography>
                        <Typography>{`Created on: ${ite.createdDate.toDateString()}`}</Typography>
                        <Typography>{`Expired on: ${ite.expiredDate.toDateString()}`}</Typography>
                      </ListItemPadding>
                    </ListItemButton>
                    {jobs.slice(-1)[0] !== ite && (
                      <Divider orientation="horizontal" />
                    )}
                  </>
                ))}
              </List>
            </Box>
          </BoxContainer>
        </Grid>
        <Grid item xs={7}>
          {dataView && <JobDescriptionContainer job={dataView} />}
        </Grid>
      </Grid>
    );
};

export default JobManagement;
