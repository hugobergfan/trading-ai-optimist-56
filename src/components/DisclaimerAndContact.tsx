import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, AlertTriangle } from 'lucide-react';
import Button from './Button';
const DisclaimerAndContact = () => {
  return <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl mb-4 flex items-center gap-2 font-extralight">
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
                    <p className="text-muted-foreground">support@finoxai.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us:</h3>
                    <p className="text-muted-foreground">+1 (888) 555-1234</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat:</h3>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Risk Disclaimer */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Risk Disclaimer
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Trading involves risk:</strong> The performance represented on this website is 
                  historical and past performance does not guarantee future results. All investments involve 
                  risk, including the possible loss of principal.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Finox AI's algorithmic trading strategies are based on statistical models and historical 
                  market data. Market conditions change, and our systems may not perform as expected under 
                  all circumstances.
                </p>
                <p className="text-sm text-muted-foreground">
                  Before investing, consider your investment objectives, financial resources, and risk 
                  tolerance. Only invest money you can afford to lose. By using Finox AI, you acknowledge 
                  that you understand these risks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default DisclaimerAndContact;