'use strict';

// Set up event handlers from hub
require('./src/hub');

// Then start emitting events
const startEmittingEventsForStore = require('./src/vendor/storeEventEmitter');
startEmittingEventsForStore('Melodic Music Store');