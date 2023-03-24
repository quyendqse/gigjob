import { HistoryResponse } from "./HistoryResponse";

export interface WorkerDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  education: string;
  birthday: Date;
  history: Array<HistoryResponse>;
  email: string;
  phone: string;
  username: string;
  imageUrl: string;
}
