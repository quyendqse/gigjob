import Address from "../../model/Address";

export interface AccountRequest {
  id: string;
  username: string;
  password: string;
  email: string;
  address: Address;
  phone: string;
  imageUrl: string;
  name: string;
  longitude?: number;
  latitude?: number;
  description: string;
}
