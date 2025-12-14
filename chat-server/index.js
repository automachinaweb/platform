// filepath: c:\Users\2004s\OneDrive\Desktop\internship\updated_1\platform\chat-server\index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // When a user joins a specific chat room
  socket.on('join_room', (data) => {
    socket.join(data.room);
    console.log(`User ${socket.id} joined room: ${data.room}`);
  });

  // When a message is sent
  socket.on('send_message', (data) => {
    // Emit the message to everyone else in the same room
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.get('/', (req, res) => {
    res.send('Chat Server is running!');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Chat Server is running on port ${PORT}`);
});