'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server();
server.listen(PORT);

// server space
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

// caps namespace
// listening for events at http://localhost:3001/caps
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);

  // how to join room
  socket.on('JOIN', (room) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room---', room);
    socket.join(room);
    console.log(`You've joined the ${room} room`);
    // console.log('these are the all the rooms', socket.adapter.rooms);
  });

  socket.on('PICKUP', (payload) => {
    console.log('EVENT: ', payload);
  });
});