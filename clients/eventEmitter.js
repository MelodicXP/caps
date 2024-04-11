'use strict';

const emit = {
  eventAndPayload: function (socket, eventName, incomingPayload) {
    let eventObject = incomingPayload;

    if (!incomingPayload.event || !incomingPayload.payload) {
      // Constructs a new event object if incomingPayload does not already follow the structure
      eventObject = this.createEventObject(eventName, incomingPayload);
    } else {
      // Update existing event name and date
      incomingPayload.event = eventName.toLowerCase();
      incomingPayload.time = new Date().toISOString();
    }
    this.emitEvent(socket, eventName, eventObject, incomingPayload);
  },

  createEventObject(eventName, payload) {
    return {
      event: eventName.toLowerCase(),
      time: new Date().toISOString(),
      payload,
    };
  },

  emitEvent(socket, eventName, eventObject, payload) {
    if (this.shouldEmitToRoom(eventName, payload)) {
      socket.to(payload.vendorRoom).emit(eventName.toUpperCase(), eventObject);
    } else {
      socket.emit(eventName.toUpperCase(), eventObject);
    }
  },

  shouldEmitToRoom(eventName, payload) {
    return ['IN_TRANSIT', 'DELIVERED'].includes(eventName.toUpperCase()) && payload.vendorRoom;
  },
};

module.exports = emit;