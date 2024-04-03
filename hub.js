'use strict';

// let eventPool = require('./eventPool');

const eventPool = require('./eventPool');



// event handlers
const driverHandler = require('./driver/index');
const vendorHandler = require('./vendor/index');

// listen to all events
eventPool.on('PICKUP', driverHandler);
eventPool.on('DELIVERED', vendorHandler);
