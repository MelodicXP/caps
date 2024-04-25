'use strict';

const { simulatePickupProcess, simulateDeliveryProcess } = require('./handler');

describe('Simulate Pickup and Delivery Processes', () => {
  let mockSocket;
  let order;

  beforeEach(() => {
    mockSocket = {
      emit: jest.fn(),
    };
    console.log = jest.fn(); // Mock console.log to test console output
    order = {
      orderID: 'order123',
    };
  });

  describe('simulatePickupProcess', () => {
    it('should log pickup message and emit IN_TRANSIT event', () => {
      simulatePickupProcess(mockSocket, order);

      // Check that console.log was called correctly
      expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up package ${order.orderID}`);
      
      // Check that socket.emit was called with the correct event and payload
      expect(mockSocket.emit).toHaveBeenCalledWith('IN_TRANSIT', order);
    });
  });

  describe('simulateDeliveryProcess', () => {
    it('should log delivery message and emit DELIVERED event', () => {
      simulateDeliveryProcess(mockSocket, order);

      // Check that console.log was called correctly
      expect(console.log).toHaveBeenCalledWith(`DRIVER: package ${order.orderID} has been delivered`);
      
      // Check that socket.emit was called with the correct event and payload
      expect(mockSocket.emit).toHaveBeenCalledWith('DELIVERED', order);
    });
  });
});
