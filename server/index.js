'use strict';

// .env file path for server
require('dotenv').config({ path: './.env' });

const { Server } = require('socket.io');
const server = new Server();

const PORT = process.env.PORT || 3002;
server.listen(PORT);

const Queue = require('./lib/OrderQueue');
const orderQueue = new Queue();
const deliveredQueue = new Queue();

const caps = server.of('/caps');

// create / allow for connections
caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);

  // Handle joining rooms
  socket.on('JOIN', (vendorRoom) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room---', vendorRoom);
    socket.join(vendorRoom);
    console.log(`Socket ${socket.id} joined room: ${vendorRoom}`);
  });

  // TODO - Handle all vendor rooms to emit to driver

  
  // Add a 'received' event to the Global Event Pool (used socket.onAny instead)
  socket.onAny((event, order) => {
    const time = new Date();
    console.log('EVENT:', {
      event,
      time,
      order,
    });
  });

  // Handle PICKUP event (global broadcast within namespace, except the sender)
  socket.on('PICKUP', (order) => {
    let vendorRoom = order.vendorRoom; // 'default-vendor-name'
    let orderID = order.orderID;

    // Attempt to get the vendor's order queue from the orderQueue manager.
    let vendorOrders = orderQueue.getOrder(vendorRoom);

    // Check if the vendor already has an order queue.
    if (vendorOrders) {
      // The vendor has an existing queue, proceed to add the new order.
      vendorOrders.addOrder(orderID, order);
    } else {
      // No existing queue for this vendor, create one, then retrieve and use it.
      const vendorQueueId = orderQueue.addOrder(order.vendorRoom, new Queue());
      vendorOrders = orderQueue.getOrder(vendorQueueId);
      vendorOrders.addOrder(orderID, order);
    }
    
    // Notify all other clients (in this case drivers) about the new order pickup.
    socket.broadcast.emit('PICKUP', order);
  });

  // Handle IN_TRANSIT event (emit only to specific room, typically vendor's room)
  socket.on('IN_TRANSIT', (order) => {
    if(order.vendorRoom) {
      socket.to(order.vendorRoom).emit('IN_TRANSIT', order);
    }
  });

  // Handle DELIVERED event
  socket.on('DELIVERED', (order) => {
    let vendorRoom = order.vendorRoom; // 'default-vendor-name'
    let orderID = order.orderID;

    if (!vendorRoom) {
      throw new Error('Invalid room specified');
    }

    // Attempt to get the vendor's order queue from the orderQueue manager.
    let vendorOrders = orderQueue.getOrder(vendorRoom);
    if (!vendorOrders) {
      throw new Error('No order queue found for this vendor');
    }

    // Remove order from pickup queue
    let orderDetails = vendorOrders.removeOrder(orderID);
    if (!orderDetails) {
      console.error('Order not found in queue');
      return;
    }

    // Attempt to get delivery queue from deliveredQueue manager
    let deliveryConfirmations = deliveredQueue.getOrder(vendorRoom);

    if (!deliveryConfirmations) {
      // No existing delivery queue, create one, then retrieve and use it
      deliveredQueue.addOrder(vendorRoom, new Queue());
      deliveryConfirmations = deliveredQueue.getOrder(vendorRoom);
    }

    // Add order to delivery confirmations queue
    deliveryConfirmations.addOrder(orderID, orderDetails);

    // Notify specific vendor room about delivery confirmations
    socket.to(vendorRoom).emit('DELIVERED', orderDetails);

    // if (vendorRoom) {
    //   // Attempt to get the vendor's order queue from the orderQueue manager.
    //   let vendorOrders = orderQueue.getOrder(vendorRoom);

    //   // Check if there are orders for specified vendor
    //   if (vendorOrders) {
    //     let orderDelivered = vendorOrders.removeOrder(orderID);

    //     // Attempt to get the delivry queue from the deliveredQueue manager.
    //     let deliveryConfirmations = deliveredQueue.getOrder(vendorRoom);

    //     // Check if vendor already has delivery queue
    //     if (deliveryConfirmations) { 
    //       deliveryConfirmations.addOrder(orderDelivered, order);
    //     } else {
    //       // No existing delivery queue, create one, then retrieve and use it.
    //       const deliveryQueueId = deliveredQueue.addOrder(order.vendorRoom, new Queue());
    //       deliveryConfirmations= deliveredQueue.getOrder(deliveryQueueId);
    //       deliveryConfirmations.addOrder(orderDelivered, order);
    //     }
    //     // Notify specific vendor room about order delivery
    //     socket.to(vendorRoom).emit('DELIVERED', orderDelivered);
    //   } else {
    //     throw new Error('No order queue found for this vendor');
    //   }
    // } else {
    //   throw new Error('Invalid vendor room specified');
    // }
  });

  // Handle DELIVERY_CONFIRMED event 
  socket.on('DELIVERY_THANKYOU', (order) => {
    if(order.vendorRoom) {
      socket.to(order.vendorRoom).emit('DELIVERY_THANKYOU', order);
    }
  });

  // Add a getAll event to the Global Event Pool (used GET_ORDERS as preferred naming convention)
  socket.on('GET_ORDERS', (order) => {
    let vendorRoom = order.vendorRoom; // 'default-vendor-name

    console.log(`Retrieving pick up orders for driver from vendor: ${vendorRoom}`);

    // Attempt to get the vendor's order queue from the orderQueue manager.
    let vendorOrders = orderQueue.getOrder(vendorRoom);

    // Check if there are orders exist to process
    let ordersExist = vendorOrders && Object.keys(vendorOrders).length > 0;
    
    if(ordersExist){
      Object.keys(vendorOrders.orders).forEach(orderID => {
        // Emit event for each order in the queue
        const orderDetails = vendorOrders.orders[orderID];
        socket.emit('PICKUP', orderDetails);
      });
    } else {
      console.log('No orders found or empty order queue');
    }
  });

  socket.on('GET_DELIVERY_CONFIRMATIONS', (order) => {
    let vendorRoom = order.vendorRoom; // 'default-vendor-name

    console.log(`Retrieving delivery confirmations for vendor: ${vendorRoom}`);

    // Attempt to get the vendor's delivery queue from the deliveredQueue manager.
    let deliveryConfirmations = deliveredQueue.getOrder(vendorRoom);

    // Check if there are orders exist to process
    let deliveryConfirmationsExist = deliveryConfirmations && Object.keys(deliveryConfirmations).length > 0;

    if(deliveryConfirmationsExist){
      const orderIDs = Object.keys(deliveryConfirmations.orders); // collect all order ID's

      orderIDs.forEach(orderID => {
        let orderDetails = deliveryConfirmations.orders[orderID];
        socket.emit('DELIVERED', orderDetails);

        // Remove order from delivery confirmation queue after emission
        deliveryConfirmations.removeOrder(orderID);
      });

      console.log('All delivery confirmations processed.');
    } else {
      console.log('No delivery confirmations found or empty delivery queue');
    }
  });

});