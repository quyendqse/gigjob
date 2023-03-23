import JobType from "../../model/JobType";

export interface JobResponse {
  id: number;
  shopId: string;
  jobTypeId: number;
  jobType?: JobType;
  title: string;
  description: string;
  skill: string;
  benefit: string;
  salary: number;
  createdDate: Date;
  updatedDate: Date;
  expiredDate: Date;
}
