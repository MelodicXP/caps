'use strict';

const simulatePickupProcess = (socket, order) => {
  console.log(`DRIVER: picked up package ${order.orderID}`);
  socket.emit('IN_TRANSIT', order);
};

const simulateDeliveryProcess = (socket, order) => {
  console.log(`DRIVER: package ${order.orderID} has been delivered`);
  socket.emit('DELIVERED', order);
};

module.exports = {
  simulatePickupProcess,
  simulateDeliveryProcess,
};