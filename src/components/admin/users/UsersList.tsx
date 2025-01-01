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
import { Settings, User, Trash2, Lock, Unlock } from "lucide-react";
import { User as UserType, Bank } from "@/utils/userTypes";
import { UserDetailsDialog } from "./UserDetailsDialog";
import { UserManageDialog } from "./UserManageDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface UsersListProps {
  users: UserType[];
  banks: Bank[];
  onUpdateUser: (updatedUser: UserType) => void;
}

export const UsersList = ({ users, banks, onUpdateUser }: UsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteUser = () => {
    if (selectedUser) {
      onUpdateUser({
        ...selectedUser,
        status: "deleted",
      });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted",
      });
    }
  };

  const handleFreezeUser = () => {
    if (selectedUser) {
      onUpdateUser({
        ...selectedUser,
        status: selectedUser.status === "frozen" ? "approved" : "frozen",
      });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: `User ${selectedUser.status === "frozen" ? "Unfrozen" : "Frozen"}`,
        description: `The user has been ${selectedUser.status === "frozen" ? "unfrozen" : "frozen"} successfully`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <CustomBadge
                  variant={user.role === "admin" ? "destructive" : "secondary"}
                >
                  {user.role}
                </CustomBadge>
              </TableCell>
              <TableCell>
                <CustomBadge
                  variant={
                    user.status === "approved"
                      ? "success"
                      : user.status === "pending"
                      ? "warning"
                      : user.status === "frozen"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {user.status}
                </CustomBadge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDetailsOpen(true);
                  }}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsManageOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFreezeUser}
                >
                  {user.status === "frozen" ? (
                    <Lock className="h-4 w-4 text-red-500" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <>
          <UserDetailsDialog
            user={selectedUser}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
          <UserManageDialog
            user={selectedUser}
            banks={banks}
            open={isManageOpen}
            onOpenChange={setIsManageOpen}
            onUpdate={onUpdateUser}
          />
        </>
      )}
    </motion.div>
  );
};
