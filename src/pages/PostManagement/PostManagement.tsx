import {
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import JobDescriptionContainer from "./DataContent";
import { IoAddCircle } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import {
  BoxContainer,
  ListHead,
  ListItemPadding,
} from "./PostManagement.style";
import { jobData, jobList } from "../../mockData/jobData";
import Job from "../../model/Job";

const JobManagement = () => {
  const [dataView, setDataview] = useState<Job>(jobData);

  const handleOnclick = (job: Job) => {
    const index = jobList.indexOf(job);
    if (index >= 0 && index < jobList.length) {
      setDataview(job);
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item xs={5}>
        <BoxContainer sx={{ backgroundColor: "white" }}>
          <Box>
            <ListHead>
              <Typography variant="h5"> All post </Typography>
              <IconContext.Provider value={{ size: "2rem" }}>
                <Button>
                  <IoAddCircle /> New Post
                </Button>
              </IconContext.Provider>
            </ListHead>
            <Divider
              orientation="horizontal"
              sx={{ margin: "1rem -2rem 0 -2rem" }}
            />
            <List>
              {jobList.map((ite) => (
                <>
                  <ListItemButton onClick={() => handleOnclick(ite)}>
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
                  {jobList.slice(-1)[0] !== ite && (
                    <Divider orientation="horizontal" />
                  )}
                </>
              ))}
            </List>
          </Box>
        </BoxContainer>
      </Grid>
      <Grid item xs={7}>
        <JobDescriptionContainer job={dataView} />
      </Grid>
    </Grid>
  );
};

export default JobManagement;
