import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { sendStatusEmail } from "@/utils/emailService";
import { DepositRequest } from "@/types/deposits";
import { DepositRequestsTable } from "./deposits/DepositRequestsTable";
import { RejectDepositDialog } from "./deposits/RejectDepositDialog";
import { DepositDetailsDialog } from "./deposits/DepositDetailsDialog";

const DepositRequests = () => {
  const [requests, setRequests] = useState<DepositRequest[]>([
    {
      id: 1,
      user: "John Doe",
      amount: 500,
      date: "2024-03-20",
      status: "pending",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(
    null
  );
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async (id: number) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      await sendStatusEmail(request.user, "approved", "deposit");
      setRequests(
        requests.map((request) =>
          request.id === id ? { ...request, status: "approved" } : request
        )
      );
      toast({
        title: "Deposit Request Approved",
        description: "User has been notified via email",
      });
    }
  };

  const handleReject = async () => {
    if (selectedRequest && rejectReason) {
      await sendStatusEmail(
        selectedRequest.user,
        "rejected",
        "deposit",
        rejectReason
      );
      setRequests(
        requests.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "rejected" }
            : request
        )
      );
      setIsRejectDialogOpen(false);
      setRejectReason("");
      setSelectedRequest(null);
      toast({
        title: "Deposit Request Rejected",
        description: "User has been notified via email",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Deposit Requests
        </h2>
      </motion.div>

      <DepositRequestsTable
        requests={requests}
        onApprove={handleApprove}
        onReject={(request) => {
          setSelectedRequest(request);
          setIsRejectDialogOpen(true);
        }}
        onViewDetails={(request) => {
          setSelectedRequest(request);
          setIsDetailsDialogOpen(true);
        }}
      />

      <RejectDepositDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        rejectReason={rejectReason}
        onRejectReasonChange={setRejectReason}
        onConfirmReject={handleReject}
      />

      {selectedRequest && (
        <DepositDetailsDialog
          deposit={selectedRequest}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </motion.div>
  );
};

export default DepositRequests;