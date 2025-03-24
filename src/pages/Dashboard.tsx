
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PerformanceCard from '@/components/PerformanceCard';
import { SparklesDemo } from '@/components/SparklesDemo';

const Dashboard = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
            {userName && (
              <p className="text-sm text-gray-600">Welcome, {userName}</p>
            )}
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Content */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Market Barometer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PerformanceCard 
              title="Overall Market" 
              percentage={78}
              period="Until Tomorrow"
            />
            <PerformanceCard 
              title="Top 500 Companies" 
              percentage={83}
              period="Until Tomorrow"
            />
            <PerformanceCard 
              title="Penny Stocks" 
              percentage={62}
              period="Until Tomorrow"
            />
          </div>
        </section>

        {/* Demo Section */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Sparkles Demo</CardTitle>
              <CardDescription>
                Interactive particle effects demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SparklesDemo />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
