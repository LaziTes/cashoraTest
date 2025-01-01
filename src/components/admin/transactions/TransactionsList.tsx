import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { TransactionDetails } from "./TransactionDetails";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: string;
  user: string;
  recipient?: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell>{transaction.user}</TableCell>
              <TableCell
                className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}
              >
                {transaction.amount > 0 ? "+" : ""} ${Math.abs(transaction.amount).toLocaleString()}
              </TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setIsDetailsOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </motion.div>
  );
};