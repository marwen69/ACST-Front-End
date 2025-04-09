import { useState, useEffect } from "react";
import { Search, Edit, Eye, Trash2, RefreshCw, FileText, User, Clock, ChevronRight, ChevronDown, FileIcon, ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationPages } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const getActionInfo = (action: string) => {
  switch (action) {
    case 'edit': 
      return { 
        color: 'text-green-600 bg-green-100',
        icon: <Edit className="h-4 w-4 text-green-600" />
      };
    case 'view': 
      return { 
        color: 'text-blue-600 bg-blue-100',
        icon: <Eye className="h-4 w-4 text-blue-600" />
      };
    case 'remove': 
      return { 
        color: 'text-red-600 bg-red-100',
        icon: <Trash2 className="h-4 w-4 text-red-600" />
      };
    case 'rename': 
      return { 
        color: 'text-orange-600 bg-orange-100',
        icon: <RefreshCw className="h-4 w-4 text-orange-600" />
      };
    default: 
      return { 
        color: 'text-yellow-600 bg-yellow-100',
        icon: <FileText className="h-4 w-4 text-yellow-600" />
      };
  }
};

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  item: string;
  timestamp: string;
  details?: string;
}

interface FileActivity {
  fileName: string;
  lastUpdate: string;
  activities: {
    user: string;
    action: string;
    timestamp: string;
    details?: string;
  }[];
}

interface MostActiveUser {
  user: string;
  activityCount: number;
  lastActive: string;
}

interface ActivityDisplayProps {
  activities: ActivityLog[];
  groupedActivities: FileActivity[];
}

