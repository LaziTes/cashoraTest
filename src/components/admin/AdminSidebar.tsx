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

const AdminSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    window.location.href = "/admin";
  };

  return (
    <Sidebar className="border-r border-navy-light bg-navy">
      <SidebarHeader className="p-4 border-b border-navy-light">
        <span className="text-2xl font-bold text-brand-orange">Cashora</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link to={item.path}>
                <SidebarMenuButton
                  className={`w-full ${location.pathname === item.path ? "bg-navy-light text-brand-orange" : "text-muted-foreground hover:bg-navy-light hover:text-foreground"}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button onClick={handleLogout} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
