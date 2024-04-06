'use strict';
const Chance = require('chance');
const chance = new Chance();

class OrderCreator {
  constructor(storeName) {
    this.storeName = storeName;
  }

  createOrder() {
    return {
      store: this.storeName,
      orderID: chance.guid(),
      customer: chance.name({ nationality: 'en' }),
      address: `${chance.city()}, ${chance.state()}`,
    };
  }
}

module.exports = OrderCreator;