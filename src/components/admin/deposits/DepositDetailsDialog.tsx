import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileIcon, ImageIcon } from "lucide-react";
import { DepositRequest } from "@/types/deposits";

interface DepositDetailsDialogProps {
  deposit: DepositRequest;
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
      <DialogContent className="max-w-2xl bg-navy-light border-navy">
        <DialogHeader>
          <DialogTitle className="text-gray-200">Deposit Details</DialogTitle>
          <DialogDescription className="text-gray-400">
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-navy"
            >
              <div>
                <h3 className="font-semibold text-gray-200 mb-4">
                  Transaction Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="text-gray-400">User:</span> {deposit.user}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Amount:</span> $
                    {deposit.amount.toLocaleString()}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Date:</span> {deposit.date}
                  </p>
                </div>
              </div>
            </motion.div>

            {deposit.receipt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg bg-navy p-4"
              >
                <h3 className="font-semibold text-gray-200 mb-4">Receipt</h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="border border-navy-dark rounded-lg p-4"
                >
                  <p className="text-sm text-gray-400 mb-2">
                    Filename: {deposit.receipt.name}
                  </p>
                  {deposit.receipt.type.startsWith("image/") ? (
                    <div className="relative aspect-video bg-navy-dark rounded-lg overflow-hidden">
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
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
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
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                      <a
                        href={URL.createObjectURL(deposit.receipt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        View Receipt
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};