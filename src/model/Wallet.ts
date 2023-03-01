import Account from "./Account";
import Transaction from "./Transaction";

export default interface Wallet {
  id: string;
  balance: string;
  account?: Account;
  transactions?: Array<Transaction>;
}
