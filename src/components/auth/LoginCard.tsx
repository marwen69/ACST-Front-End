import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { useAuth } from '@/contexts/AuthContext';

const LoginCard = () => {
  const { login } = useAuth();

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
      <CardHeader className="flex flex-col items-center justify-center pt-8 pb-2">
        <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-blue-100">
          <img 
            src="/lovable-uploads/fdd5a178-13ef-41fc-9a36-96c2c0eeee08.png" 
            alt="Logo" 
            className="w-16 h-16" 
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 text-center mt-2">
          Sign in with your Google account to continue
        </p>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <Button 
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-md transition-colors duration-300"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-5 h-5 mr-2" 
          />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-1 text-center">
        <p className="text-xs text-gray-500 w-full">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
