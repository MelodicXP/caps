'use strict';

const emit = require('../eventEmitter');

const handlePickupAndDelivery = (socket) => {
  socket.on('PICKUP', (payload) => {
    setTimeout(() => {
      simulatePickupProcess(socket, payload);
      simulateDeliveryProcess(socket, payload);
    }, 3000);
  });
};

const simulatePickupProcess = (socket, payload) => {
  console.log(`Driver: Picked up order ID: ${payload.payload.orderID}`);
  setTimeout(() => {
    emit.eventAndPayload(socket,'IN_TRANSIT', payload);
  }, 2000);
};

const simulateDeliveryProcess = (socket, payload) => {
  setTimeout(() => {
    console.log(`Driver: Delivered ${payload.payload.orderID}`); 
    emit.eventAndPayload(socket, 'DELIVERED', payload);
  }, 4000); 
};

module.exports = handlePickupAndDelivery;