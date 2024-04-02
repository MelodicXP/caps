'use strict';

// let eventPool = require('./eventPool');
let Chance = require('chance');

var chance = new Chance();

// // event handlers
// const driverHandler = require('./src/driver');
// const vendorHandler = require('./src/vendor');

// // listen to all events
// eventPool.on('PICKUP', driverHandler);
// eventPool.on('DELIVERED', vendorHandler);

setInterval(() => {

  console.log('---------------new inerval begins-------------');
  let randomID = chance.guid();
  console.log('Random userID: ', randomID);

}, 5000);