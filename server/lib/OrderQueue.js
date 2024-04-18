'use strict';

class OrderQueue {
  constructor() {
    this.orders = {};
  }

  addOrder(orderId, orderDetails) {
    this.orders[orderId] = orderDetails;
    console.log('Order added to the queue');
    return orderId;
  }

  getOrder(orderId) {
    return this.orders[orderId];
  }

  removeOrder(orderId) {
    if (!this.orders[orderId]) {
      console.error('Order not found in queue');
      return null;
    }
    let orderDetails = this.orders[orderId];
    delete this.orders[orderId];
    console.log('Order was deleted from queue');
    return orderDetails;
  }
}

module.exports = OrderQueue;


