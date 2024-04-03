'use strict';

const eventPool = require('../eventPool');

let Chance = require('chance');
let chance = new Chance();


setInterval(() => {

  console.log('---------------new inerval begins-------------');

  const orderID = chance.guid();
  const currentTimestamp = new Date().toISOString();
  let event = {
    EVENT: {
      event: 'pickup',
      time: `${currentTimestamp}`,
      payload: {
        store: 'test store',
        orderID: `${orderID}`,
        customer: 'test customer',
        address: 'test address',
      },
    },
  };

  console.log(event);
  eventPool.emit('PICKUP', event.EVENT.payload);
}, 10000);


module.exports = (payload) => {
  setTimeout(() => {
    console.log(`Product ${payload.productID} has been delivered.`);
  }, 3000);
};