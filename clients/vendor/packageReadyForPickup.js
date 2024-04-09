const emit = require('../eventEmitter');
const OrderCreator = require('./OrderCreator');

// Exported function
function triggerOrderReadyForPickup(storeName) {
  setInterval(() => {
    console.log('---------------Emitting Order Ready For Pickup-------------');
    const order = createOrder(storeName);
    emitOrderReadyForPickup(order);
  }, 11000);
}

function createOrder (storeName)  {
  const orderCreator = new OrderCreator(storeName);
  const order = orderCreator.createOrder();
  return order;
}

function emitOrderReadyForPickup(order) {
  emit.eventAndPayload('PICKUP', order);
}

module.exports = triggerOrderReadyForPickup;