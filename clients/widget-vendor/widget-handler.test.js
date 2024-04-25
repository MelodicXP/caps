'use strict';

const OrderCreator = require('../lib/OrderCreator');
jest.mock('../lib/OrderCreator');

const { generateOrderForPickup, thankDriverForDelivering } = require('./handler'); 

describe('Order Handling Functions', () => {
  let mockSocket;

  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks();

    // Setup OrderCreator mock
    OrderCreator.mockImplementation((vendorName) => ({
      createOrder: () => ({
        orderID: `ID_${vendorName}`,
        store: vendorName,
        customer: `Customer_${vendorName}`,
        address: `123 ${vendorName} St`,
        vendorRoom: vendorName.replace(/\s+/g, '-').toLowerCase(),
      }),
    }));

    // Mocking the socket object
    mockSocket = {
      emit: jest.fn(),
    };

    // Mocking console functions
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('generateOrderForPickup', () => {
    it('should emit an order ready for pickup', () => {
      const vendorName = 'TestVendor';
      generateOrderForPickup(mockSocket, vendorName);

      // Verifying console log messages
      expect(console.log).toHaveBeenCalledWith('---------------Emitting Order Ready For Pickup-------------');
      expect(console.log).toHaveBeenCalledWith('VENDOR: order ready for pickup.');

      // Verifying socket.emit calls
      expect(mockSocket.emit).toHaveBeenCalledWith('PICKUP', {
        orderID: `ID_${vendorName}`,
        store: vendorName,
        customer: `Customer_${vendorName}`,
        address: `123 ${vendorName} St`,
        vendorRoom: 'testvendor',
      });
    });
  });

  describe('thankDriverForDelivering', () => {
    it('should thank the driver for a valid delivery', () => {
      const order = { orderID: '12345' };
      thankDriverForDelivering(mockSocket, order);

      // Verifying console log messages
      expect(console.log).toHaveBeenCalledWith(`Thank you for delivering package ${order.orderID}`);

      // Verifying socket.emit calls
      expect(mockSocket.emit).toHaveBeenCalledWith('DELIVERY_THANKYOU', order);
    });

    it('should handle invalid or missing order data', () => {
      const invalidOrder = {}; // Missing orderID
      thankDriverForDelivering(mockSocket, invalidOrder);

      // Checking for console error on invalid order
      expect(console.error).toHaveBeenCalledWith('Invalid or missing order data');

      // Ensuring no thank you is emitted
      expect(mockSocket.emit).not.toHaveBeenCalledWith('DELIVERY_THANKYOU', invalidOrder);
    });
  });
});
