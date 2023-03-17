export interface CheckInRequest {
  workerId: string;
  jobId: string;
  duration: number;
  shift: "DAY" | "AFTERNOON" | "MIDNIGHT" | "NIGHT";
}
