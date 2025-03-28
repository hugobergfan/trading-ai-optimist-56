
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, CreditCard, Landmark, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { TextShimmer } from '@/components/ui/text-shimmer';

const paymentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  amount: z.string().optional(),
});

const bankSchema = z.object({
  accountName: z.string().min(2, 'Account name is required'),
  accountNumber: z.string().regex(/^\d{8,17}$/, 'Account number must be 8-17 digits'),
  routingNumber: z.string().regex(/^\d{9}$/, 'Routing number must be 9 digits'),
  amount: z.string().optional(),
});

const plans = [
  { id: 'basic', name: 'Basic', price: '$49', features: ['Market analysis', 'Basic predictions', 'Daily updates'] },
  { id: 'pro', name: 'Professional', price: '$99', features: ['Advanced analysis', 'Premium predictions', 'Real-time updates', 'Portfolio tracking'] },
  { id: 'enterprise', name: 'Enterprise', price: '$249', features: ['All features', 'Dedicated support', 'Custom algorithms', 'API access', 'Team collaboration'] },
];

const PaymentsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userName } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  
  const cardForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
      amount: '',
    },
  });

  const bankForm = useForm<z.infer<typeof bankSchema>>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      amount: '',
    },
  });

  const handleCardSubmit = (values: z.infer<typeof paymentSchema>) => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful! Your subscription is now active.");
      navigate('/dashboard');
    }, 2000);
  };

  const handleBankSubmit = (values: z.infer<typeof bankSchema>) => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Bank payment initiated! Your subscription will be active once payment clears.");
      navigate('/dashboard');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    cardForm.setValue('expiry', value);
  };

  const getPlanPrice = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return plan ? plan.price : '$0';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <TextShimmer 
            className="text-3xl font-extralight mb-2 [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.300)]"
          >
            Finox.ai Premium
          </TextShimmer>
          <p className="text-muted-foreground font-extralight">
            Select a plan and payment method to unlock premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`transition-all ${selectedPlan === plan.id ? 'border-blue-500 shadow-md ring-2 ring-blue-500' : 'hover:border-blue-300'}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-extralight text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-2xl font-extralight text-blue-600">{plan.price}<span className="text-sm text-muted-foreground"> /month</span></CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 font-extralight">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedPlan === plan.id ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-extralight">Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue="card" 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <div className={`border rounded-md p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <div className="font-extralight">Credit / Debit Card</div>
                    <div className="text-sm text-muted-foreground font-extralight">Pay with Visa, Mastercard, etc.</div>
                  </div>
                </Label>
              </div>

              <div className={`border rounded-md p-4 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <RadioGroupItem value="bank" id="bank" className="sr-only" />
                <Label htmlFor="bank" className="flex items-center cursor-pointer">
                  <Landmark className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <div className="font-extralight">Bank Transfer</div>
                    <div className="text-sm text-muted-foreground font-extralight">Pay directly from your bank account</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Tabs value={paymentMethod} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-extralight">Card Payment</CardTitle>
                <CardDescription>Enter your card details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...cardForm}>
                  <form onSubmit={cardForm.handleSubmit(handleCardSubmit)} className="space-y-6">
                    <FormField
                      control={cardForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={cardForm.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              maxLength={19}
                              onChange={(e) => {
                                const formatted = e.target.value.replace(/\s/g, '').substring(0, 16);
                                field.onChange(formatted);
                              }}
                              value={formatCardNumber(field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={cardForm.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                maxLength={5}
                                {...field}
                                onChange={handleExpiryChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cardForm.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                maxLength={4}
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <p className="font-extralight mb-2">Summary:</p>
                      <div className="flex justify-between py-2 border-t">
                        <span className="font-extralight">Plan: {plans.find(p => p.id === selectedPlan)?.name}</span>
                        <span className="font-extralight">{getPlanPrice()}/month</span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span className="font-extralight">Total</span>
                        <span className="font-extralight text-blue-600">{getPlanPrice()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={processing}
                    >
                      {processing ? "Processing..." : `Pay ${getPlanPrice()}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-extralight">Bank Transfer</CardTitle>
                <CardDescription>Enter your bank account details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...bankForm}>
                  <form onSubmit={bankForm.handleSubmit(handleBankSubmit)} className="space-y-6">
                    <FormField
                      control={bankForm.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bankForm.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123456789" 
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bankForm.control}
                      name="routingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Routing Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123456789" 
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <p className="font-extralight mb-2">Summary:</p>
                      <div className="flex justify-between py-2 border-t">
                        <span className="font-extralight">Plan: {plans.find(p => p.id === selectedPlan)?.name}</span>
                        <span className="font-extralight">{getPlanPrice()}/month</span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span className="font-extralight">Total</span>
                        <span className="font-extralight text-blue-600">{getPlanPrice()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={processing}
                    >
                      {processing ? "Processing..." : `Pay ${getPlanPrice()}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentsPage;
