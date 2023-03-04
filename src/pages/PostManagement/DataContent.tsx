import { Typography } from "@mui/material";
import styled from "styled-components";
import Job from "../../model/Job";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
import { BoxContainer } from "./PostManagement.style";
import PostOption from "./PostOption";

const Title = styled.p`
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.75rem;
  margin: 0 0 1rem 0;
`;
const SubTitle = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
`;

export type props = {
  job: Job;
};

const JobDescriptionContainer = ({ job }: props) => {
  const shopProfile = useAppSelector(selectShop);

  return (
    <BoxContainer sx={{ position: "relative" }}>
      <Title>{job?.title}</Title>
      <SubTitle>{`Location: ${shopProfile.account.addresses[0].city}`}</SubTitle>
      <SubTitle>{`Salary: 25,000 vnđ`}</SubTitle>
      <SubTitle>{`Job Type: ${job.jobType.name}`}</SubTitle>
      <Typography variant="h5" sx={{ paddingBottom: "12px" }}>
        Description
      </Typography>
      <Typography variant="body1" align="justify">
        {job.description}
      </Typography>
      <PostOption />
    </BoxContainer>
  );
};

export default JobDescriptionContainer;
