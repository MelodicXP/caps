'use strict';

// Set up event handlers from hub
require('./clients/hub');

// Then start emitting events
const triggerOrderReadyForPickup= require('./clients/vendor/packageReadyForPickup');

triggerOrderReadyForPickup('Melodic Music Store');