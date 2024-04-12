'use strict';

require('dotenv').config();

const { io } = require('socket.io-client');
const handlePickupAndDelivery = require('../driver/pickupAndDeliveryHandler');
const capsNamespaceUrl = process.env.NAMESPACE_URL;
const roomName = process.env.ROOM_NAME || 'default-room';

function initializeSocketConnection(namespaceUrl, room) {
  const socket = io(namespaceUrl);

  socket.on('connect', () => {
    console.log('Connected to namespace:', namespaceUrl);
    socket.emit('JOIN', room, (response) => {
      console.log('Join room response:', response); // Handle join acknowledgment
    });
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  return socket;
}

const socket = initializeSocketConnection(capsNamespaceUrl, roomName);
handlePickupAndDelivery(socket);