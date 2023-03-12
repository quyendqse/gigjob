export interface AccountResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  createdDate: Date;
  updatedDate: Date;
  isLocked: boolean;
  isDisable: boolean;
  imageUrl: string;
  role: string;
}
