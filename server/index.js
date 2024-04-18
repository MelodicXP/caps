'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const server = new Server();

const PORT = process.env.PORT || 3002;
server.listen(PORT);

const caps = server.of('/caps');

// create / allow for connections
caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);

  // Handle joining rooms
  socket.on('JOIN', (vendorRoom) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room---', vendorRoom);
    socket.join(vendorRoom);
    console.log(`Socket ${socket.id} joined room: ${vendorRoom}`);
  });
  
  //Logs any event that comes in
  socket.onAny((event, order) => {
    const time = new Date();
    console.log('EVENT:', {
      event,
      time,
      order,
    });
  });

  // Handle PICKUP event (global broadcast within namespace, except the sender)
  socket.on('PICKUP', (order) => {
    socket.broadcast.emit('PICKUP', order);
  });

  // Handle IN_TRANSIT event (emit only to specific room, typically vendor's room)
  socket.on('IN_TRANSIT', (order) => {
    if(order.vendorRoom) {
      socket.to(order.vendorRoom).emit('IN_TRANSIT', order);
    }
  });

  // Handle DELIVERED event (similar to IN_TRANSIT, targeted to specific room)
  socket.on('DELIVERED', (order) => {
    if (order.vendorRoom) {
      socket.to(order.vendorRoom).emit('DELIVERED', order);
    }
  });
});