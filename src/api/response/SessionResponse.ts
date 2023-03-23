import { Shift } from "../../constants/Shift";
import { WorkerDetailResponse } from "./WorkerResponse";

export interface SessionResponse {
  id: number;
  worker: WorkerDetailResponse;
  shift: Shift;
  duration: number;
  date: Date;
  salary: number;
}
