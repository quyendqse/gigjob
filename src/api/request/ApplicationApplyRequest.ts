export interface ApplicationApplyRequest {
  workerId: string;
  jobId: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
