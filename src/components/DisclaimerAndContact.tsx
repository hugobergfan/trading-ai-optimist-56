
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, AlertTriangle } from 'lucide-react';
import Button from './Button';

const DisclaimerAndContact = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-trading-blue" />
              Need Help?
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 font-extralight">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="font-extralight">Email Us:</h3>
                    <p className="text-muted-foreground font-extralight">support@finoxai.com</p>
                  </div>
                  <div>
                    <h3 className="font-extralight">Call Us:</h3>
                    <p className="text-muted-foreground font-extralight">+1 (888) 555-1234</p>
                  </div>
                  <div>
                    <h3 className="font-extralight">Live Chat:</h3>
                    <Button size="sm" className="mt-2 font-extralight">
                      Start Chat
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
              Risk Disclaimer
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4 font-extralight">
                  <span className="font-extralight">Trading involves risk:</span> The performance represented on this website is 
                  historical and past performance does not guarantee future results. All investments involve 
                  risk, including the possible loss of principal.
                </p>
                <p className="text-sm text-muted-foreground mb-4 font-extralight">
                  Finox AI's algorithmic trading strategies are based on statistical models and historical 
                  market data. Market conditions change, and our systems may not perform as expected under 
                  all circumstances.
                </p>
                <p className="text-sm text-muted-foreground font-extralight">
                  Before investing, consider your investment objectives, financial resources, and risk 
                  tolerance. Only invest money you can afford to lose. By using Finox AI, you acknowledge 
                  that you understand these risks.
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
