import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Check, X, Eye } from "lucide-react";
import { DepositRequest } from "@/types/deposits";

interface DepositRequestsTableProps {
  requests: DepositRequest[];
  onApprove: (id: number) => void;
  onReject: (request: DepositRequest) => void;
  onViewDetails: (request: DepositRequest) => void;
}

export const DepositRequestsTable = ({
  requests,
  onApprove,
  onReject,
  onViewDetails,
}: DepositRequestsTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-navy-light rounded-lg shadow-lg overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-navy-dark/50">
            <TableHead className="text-gray-400">User</TableHead>
            <TableHead className="text-gray-400">Amount</TableHead>
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-right text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <motion.tr
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover:bg-navy-dark/50"
            >
              <TableCell className="font-medium text-gray-300">
                {request.user}
              </TableCell>
              <TableCell className="text-gray-300">
                ${request.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-gray-300">{request.date}</TableCell>
              <TableCell>
                <CustomBadge
                  variant={
                    request.status === "approved"
                      ? "success"
                      : request.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {request.status}
                </CustomBadge>
              </TableCell>
              <TableCell className="text-right">
                {request.status === "pending" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-end gap-2"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(request)}
                      className="hover:bg-navy-dark"
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onApprove(request.id)}
                      className="hover:bg-navy-dark"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onReject(request)}
                      className="hover:bg-navy-dark"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </motion.div>
                )}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};