'use strict';

require('dotenv').config({ path: './.env' });

const capsNamespaceUrl = process.env.NAMESPACE_URL;
const { io } = require('socket.io-client');
const socket = io(capsNamespaceUrl);
const handlePickupAndDelivery = require('../driver/handler');

let joinedRooms = new Set(); // Track rooms driver has joined

// Connect to name space and get vendor rooms
socket.on('connect', () => {
  console.log('Connected to CAPS namespace');
  socket.emit('GET_VENDOR_ROOMS');
});

// Join existing rooms if any and request orders
socket.on('AVAILABLE_ROOMS', (vendorRooms) => {
  console.log('Joining rooms (if any) and requesting orders from the following vendors: ', vendorRooms);
  vendorRooms.forEach(room => {
    if (!joinedRooms.has(room)) {
      joinRoomAndRequestOrders(room);
      joinedRooms.add(room);
    }
  });
});

// Join newly created rooms and request orders(in event driver joins namespace before vendors)
socket.on('NEW_VENDOR_ROOM', (vendorRoom) => {
  if (!joinedRooms.has(vendorRoom)) {
    joinRoomAndRequestOrders(vendorRoom);
    joinedRooms.add(vendorRoom);
  }
});

socket.on('PICKUP', (order) => {
  processOrder(order);
});

//*------ Helper Functions ------*/

// Join room and request orders from queue if any
function joinRoomAndRequestOrders(room) {
  socket.emit('JOIN', room);
  console.log(`Joined room ${room}`);
  socket.emit('GET_ORDERS', {vendorRoom: room});
}

// Process order
function processOrder(order) {
  setTimeout(() => {
    handlePickupAndDelivery.simulatePickupProcess(socket, order);
  }, 2000);
  setTimeout(() => {
    handlePickupAndDelivery.simulateDeliveryProcess(socket, order);
  }, 4000);
}

