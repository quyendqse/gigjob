import Account from "./Account";
import Job from "./Job";

export default interface Shop {
  id: string;
  name: string;
  description: string;
  account: Account;
  jobs: Array<Job>;
}
