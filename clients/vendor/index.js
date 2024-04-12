'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const triggerOrderReadyForPickup = require('./orderDeliveryHandler');
const thankDriverForDelivery = require('./orderEmissionHandler');
const capsNamespaceUrl = process.env.NAMESPACE_URL;

function initializeSocketConnection(namespaceUrl) {
  const socket = io(namespaceUrl);
  socket.emit('JOIN', '1-206-flowers');
  return socket;
}

function setupEventHandlers(socket) {
  triggerOrderReadyForPickup(socket, '1-206-flowers');
  thankDriverForDelivery(socket);
}

const socket = initializeSocketConnection(capsNamespaceUrl);
setupEventHandlers(socket);

