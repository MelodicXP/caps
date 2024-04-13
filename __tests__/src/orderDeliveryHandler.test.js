'use strict';

jest.useFakeTimers(); // Use Jest's fake timers
console.log = jest.fn(); // Mock console.log to verify the log output

const thankDriverForDelivery = require('../../clients/vendor/orderDeliveryHandler');

describe('Handle Delivery Acknowledgement', () => {
  let mockSocket;

  beforeEach(() => {
    // Setup a mock socket with an 'on' method
    mockSocket = {
      on: jest.fn((event, callback) => {
        if (event === 'DELIVERED') {
          // Simulate the socket event triggering
          const payload = { payload: { orderID: 'testOrderID' } };
          callback(payload);
        }
      }),
    };
  });

  it('logs delivery payload after 3 seconds', () => {
    // Initialize the handler with the mocked socket
    thankDriverForDelivery(mockSocket);

    // Check that the socket on method was called correctly
    expect(mockSocket.on).toHaveBeenCalledWith('DELIVERED', expect.any(Function));

    // Assert that console.log has not been called immediately
    expect(console.log).not.toHaveBeenCalled();

    // Fast-forward time by 3 seconds to simulate setTimeout
    jest.advanceTimersByTime(3000);

    // Assertions to check if the console.log was called correctly
    expect(console.log).toHaveBeenCalledWith(`Vendor: Thank you for delivering orderID testOrderID`);
  });
});
