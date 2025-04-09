
import { useState } from "react";
import { Search, FolderTree, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data for the architecture
const mockArchitecture = {
  root: {
    name: "ACST Root",
    drives: [
      {
        id: 1,
        name: "Marketing Department",
        folders: [
          { id: 1, name: "Campaign Materials", files: 24 },
          { id: 2, name: "Brand Guidelines", files: 8 },
          { id: 3, name: "Social Media Assets", files: 45 }
        ]
      },
      {
        id: 2,
        name: "Engineering Team",
        folders: [
          { id: 4, name: "Project Documentation", files: 36 },
          { id: 5, name: "Code Repository", files: 129 },
          { id: 6, name: "Technical Specs", files: 17 }
        ]
      },
      {
        id: 3,
        name: "Finance Department",
        folders: [
          { id: 7, name: "Budgets", files: 12 },
          { id: 8, name: "Invoices", files: 48 },
          { id: 9, name: "Financial Reports", files: 15 }
        ]
      },
      {
        id: 4,
        name: "HR Resources",
        folders: [
          { id: 10, name: "Employee Handbooks", files: 5 },
          { id: 11, name: "Onboarding Materials", files: 18 },
          { id: 12, name: "HR Policies", files: 9 }
        ]
      },
      {
        id: 5,
        name: "Product Development",
        folders: [
          { id: 13, name: "Roadmaps", files: 7 },
          { id: 14, name: "Product Designs", files: 42 },
          { id: 15, name: "User Research", files: 31 }
        ]
      }
    ]
  },
  totalDrives: 193
};

// Generate more mock drives to get to 193
for (let i = 6; i <= 193; i++) {
  mockArchitecture.root.drives.push({
    id: i,
    name: `Drive ${i}`,
    folders: [
      { id: i * 3 - 2, name: `Folder ${i * 3 - 2}`, files: Math.floor(Math.random() * 50) + 1 },
      { id: i * 3 - 1, name: `Folder ${i * 3 - 1}`, files: Math.floor(Math.random() * 50) + 1 },
      { id: i * 3, name: `Folder ${i * 3}`, files: Math.floor(Math.random() * 50) + 1 }
    ]
  });
}

const Architecture = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDrives, setExpandedDrives] = useState<number[]>([1, 2, 3]);
  
  const drivesPerPage = 10;
  
  // Filter drives based on search term
  const filteredDrives = mockArchitecture.root.drives.filter(drive => 
    drive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.folders.some(folder => folder.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Pagination logic
  const indexOfLastDrive = currentPage * drivesPerPage;
  const indexOfFirstDrive = indexOfLastDrive - drivesPerPage;
  const currentDrives = filteredDrives.slice(indexOfFirstDrive, indexOfLastDrive);
  const totalPages = Math.ceil(filteredDrives.length / drivesPerPage);
  
  const toggleDriveExpansion = (driveId: number) => {
    setExpandedDrives(prev => {
      if (prev.includes(driveId)) {
        return prev.filter(id => id !== driveId);
      } else {
        return [...prev, driveId];
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <FolderTree className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Drive Architecture</h1>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search drives or folders..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Folder className="h-5 w-5 text-blue-600" />
            ACST Root
            <span className="text-sm font-normal text-gray-500">
              ({mockArchitecture.totalDrives} drives)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentDrives.map(drive => (
              <div key={drive.id} className="border rounded-md">
                <div 
                  className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleDriveExpansion(drive.id)}
                >
                  {expandedDrives.includes(drive.id) ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <Folder className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{drive.name}</span>
                  <span className="text-sm text-gray-500">
                    ({drive.folders.length} folders)
                  </span>
                </div>
                
                {expandedDrives.includes(drive.id) && (
                  <div className="border-t bg-gray-50 p-2">
                    <div className="ml-6 space-y-1">
                      {drive.folders.map(folder => (
                        <div key={folder.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                          <Folder className="h-4 w-4 text-gray-500" />
                          <span>{folder.name}</span>
                          <span className="text-xs text-gray-500">
                            ({folder.files} files)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // Calculate the page number to display
              let pageNum = index + 1;
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 2 + index;
                }
                if (currentPage > totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                }
              }
              
              // Ensure page number doesn't exceed total pages
              pageNum = Math.min(pageNum, totalPages);
              
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Architecture;
