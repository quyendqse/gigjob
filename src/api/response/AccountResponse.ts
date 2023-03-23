export interface AccountResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
  createdDate: Date;
  updatedDate: Date;
  locked: boolean;
  disable: boolean;
  role: string;
}
