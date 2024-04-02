'use strict';

// let eventPool = require('./eventPool');
let Chance = require('chance');
const eventPool = require('./eventPool');

var chance = new Chance();

// // event handlers
// const driverHandler = require('./src/driver');
// const vendorHandler = require('./src/vendor');

// // listen to all events
// eventPool.on('PICKUP', driverHandler);
// eventPool.on('DELIVERED', vendorHandler);

setInterval(() => {

  console.log('---------------new inerval begins-------------');
  const productID = chance.guid();
  console.log('Product ID: ', productID);
  eventPool.emit('PICKUP', { productID });

}, 5000);