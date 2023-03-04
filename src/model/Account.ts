import Address from "./Address";
import Wallet from "./Wallet";

export default interface Account {
  id: string;
  username: string;
  email: string;
  phone: string;
  createdDate: Date;
  updatedDate: Date;
  isLocked: boolean;
  isDisable: boolean;
  imageUrl: string;
  role: "ADMIN" | "WORKER";
  wallet: Wallet;
  addresses: Array<Address>;
}
