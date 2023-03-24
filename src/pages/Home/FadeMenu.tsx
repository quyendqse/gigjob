import * as React from "react";
import Button from "@mui/material/Button";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { SessionResponse } from "../../api/response/SessionResponse";
import { WorkerDetailResponse } from "../../api/response/WorkerResponse";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableBody,
  Typography,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import dayjs, { Dayjs } from "dayjs";
import { getSessionByDate } from "../Session/SessionAPI";

interface DataView {
  username: string;
  worker: string;
  phone: string;
  email: string;
  birthday: Date;
  date: Date;
  education: string;
}
function createData(data: SessionResponse): DataView {
  var worker: WorkerDetailResponse = data.worker;
  return {
    worker: `${worker.firstName} ${
      worker.middleName && worker.middleName + " "
    }${worker.lastName}`,
    phone: worker.phone,
    email: worker.email,
    date: data.date,
    birthday: data.date,
    education: data.worker.education,
    username: data.worker.username,
  };
}

export default function FadeMenu() {
  const [rowsData, setRowsData] = React.useState<DataView[]>([]);
  const [initLoading, setInitLoading] = React.useState(false);
  const [date, setDate] = React.useState<Dayjs>(dayjs());
  const { session, shopInfo, logout } = useAuth();
  console.log(DataView);
  const [open, setOpen] = React.useState(false);

  const refreshData = () => {
    getSessionByDate(shopInfo?.id!, session!, date!).then((data) => {
      if (data != null) {
        setRowsData(data.map(createData));
      }
      setInitLoading(false);
    });
  };

  React.useEffect(() => {
    setInitLoading(true);
    var shop = shopInfo;
    if (shop != null) {
      refreshData();
    } else {
      logout();
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <IoEllipsisVerticalCircle />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {rowsData.map((row, index) => (
          <>
            <DialogTitle
              sx={{ backgroundColor: "#FFDBCC" }}
              color={"#A23F00"}
              id="alert-dialog-title"
            >
              {"Worker Information"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              <Typography> Name: </Typography> {row.worker}
              </DialogContentText>
              <DialogContentText>
                <Typography> Birthday: </Typography>{" "}
                {dayjs(row.birthday).format("DD-MM-YYYY hh:mm:ss")}
              </DialogContentText>
              <DialogContentText>
                <Typography> Phone: </Typography> {row.phone}
              </DialogContentText>
              <DialogContentText>
                <Typography> Email: </Typography> {row.email}
              </DialogContentText>
              <DialogContentText>
                <Typography> Education: </Typography> {row.education}
              </DialogContentText>
            </DialogContent>
          </>
        ))}

        <TableBody></TableBody>
      </Dialog>
    </div>
  );
}
