import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  History,
  Building2,
  Mail,
  Settings,
  LogOut,
  DollarSign,
  UserRound,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/portal/dashboard" },
  { icon: Users, label: "Users", path: "/admin/portal/users" },
  { icon: ArrowDownToLine, label: "Deposit Requests", path: "/admin/portal/deposits" },
  { icon: ArrowUpFromLine, label: "Withdrawal Requests", path: "/admin/portal/withdrawals" },
  { icon: Send, label: "Send Requests", path: "/admin/portal/sends" },
  { icon: History, label: "Transactions", path: "/admin/portal/transactions" },
  { icon: Building2, label: "Banks", path: "/admin/portal/banks" },
  { icon: Mail, label: "Email", path: "/admin/portal/email" },
  { icon: Settings, label: "Settings", path: "/admin/portal/settings" },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const location = useLocation();

  const handleLogout = () => {
    window.location.href = "/admin";
  };

  const handleClick = (path: string) => {
    onNavigate?.();
  };

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader className="p-4 border-b border-navy-light">
        <div className="flex items-center gap-2 text-2xl font-bold text-brand-orange mb-6">
          <DollarSign className="h-6 w-6" />
          <span>Cashora</span>
        </div>
        <Link to="/admin/portal/profile" onClick={() => handleClick("/admin/portal/profile")}>
          <SidebarMenuButton
            className={`w-full ${
              location.pathname === "/admin/portal/profile"
                ? "bg-navy-light text-brand-orange"
                : "text-muted-foreground hover:bg-navy-light hover:text-foreground"
            }`}
          >
            <UserRound className="h-4 w-4" />
            <span>Admin Profile</span>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link to={item.path} onClick={() => handleClick(item.path)}>
                <SidebarMenuButton
                  className={`w-full ${
                    location.pathname === item.path 
                      ? "bg-navy-light text-brand-orange" 
                      : "text-muted-foreground hover:bg-navy-light hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto border-t border-navy-light">
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 text-red-500 hover:text-red-400 w-full px-3 py-2 rounded-md hover:bg-navy-light"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </div>
  );
};

export default AdminSidebar;