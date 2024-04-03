'use strict';

const eventPool = require('../eventPool');

const handler = require('./handler');

eventPool.on('PICKUP', (payload) => {
  handler(payload);
});