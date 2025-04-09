import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import ActivityDisplay from "@/components/drive/ActivityDisplay";
import { 
  Search, 
  Users, 
  HardDrive, 
  Folder, 
  Calendar, 
  FileText, 
  Edit, 
  Eye, 
  Trash2, 
  Plus, 
  RefreshCw, 
  FileIcon,
  FileSpreadsheet,
  FolderX,
  UserX,
  UserCog,
  Mail,
  Info,
  AlertTriangle,
  Clock,
  ListFilter
} from "lucide-react";

const mockDriveData = {
  id: 1,
  name: "Marketing Department",
  createdDate: "2023-05-15",
  userCount: 12,
  folderCount: 56,
  size: "4.2 GB",
  owner: "Sarah Johnson",
  storageUsage: 65,
  userRoles: {
    organizer: 2,
    fileOrganizer: 3,
    writer: 3,
    commenter: 2,
    reader: 2
  },
  fileTypes: {
    documents: 40,
    spreadsheets: 25,
    presentations: 20,
    pdfs: 15
  }
};

const mockFolders = [
  { id: 1, name: "Campaign Materials", files: 24, lastModified: "2023-10-15" },
  { id: 2, name: "Brand Guidelines", files: 8, lastModified: "2023-09-22" },
  { id: 3, name: "Social Media Assets", files: 45, lastModified: "2023-10-28" },
  { id: 4, name: "Market Research", files: 12, lastModified: "2023-08-14" },
  { id: 5, name: "Email Templates", files: 16, lastModified: "2023-10-05" },
  { id: 6, name: "Blog Content", files: 32, lastModified: "2023-10-20" },
  { id: 7, name: "Product Photos", files: 78, lastModified: "2023-09-30" },
  { id: 8, name: "Press Releases", files: 9, lastModified: "2023-08-25" },
  { id: 9, name: "Customer Testimonials", files: 14, lastModified: "2023-10-12" },
  { id: 10, name: "Reports Archive", files: 22, lastModified: "2023-07-18" },
  { id: 11, name: "Event Materials", files: 37, lastModified: "2023-09-15" },
  { id: 12, name: "Presentations", files: 19, lastModified: "2023-10-08" },
];

const mockUsers = [
  { id: 1, name: "John Smith", email: "john.smith@acst.com", role: "owner" },
  { id: 2, name: "Emily Johnson", email: "emily.johnson@acst.com", role: "organizer" },
  { id: 3, name: "Michael Brown", email: "michael.brown@acst.com", role: "fileOrganizer" },
  { id: 4, name: "Jessica Davis", email: "jessica.davis@acst.com", role: "writer" },
  { id: 5, name: "David Wilson", email: "david.wilson@acst.com", role: "commenter" },
  { id: 6, name: "Sarah Martinez", email: "sarah.martinez@acst.com", role: "reader" },
  { id: 7, name: "Daniel Thompson", email: "daniel.thompson@acst.com", role: "writer" },
  { id: 8, name: "Jennifer Lee", email: "jennifer.lee@acst.com", role: "commenter" },
  { id: 9, name: "Robert Clark", email: "robert.clark@acst.com", role: "reader" }
];

const mockRecentFiles = [
  { id: 1, name: "Q3 Marketing Strategy.pdf", type: "pdf", lastModified: "2023-10-28T15:30:00" },
  { id: 2, name: "Social Media Calendar.xlsx", type: "excel", lastModified: "2023-10-27T11:45:00" },
  { id: 3, name: "Brand Guidelines 2023.docx", type: "doc", lastModified: "2023-10-26T09:20:00" },
  { id: 4, name: "Campaign Performance.xlsx", type: "excel", lastModified: "2023-10-25T16:10:00" },
  { id: 5, name: "Product Launch Presentation.pptx", type: "ppt", lastModified: "2023-10-24T14:25:00" }
];

const mockActivityLogs = [
  { id: 1, user: "Emily Johnson", action: "edit", item: "Q3 Marketing Strategy.pdf", timestamp: "2023-10-28T15:30:00" },
  { id: 2, user: "John Smith", action: "view", item: "Social Media Calendar.xlsx", timestamp: "2023-10-27T11:45:00" },
  { id: 3, user: "Michael Brown", action: "remove", item: "Old Campaign Notes.docx", timestamp: "2023-10-26T10:15:00" },
  { id: 4, user: "Sarah Martinez", action: "edit", item: "Brand Guidelines 2023.docx", timestamp: "2023-10-26T09:20:00" },
  { id: 5, user: "David Wilson", action: "rename", item: "Marketing Plan.pdf → Q4 Marketing Plan.pdf", timestamp: "2023-10-25T16:30:00" },
  { id: 6, user: "Jessica Davis", action: "other", item: "Campaign Performance.xlsx", timestamp: "2023-10-25T16:10:00" },
  { id: 7, user: "Jennifer Lee", action: "edit", item: "Product Launch Presentation.pptx", timestamp: "2023-10-24T14:25:00" }
];

