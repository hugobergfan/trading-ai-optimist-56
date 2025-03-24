import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
const Testimonials = () => {
  return <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl text-center mb-4 font-extralight sm:text-5xl">Trusted by Traders</h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-3xl font-extralight text-slate-950">
          Join thousands of traders who've transformed their investment strategy with Finox AI
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <TestimonialCard quote="Finox AI has completely transformed my trading strategy. The automation has saved me countless hours." author="Michael R." role="Investment Analyst" />
          
          <TestimonialCard quote="As someone new to trading, Finox AI made it possible for me to participate in markets I didn't understand." author="Sarah T." role="Tech Entrepreneur" />
          
          <TestimonialCard quote="The risk management features give me peace of mind. My portfolio has grown steadily without the stress." author="David L." role="Retired Professional" />
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">GDPR Compliant</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <img src="https://placehold.co/130x40/e2e8f0/64748b?text=Financial+Times" alt="Financial Times" className="h-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all" />
          <img src="https://placehold.co/130x40/e2e8f0/64748b?text=Bloomberg" alt="Bloomberg" className="h-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all" />
          <img src="https://placehold.co/130x40/e2e8f0/64748b?text=WSJ" alt="Wall Street Journal" className="h-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all" />
          <img src="https://placehold.co/130x40/e2e8f0/64748b?text=TechCrunch" alt="TechCrunch" className="h-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all" />
        </div>
      </div>
    </section>;
};
const TestimonialCard = ({
  quote,
  author,
  role
}) => {
  return <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <p className="italic mb-4 font-normal text-xl">{quote}</p>
        <div className="font-medium">{author}</div>
        <div className="text-sm text-muted-foreground bg-slate-50">{role}</div>
      </CardContent>
    </Card>;
};
export default Testimonials;