# Lab - 401 Class 12 - Phase 2

## Project: CAP - The Code Academy Parcel Service

Build out a system that emulates a real world supply chain. CAPS will simulate a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased.

This will be an event driven application that “distributes” the responsibility for logging to separate modules, using only events to trigger logging based on activity.

### Author: Melo

### Problem Domain - Phase 2

Objective:  
Move away from using Node Events for managing a pool of events, instead refactoring to using the Socket.io libraries. This allows communication between Server and Client applications.The intent here is to build the data services that would drive a suite of applications where we can see pickups and deliveries in real-time.  

Change the underlying networking implementation of CAPS system from using node events to using a library called Socket.io so clients can communicate over a network. Socket.io manages the connection pool, making broadcasting easier to operate, and works well both on terminal (between servers) and with web clients.

### Links and Resources

- [Pull Request](https://github.com/MelodicXP/caps/pull/1)
- [GitHub Actions ci/cd](https://github.com/MelodicXP/caps/actions)

### Collaborators

### Setup

#### `.env` requirements (where applicable)

placeholder

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

#### Features / Routes

- Feature One: Deploy as prod branch once all tests pass.

#### Tests

- How do you run tests?
  - jest

- Any tests of note?  
  - pickupAndDeliveryHandler.test.js
  - deliveryAcknowledgement.test.js

#### UML

![Lab-11-UML](./assets/UML.png)

#### File Structure

![Lab-11-UML-File-Structure](./assets/FileStruc.png)
