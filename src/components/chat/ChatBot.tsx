
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! How can I assist you with your drive management today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a small delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: messages.length + 2,
        content: "I'm your drive assistant. I can help you manage files, share access, and optimize storage. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 mr-4 mb-4">
      {isOpen ? (
        <div className="relative w-96">
          <Card 
            className={`w-full shadow-2xl border border-[#021024]/20 rounded-3xl overflow-hidden transition-all duration-300 transform ${
              isMinimized 
                ? "h-16 animate-slide-in translate-y-0" 
                : "animate-scale-in"
            }`}
            style={{
              background: "linear-gradient(145deg, rgba(2,16,36,0.97) 0%, rgba(2,22,48,0.95) 100%)",
            }}
          >
            <CardHeader 
              className={`p-3 flex flex-row justify-between items-center border-b border-white/10 cursor-pointer ${
                isMinimized ? "border-none" : ""
              }`}
              onClick={isMinimized ? minimizeChat : undefined}
            >
              <CardTitle className="text-base font-medium flex items-center gap-2 text-white">
                <div className="h-6 w-6 relative">
                  <img 
                    src="/lovable-uploads/0e0fedda-8369-4406-a3bf-6e0ee5dfe7d2.png" 
                    alt="Chat Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                Drive Assistant
                {isTyping && isMinimized && (
                  <span className="flex space-x-1 ml-2">
                    <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                    <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-1">
                {!isMinimized && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-white hover:bg-white/10 transition-colors rounded-full" 
                    onClick={minimizeChat}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white hover:bg-white/10 transition-colors rounded-full" 
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {!isMinimized && (
              <>
                <CardContent className="p-0">
                  <ScrollArea 
                    className="h-72 px-3 py-4 scrollbar-none"
                    ref={scrollAreaRef}
                  >
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-2 animate-fade-in`}
                        >
                          {!message.isUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage 
                                src="/lovable-uploads/0e0fedda-8369-4406-a3bf-6e0ee5dfe7d2.png" 
                                alt="AI Assistant"
                              />
                              <AvatarFallback className="bg-blue-500 text-white text-xs">AI</AvatarFallback>
                            </Avatar>
                          )}
                          <div 
                            className={`max-w-[80%] rounded-2xl p-3 transition-all ${
                              message.isUser 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-[#ffffff12] text-gray-100 backdrop-blur-sm'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {message.isUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-green-600 text-white text-xs">ME</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start gap-2 animate-fade-in">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src="/lovable-uploads/0e0fedda-8369-4406-a3bf-6e0ee5dfe7d2.png" 
                              alt="AI Assistant"
                            />
                            <AvatarFallback className="bg-blue-500 text-white text-xs">AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-[#ffffff12] text-gray-100 rounded-2xl p-4 max-w-[80%]">
                            <span className="flex space-x-2">
                              <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></span>
                              <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                              <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-white/10">
                    <div className="relative flex items-center w-full">
                      <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 rounded-full py-6 pl-4 pr-12 bg-[#0e1c32] text-white border-none placeholder-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-inner"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSendMessage} 
                        className="absolute right-1 rounded-full w-10 h-10 bg-blue-500 hover:bg-blue-600 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      ) : (
        <div>
          <Button 
            onClick={toggleChat} 
            className="h-14 w-14 rounded-full shadow-2xl border-0 transition-all duration-300 hover:bg-[#1a2942]"
            style={{ background: "linear-gradient(145deg, #021024 0%, #031a3f 100%)" }}
          >
            <div className="h-8 w-8 relative">
              <img 
                src="/lovable-uploads/0e0fedda-8369-4406-a3bf-6e0ee5dfe7d2.png" 
                alt="Chat Logo" 
                className="h-full w-full object-contain"
              />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
