'use strict';

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
    emitEvent('IN_TRANSIT', payload);
  }, 2000);
};

const simulateDeliveryProcess = (payload) => {
  setTimeout(() => {
    console.log(`Driver: Delivered ${payload.orderID}`); 
    emitEvent('DELIVERED', payload);
  }, 4000); 
};

const emitEvent = (eventName, payload) => {
  const currentTimestamp = new Date().toISOString();
  const event = {
    event: eventName.toLowerCase(),
    time: currentTimestamp,
    payload,
  };
  
  // Emit event for business logic
  eventPool.emit(eventName.toUpperCase(), payload);
  // Emit generic log event for logging
  eventPool.emit('LOG', event);

};

eventPool.on('PICKUP', handlePickupAndDelivery);

module.exports = handlePickupAndDelivery;