'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');

const emit = {
  eventAndPayload: (socket, eventName, incomingPayload) => {
    if(incomingPayload.event && incomingPayload.payload) {
      incomingPayload.event = eventName.toLowerCase();
      incomingPayload.time = new Date().toISOString();
      socket.emit(eventName.toUpperCase(), incomingPayload);
    } else {
      const event = {
        event: eventName.toLowerCase(),
        time: new Date().toISOString(),
        payload: incomingPayload,
      };
      socket.emit(eventName.toUpperCase(), event);
    }
  },
};

module.exports = emit;