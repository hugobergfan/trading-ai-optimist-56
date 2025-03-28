
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, ChevronRight } from 'lucide-react';

const PremiumFeatures = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/payments');
  };

  return (
    <Card className="border-blue-200 shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-white flex items-center justify-center text-sm font-extralight">
        <Crown className="h-4 w-4 mr-2" /> Premium Features Available
      </div>
      <CardHeader>
        <CardTitle className="font-extralight">Upgrade to Finox.ai Premium</CardTitle>
        <CardDescription>Access advanced AI trading insights and predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="font-extralight">Advanced market pattern analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="font-extralight">AI-powered portfolio optimization</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="font-extralight">Early access to new prediction models</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="font-extralight">Premium customer support</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={handleUpgrade}
        >
          Upgrade Now <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumFeatures;
