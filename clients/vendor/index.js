'use strict';

const { io } = require('socket.io-client');
const triggerOrderReadyForPickup = require('../vendor/packageReadyForPickup');

const socket = io('http://localhost:3001/caps');

socket.emit('JOIN', 'caps-room');

triggerOrderReadyForPickup('1-206-flowers');