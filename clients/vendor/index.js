'use strict';

const { io } = require('socket.io-client');
const triggerOrderReadyForPickup = require('../vendor/packageReadyForPickup');

const socket = io('http://localhost:3001/caps');

socket.emit('JOIN', 'caps');

triggerOrderReadyForPickup('Melodic Music Store');
