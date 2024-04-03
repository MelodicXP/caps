'use strict';

jest.useFakeTimers(); // Use Jest's fake timers
console.log = jest.fn(); // Mock console.log to verify the log output

const thankDriverForDelivery  = require('../../src/vendor/deliveryAcknowledgementHandler'); 

describe('Handle Delivery Acknowledgement', () => {
  it('logs delivery payload after 3 seconds', () => {
    const payload = { orderID: 'testOrderID' };

    // Call the function directly with the test payload
    thankDriverForDelivery(payload);

    // Assert that console.log has not been called yet
    expect(console.log).not.toHaveBeenCalled();

    // Fast-forward time by 3 seconds
    jest.advanceTimersByTime(3000);

    // Assertions
    expect(console.log).toHaveBeenCalledWith(`Vendor: Thank you for delivering orderID ${payload.orderID}`);
  });
});