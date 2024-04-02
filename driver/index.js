'use strict';

// const eventPool = require ('../eventPool');

module.exports = (payload) => {
  setTimeout(() => {
    console.log('Driver is picking up ', payload);
  }, 1000);

};