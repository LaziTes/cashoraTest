import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileIcon, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DepositDetailsDialogProps {
  deposit: {
    id: number;
    user: string;
    amount: number;
    date: string;
    receipt?: File;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DepositDetailsDialog = ({
  deposit,
  open,
  onOpenChange,
}: DepositDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Deposit Details</DialogTitle>
          <DialogDescription>
            Review the deposit information and attached receipt
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Transaction Information</h3>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-2 space-y-2"
                >
                  <p>
                    <span className="text-muted-foreground">User:</span>{" "}
                    {deposit.user}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Amount:</span> $
                    {deposit.amount.toLocaleString()}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Date:</span>{" "}
                    {deposit.date}
                  </p>
                </motion.div>
              </div>
            </div>
            {deposit.receipt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold mb-2">Receipt</h3>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Filename: {deposit.receipt.name}
                  </p>
                  {deposit.receipt.type.startsWith("image/") ? (
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        src={URL.createObjectURL(deposit.receipt)}
                        alt="Receipt"
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>
                  ) : deposit.receipt.type === "application/pdf" ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                      <FileIcon className="h-5 w-5" />
                      <a
                        href={URL.createObjectURL(deposit.receipt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View PDF Receipt
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2"
                    >
                      <ImageIcon className="h-5 w-5" />
                      <a
                        href={URL.createObjectURL(deposit.receipt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 hover:underline"
                      >
                        View Receipt
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};