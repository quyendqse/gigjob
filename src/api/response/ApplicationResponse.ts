import { JobDetailResponse } from "./JobDetailResponse";

export interface ApplicationResponse {
  workerId: string;
  job: JobDetailResponse;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
