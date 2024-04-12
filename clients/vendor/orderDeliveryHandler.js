const emit = require('../eventEmitter');
const OrderCreator = require('./OrderCreator');

// Exported function
function triggerOrderReadyForPickup(socket, storeName) {
  setInterval(() => {
    console.log('---------------Emitting Order Ready For Pickup-------------');
    const order = createOrder(storeName);
    emitOrderReadyForPickup(socket, order);
  }, 11000);
}

function createOrder (storeName)  {
  const orderCreator = new OrderCreator(storeName);
  const order = orderCreator.createOrder();
  return order;
}

function emitOrderReadyForPickup(socket, order) {
  emit.eventAndPayload(socket, 'PICKUP', order);
}

module.exports = triggerOrderReadyForPickup;