const mockActiveUsers = [
  {
    fileName: "Q3 Marketing Strategy.pdf",
    lastUpdate: "2023-10-28",
    activities: [
      { user: "Emily Johnson", action: "edit", timestamp: "2023-10-28T15:30:00" },
      { user: "John Smith", action: "view", timestamp: "2023-10-27T14:20:00" },
      { user: "Sarah Martinez", action: "edit", timestamp: "2023-10-26T11:45:00" }
    ]
  },
  {
    fileName: "Social Media Calendar.xlsx",
    lastUpdate: "2023-10-27",
    activities: [
      { user: "David Wilson", action: "edit", timestamp: "2023-10-27T11:45:00" },
      { user: "Jennifer Lee", action: "view", timestamp: "2023-10-26T16:30:00" }
    ]
  },
  {
    fileName: "Brand Guidelines 2023.docx",
    lastUpdate: "2023-10-26",
    activities: [
      { user: "Sarah Martinez", action: "edit", timestamp: "2023-10-26T09:20:00" },
      { user: "Michael Brown", action: "view", timestamp: "2023-10-25T14:10:00" },
      { user: "Emily Johnson", action: "rename", timestamp: "2023-10-24T10:35:00", details: "Brand Guide.docx → Brand Guidelines 2023.docx" }
    ]
  },
  {
    fileName: "Campaign Performance.xlsx",
    lastUpdate: "2023-10-25",
    activities: [
      { user: "Jessica Davis", action: "edit", timestamp: "2023-10-25T16:10:00" },
      { user: "Robert Clark", action: "view", timestamp: "2023-10-24T09:15:00" }
    ]
  },
  {
    fileName: "Product Launch Presentation.pptx",
    lastUpdate: "2023-10-24",
    activities: [
      { user: "Jennifer Lee", action: "edit", timestamp: "2023-10-24T14:25:00" },
      { user: "Daniel Thompson", action: "view", timestamp: "2023-10-23T11:30:00" }
    ]
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileIcon className="h-5 w-5 text-red-500" />;
    case 'excel': return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case 'doc': return <FileText className="h-5 w-5 text-blue-500" />;
    default: return <FileIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'owner': return 'bg-purple-100 text-purple-700';
    case 'organizer': return 'bg-blue-100 text-blue-700';
    case 'fileOrganizer': return 'bg-indigo-100 text-indigo-700';
    case 'writer': return 'bg-green-100 text-green-700';
    case 'commenter': return 'bg-yellow-100 text-yellow-700';
    case 'reader': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const DriveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFolderPage, setCurrentFolderPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [isUserRoleDialogOpen, setIsUserRoleDialogOpen] = useState(false);
  const [isRemoveUserDialogOpen, setIsRemoveUserDialogOpen] = useState(false);
  const [isUserEmailDialogOpen, setIsUserEmailDialogOpen] = useState(false);
  const [isRemoveDriveDialogOpen, setIsRemoveDriveDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAllActiveUsers, setShowAllActiveUsers] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [changeRoleReason, setChangeRoleReason] = useState("");
  const [refreshActivityKey, setRefreshActivityKey] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const folderItemsPerPage = 9;
  const userItemsPerPage = 3;

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredFolders = mockFolders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFolder = currentFolderPage * folderItemsPerPage;
  const indexOfFirstFolder = indexOfLastFolder - folderItemsPerPage;
  const currentFolders = filteredFolders.slice(indexOfFirstFolder, indexOfLastFolder);
  const totalFolderPages = Math.ceil(filteredFolders.length / folderItemsPerPage);

  const indexOfLastUser = currentUserPage * userItemsPerPage;
  const indexOfFirstUser = indexOfLastUser - userItemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(filteredUsers.length / userItemsPerPage);

  const renderRoleDistributionBars = () => {
    const roles = ["organizer", "fileOrganizer", "writer", "commenter", "reader"];
    const colors = ["bg-blue-600", "bg-indigo-500", "bg-green-500", "bg-yellow-500", "bg-gray-500"];
    
    return roles.map((role, index) => (
      <div 
        className="space-y-2 animate-fade-in" 
        key={role} 
        style={{ animationDelay: `${0.1 * index}s` }}
      >
        <div className="flex justify-between text-sm">
          <span className="font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
          <span>{mockDriveData.userRoles[role as keyof typeof mockDriveData.userRoles] || 0}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${colors[index]} h-2 rounded-full transition-all duration-1000 ease-out`} 
            style={{ 
              width: `${(mockDriveData.userRoles[role as keyof typeof mockDriveData.userRoles] / mockDriveData.userCount) * 100}%`,
              animation: 'expandWidth 1.5s ease-out'
            }}
          />
        </div>
      </div>
    ));
  };

  const handleRefreshActivity = () => {
    setRefreshActivityKey(prev => prev + 1);
  };

  const getTabAnimation = (tab: string) => {
    return `transition-all duration-500 ease-in-out ${activeTab === tab ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`;
  };

  return (
    <div className={`space-y-6 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center animate-fade-in">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-blue-100 animate-scale-in">
              <HardDrive className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold animate-fade-in" style={{ animationDelay: "0.1s" }}>
              {mockDriveData.name}
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Owned by {mockDriveData.owner}
          </p>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => setIsRemoveDriveDialogOpen(true)}
          className="transform hover:scale-105 transition-transform duration-200 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove Drive
        </Button>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        className="space-y-6 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
        onValueChange={handleTabChange}
      >
        <TabsList className="animate-slide-in transition-all duration-300">
          <TabsTrigger value="overview" className="transition-all duration-300 hover:bg-gray-100">Overview</TabsTrigger>
          <TabsTrigger value="folders" className="transition-all duration-300 hover:bg-gray-100">Folders</TabsTrigger>
          <TabsTrigger value="users" className="transition-all duration-300 hover:bg-gray-100">Users</TabsTrigger>
          <TabsTrigger value="files" className="transition-all duration-300 hover:bg-gray-100">Recent Files</TabsTrigger>
          <TabsTrigger value="activity" className="transition-all duration-300 hover:bg-gray-100">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className={getTabAnimation("overview")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Created Date", "User Count", "Folder Count", "Drive Size"].map((title, index) => {
              let icon, value, color;
              switch (index) {
                case 0:
                  icon = <Calendar className="h-4 w-4 text-purple-500" />;
                  value = new Date(mockDriveData.createdDate).toLocaleDateString();
                  color = "from-purple-500 to-purple-600";
                  break;
                case 1:
                  icon = <Users className="h-4 w-4 text-green-500" />;
                  value = mockDriveData.userCount;
                  color = "from-green-500 to-green-600";
                  break;
                case 2:
                  icon = <Folder className="h-4 w-4 text-amber-500" />;
                  value = mockDriveData.folderCount;
                  color = "from-amber-500 to-amber-600";
                  break;
                case 3:
                  icon = <HardDrive className="h-4 w-4 text-blue-500" />;
                  value = mockDriveData.size;
                  color = "from-blue-500 to-blue-600";
                  break;
                default:
                  icon = <Info className="h-4 w-4" />;
                  value = "-";
                  color = "";
              }
              
              return (
                <Card 
                  key={title}
                  className="hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:bg-gradient-to-br hover:bg-opacity-5 animate-fade-in overflow-hidden border-t-4 border-t-transparent hover:border-t-blue-500"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${color} transform transition-all duration-300 scale-x-100 origin-left`}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      {icon}
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>{value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] animate-fade-in border-l-4 border-l-blue-500" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of user roles within this drive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {renderRoleDistributionBars()}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] animate-fade-in border-l-4 border-l-green-500" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Current drive storage utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-300 hover:scale-105">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#e2e8f0" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke={mockDriveData.storageUsage > 80 ? "#ef4444" : "#3b82f6"} 
                        strokeWidth="10" 
                        strokeDasharray={`${2 * Math.PI * 45 * mockDriveData.storageUsage / 100} ${2 * Math.PI * 45 * (1 - mockDriveData.storageUsage / 100)}`}
                        strokeDashoffset={2 * Math.PI * 45}
                        transform="rotate(-90 50 50)"
                        className="animate-circle-fill"
                        style={{
                          animation: "circle-fill 1.5s ease-out forwards",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-bold text-3xl animate-fade-in" style={{ animationDelay: "1s" }}>
                        {mockDriveData.storageUsage}%
                      </div>
                    </div>
                  </div>
                  <div className="text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
                    <p className="text-sm text-gray-500">
                      {mockDriveData.size} used of total capacity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-fade-in border-l-4 border-l-purple-500" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle>Access History</CardTitle>
                <CardDescription>Recent access activity in this drive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-2px] animate-fade-in"
                      style={{ animationDelay: `${0.8 + (0.1 * index)}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium animate-scale-in" style={{ animationDelay: `${0.9 + (0.1 * index)}s` }}>
                          {mockUsers[index - 1].name.split(' ').map(part => part[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{mockUsers[index - 1].name}</div>
                          <div className="text-sm text-gray-500">Last accessed: {new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className={`
                        px-2 py-1 rounded-full text-xs transition-all duration-300 hover:opacity-80
                        ${getRoleBadgeColor(mockUsers[index - 1].role)}
                      `}>
                        {mockUsers[index - 1].role.charAt(0).toUpperCase() + mockUsers[index - 1].role.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300 animate-fade-in border-l-4 border-l-amber-500" style={{ animationDelay: "0.8s" }}>
              <CardHeader>
                <CardTitle>File Type Distribution</CardTitle>
                <CardDescription>Breakdown of file types within this drive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Documents</span>
                      <span>{mockDriveData.fileTypes.documents}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${mockDriveData.fileTypes.documents}%`,
                          animation: 'expandWidth 1.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-fade-in" style={{ animationDelay: "1.0s" }}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Spreadsheets</span>
                      <span>{mockDriveData.fileTypes.spreadsheets}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${mockDriveData.fileTypes.spreadsheets}%`,
                          animation: 'expandWidth 1.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-fade-in" style={{ animationDelay: "1.1s" }}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Presentations</span>
                      <span>{mockDriveData.fileTypes.presentations}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${mockDriveData.fileTypes.presentations}%`,
                          animation: 'expandWidth 1.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-fade-in" style={{ animationDelay: "1.2s" }}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">PDFs</span>
                      <span>{mockDriveData.fileTypes.pdfs}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${mockDriveData.fileTypes.pdfs}%`,
                          animation: 'expandWidth 1.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="folders" className={getTabAnimation("folders")}>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <Button className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
              <Plus className="h-4 w-4" />
              <span>Add Folder</span>
            </Button>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search folders..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFolders.map((folder, index) => (
              <Card 
                key={folder.id} 
                className="hover:shadow-md transition-all duration-300 transform hover:translate-y-[-6px] hover:bg-gray-50 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-md bg-blue-100">
                      <Folder className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{folder.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{folder.files} files</p>
                      <p className="text-xs text-gray-400">Last modified: {new Date(folder.lastModified).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {totalFolderPages > 1 && (
            <Pagination className="mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentFolderPage(prev => Math.max(prev - 1, 1))}
                    className={`transition-transform duration-200 ${currentFolderPage === 1 ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalFolderPages) }).map((_, index) => {
                  let pageNum = index + 1;
                  if (totalFolderPages > 5) {
                    if (currentFolderPage > 3) {
                      pageNum = currentFolderPage - 2 + index;
                    }
                    if (currentFolderPage > totalFolderPages - 2) {
                      pageNum = totalFolderPages - 4 + index;
                    }
                  }
                  
                  pageNum = Math.min(pageNum, totalFolderPages);
                  
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentFolderPage(pageNum)}
                        isActive={currentFolderPage === pageNum}
                        className="transition-transform duration-200 hover:scale-110"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentFolderPage(prev => Math.min(prev + 1, totalFolderPages))}
                    className={`transition-transform duration-200 ${currentFolderPage === totalFolderPages ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>
        
        <TabsContent value="users" className={getTabAnimation("users")}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
            <h2 className="text-xl font-semibold">Users with Access</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => {}}
                className="transition-transform duration-200 hover:scale-110"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {currentUsers.length > 0 ? (
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="pt-6">
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
                    {currentUsers.map((user, index) => (
                      <TableRow 
                        key={user.id} 
                        className="hover:bg-gray-50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${0.3 + (0.1 * index)}s` }}
                      >
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`
                            px-2 py-1 rounded-full text-xs transition-all duration-300 hover:opacity-80
                            ${getRoleBadgeColor(user.role)}
                          `}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1 text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse-soft"></span>
                            Active
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-transform duration-200 hover:scale-110"
                              onClick={() => {
                                setSelectedUser(user);
                                setSelectedRole(user.role);
                                setIsUserRoleDialogOpen(true);
                              }}
                              title="Change role"
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-transform duration-200 hover:scale-110"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsUserEmailDialogOpen(true);
                              }}
                              title="Send email"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-transform duration-200 hover:scale-110"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsRemoveUserDialogOpen(true);
                              }}
                              title="Remove user"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card className="py-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="flex flex-col items-center justify-center text-center">
                <UserX className="h-16 w-16 text-gray-300 mb-4 animate-scale-in" />
                <h3 className="text-xl font-medium text-gray-500 mb-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>No Users Found</h3>
                <p className="text-gray-400 max-w-md animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  There are no users matching your search criteria. Try using different keywords or invite users to this drive.
                </p>
              </CardContent>
            </Card>
          )}
          
          {totalUserPages > 1 && (
            <Pagination className="mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentUserPage(prev => Math.max(prev - 1, 1))}
                    className={`transition-transform duration-200 ${currentUserPage === 1 ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalUserPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentUserPage(index + 1)}
                      isActive={currentUserPage === index + 1}
                      className="transition-transform duration-200 hover:scale-110"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentUserPage(prev => Math.min(prev + 1, totalUserPages))}
                    className={`transition-transform duration-200 ${currentUserPage === totalUserPages ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>
        
        <TabsContent value="files" className={getTabAnimation("files")}>
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Recent Files</h2>
            <Button 
              variant="outline" 
              size="sm"
              className="transition-transform duration-200 hover:scale-105"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockRecentFiles.map((file, index) => (
              <Card 
                key={file.id} 
                className="hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="transition-transform duration-200 hover:scale-110">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        Last modified: {new Date(file.lastModified).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="transition-transform duration-200 hover:scale-110"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="transition-transform duration-200 hover:scale-110"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 transition-transform duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className={getTabAnimation("activity")}>
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Activity Logs</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshActivity}
              className="flex items-center gap-2 transition-all duration-300 hover:bg-blue-50 hover:scale-105"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <ActivityDisplay 
            key={refreshActivityKey} 
            activities={mockActivityLogs} 
            groupedActivities={mockActiveUsers} 
          />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isUserRoleDialogOpen} onOpenChange={setIsUserRoleDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">User</label>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                    {selectedUser.name.split(' ').map((name: string) => name[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{selectedUser.name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Role</label>
                <div className="p-2 border rounded text-sm">
                  <span className={`
                    px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(selectedUser.role)}
                  `}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">New Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {["organizer", "fileOrganizer", "writer", "commenter", "reader"].map(role => (
                    <div 
                      key={role} 
                      className={`
                        p-2 border rounded text-sm cursor-pointer hover:bg-gray-50 transition-all duration-200
                        ${selectedRole === role ? 'border-blue-500 bg-blue-50 transform scale-105' : ''}
                      `}
                      onClick={() => setSelectedRole(role)}
                    >
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(role)}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Change</label>
                <Textarea 
                  placeholder="Please provide a reason for this role change..."
                  value={changeRoleReason}
                  onChange={(e) => setChangeRoleReason(e.target.value)}
                  className="transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="send-email-notification" className="transition-all duration-200" />
                  <label htmlFor="send-email-notification" className="text-sm">
                    Send email notification about this change
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUserRoleDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsUserRoleDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isRemoveUserDialogOpen} onOpenChange={setIsRemoveUserDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-red-600">Remove User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <p>
                Are you sure you want to remove <span className="font-medium">{selectedUser.name}</span> from this drive?
              </p>
              <p className="text-sm text-gray-500">
                This will revoke all their access permissions and they will no longer be able to access any content.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="send-removal-notification" className="transition-all duration-200" />
                  <label htmlFor="send-removal-notification" className="text-sm">
                    Send email notification about removal
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRemoveUserDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setIsRemoveUserDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isUserEmailDialogOpen} onOpenChange={setIsUserEmailDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                    {selectedUser.name.split(' ').map((name: string) => name[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{selectedUser.name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  placeholder="Enter email subject" 
                  className="transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Enter your message here..." 
                  className="min-h-[150px] transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="send-copy" className="transition-all duration-200" />
                  <label htmlFor="send-copy" className="text-sm">
                    Send me a copy of this email
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUserEmailDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsUserEmailDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isRemoveDriveDialogOpen} onOpenChange={setIsRemoveDriveDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 animate-pulse-soft" />
              Remove Drive
            </DialogTitle>
            <DialogDescription>
              This action will initiate the drive removal process
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md animate-fade-in">
              <p className="text-sm text-amber-800">
                By pressing this button, an email will be sent to all drive Organizers to notify them that after 30 days this drive will be removed. 
              </p>
            </div>
            
            <p className="font-medium animate-fade-in" style={{ animationDelay: "0.2s" }}>Are you sure you want to proceed?</p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRemoveDriveDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setIsRemoveDriveDialogOpen(false)}
              className="transition-transform duration-200 hover:scale-105 animate-pulse-soft"
            >
              Yes, Remove Drive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriveDetails;