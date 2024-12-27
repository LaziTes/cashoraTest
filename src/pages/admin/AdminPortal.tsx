import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UsersManagement from "@/components/admin/UsersManagement";
import WithdrawalRequests from "@/components/admin/WithdrawalRequests";
import DepositRequests from "@/components/admin/DepositRequests";
import SendRequests from "@/components/admin/SendRequests";
import Transactions from "@/components/admin/Transactions";
import Banks from "@/components/admin/Banks";
import EmailManagement from "@/components/admin/EmailManagement";
import Settings from "@/components/admin/Settings";
import { useEffect } from "react";

const AdminPortal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard by default
    if (window.location.pathname === "/admin/portal") {
      navigate("/admin/portal/dashboard");
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/withdrawals" element={<WithdrawalRequests />} />
            <Route path="/deposits" element={<DepositRequests />} />
            <Route path="/sends" element={<SendRequests />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/email" element={<EmailManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPortal;