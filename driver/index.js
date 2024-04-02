'use strict';

const eventPool = require('../eventPool');

module.exports = (payload) => {

  setTimeout(() => {
    console.log(`Driver picked up ${payload.productID}`); 
    eventPool.emit('IN_TRANSIT', payload.productID);

    // Simulate the delivery process after some time
    setTimeout(() => {
      console.log(`Package ${payload.productID} delivered`); 
      eventPool.emit('DELIVERED', payload); 
    }, 2000); 
  }, 3000);
  
};