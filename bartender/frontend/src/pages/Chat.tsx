import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, Video, MoreVertical, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  sender: "me" | "client";
  content: string;
  time: string;
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chat data
  const chats: Chat[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the quote! When are you available next weekend?",
      time: "2m ago",
      unread: 2,
      avatar: "SJ",
      online: true
    },
    {
      id: "2", 
      name: "Michael Chen",
      lastMessage: "Perfect! I'll send you the event details.",
      time: "1h ago",
      unread: 0,
      avatar: "MC",
      online: false
    },
    {
      id: "3",
      name: "Emma Davis",
      lastMessage: "Looking for a bartender for our wedding reception",
      time: "3h ago",
      unread: 1,
      avatar: "ED",
      online: true
    }
  ];

  // Mock messages for selected chat
  const messages: Message[] = [
    {
      id: "1",
      sender: "client",
      content: "Hi! I'm planning a corporate event for 50 people next Friday. Are you available?",
      time: "10:30 AM"
    },
    {
      id: "2",
      sender: "me",
      content: "Hello! Yes, I'm available next Friday. That sounds like a great event. What type of drinks are you thinking?",
      time: "10:32 AM"
    },
    {
      id: "3",
      sender: "client",
      content: "We'd like a mix of cocktails and wine service. The event is from 6-10 PM. What would your rate be?",
      time: "10:35 AM"
    },
    {
      id: "4",
      sender: "me",
      content: "For a 4-hour corporate event with cocktail and wine service, my rate would be $75/hour plus ingredients. I can provide a full bar setup and professional service.",
      time: "10:40 AM"
    },
    {
      id: "5",
      sender: "client",
      content: "Thanks for the quote! When are you available next weekend?",
      time: "2m ago"
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r bg-card flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Messages</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "p-4 cursor-pointer hover:bg-muted/50 border-b transition-colors",
                  selectedChat === chat.id && "bg-muted"
                )}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{chat.avatar}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <Badge variant="default" className="rounded-full min-w-[20px] h-5 text-xs">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="border-b bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{selectedChatData.avatar}</AvatarFallback>
                    </Avatar>
                    {selectedChatData.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedChatData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedChatData.online ? "Online" : "Last seen 2h ago"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] px-4 py-2 rounded-lg",
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-chat-bubble text-chat-bubble-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t bg-card p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No chat selected</h3>
              <p className="text-muted-foreground">Select a conversation to start chatting with clients</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;