import { Typography } from "@mui/material";
import styled from "styled-components";

const FlexHeader = styled.div`
  display: flex;
  width: 100%;
  height: 115px;
  align-items: flex-end;
  padding: 1rem 2rem;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  background-color: white;
`;

const HeaderName = styled(Typography)`
  font-style: normal;
  font-weight: bold !important;
  font-size: 48px;
  line-height: 56px;
  color: #a23f00;
`;

export { FlexHeader, HeaderName };
