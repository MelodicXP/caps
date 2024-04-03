'use strict';

jest.useFakeTimers(); // Use jest fake timers
jest.mock('../../src/eventPool'); // Mock event pool
console.log = jest.fn(); // Mock console.log to verify the log output

const eventPool = require('../../src/eventPool');
const handlePickupAndDelivery  = require('../../src/driver/pickupAndDeliveryHandler');

describe('Handle Pickup and Delivery Process', () => {
  beforeEach(() => {
    console.log.mockClear();
    eventPool.emit.mockClear();
  });

  it('simulates the pickup and delivery process correctly', () => {
    const payload = { orderID: 'testOrderID' };

    handlePickupAndDelivery(payload);

    // Immediately after calling handlePickupAndDelivery, no logs should have happened yet
    expect(console.log).not.toHaveBeenCalled();

    // Advance time to trigger simulatePickupProcess
    jest.advanceTimersByTime(3000);
    expect(console.log).toHaveBeenCalledWith(`Driver: Picked up order ID: ${payload.orderID}`);

    // Advance time to trigger emitEvent from simulatePickupProcess
    jest.advanceTimersByTime(2000);
    expect(console.log).toHaveBeenCalledWith('EVENT', expect.objectContaining({ event: 'in_transit', payload }));

    // Advance time to trigger simulateDeliveryProcess
    jest.advanceTimersByTime(1000); // Total 5000ms from initial call
    expect(console.log).not.toHaveBeenCalledWith(`Driver: Delivered ${payload.orderID}`);

    // Finally, trigger the delivery process logging and event emission
    jest.advanceTimersByTime(4000); // Total 9000ms from initial call
    expect(console.log).toHaveBeenCalledWith(`Driver: Delivered ${payload.orderID}`);
    expect(console.log).toHaveBeenCalledWith('EVENT', expect.objectContaining({ event: 'delivered', payload }));
    
    // Verify eventPool.emit was called for both IN_TRANSIT and DELIVERED events
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});
