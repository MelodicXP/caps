'use strict';

const { io } = require('socket.io-client');

const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');

const socket = io('http://localhost:3001/caps');

socket.emit('JOIN', 'caps-room');

handlePickupAndDelivery(socket);