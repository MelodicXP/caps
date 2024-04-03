'use strict';

const eventPool = require('../eventPool');

module.exports = (payload) => {

  setTimeout(() => {
    console.log(`Driver: Driver picked up order ID: ${payload.orderID}`);

    setTimeout(() => {   
      const currentTimestamp = new Date().toISOString();
      let event = {
        event: 'in-transit',
        time: `${currentTimestamp}`,
        payload: payload,
      };
      console.log('EVENT', event);
      eventPool.emit('IN_TRANSIT', payload);
    }, 2000);

    // Simulate the delivery process after some time
    setTimeout(() => {
      console.log(`Driver: delivered ${payload.orderID}`); 
      const currentTimestamp = new Date().toISOString();
      let event = {
        event: 'delivered',
        time: `${currentTimestamp}`,
        payload: payload,
      };
      console.log('EVENT', event);
      eventPool.emit('DELIVERED', payload); 
    }, 2000); 
  }, 3000);
};