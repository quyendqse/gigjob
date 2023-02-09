import { Container } from "@mui/material";
import styled from "styled-components";

export const SideImage = styled.img`
  height: 100vh;
  object-fit: cover;
  width: 100%;
`;

export const FormContainer = styled(Container)`
  margin-top: 17rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const secondaryStyle = {
  backgroundColor: "#f5f7fd",
  color: "black",
  boxShadow: "none",
  ":hover": {
    boxShadow: "none",
    backgroundColor: "#e3e8ef",
  },
};
