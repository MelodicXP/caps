'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server();
server.listen(PORT);

// default server space
server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!', socket.id);
  
  socket.on('MESSAGE', (payload) => {
    console.log('SERVER: Message event', payload);
    socket.broadcast.emit('MESSAGE', payload);
  });
  
  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event', payload);
    socket.broadcast.emit('RECEIVED', payload);
  });
});

// Define 'caps' name space
// Listening for events at http://localhost:3001/caps
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);

  // Handle joining rooms
  socket.on('JOIN', (room) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room---', room);
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  // Handle PICKUP event (global broadcast within namespace, except the sender)
  socket.on('PICKUP', (payload) => {
    console.log('PICKUP EVENT: ', payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  // Handle IN_TRANSIT event (emit only to specific room, typically vendor's room)
  socket.on('IN_TRANSIT', (payload) => {
    console.log('IN_TRANSIT EVENT: ', payload);
    if(payload.vendorRoom) {
      socket.to(payload.vendorRoom).emit('IN_TRANSIT', payload);
    }
  });

  // Handle DELIVERED event (similar to IN_TRANSIT, targeted to specific room)
  socket.on('DELIVERED', (payload) => {
    console.log('DELIVERED EVENT: ', payload);
    if (payload.payload.vendorRoom) {
      socket.to(payload.payload.vendorRoom).emit('DELIVERED', payload);
    }
  });
});