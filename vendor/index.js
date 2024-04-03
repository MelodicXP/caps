'use strict';

const eventPool = require('../eventPool');

const handler = require('./handler');

eventPool.on('DELIVERED', (payload) => {
  handler(payload);
});