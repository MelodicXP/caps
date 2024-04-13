const emit = require('../../clients/eventEmitter');

describe('emit module', () => {
  let mockSocket;

  beforeEach(() => {
    jest.restoreAllMocks();  // Restores any mock to its original value
    jest.resetModules();     // Clears the cache of required modules
    mockSocket = {
      emit: jest.fn(),
      to: jest.fn(() => mockSocket),  // Ensure chainability
    };
  });

  describe('eventAndPayload', () => {
    it('should create a new event object if payload is not structured correctly', () => {
      const payload = { orderID: '123' };
      emit.eventAndPayload(mockSocket, 'TEST_EVENT', payload);
      expect(mockSocket.emit).toHaveBeenCalledWith('TEST_EVENT', {
        event: 'test_event',
        time: expect.any(String),
        payload,
      });
    });

    it('should update existing payload if already structured', () => {
      const payload = { event: 'EXISTING_EVENT', payload: { orderID: '123' }, vendorRoom: 'room1' };
      emit.eventAndPayload(mockSocket, 'MODIFIED_EVENT', payload);
      expect(payload.event).toBe('modified_event');
      expect(payload.time).toBeDefined();
    });
  });

  describe('createEventObject', () => {
    it('returns a structured event object', () => {
      const payload = { name: 'Test Payload' };
      const event = emit.createEventObject('NEW_EVENT', payload);
      expect(event).toEqual({
        event: 'new_event',
        time: expect.any(String),
        payload,
      });
    });
  });

  describe('emitEvent', () => {
    it('emits to a room if shouldEmitToRoom returns true', () => {
      jest.spyOn(emit, 'shouldEmitToRoom').mockReturnValue(true);
      const payload = { vendorRoom: 'room2', payload: {} };
      emit.emitEvent(mockSocket, 'DELIVERED', {}, payload);
      expect(mockSocket.to).toHaveBeenCalledWith('room2');
      expect(mockSocket.emit).toHaveBeenCalledWith('DELIVERED', {});
    });

    it('emits globally if shouldEmitToRoom returns false', () => {
      jest.spyOn(emit, 'shouldEmitToRoom').mockReturnValue(false);
      const payload = { payload: {} };
      emit.emitEvent(mockSocket, 'TEST', {}, payload);
      expect(mockSocket.emit).toHaveBeenCalledWith('TEST', {});
      expect(mockSocket.to).not.toHaveBeenCalled();
    });
  });

  describe('shouldEmitToRoom', () => {

    it('returns true for IN_TRANSIT with a vendorRoom', () => {
      const result = emit.shouldEmitToRoom('IN_TRANSIT', { vendorRoom: 'room3' });
      expect(result).toBeTruthy();
    });

    it('returns false for non-specified events', () => {
      const result = emit.shouldEmitToRoom('RANDOM_EVENT', { vendorRoom: 'room4' });
      expect(result).toBeFalsy();
    });
  });
});
