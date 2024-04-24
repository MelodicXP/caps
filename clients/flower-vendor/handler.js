'uses strict';

const OrderCreator = require('../lib/OrderCreator');

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

const thankDriverForDelivering = (socket, order) => {
  if (!order || !order.orderID) {
    console.error('Invalid or missing order data');
    return;
  }
  console.log(`Thank you for delivering package ${order.orderID}`);
  socket.emit('DELIVERY_THANKYOU', order);
};

module.exports = { 
  generateOrderForPickup,
  thankDriverForDelivering,
};