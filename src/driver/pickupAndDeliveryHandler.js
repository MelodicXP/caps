'use strict';

const emit = require('../eventEmitter');
const eventPool = require('../eventPool');

const handlePickupAndDelivery = (payload) => {
  setTimeout(() => {
    simulatePickupProcess(payload);
    simulateDeliveryProcess(payload);
  }, 3000);
};

const simulatePickupProcess = (payload) => {
  console.log(`Driver: Picked up order ID: ${payload.orderID}`);
  setTimeout(() => {
    emit.eventAndPayload('IN_TRANSIT', payload);
  }, 2000);
};

const simulateDeliveryProcess = (payload) => {
  setTimeout(() => {
    console.log(`Driver: Delivered ${payload.orderID}`); 
    emit.eventAndPayload('DELIVERED', payload);
  }, 4000); 
};

eventPool.on('PICKUP', handlePickupAndDelivery);

module.exports = handlePickupAndDelivery;