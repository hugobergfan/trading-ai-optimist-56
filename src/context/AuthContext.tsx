
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setIsAuthenticated(true);
        setUserName(storedName);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Store the name in localStorage
      localStorage.setItem('userName', name);
      setUserName(name);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome, ${name}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
