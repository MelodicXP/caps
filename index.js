'use strict';

// Set up event handlers from hub
require('./src/hub');

// Then start emitting events
const emitPackageReadyForPickup = require('./src/vendor/packageReadyForPickup');

emitPackageReadyForPickup('Melodic Music Store');