import { Container } from "@mui/material";
import styled from "styled-components";

export const SideImage = styled.img`
  min-height: 800px;
  height: 99.6vh;
  object-fit: cover;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
`;

export const FormBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  min-height: 800px;
`;

export const FormContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const secondaryStyle = {
  backgroundColor: "#f5f7fd",
  color: "black",
  ":hover": {
    backgroundColor: "#e3e8ef",
  },
};
