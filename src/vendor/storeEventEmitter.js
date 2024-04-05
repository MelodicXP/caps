const emit = require('../eventEmitter');
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
  const payload = createEventPayload(storeName);
  emit.eventAndPayload('PICKUP', payload);
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