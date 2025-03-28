
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, AlertTriangle } from 'lucide-react';
import Button from './Button';
import { toast } from 'sonner';

const DisclaimerAndContact = () => {
  const handleButtonClick = () => {
    toast.success("Message received! Our team will contact you shortly.");
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-trading-blue" />
              Contact Our Research Team
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 font-extralight">
                  Our dedicated research team is ready to assist with questions about our trading analysis and research findings.
                </p>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="font-extralight">Email Us:</h3>
                    <p className="text-muted-foreground font-extralight">research@finoxai.com</p>
                  </div>
                  <div>
                    <h3 className="font-extralight">Call Us:</h3>
                    <p className="text-muted-foreground font-extralight">+1 (888) 555-1234</p>
                  </div>
                  <div>
                    <h3 className="font-extralight">Research Inquiry:</h3>
                    <Button size="sm" className="mt-2 font-extralight" onClick={handleButtonClick}>
                      Contact Researchers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Risk Disclaimer */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Research Disclaimer
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4 font-extralight">
                  <span className="font-extralight">Research limitations:</span> The market analyses and trading patterns 
                  presented are based on Finox AI's proprietary research. Historical patterns and analysis do not 
                  guarantee future results. All investment decisions carry risk.
                </p>
                <p className="text-sm text-muted-foreground mb-4 font-extralight">
                  Finox AI has been researching algorithmic trading strategies extensively through statistical models 
                  and historical market data analysis. Market conditions change, and our research findings may not 
                  apply to all market scenarios.
                </p>
                <p className="text-sm text-muted-foreground font-extralight">
                  Before making investment decisions, consider your investment objectives, financial resources, and risk 
                  tolerance. Our research is meant to be informational only. By using Finox AI insights, you acknowledge 
                  that you understand these limitations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerAndContact;
