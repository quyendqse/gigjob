import Shop from "./Shop";
import JobType from "./JobType";

export default interface Job {
  id: number;
  shop?: Shop;
  title: string;
  description: string;
  skill: string;
  benefit: string;
  createdDate: Date;
  updatedDate: Date;
  expiredDate: Date;
  jobType: JobType;
}
