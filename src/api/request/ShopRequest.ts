import Address from "../../model/Address";

export interface ShopRequest {
  name: string;
  description: string;
  accountId: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  address: Address;
}
