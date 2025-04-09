import { useState, useEffect } from "react";
import { Search, Users, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const usersPerPage = 10;

  useEffect(() => {
    const storedUsers = sessionStorage.getItem("usersData");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      toast({
        title: "Data Loading",
        description: "It may take few minutes",
        variant: "default",
      });
      const fetchUsers = async () => {
        try {
          const res = await fetch("http://localhost:8089/ACST-GWM/workspace/users", {
            credentials: "include",
          });
          const data = await res.json();
          setUsers(data);
          sessionStorage.setItem("usersData", JSON.stringify(data));
          toast({
            title: "Data Loaded",
            description: "Users data loaded successfully",
            variant: "default",
          });
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };

      fetchUsers();
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.primaryEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.drives?.some((d: any) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && !user.suspended) ||
      (filterStatus === "Suspended" && user.suspended);
    return matchesSearch && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSendEmail = () => {
    setIsEmailDialogOpen(false);
    toast({
      title: "Email sent",
      description: `Email sent to ${selectedUser.primaryEmail}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search users..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Modern Selection List for Status Filtering */}
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Drives</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id || user.primaryEmail}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.primaryEmail}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.drives?.map((drive: any, index: number) => (
                        <div key={index} className="flex items-center gap-1 text-sm">
                          <span>{drive.name}</span>
                          <span className="text-gray-400">•</span>
                          <span className={`
                            text-xs px-1.5 py-0.5 rounded-full
                            ${drive.role === 'organizer' ? 'bg-blue-100 text-blue-700' :
                              drive.role === 'fileOrganizer' ? 'bg-green-100 text-green-700' :
                              'bg-yellow-100 text-yellow-700'}
                          `}>
                            {drive.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 ${user.suspended ? 'text-gray-500' : 'text-green-600'}`}>
                      <span className={`w-2 h-2 rounded-full ${user.suspended ? 'bg-gray-500' : 'bg-green-600'}`}></span>
                      {user.suspended ? 'Suspended' : 'Active'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEmailDialogOpen(true);
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                    {selectedUser.fullName?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedUser.fullName}</div>
                    <div className="text-sm text-blue-500">{selectedUser.primaryEmail}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 pl-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.drives?.map((drive: any, idx: number) => (
                      <span key={idx} className={`
                        text-xs px-1.5 py-0.5 rounded-full
                        ${drive.role === 'organizer' ? 'bg-blue-100 text-blue-700' :
                          drive.role === 'fileOrganizer' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'}
                      `}>
                        {drive.name} ({drive.role})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter email subject" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Enter your message here..." 
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="send-copy" />
                  <label htmlFor="send-copy" className="text-sm">
                    Send me a copy of this email
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendEmail}>
                  Send Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;
