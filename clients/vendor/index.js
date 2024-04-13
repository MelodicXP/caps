'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const triggerOrderReadyForPickup = require('./orderEmissionHandler');
const thankDriverForDelivery = require('./orderDeliveryHandler');
const capsNamespaceUrl = process.env.NAMESPACE_URL;

const roomName = process.env.ROOM_NAME || 'default-room';  // Allows for dynamic room names

function initializeSocketConnection(namespaceUrl, room) {
  const socket = io(namespaceUrl);

  // Listen for the 'connect' event, which indicates a successful connection
  socket.on('connect', () => {
    console.log(`Connected to ${namespaceUrl}. Joining room: ${room}`);

    // Now that the connection is established, it's safe to emit events
    socket.emit('JOIN', room, (response) => {
      console.log('Join room response:', response); // Acknowledgment from server
    });
  });

  // Error handling for connection errors
  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
  });

  return socket;
}

function setupEventHandlers(socket) {
  triggerOrderReadyForPickup(socket, roomName);
  thankDriverForDelivery(socket);
}

const socket = initializeSocketConnection(capsNamespaceUrl, roomName);
setupEventHandlers(socket);

