
import React from 'react';
import { Button } from "@/components/ui/button";
import FeatureCarousel from '@/components/home/FeatureCarousel';
import SecondaryFeatures from '@/components/home/SecondaryFeatures';
import { ArrowRight } from 'lucide-react';
import FooterFixed from '@/components/layouts/FooterFixed';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 z-50 p-4">
        <img 
          src="/lovable-uploads/6dcd7ad7-e280-4155-9caa-e39effe6ebbf.png" 
          alt="Logo" 
          className="h-16 w-auto"
        />
      </header>
      
      {/* Hero Section - Modern Design with Enhanced Background Effect */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Enhanced Background Elements with Animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/90 to-white/70"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#5483B3]/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#5483B3]/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#33C3F0]/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#9b87f5]/10 rounded-full filter blur-2xl animate-blob"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-10 lg:mb-0">
              <div className="relative">
                <span className="absolute -left-6 -top-6 w-20 h-20 bg-gradient-to-br from-[#9b87f5]/30 to-[#5483B3]/10 rounded-full filter blur-xl"></span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#021024] mb-6 leading-tight relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#021024] via-[#052659] to-[#5483B3]">
                    Centralized Google Workspace Management
                  </span>
                </h1>
              </div>
              <p className="text-xl text-[#052659] mb-8 leading-relaxed relative">
                Simplify administration, enhance security, and optimize collaboration across your entire Google Workspace ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-[#5483B3] to-[#6E59A5] hover:from-[#6E59A5] hover:to-[#5483B3] rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#9b87f5]/10 rounded-full filter blur-xl"></div>
                <img 
                  src="/lovable-uploads/43cdc4ac-42f3-4c2b-836a-d72effdc080a.png" 
                  alt="Google Workspace Icons" 
                  className="w-full relative z-10 animate-pulse-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Features Section */}
      <SecondaryFeatures />

      {/* Feature Carousel */}
      <FeatureCarousel />

      {/* Footer */}
      <FooterFixed />
    </div>
  );
};

export default HomePage;
