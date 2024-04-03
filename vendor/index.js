'use strict';

const eventPool = require('../eventPool');

let Chance = require('chance');
var chance = new Chance();

setInterval(() => {

  console.log('---------------new inerval begins-------------');
  const productID = chance.guid();
  console.log('Product ID: ', productID);
  eventPool.emit('PICKUP', { productID });

}, 10000);


module.exports = (payload) => {
  setTimeout(() => {
    console.log(`Product ${payload.productID} has been delivered.`);
  }, 3000);
};