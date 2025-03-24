
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null;
  login: (name: string, apiKey?: string) => Promise<boolean>;
  logout: () => void;
  apiKey: string | null;
  setApiKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const storedName = localStorage.getItem('userName');
      const storedApiKey = localStorage.getItem('sharePredictions_apiKey');
      
      if (storedName) {
        setIsAuthenticated(true);
        setUserName(storedName);
      }
      
      if (storedApiKey) {
        setApiKey(storedApiKey);
      } else {
        // Set default API key if none stored
        setApiKey('1Y9xJceC.bFVXXgiznj27AU1LG4XQosxA4opN08c6');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (name: string, providedApiKey?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Store the name in localStorage
      localStorage.setItem('userName', name);
      setUserName(name);
      setIsAuthenticated(true);
      
      // Use provided API key if available, otherwise use default
      const apiKeyToUse = providedApiKey || '1Y9xJceC.bFVXXgiznj27AU1LG4XQosxA4opN08c6';
      localStorage.setItem('sharePredictions_apiKey', apiKeyToUse);
      setApiKey(apiKeyToUse);
      
      toast.success(`Welcome, ${name}!`);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred during login. Please try again.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('sharePredictions_apiKey');
    setIsAuthenticated(false);
    setUserName(null);
    setApiKey(null);
    toast.success("You have been logged out successfully.");
  };
  
  const updateApiKey = (key: string) => {
    localStorage.setItem('sharePredictions_apiKey', key);
    setApiKey(key);
    toast.success("Your API key has been updated successfully.");
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      userName, 
      login, 
      logout,
      apiKey,
      setApiKey: updateApiKey
    }}>
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
