'use strict';

const { io } = require('socket.io-client');
const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');

function initializeSocketConnection(namespaceUrl) {
  const socket = io(namespaceUrl);
  socket.emit('JOIN', 'caps-room');
  return socket;
}

const capsNamespaceUrl = 'http://localhost:3001/caps';
const socket = initializeSocketConnection(capsNamespaceUrl);
handlePickupAndDelivery(socket);