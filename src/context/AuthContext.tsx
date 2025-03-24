
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sharePredictionsApi } from '@/services/sharePredictionsApi';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (apiKey: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const isLoggedIn = sharePredictionsApi.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (apiKey: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await sharePredictionsApi.login(apiKey);
      
      if (success) {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "You have successfully logged in to Share Predictions API.",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid API key. Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      return success;
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
    sharePredictionsApi.logout();
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
