
import { useState } from "react";
import { Search, GraduationCap, Users, Clock, Mail, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockClassrooms = [
  {
    id: 1,
    name: "Mathematics 101",
    status: "active",
    description: "Introduction to Calculus and Algebra",
    studentCount: 28,
    teacherCount: 2,
    creationTime: "2023-09-01T08:00:00",
    groupEmail: "math101@acst-edu.com",
    enrollCode: "MTH101X"
  },
  {
    id: 2,
    name: "Physics for Engineers",
    status: "active",
    description: "Applied physics for engineering students",
    studentCount: 35,
    teacherCount: 1,
    creationTime: "2023-09-05T09:00:00",
    groupEmail: "phys-eng@acst-edu.com",
    enrollCode: "PHY202X"
  },
  {
    id: 3,
    name: "Computer Science Fundamentals",
    status: "active",
    description: "Introduction to programming and algorithms",
    studentCount: 42,
    teacherCount: 3,
    creationTime: "2023-09-02T10:30:00",
    groupEmail: "cs-fund@acst-edu.com",
    enrollCode: "CS101X"
  },
  {
    id: 4,
    name: "World History",
    status: "active",
    description: "Comprehensive overview of world history",
    studentCount: 32,
    teacherCount: 2,
    creationTime: "2023-09-07T11:00:00",
    groupEmail: "world-hist@acst-edu.com",
    enrollCode: "HIS205X"
  },
  {
    id: 5,
    name: "Creative Writing",
    status: "active",
    description: "Techniques and practice in creative writing",
    studentCount: 18,
    teacherCount: 1,
    creationTime: "2023-09-10T13:15:00",
    groupEmail: "writing@acst-edu.com",
    enrollCode: "ENG304X"
  },
  {
    id: 6,
    name: "Business Ethics",
    status: "archived",
    description: "Ethical considerations in business practices",
    studentCount: 25,
    teacherCount: 1,
    creationTime: "2023-06-15T09:30:00",
    groupEmail: "bus-ethics@acst-edu.com",
    enrollCode: "BUS401X"
  },
  {
    id: 7,
    name: "Environmental Science",
    status: "archived",
    description: "Study of environmental systems and sustainability",
    studentCount: 30,
    teacherCount: 2,
    creationTime: "2023-05-20T10:45:00",
    groupEmail: "env-sci@acst-edu.com",
    enrollCode: "ENV202X"
  },
  {
    id: 8,
    name: "Introduction to Psychology",
    status: "active",
    description: "Fundamentals of human psychology",
    studentCount: 45,
    teacherCount: 2,
    creationTime: "2023-09-12T08:30:00",
    groupEmail: "psych-intro@acst-edu.com",
    enrollCode: "PSY101X"
  },
  {
    id: 9,
    name: "Spanish Language",
    status: "active",
    description: "Beginner to intermediate Spanish language course",
    studentCount: 22,
    teacherCount: 1,
    creationTime: "2023-09-14T14:00:00",
    groupEmail: "spanish@acst-edu.com",
    enrollCode: "SPN201X"
  },
  {
    id: 10,
    name: "Art History",
    status: "archived",
    description: "Survey of major art movements and artists",
    studentCount: 20,
    teacherCount: 1,
    creationTime: "2023-04-10T11:15:00",
    groupEmail: "art-hist@acst-edu.com",
    enrollCode: "ART302X"
  },
  {
    id: 11,
    name: "Organic Chemistry",
    status: "active",
    description: "Study of carbon compounds and their reactions",
    studentCount: 28,
    teacherCount: 3,
    creationTime: "2023-09-08T09:45:00",
    groupEmail: "org-chem@acst-edu.com",
    enrollCode: "CHM301X"
  },
  {
    id: 12,
    name: "Statistics and Probability",
    status: "active",
    description: "Applied statistical methods and probability theory",
    studentCount: 33,
    teacherCount: 2,
    creationTime: "2023-09-11T13:00:00",
    groupEmail: "stats@acst-edu.com",
    enrollCode: "STA201X"
  },
  // Adding more classrooms for pagination testing
  {
    id: 13,
    name: "Digital Marketing",
    status: "active",
    description: "Modern digital marketing strategies and tools",
    studentCount: 38,
    teacherCount: 2,
    creationTime: "2023-09-15T10:15:00",
    groupEmail: "dig-mark@acst-edu.com",
    enrollCode: "MKT301X"
  },
  {
    id: 14,
    name: "Artificial Intelligence",
    status: "active",
    description: "Introduction to AI concepts and applications",
    studentCount: 40,
    teacherCount: 3,
    creationTime: "2023-09-17T09:30:00",
    groupEmail: "ai-class@acst-edu.com",
    enrollCode: "AI401X"
  },
  {
    id: 15,
    name: "Graphic Design",
    status: "active",
    description: "Principles and practice of visual communication",
    studentCount: 25,
    teacherCount: 1,
    creationTime: "2023-09-18T13:45:00",
    groupEmail: "design@acst-edu.com",
    enrollCode: "GD201X"
  },
  {
    id: 16,
    name: "French Language",
    status: "active",
    description: "Beginner to intermediate French language course",
    studentCount: 20,
    teacherCount: 1,
    creationTime: "2023-09-20T11:30:00",
    groupEmail: "french@acst-edu.com",
    enrollCode: "FRN201X"
  },
  {
    id: 17,
    name: "Economics 101",
    status: "active",
    description: "Introduction to micro and macroeconomics",
    studentCount: 45,
    teacherCount: 2,
    creationTime: "2023-09-21T08:45:00",
    groupEmail: "econ@acst-edu.com",
    enrollCode: "ECO101X"
  },
  {
    id: 18,
    name: "Geography",
    status: "archived",
    description: "Study of Earth's landscapes, environments, and societies",
    studentCount: 30,
    teacherCount: 1,
    creationTime: "2023-05-15T09:15:00",
    groupEmail: "geo@acst-edu.com",
    enrollCode: "GEO201X"
  }
];

const ClassroomPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("active");
  
  const itemsPerPage = 9;
  
  const filteredClassrooms = mockClassrooms.filter(classroom => 
    (activeTab === "all" || classroom.status === activeTab) &&
    (classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     classroom.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const indexOfLastClassroom = currentPage * itemsPerPage;
  const indexOfFirstClassroom = indexOfLastClassroom - itemsPerPage;
  const currentClassrooms = filteredClassrooms.slice(indexOfFirstClassroom, indexOfLastClassroom);
  const totalPages = Math.ceil(filteredClassrooms.length / itemsPerPage);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <p className="text-sm text-gray-500">Manage your educational spaces</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Tabs 
          defaultValue="active" 
          className="w-full md:w-auto"
          onValueChange={handleTabChange}
        >
          <TabsList>
            <TabsTrigger value="active" className="transition-all duration-200">Active</TabsTrigger>
            <TabsTrigger value="archived" className="transition-all duration-200">Archived</TabsTrigger>
            <TabsTrigger value="all" className="transition-all duration-200">All</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search classrooms..." 
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClassrooms.length > 0 ? (
          currentClassrooms.map((classroom, index) => (
            <Card 
              key={classroom.id} 
              className={`hover:shadow-md transition-all duration-300 transform hover:translate-y-[-6px] overflow-hidden animate-fade-in border-t-4 ${classroom.status === 'active' ? 'border-t-green-500' : 'border-t-gray-400'}`}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{classroom.name}</CardTitle>
                  <Badge variant={classroom.status === 'active' ? 'default' : 'secondary'}>
                    {classroom.status.charAt(0).toUpperCase() + classroom.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{classroom.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>
                      <span className="font-medium">{classroom.studentCount}</span> students, 
                      <span className="font-medium"> {classroom.teacherCount}</span> teacher{classroom.teacherCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Created {new Date(classroom.creationTime).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{classroom.groupEmail}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="h-4 w-4 text-blue-600" />
                    <span>Enroll code: <span className="font-mono">{classroom.enrollCode}</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <GraduationCap className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-500">No classrooms found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`transition-transform duration-200 ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} className="animate-fade-in" style={{ animationDelay: `${0.05 * i}s` }}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`transition-transform duration-200 ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:scale-105"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ClassroomPage;
