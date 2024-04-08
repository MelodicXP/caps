'use strict';

const eventPool = require('./eventPool');

eventPool.on('LOG', (event) => {
  console.log('EVENT LOG: ', JSON.stringify(event, null, 2));
});

module.exports = {};