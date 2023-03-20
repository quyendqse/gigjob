import { Shift } from "../../constants/Shift";

export interface CheckInRequest {
  workerId: string;
  jobId: number;
  duration: number;
  shift: Shift;
}
