import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Send as SendIcon, 
  UserRound, 
  LogOut,
  Search,
  Menu,
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Dashboard from "@/components/portal/Dashboard";
import Deposit from "@/components/portal/Deposit";
import Send from "@/components/portal/Send";
import Support from "@/components/portal/Support";
import Withdraw from "@/components/portal/Withdraw";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SidebarContentComponent = ({ 
  activeTab, 
  setActiveTab, 
  handleLogout 
}: { 
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
    { icon: ArrowDownToLine, label: "Deposit", value: "deposit" },
    { icon: SendIcon, label: "Send", value: "send" },
    { icon: ArrowUpFromLine, label: "Withdraw", value: "withdraw" },
    { icon: UserRound, label: "Support", value: "support" },
  ];

  return (
    <>
      <SidebarHeader className="p-4 border-b border-[#1A1F2C]">
        <div className="text-2xl font-bold text-brand-orange mb-6">CASHORA</div>
        <Button 
          variant="ghost" 
          className="w-full justify-start mb-4 text-muted-foreground hover:text-foreground hover:bg-[#1A1F2C]"
        >
          <UserRound className="mr-2 h-4 w-4" />
          <span>John Carter</span>
        </Button>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-[#1A1F2C] border-[#1A1F2C] focus:border-brand-blue"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.value}>
                <SidebarMenuButton
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full ${
                    activeTab === item.value
                      ? "bg-[#1A1F2C] text-brand-orange"
                      : "text-muted-foreground hover:bg-[#1A1F2C] hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-[#1A1F2C]">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-[#1A1F2C]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
};

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  const handleLogout = () => {
    window.location.href = "/signin";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0D1B]">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="fixed top-4 left-4 z-50 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="p-0 w-[280px] bg-[#0A0D1B] border-[#1A1F2C]"
            >
              <div className="h-full overflow-y-auto">
                <Sidebar className="border-r border-[#1A1F2C]">
                  <SidebarContentComponent 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    handleLogout={handleLogout}
                  />
                </Sidebar>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:block w-64 min-h-screen">
            <Sidebar className="border-r border-[#1A1F2C] bg-[#0A0D1B]">
              <SidebarContentComponent 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
              />
            </Sidebar>
          </div>
        )}

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "send" && <Send />}
          {activeTab === "withdraw" && <Withdraw />}
          {activeTab === "support" && <Support />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserPortal;