
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const LoginButton = () => {
  return (
    <Button asChild className="py-6 px-8 text-lg bg-trading-blue hover:bg-trading-dark-blue shadow-lg hover:shadow-xl transition-all duration-300">
      <Link to="/login" className="flex items-center">
        <LogIn className="mr-2 h-5 w-5" />
        <span>Sign In to Dashboard</span>
      </Link>
    </Button>
  );
};

export default LoginButton;
