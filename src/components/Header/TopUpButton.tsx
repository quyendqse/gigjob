import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IoCashOutline } from "react-icons/io5";
import { RxCardStackPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Balance() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      setBalance(1000000);
    }, 3000);
  }, []);

  return balance !== -1 ? (
    <>
      <IoCashOutline />
      <Typography variant="body1">
        {Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(10000000)}
      </Typography>
      <IconButton
        color="primary"
        onClick={() => navigate("/topUp", { state: { label: "Top Up" } })}>
        <RxCardStackPlus />
      </IconButton>
    </>
  ) : (
    <CircularProgress size={"1rem"} />
  );
}

export default Balance;
