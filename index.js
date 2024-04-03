'use strict';

// Set up event handlers from hub
require('./hub');

// Then start emitting events
const startEmittingEventsForStore = require('./vendor/storeEventEmitter');
startEmittingEventsForStore('Melodic Music Store');