import { useState } from "react";
import { Bell, Eye, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";

const mockNotifications = [
  { id: 1, title: "New shared folder", time: "15 min ago" },
  { id: 2, title: "New comment on Budget.xlsx", time: "2 hours ago" },
  { id: 3, title: "User invitation accepted", time: "5 hours ago" },
  { id: 4, title: "File restored: Presentation.pptx", time: "Yesterday" },
  { id: 5, title: "Storage limit reached 85%", time: "Yesterday" },
  { id: 6, title: "Account security alert", time: "2 days ago" }
];

const TopBar = () => {
  const { toggleSidebar, isMobile } = useSidebar();
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [notificationCount, setNotificationCount] = useState(mockNotifications.length);

  const markAllAsSeen = () => {
    setNotificationCount(0);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b px-4 py-2 flex items-center justify-between shadow-sm">
      {/* Mobile menu button and logo */}
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold md:hidden">ACST GWM</h1>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3 ml-auto">
        {/* 🔔 Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group animate-fade-in transition-all duration-300 hover:scale-110"
            >
              <Bell className="h-5 w-5 transition-all group-hover:text-blue-600" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse-soft transition-all duration-300">
                  {notificationCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <p className="font-medium">Notifications</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsSeen}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <Eye className="h-3 w-3 mr-1" />
                Mark all as seen
              </Button>
            </div>
            <ScrollArea className="max-h-72">
              {notifications.slice(0, 4).map((notification) => (
                <DropdownMenuItem key={notification.id} className="px-4 py-3 focus:bg-blue-50 cursor-pointer animate-fade-in hover:translate-y-[-2px] transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              {notifications.length > 4 && (
                <div className="p-2 text-center border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-300 w-full"
                  >
                    View all {notifications.length} notifications
                  </Button>
                </div>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 👤 User Info */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 px-2 hover:bg-gray-100 transition-all duration-300 animate-fade-in hover:scale-105">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture || ""} />
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:block">
                {user?.name || user?.email || "User"}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer transition-colors duration-300 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="h-4 w-4 text-red-500 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
