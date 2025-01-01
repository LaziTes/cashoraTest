import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RejectDepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rejectReason: string;
  onRejectReasonChange: (reason: string) => void;
  onConfirmReject: () => void;
}

export const RejectDepositDialog = ({
  open,
  onOpenChange,
  rejectReason,
  onRejectReasonChange,
  onConfirmReject,
}: RejectDepositDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy-light border-navy">
        <DialogHeader>
          <DialogTitle className="text-gray-200">Reject Deposit Request</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide a reason for rejection
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label className="text-gray-300">Reason for Rejection</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => onRejectReasonChange(e.target.value)}
                placeholder="Enter reason for rejection"
                rows={4}
                className="bg-navy border-navy-dark text-gray-200 placeholder:text-gray-500"
              />
            </div>
            <Button
              onClick={onConfirmReject}
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={!rejectReason}
            >
              Confirm Rejection
            </Button>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};