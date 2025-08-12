import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Video, MoreVertical, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import bartendersData from "@/data/bartenders.json";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "booking-request";
}

const Chat = () => {
  const { bartenderId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const bookingData = location.state?.bookingData;
  const autoMessage = location.state?.autoMessage;
  
  const bartender = bartendersData.find(b => b.id === bartenderId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // Load chat history from localStorage
  useEffect(() => {
    const chatKey = `chat_${bartenderId}`;
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsed);
    } else {
      // Initial greeting from bartender
      const initialMessage: Message = {
        id: "1",
        senderId: bartenderId!,
        senderName: bartender?.name || "Bartender",
        content: `Hi! I'm ${bartender?.name}. I'm excited to learn about your event and see how I can make it special. What can I help you with?`,
        timestamp: new Date(),
        type: "text"
      };
      setMessages([initialMessage]);
    }

    // Add auto message if provided
    if (autoMessage) {
      setTimeout(() => {
        sendMessage(autoMessage);
      }, 1000);
    }
  }, [bartenderId, bartender?.name, autoMessage]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const chatKey = `chat_${bartenderId}`;
      localStorage.setItem(chatKey, JSON.stringify(messages));
    }
  }, [messages, bartenderId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate online status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.2); // 80% online chance
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = (content: string = newMessage) => {
    if (!content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "You",
      content: content.trim(),
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate bartender response
    setTimeout(() => {
      const responses = [
        "That sounds great! I'd love to help with your event.",
        "I have experience with that type of event. Let me know the details!",
        "Perfect! I'm available for those dates. When would you like to finalize the booking?",
        "I can definitely accommodate those requirements. Let's discuss the details!",
        "Sounds like an exciting event! I'm looking forward to making it memorable."
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: bartenderId!,
        senderName: bartender?.name || "Bartender",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, response]);
    }, 2000 + Math.random() * 3000);
  };

  const handleBookingRequest = () => {
    const bookingMessage: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "You",
      content: "I'd like to officially request your services for my event. Please let me know if you're available!",
      timestamp: new Date(),
      type: "booking-request"
    };

    setMessages(prev => [...prev, bookingMessage]);

    // Show pending request alert
    toast({
      title: "Booking Request Sent",
      description: "Your booking request has been sent to the bartender. They will respond shortly.",
      duration: 5000,
    });

    // Simulate bartender acceptance
    setTimeout(() => {
      const acceptanceMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: bartenderId!,
        senderName: bartender?.name || "Bartender",
        content: "Great! I'd be happy to bartend your event. I've accepted your request. You can now proceed to finalize the booking details and payment.",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, acceptanceMessage]);

      // Add to cart (simulate)
      toast({
        title: "Request Accepted!",
        description: "The bartender has accepted your request. Check your cart to proceed with payment.",
        duration: 5000,
      });
    }, 5000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!bartender) {
    return <div>Bartender not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onShowRegister={function (): void {
        throw new Error("Function not implemented.");
      } } onShowLogin={function (): void {
        throw new Error("Function not implemented.");
      } } />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Chat Header */}
          <Card className="shadow-card mb-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={bartender.avatar}
                      alt={bartender.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{bartender.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {isOnline ? "Online" : "Last seen recently"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Messages */}
          <Card className="flex-1 shadow-card overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.type === "booking-request" && (
                        <Badge className="mb-2 bg-accent text-accent-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          Booking Request
                        </Badge>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center space-x-2 mb-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBookingRequest}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Booking
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={() => sendMessage()} size="icon" variant="hero">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;