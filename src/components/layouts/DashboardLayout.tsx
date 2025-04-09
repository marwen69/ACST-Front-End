
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/AppSidebar";
import TopBar from "@/components/navigation/TopBar";
import "../../styles/dashboard-layout.css"; // Import the dashboard layout styles

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col transition-all duration-300">
          <TopBar />
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
          {/* Footer removed */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
