// filepath: c:\Users\2004s\OneDrive\Desktop\internship\updated_1\platform\user\frontend\src\pages\Chat.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the message structure
interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}

// Connect to the chat server (USER BACKEND runs the socket on 3000)
const CHAT_SERVER_URL = "http://localhost:3000";
const socket: Socket = io(CHAT_SERVER_URL);

interface ChatProps {
  bookingId?: string; // Optional: Pass via props or use strict ID
}

const Chat = () => {
  const { id } = useParams(); // Get Booking ID from URL
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);

  // Use dynamic bookingId, or fallback to '1' if accessed directly
  const bookingId = id || "1";

  // TODO: Get real Bartender ID from Auth Context
  const bartenderId = 1;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        bookingId: bookingId,
        content: currentMessage,
        senderId: bartenderId,
        senderType: "BARTENDER",
        author: "Me",
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      // Emit to Backend
      await socket.emit("send_message", messageData);

      // Optimistic UI Update
      const uiMsg: MessageData = {
        room: `booking_${bookingId}`,
        author: "Me",
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessageList((list) => [...list, uiMsg]);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // 1. Load History
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/bartender/bookings/${bookingId}/messages`,
        );
        const data = await res.json();
        const history = data.map((msg: any) => ({
          room: `booking_${bookingId}`,
          author: msg.senderType === "BARTENDER" ? "Me" : "User",
          message: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString(),
        }));
        setMessageList(history);
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    };
    fetchHistory();

    // 2. Join Room
    socket.emit("join_chat", { bookingId: bookingId });

    // 3. Listen for new messages
    const messageListener = (data: any) => {
      console.log("Bartender received:", data);

      // Ignore own messages
      if (data.senderType === "BARTENDER") return;

      const uiMsg: MessageData = {
        room: `booking_${data.bookingId}`,
        author: "User",
        message: data.content,
        time: new Date(data.createdAt || Date.now()).toLocaleTimeString(),
      };
      setMessageList((list) => [...list, uiMsg]);
    };

    socket.on("receive_message", messageListener);

    return () => {
      socket.off("receive_message", messageListener);
    };
  }, [bookingId]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Chat with User</CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.author === "Me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg ${msg.author === "Me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-right mt-1">
                  {msg.author} @ {msg.time}
                </p>
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
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="mr-2"
          />
          <Button onClick={sendMessage}>Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;
