import { JobDetailResponse } from "./JobDetailResponse";
import { WorkerResponse } from "./WorkerResponse";

export interface ApplicationResponse {
  worker: WorkerResponse;
  job: JobDetailResponse;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
