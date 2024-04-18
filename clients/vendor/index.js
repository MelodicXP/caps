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

socket.on('DELIVERED', (order) => {
  thankDriverForDelivering(order);
});

setInterval(() => {
  generateOrderForPickup(socket, vendorName);
}, 11000);


