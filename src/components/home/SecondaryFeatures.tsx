
import React, { useEffect, useRef } from 'react';
import { Shield, Users, FolderOpen, Lock, HardDrive, BookOpen } from 'lucide-react';

const SecondaryFeatures = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el) => observer.observe(el));

    return () => {
      featureElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-40 left-20 w-72 h-72 bg-[#7DA0C4]/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#5483B3]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#5483B3]/20 rounded-full filter blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={featuresRef}>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#021024] leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              All-in-One Workspace Management
            </h2>
            <p className="text-lg text-[#052659] mb-10 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Everything you need to manage your Google Workspace efficiently in one place.
            </p>
          </div>
          
          {/* Right side - Features moved from left to right */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-12">
            <div className="grid grid-cols-1 gap-y-8">
              <div className="feature-card flex items-start space-x-4 group opacity-0" style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}>
                <div className="flex-shrink-0 bg-gradient-to-br from-red-500/40 to-red-500/20 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <Users className="h-7 w-7 text-red-500 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#021024] group-hover:text-red-500 transition-colors duration-300">User Management</h3>
                  <p className="text-[#052659]">Easily manage users, groups, and permissions across your organization.</p>
                </div>
              </div>
              
              <div className="feature-card flex items-start space-x-4 group opacity-0" style={{ animationDuration: '0.6s', animationFillMode: 'forwards', animationDelay: '0.1s' }}>
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-500/40 to-blue-500/20 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <FolderOpen className="h-7 w-7 text-blue-500 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#021024] group-hover:text-blue-500 transition-colors duration-300">Folder Structure</h3>
                  <p className="text-[#052659]">Organize shared drives and folders with intuitive structure management.</p>
                </div>
              </div>
              
              <div className="feature-card flex items-start space-x-4 group opacity-0" style={{ animationDuration: '0.6s', animationFillMode: 'forwards', animationDelay: '0.2s' }}>
                <div className="flex-shrink-0 bg-gradient-to-br from-orange-500/40 to-orange-500/20 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <Shield className="h-7 w-7 text-orange-500 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#021024] group-hover:text-orange-500 transition-colors duration-300">Advanced Security</h3>
                  <p className="text-[#052659]">Protect your data with advanced security controls and monitoring.</p>
                </div>
              </div>
              
              <div className="feature-card flex items-start space-x-4 group opacity-0" style={{ animationDuration: '0.6s', animationFillMode: 'forwards', animationDelay: '0.3s' }}>
                <div className="flex-shrink-0 bg-gradient-to-br from-yellow-500/40 to-yellow-500/20 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <HardDrive className="h-7 w-7 text-yellow-500 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#021024] group-hover:text-yellow-500 transition-colors duration-300">Drive Management</h3>
                  <p className="text-[#052659]">Efficiently manage, share and control access to your Google Drive content.</p>
                </div>
              </div>
              
              <div className="feature-card flex items-start space-x-4 group opacity-0" style={{ animationDuration: '0.6s', animationFillMode: 'forwards', animationDelay: '0.4s' }}>
                <div className="flex-shrink-0 bg-gradient-to-br from-[#5483B3]/40 to-[#5483B3]/20 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <BookOpen className="h-7 w-7 text-[#5483B3] stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#021024] group-hover:text-[#5483B3] transition-colors duration-300">Classroom Management</h3>
                  <p className="text-[#052659]">Streamline Google Classroom administration and resource management.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryFeatures;
