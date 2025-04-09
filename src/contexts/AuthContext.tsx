import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Replace with proper user type if needed
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // ✅ user state added
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8089/ACST-GWM/user/info", {
          credentials: 'include',
        });
        const data = await response.json();
        if (!data.error) {
          setIsAuthenticated(true);
          setUser(data.user); // ✅ store user info
          localStorage.setItem('isAuthenticated', 'true');
          toast({
            title: "Welcome",
            description: `Hello, ${data.user.name || data.user.email}`,
            variant: "default",
          });
        }
      } catch (err) {
        console.error("User fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:8089/ACST-GWM/oauth2/authorization/google";
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:8089/ACST-GWM/session/logout", {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      setUser(null); // ✅ clear user on logout
      setLoading(false);
      toast({
        title: "Logged out",
        description: "You have been logged out",
        variant: "default",
      });
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
