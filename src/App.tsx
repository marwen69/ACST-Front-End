import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DriveDetails from "./pages/DriveDetails";
import UsersList from "./pages/UsersList";
import Architecture from "./pages/Architecture";
import ClassroomPage from "./pages/ClassroomPage";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./components/layouts/DashboardLayout";
import ChatBot from "./components/chat/ChatBot";
import SimpleFooter from "./components/layouts/SimpleFooter";
import Preloader from "./components/ui/preloader";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Preloader fullScreen />;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ✅ Conditionally render ChatBot
const ChatBotWrapper = () => {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/" || path === "/login") return null;
  return <ChatBot />;
};

// ✅ Main AppContent
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) return <Preloader fullScreen />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ✅ Protected Area */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="drive/:id" element={<DriveDetails />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="users" element={<UsersList />} />
            <Route path="classroom" element={<ClassroomPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <SimpleFooter />
    </div>
  );
};

// ✅ Final App with Providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
          <ChatBotWrapper />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
