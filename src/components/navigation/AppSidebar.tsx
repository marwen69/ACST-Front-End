import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HardDrive,
  Users,
  FolderTree,
  LogOut,
  GraduationCap,
  ChevronLeft,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext"; // ✅ Import useAuth hook

const AppSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth(); // ✅ Access logout function from context

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div
        className={`${
          collapsed ? "w-16" : "w-[250px]"
        } transition-all duration-300 ease-in-out z-40 h-screen bg-[#2E3B4E] fixed left-0 top-0`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-12px] top-6 bg-white border shadow-sm z-50 rounded-full hidden md:flex hover:bg-gray-100 transition-transform duration-300 hover:scale-110"
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className="h-full flex flex-col">
          <div
            className={`py-6 ${
              collapsed ? "px-3 justify-center" : "px-6"
            } flex items-center gap-2 border-b border-gray-700 relative`}
          >
            <div
              className={`min-w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 
              ${
                collapsed
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  : ""
              }`}
            >
              <img
                src="/lovable-uploads/b832be54-606a-4e68-822a-a1b68fd9b3d0.png"
                alt="ACST GWM Logo"
                className={`w-full h-full object-contain ${collapsed ? "w-6 h-6" : ""}`}
              />
            </div>
            {!collapsed && (
              <span className="font-semibold text-lg text-white animate-fade-in overflow-hidden whitespace-nowrap">
                ACST HUB
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto py-4">
            <div className="px-2">
              <div className="space-y-1">
                {!collapsed && (
                  <p className="text-xs text-gray-400 px-4 py-2 uppercase font-medium animate-fade-in">
                    MANAGEMENT
                  </p>
                )}
                <div className="space-y-1">
                  <Link
                    to="/app"
                    className={`flex items-center ${
                      collapsed ? "justify-center px-2" : "px-4"
                    } py-2.5 rounded-md transition-all duration-300 hover:bg-blue-900/30 hover:scale-105 ${
                      isActive("/app") && location.pathname === "/app"
                        ? "bg-blue-900/40"
                        : ""
                    }`}
                  >
                    <HardDrive
                      className={`${
                        collapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                      } text-white transition-all duration-200`}
                    />
                    {!collapsed && (
                      <span className="text-white animate-fade-in whitespace-nowrap overflow-hidden">
                        Drives
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/app/architecture"
                    className={`flex items-center ${
                      collapsed ? "justify-center px-2" : "px-4"
                    } py-2.5 rounded-md transition-all duration-300 hover:bg-blue-900/30 hover:scale-105 ${
                      isActive("/app/architecture") ? "bg-blue-900/40" : ""
                    }`}
                  >
                    <FolderTree
                      className={`${
                        collapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                      } text-white transition-all duration-200`}
                    />
                    {!collapsed && (
                      <span className="text-white animate-fade-in whitespace-nowrap overflow-hidden">
                        Architecture
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/app/users"
                    className={`flex items-center ${
                      collapsed ? "justify-center px-2" : "px-4"
                    } py-2.5 rounded-md transition-all duration-300 hover:bg-blue-900/30 hover:scale-105 ${
                      isActive("/app/users") ? "bg-blue-900/40" : ""
                    }`}
                  >
                    <Users
                      className={`${
                        collapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                      } text-white transition-all duration-200`}
                    />
                    {!collapsed && (
                      <span className="text-white animate-fade-in whitespace-nowrap overflow-hidden">
                        Users
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/app/classroom"
                    className={`flex items-center ${
                      collapsed ? "justify-center px-2" : "px-4"
                    } py-2.5 rounded-md transition-all duration-300 hover:bg-blue-900/30 hover:scale-105 ${
                      isActive("/app/classroom") ? "bg-blue-900/40" : ""
                    }`}
                  >
                    <GraduationCap
                      className={`${
                        collapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                      } text-white transition-all duration-200`}
                    />
                    {!collapsed && (
                      <span className="text-white animate-fade-in whitespace-nowrap overflow-hidden">
                        Classroom
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ LOGOUT BUTTON */}
          <div className="border-t border-gray-700 py-4 px-2">
            <button
              onClick={logout} // ✅ Log the user out via AuthContext
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2.5 rounded-md transition-all duration-300 hover:bg-red-900/30 hover:scale-105 w-full`}
            >
              <LogOut
                className={`${
                  collapsed ? "h-6 w-6" : "h-5 w-5 mr-3"
                } text-white transition-all duration-200`}
              />
              {!collapsed && (
                <span className="text-white animate-fade-in whitespace-nowrap overflow-hidden">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Invisible spacing div to keep layout aligned */}
      <div
        className={`${
          collapsed ? "w-16" : "w-[250px]"
        } transition-all duration-300 shrink-0`}
      ></div>
    </>
  );
};

export default AppSidebar;
