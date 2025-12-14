// filepath: c:\Users\2004s\OneDrive\Desktop\internship\updated_1\platform\user\frontend\src\pages\Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define the message structure
interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}

// Connect to the chat server
const CHAT_SERVER_URL = import.meta.env.VITE_CHAT_URL || 'http://localhost:4000';
const socket: Socket = io(CHAT_SERVER_URL);

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  
  // Example: room ID could be based on user and bartender IDs
  const chatRoom = "user1_bartender1"; 
  const authorName = "User"; // This would be dynamic in a real app

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData: MessageData = {
        room: chatRoom,
        author: authorName,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]); // Show your own message
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    // Join the chat room once the component mounts
    socket.emit('join_room', { room: chatRoom });

    // Listen for incoming messages
    const messageListener = (data: MessageData) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on('receive_message', messageListener);

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message', messageListener);
    };
  }, []);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Chat with Bartender</CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
          {messageList.map((msg, index) => (
            <div key={index} className={`flex ${msg.author === authorName ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg ${msg.author === authorName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-right mt-1">{msg.author} @ {msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter>
          <Input
            type="text"
            value={currentMessage}
            placeholder="Type a message..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="mr-2"
          />
          <Button onClick={sendMessage}>Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;