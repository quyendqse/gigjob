import Account from "./Account";

export default interface Worker {
  id: string;
  account: Account;
  firstName: string;
  middleName: string;
  birthday: Date;
  education: string;
  history?: Array<History>;
}
