
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlpacaStockData from '@/components/AlpacaStockData';
import AlpacaNewsStream from '@/components/AlpacaNewsStream';
import StockNews from '@/components/StockNews';
import { toast } from 'sonner';

const StockDashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('market-data');
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleRefresh = () => {
    toast.success("Refreshing stock data");
  };
  
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    toast.info(`Searching for ${query}`);
  };
  
  return (
    <DashboardLayout
      onRefresh={handleRefresh}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 sm:w-[400px]">
          <TabsTrigger value="market-data">Market Data</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market-data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Market Data</CardTitle>
              <CardDescription>Real-time and historical stock market data from Alpaca</CardDescription>
            </CardHeader>
            <CardContent>
              <AlpacaStockData />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market News</CardTitle>
              <CardDescription>Latest financial news and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlpacaNewsStream />
                <StockNews />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Tracking</CardTitle>
              <CardDescription>Monitor your investments and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">Portfolio tracking coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StockDashboard;
