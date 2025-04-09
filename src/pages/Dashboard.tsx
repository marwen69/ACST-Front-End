import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Folder, Users, Calendar, HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Dashboard = () => {
  const [drives, setDrives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const drivesPerPage = 9; // 3x3 grid

  useEffect(() => {
    const storedData = sessionStorage.getItem("drivesData");
    if (storedData) {
      // Load drives from session storage if available.
      const parsedData = JSON.parse(storedData);
      setDrives(parsedData);
    } else {
      const fetchDrives = async () => {
        try {
          const res = await fetch("http://localhost:8089/ACST-GWM/drive/shared-drives", {
            credentials: "include",
          });
          console.log("Response status:", res.status);
          const data = await res.json();
          console.log("Fetched data:", data);

          if (data.error) {
            setErrorMessage(data.error);
            return;
          }

          let drivesArray = [];
          if (data.sharedDrives && Array.isArray(data.sharedDrives)) {
            drivesArray = data.sharedDrives;
          } else if (Array.isArray(data)) {
            drivesArray = data;
          } else if (data.name) {
            drivesArray = [data];
          } else {
            setErrorMessage("Unknown data shape from server. Check console logs.");
            return;
          }

          setDrives(drivesArray);
          sessionStorage.setItem("drivesData", JSON.stringify(drivesArray));
        } catch (error) {
          console.error("Failed to fetch drives:", error);
          setErrorMessage("Failed to fetch drives. Please try again later.");
        }
      };

      fetchDrives();
    }
  }, []);

  // Filter drives based on search term (ensuring drive.name exists).
  const filteredDrives = drives.filter(
    (drive) => drive.name && drive.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic.
  const indexOfLastDrive = currentPage * drivesPerPage;
  const indexOfFirstDrive = indexOfLastDrive - drivesPerPage;
  const currentDrives = filteredDrives.slice(indexOfFirstDrive, indexOfLastDrive);
  const totalPages = Math.ceil(filteredDrives.length / drivesPerPage);

  // Generate pagination items with ellipsis if needed.
  const generatePaginationItems = () => {
    const items = [];
    const maxDisplayed = 5;

    if (totalPages <= maxDisplayed) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="transition-all duration-200"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <span className="px-4 py-2">...</span>
          </PaginationItem>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <span className="px-4 py-2">...</span>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Drive Management</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search drives..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Display error if exists */}
      {errorMessage && (
        <div className="text-center text-red-500 font-medium">{errorMessage}</div>
      )}

      {/* Drives grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDrives.map((drive) => (
          <Link to={`/app/drive/${drive.id}`} key={drive.id}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer transform hover:scale-[1.02] transition-transform duration-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-full bg-blue-100">
                        <HardDrive className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg truncate">{drive.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Total Files: {drive.totalFileCount || 0} | Used:{" "}
                      {drive.totalFileSizeGB ? drive.totalFileSizeGB + " GB" : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Owned by: {drive.ownerEmail || drive.ownerDisplayName} 
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">
                      {new Date(drive.createdTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      {drive.permissions ? drive.permissions.length + " perms" : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">
                      {drive.totalFoldersCount !== undefined ? drive.totalFoldersCount + " folders" : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-500" />
                    <span className="text-sm">
                      Drive Total : 500 GB
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer animate-pulse"
                }
              />
            </PaginationItem>
            {generatePaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={
                  currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer animate-pulse"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-center text-sm text-gray-500">
        Showing drives {indexOfFirstDrive + 1}-{Math.min(indexOfLastDrive, filteredDrives.length)} of{" "}
        {filteredDrives.length}
      </div>
    </div>
  );
};

export default Dashboard;
