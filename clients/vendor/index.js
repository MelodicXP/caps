'use strict';

require('dotenv').config();

const { io } = require('socket.io-client');
const { generateOrderForPickup, thankDriverForDelivering } = require('../vendor/handler');

const capsNamespaceUrl = process.env.NAMESPACE_URL;
const vendorName = process.env.ROOM_NAME || 'default-vendor-name';
const socket = io(capsNamespaceUrl);

socket.on('connect', () => {
  socket.emit('JOIN', vendorName, () => {
    console.log(`Joined room ${vendorName}`);
  });
});

socket.emit('GET_DELIVERY_CONFIRMATIONS', {vendorRoom: vendorName});

// As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
socket.on('DELIVERED', (socket, order) => {
  thankDriverForDelivering(socket, order);
});

setInterval(() => {
  generateOrderForPickup(socket, vendorName);
}, 11000);


