'use strict';

const thankDriverForDelivery = (socket) => {
  socket.on('DELIVERED', (payload) => {
    setTimeout(() => {
      console.log(`Vendor: Thank you for delivering orderID ${payload.payload.orderID}`);
    }, 3000);
  });  
};

module.exports = thankDriverForDelivery;

