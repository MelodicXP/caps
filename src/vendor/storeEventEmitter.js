const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

// Exported function
function startEmittingEventsForStore(storeName) {
  setInterval(() => {
    console.log('---------------new interval begins-------------');
    emitStoreEvent(storeName);
  }, 11000);
}

function emitStoreEvent(storeName) {
  const currentTimestamp = new Date().toISOString();
  const payload = createEventPayload(storeName);
  const event = {
    event: 'pickup',
    time: currentTimestamp,
    payload,
  };

  // Emit event for business logic
  eventPool.emit(event.event.toUpperCase(), payload);
  
  // Emit generic log event for logging
  eventPool.emit('LOG', event);
}

function createEventPayload(storeName) {
  return {
    store: storeName,
    orderID: chance.guid(),
    customer: chance.name({ nationality: 'en' }),
    address: `${chance.city()}, ${chance.state()}`,
  };
}

module.exports = startEmittingEventsForStore;