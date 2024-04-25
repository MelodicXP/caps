'use strict';

// Importing Chance and mocking it
jest.mock('chance', () => {
  const mChance = {
    guid: jest.fn().mockReturnValue('uniqueGUID123'),
    name: jest.fn().mockReturnValue('John Doe'),
    city: jest.fn().mockReturnValue('SomeCity'),
    state: jest.fn().mockReturnValue('SomeState'),
  };
  return jest.fn(() => mChance);
});

const OrderCreator = require('./OrderCreator');

describe('OrderCreator', () => {
  let orderCreator;
  const storeName = 'Test Store';

  beforeEach(() => {
    orderCreator = new OrderCreator(storeName);
  });

  describe('createOrder', () => {
    it('should create an order with expected properties', () => {
      const order = orderCreator.createOrder();

      expect(order.store).toBe(storeName);
      expect(order.orderID).toBe('uniqueGUID123'); // Mocked value
      expect(order.customer).toBe('John Doe'); // Mocked value
      expect(order.address).toBe('SomeCity, SomeState'); // Mocked result of city and state
      expect(order.vendorRoom).toBe('test-store'); // Hyphenated lowercase store name
    });
  });
});
