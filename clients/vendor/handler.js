'uses strict';

const OrderCreator = require('./OrderCreator');

const generateOrderForPickup = (socket, vendorName) => {
  console.log('---------------Emitting Order Ready For Pickup-------------');
  const order = createOrder(vendorName);
  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP', order);
};

function createOrder (vendorName) {
  const orderCreator = new OrderCreator(vendorName);
  const order = orderCreator.createOrder();
  return order;
}

const thankDriverForDelivering = (order) => {
  console.log(`Thank you for delivering package ${order.orderID}`);
};

module.exports = { 
  generateOrderForPickup,
  thankDriverForDelivering,
};