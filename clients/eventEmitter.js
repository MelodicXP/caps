'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const emit = {
  eventAndPayload: (eventName, payload) => {
    const event = {
      event: eventName.toLowerCase(),
      time: new Date().toISOString(),
      payload,
    };

    // Emit event for business logic
    socket.emit(eventName.toUpperCase(), event);
  },
};

module.exports = emit;