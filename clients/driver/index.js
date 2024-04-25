'use strict';

require('dotenv').config({ path: './.env' });

const capsNamespaceUrl = process.env.NAMESPACE_URL;
const vendorName = process.env.ROOM_NAME || 'default-vendor-name';

const { io } = require('socket.io-client');
const socket = io(capsNamespaceUrl);

const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');

socket.on('connect', () => {
  socket.emit('JOIN', vendorName, () => {
    console.log(`Joined room ${vendorName}`);
  });
});

socket.emit('GET_ORDERS', {vendorRoom: vendorName});

// As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
socket.on('PICKUP', (order) => {
  setTimeout(() => {
    handlePickupAndDelivery.simulatePickupProcess(socket, order);
  }, 2000);
  setTimeout(() => {
    handlePickupAndDelivery.simulateDeliveryProcess(socket, order);
  }, 4000);
});
