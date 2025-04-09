
import { useState, useEffect } from "react";
import { HardDrive, FileText, Users, FolderKanban, Lock, BookOpen, School } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

// Updated features with new items and specific icon colors
const features = [
  {
    title: "Centralized Dashboard",
    description: "Manage your entire Google Workspace environment from a single, intuitive dashboard.",
    icon: <HardDrive className="h-12 w-12 text-yellow-500" />, // Yellow
    color: "text-yellow-500",
    bgColor: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Smart File Management",
    description: "Intelligent file organization with advanced search and filtering capabilities.",
    icon: <FileText className="h-12 w-12 text-blue-500" />, // Blue
    color: "text-blue-500",
    bgColor: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Team Collaboration",
    description: "Enhanced tools for real-time collaboration and seamless communication.",
    icon: <Users className="h-12 w-12 text-red-500" />, // Red
    color: "text-red-500",
    bgColor: "from-red-500/20 to-red-500/5",
  },
  {
    title: "Automated Workflows",
    description: "Create custom workflows to automate routine tasks and increase productivity.",
    icon: <FolderKanban className="h-12 w-12 text-blue-500" />, // Blue
    color: "text-blue-500",
    bgColor: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Advanced Security Controls",
    description: "Comprehensive security features to protect your organization's sensitive data.",
    icon: <Lock className="h-12 w-12 text-orange-500" />, // Orange
    color: "text-orange-500",
    bgColor: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Educational Tools",
    description: "Specialized features for educational institutions using Google Classroom.",
    icon: <School className="h-12 w-12 text-yellow-500" />, // Yellow
    color: "text-yellow-500",
    bgColor: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Resource Library",
    description: "Access to comprehensive documentation and learning resources.",
    icon: <BookOpen className="h-12 w-12 text-red-500" />, // Red
    color: "text-red-500",
    bgColor: "from-red-500/20 to-red-500/5",
  },
];

const FeatureCarousel = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Determine how many items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Enhanced background decorations with animated gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F2FCE2]/40 to-white/90"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-[#33C3F0]/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FEC6A1]/15 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#E5DEFF]/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#FFDEE2]/15 rounded-full filter blur-2xl animate-blob animation-delay-3000"></div>
      </div>
      
      {/* Heading with enhanced styling */}
      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <div className="inline-block relative">
          <span className="absolute -top-6 -left-6 w-12 h-12 bg-[#FDE1D3]/50 rounded-full filter blur-xl"></span>
          <span className="absolute -bottom-4 -right-4 w-10 h-10 bg-[#D3E4FD]/50 rounded-full filter blur-xl"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#052659] via-[#5483B3] to-[#6E59A5]">
              Powerful Tools for Workspace Management
            </span>
          </h2>
        </div>
        <p className="text-xl text-[#052659] max-w-2xl mx-auto relative">
          Discover how our comprehensive features can transform your Google Workspace experience
        </p>
      </div>
      
      {/* Carousel using shadcn/ui Carousel component with improved styling */}
      <div className="py-8 relative z-10">
        <div className="container mx-auto px-4 relative">
          <Carousel className="w-full max-w-5xl mx-auto" opts={{ dragFree: true }}>
            <div className="absolute top-1/2 -left-4 md:-left-8 lg:-left-12 z-20 transform -translate-y-1/2">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 rounded-full bg-white/80 backdrop-blur-sm text-[#5483B3] border border-[#5483B3]/20 shadow-md hover:bg-white transition-all duration-300" />
            </div>
            
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-100">
                    <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${feature.bgColor} relative group`}>
                      {/* Decorative elements that animate on hover */}
                      <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full bg-${feature.color.split('-')[1]}-500/60 group-hover:animate-ping`}></div>
                      <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-${feature.color.split('-')[1]}-500/60 group-hover:animate-ping animation-delay-300`}></div>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-semibold mb-4 ${feature.color}`}>{feature.title}</h3>
                    <p className="text-[#052659] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute top-1/2 -right-4 md:-right-8 lg:-right-12 z-20 transform -translate-y-1/2">
              <CarouselNext className="relative right-0 top-0 translate-y-0 rounded-full bg-white/80 backdrop-blur-sm text-[#5483B3] border border-[#5483B3]/20 shadow-md hover:bg-white transition-all duration-300" />
            </div>
          </Carousel>
          
          {/* Added decorative element at the bottom */}
          <div className="w-full flex justify-center mt-10">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full bg-gradient-to-r from-[#5483B3] to-[#6E59A5] animate-pulse`} 
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;
