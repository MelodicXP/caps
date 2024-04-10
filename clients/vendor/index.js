'use strict';

const { io } = require('socket.io-client');
const triggerOrderReadyForPickup = require('../vendor/packageReadyForPickup');
const thankDriverForDelivery = require('../vendor/deliveryAcknowledgementHandler');

function initializeSocketConnection(namespaceUrl) {
  const socket = io(namespaceUrl);
  socket.emit('JOIN', 'caps-room');
  return socket;
}

function setupEventHandlers(socket) {
  triggerOrderReadyForPickup(socket, '1-206-flowers');
  thankDriverForDelivery(socket);
}

const capsNamespaceUrl = 'http://localhost:3001/caps';
const socket = initializeSocketConnection(capsNamespaceUrl);
setupEventHandlers(socket);

