import { JobTypeResponse } from "./JobTypeResponse";
import { ShopResponse } from "./ShopResponse";

export interface JobDetailResponse {
  id: number;
  shop: ShopResponse;
  jobType: JobTypeResponse;
  title: string;
  description: string;
  skill: string;
  benefit: string;
  createdDate: Date;
  updatedDate: Date;
  expiredDate: Date;
}
