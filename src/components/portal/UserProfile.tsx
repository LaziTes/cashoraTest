import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MapPin, Phone, CreditCard, Building2 } from "lucide-react";

const UserProfile = () => {
  // This would typically come from your auth context or API
  const user = {
    firstName: "John",
    lastName: "Carter",
    email: "john.carter@example.com",
    role: "User",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg",
    accountDetails: {
      balance: 5000,
      accountType: "Premium",
      bankAccounts: ["**** 1234", "**** 5678"],
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {user.accountDetails.accountType}
                  </Badge>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </div>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </div>
                    <p className="font-medium">{user.location}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Join Date
                    </div>
                    <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Balance
                </div>
                <p className="text-2xl font-semibold">${user.accountDetails.balance.toLocaleString()}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Building2 className="w-4 h-4 mr-2" />
                    Linked Bank Accounts
                  </div>
                  {user.accountDetails.bankAccounts.map((account, index) => (
                    <p key={index} className="font-medium">{account}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;