'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

setInterval(() => {
  console.log('---------------new inerval begins-------------');

  const orderID = chance.guid();
  const currentTimestamp = new Date().toISOString();
  let event = {
    event: 'pickup',
    time: `${currentTimestamp}`,
    payload: {
      store: 'test store',
      orderID: `${orderID}`,
      customer: 'test customer',
      address: 'test address',
    },
  };

  console.log('EVENT', event);
  eventPool.emit('PICKUP', event.payload);
}, 11000);


module.exports = (payload) => {
  setTimeout(() => {
    console.log(`Vendor: Thank you for delivering orderID ${payload.orderID}`);
  }, 3000);
};