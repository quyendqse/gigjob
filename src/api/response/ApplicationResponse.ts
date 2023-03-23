import { JobDetailResponse } from "./JobDetailResponse";
import { WorkerDetailResponse } from "./WorkerResponse";

export interface ApplicationResponse {
  worker: WorkerDetailResponse;
  job: JobDetailResponse;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
