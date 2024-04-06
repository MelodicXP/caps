'use strict';

jest.useFakeTimers(); // Use Jest's fake timers to control setTimeout behavior
jest.mock('../../src/eventPool'); // Mock the event pool
console.log = jest.fn(); // Mock console.log to verify the log output

const eventPool = require('../../src/eventPool');
const handlePickupAndDelivery = require('../../src/driver/pickupAndDeliveryHandler');

describe('Handle Pickup and Delivery Process', () => {
  beforeEach(() => {
    // Clear mocks before each test
    console.log.mockClear();
    eventPool.emit.mockClear();
  });

  it('simulates the pickup and delivery process correctly, including log events', () => {
    const payload = { orderID: 'testOrderID' };

    handlePickupAndDelivery(payload);

    // Immediately after calling handlePickupAndDelivery, no actions should have been taken yet
    expect(console.log).not.toHaveBeenCalled();
    expect(eventPool.emit).not.toHaveBeenCalled();

    // Advance time to simulate pickup process
    jest.advanceTimersByTime(3000);
    expect(console.log).toHaveBeenCalledWith(`Driver: Picked up order ID: ${payload.orderID}`);

    jest.advanceTimersByTime(2000);
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
    expect(eventPool.emit).toHaveBeenCalledWith('LOG', expect.any(Object)); // Check for LOG event emission

    // Advance time to simulate delivery process
    jest.advanceTimersByTime(6000); // Additional time to cover both transit and delivery
    expect(console.log).toHaveBeenCalledWith(`Driver: Delivered ${payload.orderID}`);
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
    expect(eventPool.emit).toHaveBeenCalledWith('LOG', expect.any(Object)); // Check for LOG event emission again

    // Total checks for eventPool.emit calls (twice for each state change plus two LOG events)
    expect(eventPool.emit).toHaveBeenCalledTimes(4);
  });
});
