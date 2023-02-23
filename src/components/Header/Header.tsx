import { Avatar, Typography } from "@mui/material";
import styled from "styled-components";

const FlexHeader = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

function Header() {
  return (
    <FlexHeader>
      <Typography variant="h1" sx={{ fontSize: "24px" }}>
        Profile
      </Typography>
      <Avatar sizes="30px" alt="" src="/assets/logo2.png" />
    </FlexHeader>
  );
}

export default Header;
