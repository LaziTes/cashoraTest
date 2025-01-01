import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddUserDialog } from "./AddUserDialog";
import { UserManageDialog } from "./UserManageDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/utils/userTypes";

interface UsersListProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
  banks: { id: number; name: string }[];
}

export const UsersList = ({ users, onUpdateUser, banks }: UsersListProps) => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (userData: any) => {
    // In a real application, this would make an API call
    console.log("Adding new user:", userData);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Users</h2>
        <Button
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddUserDialog
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onAddUser={handleAddUser}
      />

      {selectedUser && (
        <UserManageDialog
          user={selectedUser}
          banks={banks}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          onUpdate={onUpdateUser}
        />
      )}
    </div>
  );
};