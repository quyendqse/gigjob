import { AccountResponse } from "./AccountResponse";
import Address from "../../model/Address";

export interface ShopResponse {
  id: string;
  name: string;
  description: string;
  accountId: string;
  account: AccountResponse;
  addresses: Array<Address>;
}
