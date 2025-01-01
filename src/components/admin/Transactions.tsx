import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpFromLine, Send } from "lucide-react";
import { TransactionFilters } from "./transactions/TransactionFilters";
import { TransactionsList } from "./transactions/TransactionsList";

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal" | "send";
  user: string;
  recipient?: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  file?: File;
  fileUrl?: string;
  fileType?: string;
}

const Transactions = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "deposit",
      user: "John Doe",
      amount: 500,
      date: "2024-03-20",
      status: "completed",
      fileUrl: "/placeholder.svg",
      fileType: "image/svg+xml"
    },
    {
      id: 2,
      type: "withdrawal",
      user: "Jane Smith",
      amount: 300,
      date: "2024-03-19",
      status: "pending"
    },
    {
      id: 3,
      type: "send",
      user: "Alice Johnson",
      recipient: "Bob Wilson",
      amount: 150,
      date: "2024-03-18",
      status: "completed"
    },
  ]);

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleFilterChange = (filters: any) => {
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (t) => new Date(t.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (t) => new Date(t.date) <= new Date(filters.dateTo)
      );
    }

    if (filters.minAmount) {
      filtered = filtered.filter((t) => t.amount >= filters.minAmount);
    }

    if (filters.maxAmount) {
      filtered = filtered.filter((t) => t.amount <= filters.maxAmount);
    }

    setFilteredTransactions(filtered);
  };

  return (
    <div className="space-y-8">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold tracking-tight"
      >
        Transactions
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              ${transactions
                .filter((t) => t.type === "deposit")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              ${transactions
                .filter((t) => t.type === "withdrawal")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              ${transactions
                .filter((t) => t.type === "send")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <TransactionFilters onFilterChange={handleFilterChange} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;