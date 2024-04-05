'use strict';

const eventPool = require('./eventPool');

const emit = {
  eventAndPayload: (eventName, payload) => {
    const event = {
      event: eventName.toLowerCase(),
      time: new Date().toISOString(),
      payload,
    };

    // Emit event for business logic
    eventPool.emit(eventName.toUpperCase(), payload);

    // Automatically emit a corresponding log event
    emit.log(event);
  },

  log: (event) => {
    eventPool.emit('LOG', event);
  },
};

module.exports = emit;