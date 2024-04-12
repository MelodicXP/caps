'use strict';

require('dotenv').config();

const { io } = require('socket.io-client');
const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');
const capsNamespaceUrl = process.env.NAMESPACE_URL;

function initializeSocketConnection(namespaceUrl) {
  const socket = io(namespaceUrl);
  socket.emit('JOIN', '1-206-flowers');
  return socket;
}

const socket = initializeSocketConnection(capsNamespaceUrl);
handlePickupAndDelivery(socket);