const ActivityDisplay = ({ activities, groupedActivities }: ActivityDisplayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'chronological' | 'grouped'>('chronological');
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});
  const [showAllActiveUsers, setShowAllActiveUsers] = useState(false);
  const [timelineItemsPerPage, setTimelineItemsPerPage] = useState(5);
  const [groupedItemsPerPage, setGroupedItemsPerPage] = useState(3);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(false);
    setTimeout(() => setAnimateItems(true), 50);
  }, [viewMode]);

  const filteredActivities = activities.filter(item => 
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroupedActivities = groupedActivities.filter(item => 
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastActivity = currentPage * timelineItemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - timelineItemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalActivityPages = Math.ceil(filteredActivities.length / timelineItemsPerPage);

  const indexOfLastItem = currentPage * groupedItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - groupedItemsPerPage;
  const currentItems = filteredGroupedActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGroupedActivities.length / groupedItemsPerPage);

  const activityCounts = {
    edit: activities.filter(log => log.action === 'edit').length,
    view: activities.filter(log => log.action === 'view').length,
    remove: activities.filter(log => log.action === 'remove').length,
    rename: activities.filter(log => log.action === 'rename').length,
    other: activities.filter(log => !['edit', 'view', 'remove', 'rename'].includes(log.action)).length,
  };

  const getMostActiveUsers = (): MostActiveUser[] => {
    const userActivityMap: Record<string, { count: number, lastActive: string }> = {};
    
    activities.forEach(activity => {
      if (!userActivityMap[activity.user]) {
        userActivityMap[activity.user] = { count: 0, lastActive: activity.timestamp };
      }
      
      userActivityMap[activity.user].count += 1;
      
      const currentTime = new Date(userActivityMap[activity.user].lastActive);
      const activityTime = new Date(activity.timestamp);
      if (activityTime > currentTime) {
        userActivityMap[activity.user].lastActive = activity.timestamp;
      }
    });
    
    const sortedUsers = Object.entries(userActivityMap)
      .map(([user, data]) => ({
        user,
        activityCount: data.count,
        lastActive: data.lastActive
      }))
      .sort((a, b) => b.activityCount - a.activityCount);
    
    return sortedUsers;
  };
  
  const mostActiveUsers = getMostActiveUsers();
  const displayedActiveUsers = showAllActiveUsers ? mostActiveUsers : mostActiveUsers.slice(0, 5);

  const toggleExpand = (fileName: string) => {
    setExpandedFiles(prev => ({
      ...prev,
      [fileName]: !prev[fileName]
    }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.querySelector('.activity-scroll-area')?.scrollTo(0, 0);
    setAnimateItems(false);
    setTimeout(() => setAnimateItems(true), 50);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">{activityCounts.edit}</span>
            <div className="flex items-center gap-2 text-sm">
              <Edit className="h-4 w-4 text-green-600" />
              <span>Edits</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">{activityCounts.view}</span>
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>Views</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-red-600">{activityCounts.remove}</span>
            <div className="flex items-center gap-2 text-sm">
              <Trash2 className="h-4 w-4 text-red-600" />
              <span>Removals</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600">{activityCounts.rename}</span>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 text-orange-600" />
              <span>Renames</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-600">{activityCounts.other}</span>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-yellow-600" />
              <span>Other</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-all duration-300 animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Most Active Users
          </CardTitle>
          {mostActiveUsers.length > 5 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAllActiveUsers(!showAllActiveUsers)}
              className="transition-all duration-300 hover:bg-blue-50"
            >
              {showAllActiveUsers ? "Show Less" : "Show More"}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayedActiveUsers.map((user, index) => (
              <div 
                key={user.user} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-2px]"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                    {getInitials(user.user)}
                  </div>
                  <div>
                    <div className="font-medium">{user.user}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last active: {new Date(user.lastActive).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {user.activityCount} activities
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="hidden">
          <div data-view-mode="chronological" onClick={() => setViewMode('chronological')}></div>
          <div data-view-mode="grouped" onClick={() => setViewMode('grouped')}></div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'chronological' ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setViewMode('chronological');
              setCurrentPage(1);
            }}
            className="transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Chronological View</span>
          </Button>
          <Button 
            variant={viewMode === 'grouped' ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setViewMode('grouped');
              setCurrentPage(1);
            }}
            className="transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2"
          >
            <ListFilter className="h-4 w-4" />
            <span>Grouped by File</span>
          </Button>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search activities..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${animateItems ? 'opacity-100' : 'opacity-0'}`}>
        {viewMode === 'chronological' ? (
          <>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle>Activity Timeline</CardTitle>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="transition-all duration-300 hover:bg-blue-50">
                        {timelineItemsPerPage} per page
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <div className="space-y-1">
                        {[5, 10, 15, 20].map((value) => (
                          <Button
                            key={value}
                            variant={timelineItemsPerPage === value ? "secondary" : "ghost"}
                            className="w-full justify-start transition-colors duration-200"
                            onClick={() => {
                              setTimelineItemsPerPage(value);
                              setCurrentPage(1);
                            }}
                          >
                            {value} items
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4 activity-scroll-area">
                  <div className="space-y-6 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {currentActivities.length > 0 ? (
                      currentActivities.map((activity, index) => {
                        const { color, icon } = getActionInfo(activity.action);
                        const date = new Date(activity.timestamp);
                        
                        return (
                          <div 
                            key={activity.id} 
                            className={`flex gap-4 relative ${animateItems ? 'animate-fade-in' : ''}`}
                            style={{ animationDelay: `${0.05 * index}s` }}
                          >
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 transform hover:scale-110", color)}>
                              {icon}
                            </div>
                            
                            <div className="flex-1 bg-white p-4 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className="font-medium">{activity.user}</span>
                                  <span className="text-gray-500"> {activity.action}ed </span>
                                  <span className="font-medium">{activity.item}</span>
                                </div>
                                <span className="text-sm text-gray-500">{date.toLocaleString()}</span>
                              </div>
                              {activity.details && (
                                <p className="mt-2 text-sm text-gray-600">{activity.details}</p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center py-10 text-gray-500">
                        No activities found matching your search.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    isDisabled={currentPage === 1}
                    className="transition-all duration-200 hover:bg-blue-50"
                  />
                </PaginationItem>
                
                <PaginationPages
                  currentPage={currentPage}
                  totalPages={totalActivityPages}
                  onPageChange={handlePageChange}
                />
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalActivityPages))}
                    isDisabled={currentPage === totalActivityPages}
                    className="transition-all duration-200 hover:bg-blue-50"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Files with Activity</h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="transition-all duration-300 hover:bg-blue-50">
                      {groupedItemsPerPage} per page
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-1">
                      {[3, 5, 10, 15].map((value) => (
                        <Button
                          key={value}
                          variant={groupedItemsPerPage === value ? "secondary" : "ghost"}
                          className="w-full justify-start transition-colors duration-200"
                          onClick={() => {
                            setGroupedItemsPerPage(value);
                            setCurrentPage(1);
                          }}
                        >
                          {value} items
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <Card 
                    key={index} 
                    className={`hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px] ${animateItems ? 'animate-fade-in' : ''}`}
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileIcon className="h-5 w-5 text-blue-600" />
                          {item.fileName}
                        </CardTitle>
                        <p className="text-sm text-gray-500">Last updated: {new Date(item.lastUpdate).toLocaleDateString()}</p>
                      </div>
                      {item.activities.length > 3 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleExpand(item.fileName)}
                          className="transition-all duration-300 hover:bg-blue-50"
                        >
                          {expandedFiles[item.fileName] ? (
                            <><ChevronDown className="h-4 w-4 mr-2" /> Show Less</>
                          ) : (
                            <><ChevronRight className="h-4 w-4 mr-2" /> Show More</>
                          )}
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {(expandedFiles[item.fileName] ? item.activities : item.activities.slice(0, 3)).map((activity, actIndex) => {
                            const { color, icon } = getActionInfo(activity.action);
                            const initials = getInitials(activity.user);
                            
                            return (
                              <div 
                                key={actIndex} 
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-2px]"
                                style={{ transitionDelay: `${0.05 * actIndex}s` }}
                              >
                                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium", 
                                  activity.action === 'edit' ? "bg-green-100 text-green-800" : 
                                  activity.action === 'view' ? "bg-blue-100 text-blue-800" : 
                                  "bg-gray-100 text-gray-800")}>
                                  {initials}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{activity.user}</div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className={cn("text-xs px-2 py-0.5 rounded-full flex items-center gap-1", 
                                      activity.action === 'edit' ? "bg-green-100 text-green-700" : 
                                      activity.action === 'view' ? "bg-blue-100 text-blue-700" : 
                                      "bg-gray-100 text-gray-700")}>
                                      {icon}
                                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(activity.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="py-8">
                  <CardContent className="text-center">
                    <p className="text-gray-500">No files found matching your search criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    isDisabled={currentPage === 1}
                    className="transition-all duration-200 hover:bg-blue-50"
                  />
                </PaginationItem>
                
                <PaginationPages
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    isDisabled={currentPage === totalPages}
                    className="transition-all duration-200 hover:bg-blue-50"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityDisplay;
