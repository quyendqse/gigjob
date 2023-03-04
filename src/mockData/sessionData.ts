import Account from "../model/Account";
import Job from "../model/Job";
import Session from "../model/Session";
import { workerAccount } from "./accountData";
import { jobData } from "./jobData";

const sessionData: Array<{
  account: Account;
  job: Job;
  session: Session;
}> = [
  {
    account: workerAccount,
    job: jobData,
    session: {
      id: 1,
      startShift: new Date(),
      duration: 5.0,
    },
  },
];
export { sessionData };
