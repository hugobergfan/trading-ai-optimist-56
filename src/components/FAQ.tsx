import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const FAQ = () => {
  return <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl text-center mb-4 font-extralight">Frequently Asked Questions</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto font-light text-slate-950">
          Got questions? We've got answers
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-normal">How secure is my money?</AccordionTrigger>
            <AccordionContent>
              Your funds remain in your own brokerage account at all times. Finox AI only receives trading permissions 
              that you explicitly grant, and you can revoke access at any time. We use bank-level encryption and 
              never store your account credentials.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-normal">Do I need trading experience to use Finox AI?</AccordionTrigger>
            <AccordionContent>
              Not at all! Finox AI was designed to make algorithmic trading accessible to everyone. Our system handles 
              all the technical analysis and trade execution automatically. You simply set your risk tolerance and 
              investment goals, and our AI takes care of the rest.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-normal">What are the fees associated with Finox AI?</AccordionTrigger>
            <AccordionContent>
              Finox AI operates on a simple subscription model: $29/month for our Basic plan and $79/month for our 
              Pro plan with advanced features. There are no hidden fees, commissions, or account minimums. You only 
              pay the monthly subscription and any standard fees charged by your broker.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-normal">How much money do I need to start?</AccordionTrigger>
            <AccordionContent>
              While there's no minimum requirement from our side, we recommend starting with at least $1,000 to 
              properly diversify your portfolio. However, our algorithms are designed to work with any account size 
              and will adjust position sizes accordingly.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-normal">Can I stop the bot at any time?</AccordionTrigger>
            <AccordionContent>
              Absolutely. You maintain complete control over your account. You can pause or stop the trading bot at 
              any time through your dashboard. When paused, Finox AI will not open new positions but can optionally 
              continue to manage existing ones until you decide to close them.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>;
};
export default FAQ;