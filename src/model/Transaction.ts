import Payment from "./Payment";
import Wallet from "./Wallet";
import TransactionStatus from "./TransactionStatus";

export default interface Transaction {
  id: string;
  amount: number;
  hashValue: string;
  previousHash: string;
  status: TransactionStatus;
  createdTime: Date;
  wallet: Wallet;
  payment: Payment;
}
