import { CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";

const FullViewContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function Loading() {
  return (
    <FullViewContainer>
      <CircularProgress />
      <Typography p={2}>Loading...</Typography>
    </FullViewContainer>
  );
}

export default Loading;
