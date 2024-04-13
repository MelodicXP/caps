'use strict';

jest.useFakeTimers();
jest.mock('../../clients/eventEmitter');
const emit = require('../../clients/eventEmitter');
const handlePickupAndDelivery = require('../../clients/driver/pickupAndDeliveryHandler');

describe('Handle Pickup and Delivery Process', () => {
  let mockSocket;
  beforeEach(() => {
    mockSocket = {
      on: jest.fn((event, callback) => {
        if (event === 'PICKUP') {
          callback(mockPayload);
        }
      }),
      emit: jest.fn(),
      to: jest.fn().mockReturnThis(),
    };

    console.log = jest.fn();
    emit.eventAndPayload = jest.fn();
  });

  const mockPayload = {
    orderID: 'testOrderID123',
    payload: {
      orderID: 'testOrderID123',
    },
    vendorRoom: 'testRoom',
  };

  it('triggers pickup and delivery processes correctly', () => {
    handlePickupAndDelivery(mockSocket);

    // Simulate PICKUP event
    expect(mockSocket.on).toHaveBeenCalledWith('PICKUP', expect.any(Function));

    // Advancing timers to trigger the setTimeouts in handlePickupAndDelivery
    jest.advanceTimersByTime(3000); // Time for the pickup and start of delivery simulation
    expect(console.log).toHaveBeenCalledWith(`Driver: Picked up order ID: ${mockPayload.payload.orderID}`);

    jest.advanceTimersByTime(2000); // Time for IN_TRANSIT emission
    expect(emit.eventAndPayload).toHaveBeenCalledWith(mockSocket, 'IN_TRANSIT', mockPayload);

    jest.advanceTimersByTime(4000); // Time for DELIVERED emission
    expect(console.log).toHaveBeenCalledWith(`Driver: Delivered ${mockPayload.payload.orderID}`);
    expect(emit.eventAndPayload).toHaveBeenCalledWith(mockSocket, 'DELIVERED', mockPayload);

    // Total number of times eventAndPayload should be called
    expect(emit.eventAndPayload).toHaveBeenCalledTimes(2);
  });
});
