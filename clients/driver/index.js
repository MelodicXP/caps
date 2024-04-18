'use strict';

require('dotenv').config();
const capsNamespaceUrl = process.env.NAMESPACE_URL;
const vendorName = process.env.ROOM_NAME || 'default-vendor-name';

const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');

const { io } = require('socket.io-client');
const socket = io(capsNamespaceUrl);

socket.on('connect', () => {
  socket.emit('JOIN', vendorName, () => {
    console.log(`Joined room ${vendorName}`);
  });
});

socket.on('PICKUP', (order) => {
  setTimeout(() => {
    handlePickupAndDelivery.simulatePickupProcess(socket, order);
  }, 2000);
  setTimeout(() => {
    handlePickupAndDelivery.simulateDeliveryProcess(socket, order);
  }, 4000);
});
