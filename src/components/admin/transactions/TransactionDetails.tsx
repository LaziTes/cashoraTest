import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CustomBadge } from "@/components/ui/custom-badge";

interface TransactionDetailsProps {
  transaction: {
    id: number;
    type: string;
    amount: number;
    date: string;
    status: string;
    user: string;
    recipient?: string;
    reference?: string;
    fee?: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TransactionDetails = ({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Transaction Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  <span className="capitalize">{transaction.type}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Amount:</span>{" "}
                  <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                    {transaction.amount > 0 ? "+" : ""} ${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Date:</span>{" "}
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <CustomBadge
                    variant={
                      transaction.status === "completed"
                        ? "success"
                        : transaction.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {transaction.status}
                  </CustomBadge>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">User Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-muted-foreground">User:</span> {transaction.user}
                </p>
                {transaction.recipient && (
                  <p>
                    <span className="text-muted-foreground">Recipient:</span>{" "}
                    {transaction.recipient}
                  </p>
                )}
                {transaction.reference && (
                  <p>
                    <span className="text-muted-foreground">Reference:</span>{" "}
                    {transaction.reference}
                  </p>
                )}
                {transaction.fee !== undefined && (
                  <p>
                    <span className="text-muted-foreground">Fee:</span> ${transaction.fee}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};