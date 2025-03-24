
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null;
  login: (name: string) => Promise<boolean>;
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
  const { toast } = useToast();

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
      
      // For demo purposes, set a default API key
      const demoApiKey = 'waHdJ6pK9yiFdMnyGNBCfWGENw_ur-9AUkVPg-hLN0w';
      localStorage.setItem('sharePredictions_apiKey', demoApiKey);
      setApiKey(demoApiKey);
      
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
    localStorage.removeItem('sharePredictions_apiKey');
    setIsAuthenticated(false);
    setUserName(null);
    setApiKey(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  const updateApiKey = (key: string) => {
    localStorage.setItem('sharePredictions_apiKey', key);
    setApiKey(key);
    toast({
      title: "API Key Updated",
      description: "Your API key has been updated successfully.",
    });
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
