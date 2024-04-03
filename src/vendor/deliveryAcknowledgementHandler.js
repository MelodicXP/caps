'use strict';

const eventPool = require('../eventPool'); 

const thankDriverForDelivery = (payload) => {
  setTimeout(() => {
    console.log(`Vendor: Thank you for delivering orderID ${payload.orderID}`);
  }, 3000);
};

// Listen for DELIVERED event
eventPool.on('DELIVERED', thankDriverForDelivery); 


module.exports = thankDriverForDelivery;

