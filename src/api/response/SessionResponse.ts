import { Shift } from "../../constants/Shift";
import { JobDetailResponse } from "./JobDetailResponse";
import { WorkerDetailResponse } from "./WorkerResponse";

export interface SessionResponse {
  id: number;
  worker: WorkerDetailResponse;
  job: JobDetailResponse;
  shift: Shift;
  duration: number;
  date: Date;
  salary: number;
}
