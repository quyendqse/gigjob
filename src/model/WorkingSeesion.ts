import { Session } from "inspector";
import Job from "./Job";
import Wage from "./Wage";

export default interface WorkingSession {
  worker: Worker;
  job: Job;
  session: Session;
  wage: Wage;
}
