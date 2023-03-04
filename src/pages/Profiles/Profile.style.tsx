import { Typography } from "@mui/material";
import styled from "styled-components";

const Card = styled.div`
  background-color: #ffffff;
  padding: 16px;
  min-height: 100px;
  width: 100%;
  border-radius: 24px;
`;

const FlexCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 20px;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const EquallyRow = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 1rem; */
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin: 1rem 0 0.5rem 0;
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopInfoValue = styled(Typography)`
  font-style: normal;
  color: #a23f00 !important;
  font-weight: 700 !important;
  font-size: 24px !important;
  line-height: 33px !important;
`;

const ShopInfoLabel = styled(Typography)`
  font-style: normal;
  color: #351000;
  font-weight: 400 !important;
  font-size: 18px !important;
  line-height: 25px !important;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
`;

export {
  Card,
  FlexCenterContainer,
  Image,
  EquallyRow,
  CenterColumn,
  ShopInfoValue,
  ShopInfoLabel,
  Row,
};
