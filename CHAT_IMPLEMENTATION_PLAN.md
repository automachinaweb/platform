---
description: Implementation Plan for Real-time Chat across Separate Backends
---

# Chat Implementation Plan (User ↔ Bartender)

Since we have two separate backends (`user/backend` and `bartender/backend`) sharing a database `platform_db`, we will implement a **Centralized Socket Architecture**.

## Architecture Overview

- **Database:** A shared `Messages` table in `platform_db`. Both backends can read history.
- **Real-time Server:** We will designate **User Backend (Port 3000)** to host the Socket.io server.
  - _Reason:_ Simplifies connection; avoids needing a 3rd server.
- **Clients:**
  - **User Frontend** connects to `http://localhost:3000` (Socket).
  - **Bartender Frontend** ALSO connects to `http://localhost:3000` (Socket).
- **Authentication:** Both frontends send their JWT. The Socket server on User Backend must be able to verify _both_ User and Bartender tokens. **Prerequisite:** Both `.env` files must use the same `JWT_SECRET`.

---

## Step 1: Database Schema (Shared)

Create a new `Message` model. This must be added to **BOTH** `user/backend/models` and `bartender/backend/models` to keep them in sync.

**File:** `models/message.model.js`

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Message = sequelize.define(
  "Message",
  {
    content: { type: DataTypes.TEXT, allowNull: false },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    senderType: { type: DataTypes.ENUM("USER", "BARTENDER"), allowNull: false },
    bookingId: { type: DataTypes.INTEGER, allowNull: true }, // Context
    // We don't strictly need receiverId if we group by booking, but helpful for direct
  },
  { timestamps: true },
);

module.exports = Message;
```

---

## Step 2: Backend Implementation (User Backend handles Sockets)

### 2.1 Install Dependencies

Run in `user/backend`: `npm install socket.io`

### 2.2 Configure Socket.io in `user/backend/index.js`

Modify the server startup to wrap Express with `http` server and attach `socket.io`.

```javascript
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both Frontends
    methods: ["GET", "POST"],
  },
});

// Store io in app for controller access (optional)
app.set("io", io);

// Socket Logic
io.on("connection", (socket) => {
  // 1. Join Room (Booking ID)
  socket.on("join_chat", (data) => {
    // data = { bookingId: 1 }
    socket.join(`booking_${data.bookingId}`);
    console.log(`User joined booking_${data.bookingId}`);
  });

  // 2. Send Message
  socket.on("send_message", async (data) => {
    // data = { bookingId, senderId, senderType, content }

    // Save to DB (Use the Message Model)
    try {
      const Message = require("./models/message.model");
      const savedMsg = await Message.create(data);

      // Broadcast to Room
      io.to(`booking_${data.bookingId}`).emit("receive_message", savedMsg);
    } catch (e) {
      console.error(e);
    }
  });
});

// REPLACE app.listen with server.listen
server.listen(PORT, () => console.log("Server running on port " + PORT));
```

---

## Step 3: API Endpoints for Chat History

Both backends need a route to fetch previous messages for a specific booking.

**Route:** `GET /messages/:bookingId`
**Logic:** `Message.findAll({ where: { bookingId: req.params.bookingId }, order: [['createdAt', 'ASC']] })`

- Add this to `user/backend/routes/booking.routes.js`
- Add this to `bartender/backend/routes/booking.routes.js`

---

## Step 4: Frontend Implementation (React)

### 4.1 Dependency

Run `npm install socket.io-client` in both frontend folders.

### 4.2 Chat Component Logic

```javascript
import io from "socket.io-client";

// Connect to USER BACKEND (Single Source of Truth for Sockets)
const socket = io("http://localhost:3000");

useEffect(() => {
  socket.emit("join_chat", { bookingId: activeBooking.id });

  socket.on("receive_message", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  return () => socket.disconnect();
}, [activeBooking.id]);

const sendMessage = () => {
  const msgData = {
    bookingId: activeBooking.id,
    content: currentMessage,
    senderId: user.id || bartender.id,
    senderType: isBartender ? "BARTENDER" : "USER",
  };
  socket.emit("send_message", msgData);
};
```

---

## Summary of Tasks

1.  [ ] Create `Message` model in `user/backend`.
2.  [ ] Create `Message` model in `bartender/backend`.
3.  [ ] Install `socket.io` in `user/backend`.
4.  [ ] Update `user/backend/index.js` to initialize Socket.io.
5.  [ ] Create `GET /messages` route in both backends.
6.  [ ] Build Chat UI in both Frontends.
