'use strict';

const eventPool = require('../eventPool'); 

// Your handler function
const thankDriverForDelivery = (payload) => {
  setTimeout(() => {
    console.log(`Vendor: Thank you for delivering orderID ${payload.orderID}`);
  }, 3000);
};

eventPool.on('DELIVERED', thankDriverForDelivery);

