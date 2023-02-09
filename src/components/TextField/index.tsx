import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)({
  "& .MuiInputBase-root": {
    borderRadius: "16px",
  },
});
