import * as React from "react";
import { WorkerDetailResponse } from "../../api/response/WorkerResponse";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";
import { HistoryResponse } from "../../api/response/HistoryResponse";

interface DataView {
  username: string;
  worker: string;
  phone: string;
  email: string;
  history: HistoryResponse[];
  birthday: Date;
  education: string;
}
function createData(worker: WorkerDetailResponse): DataView {
  return {
    worker: `${worker.lastName} ${
      worker.middleName && worker.middleName + " "
    }${worker.firstName}`,
    phone: worker.phone,
    email: worker.email,
    history: worker.history,
    birthday: worker.birthday,
    education: worker.education,
    username: worker.username,
  };
}

interface FadeMenuProps {
  worker: WorkerDetailResponse | undefined;
  open: boolean;
  handleClose: () => void;
}

export default function FadeMenu(props: FadeMenuProps) {
  const [rowsData, setRowsData] = React.useState<DataView>();

  dayjs.extend(customParseFormat);

  useEffect(() => {
    if (!_.isUndefined(props.worker)) {
      setRowsData(createData(props.worker));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.worker]);

  return !_.isUndefined(rowsData) ? (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle
        sx={{ backgroundColor: "#FFDBCC" }}
        color={"#A23F00"}
        id="alert-dialog-title">
        {"Worker Information"}
      </DialogTitle>
      <DialogContent sx={{ mt: "1rem" }}>
        <DialogContentText>
          <Typography> Name: </Typography> {rowsData?.worker}
        </DialogContentText>
        <DialogContentText>
          <Typography> Birthday: </Typography>{" "}
          {dayjs(rowsData?.birthday ?? null).format("DD-MM-YYYY hh:mm:ss")}
        </DialogContentText>
        <DialogContentText>
          <Typography> Phone: </Typography> {rowsData?.phone ?? "Not available"}
        </DialogContentText>
        <DialogContentText>
          <Typography> Email: </Typography> {rowsData!.email}
        </DialogContentText>
        <DialogContentText>
          <Typography> Education: </Typography> {rowsData!.education}
        </DialogContentText>
        <Typography variant="h5" sx={{ mt: "1rem" }}>
          Working History
        </Typography>
        {rowsData.history.length === 0 && (
          <DialogContentText sx={{ mt: "1rem", ml: "1rem" }}>
            <Typography variant="caption">
              No working experience recorded
            </Typography>
          </DialogContentText>
        )}
        {rowsData.history.map((h) => (
          <ListItem sx={{ my: "1rem" }}>
            <ListItemText
              primary={h.position}
              secondary={
                h.startDate && h.endDate ? (
                  <span>
                    Start from{" "}
                    {dayjs(h.startDate, "YYYY-MM-DD").format("DD/MM/YYYY")} to{" "}
                    {dayjs(h.endDate, "YYYY-MM-DD").format("DD/MM/YYYY")}
                  </span>
                ) : (
                  <span>No specific time provided</span>
                )
              }
            />
          </ListItem>
        ))}
      </DialogContent>
    </Dialog>
  ) : (
    <></>
  );
}
