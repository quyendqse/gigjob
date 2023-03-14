import { Button } from "@mui/material";
import { Navigate, useAsyncError } from "react-router-dom";

function AuthError() {
  const error = useAsyncError();

  if (error === "reauthenticate") {
    return <Button>Re Authenticate</Button>;
  }
  return <>Something went wrong</>;
}

export default AuthError;
