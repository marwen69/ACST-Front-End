
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import FeatureCarousel from "../components/home/FeatureCarousel";
import FeaturesList from "../components/home/FeaturesList";
import SecondaryFeatures from "../components/home/SecondaryFeatures";
import FooterFixed from "../components/layouts/FooterFixed";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section with gradient background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-5"></div>
        
        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                ACST <span className="text-indigo-600">Hub</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 max-w-xl">
                A comprehensive platform for managing your Google Workspace services, documents, and collaboration in one seamless interface.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/login">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/396fd98a-a8fd-4c38-b4e4-84c6d0bb03db.png" 
                alt="GWorkspace Hub" 
                className="max-w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore the various features that make GWorkspace Hub the ultimate productivity tool
            </p>
          </div>
          
          <Tabs defaultValue="list" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-100 p-1 rounded-full">
                <TabsTrigger value="list" className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  List View
                </TabsTrigger>
                <TabsTrigger value="carousel" className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Carousel
                </TabsTrigger>
                <TabsTrigger value="grid" className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Grid View
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="mt-4">
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
                <FeaturesList />
              </div>
            </TabsContent>
            
            <TabsContent value="carousel" className="mt-4">
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
                <FeatureCarousel />
              </div>
            </TabsContent>
            
            <TabsContent value="grid" className="mt-4">
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
                <SecondaryFeatures />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 bg-gradient-to-t from-slate-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose GWorkspace Hub?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover the advantages that set our platform apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-red-500 w-full"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Seamless Integration</h3>
                <p className="text-slate-600">
                  Connect with all your Google Workspace services without friction, bringing your work into one unified interface.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-blue-500 w-full"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Enhanced Security</h3>
                <p className="text-slate-600">
                  Advanced security features to protect your sensitive data while maintaining easy access for authorized team members.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-green-500 w-full"></div>
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Boosted Productivity</h3>
                <p className="text-slate-600">
                  Streamlined workflows and smart automation tools help you accomplish more in less time with reduced effort.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 opacity-90"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of teams already using GWorkspace Hub to improve collaboration and productivity.
          </p>
          <Link to="/login">
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <FooterFixed />
    </div>
  );
};

export default Index;
