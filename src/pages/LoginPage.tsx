import React from 'react';
import LoginCard from '../components/auth/LoginCard';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4">
      <div className="container mx-auto pt-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/fdd5a178-13ef-41fc-9a36-96c2c0eeee08.png" 
            alt="Logo" 
            className="h-16 w-auto" 
          />
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
