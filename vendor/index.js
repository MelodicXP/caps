'use strict';

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`Product ${payload.productID} has been delivered.`);
  }, 3000);
};