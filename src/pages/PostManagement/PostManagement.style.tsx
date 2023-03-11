import { Box } from "@mui/system";
import styled from "styled-components";

const ListHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoxContainer = styled(Box)`
  background-color: white;
  border-radius: 24px;
  padding: 2rem;
`;

const ListItemPadding = styled.div`
  padding: 1rem 0;
`;

export { ListHead, BoxContainer, ListItemPadding };
