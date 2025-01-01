export interface DepositRequest {
  id: number;
  user: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  receipt?: File;
}