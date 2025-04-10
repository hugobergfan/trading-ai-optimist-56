
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StockDashboard from "./pages/StockDashboard";
import NotFound from "./pages/NotFound";
import ComponentShowcase from "./pages/ComponentShowcase";
import ApiDocumentation from "./pages/ApiDocumentation";
import PaymentsPage from "./pages/Payments";
import Predictions from "./pages/Predictions";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stocks" element={<StockDashboard />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/api-docs" element={<ApiDocumentation />} />
              <Route path="/components" element={<ComponentShowcase />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
