'use strict';

const emit = require('../eventEmitter');

const handlePickupAndDelivery = (socket) => {
  socket.on('PICKUP', (payload) => {
    setTimeout(() => {
      simulatePickupProcess(payload);
      simulateDeliveryProcess(payload);
    }, 3000);
  });
};

const simulatePickupProcess = (payload) => {
  console.log(`Driver: Picked up order ID: ${payload.payload.orderID}`);
  setTimeout(() => {
    emit.eventAndPayload('IN_TRANSIT', payload);
  }, 2000);
};

const simulateDeliveryProcess = (payload) => {
  setTimeout(() => {
    console.log(`Driver: Delivered ${payload.payload.orderID}`); 
    emit.eventAndPayload('DELIVERED', payload);
  }, 4000); 
};

module.exports = handlePickupAndDelivery;