/**
 * @file     index.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     September 22 2026
 * @brief    Main routes for the application
 */

var express = require('express');// Import the Express framework
var router = express.Router();// Create a new router object to handle routes


const historique = {};// Object to store order history


router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Home' });
});

// Receive order and show summary
router.post('/orders', function (req, res) {

  const pizza = req.body.pizza;

  const quantity = req.body.quantity;

  const size = req.body.size;

  const addIngredients = req.body.addIngredients || "None";

  const address = req.body.address;

  const postalCode = req.body.postalCode;

  const lastName = req.body.lastName;

  const firstName = req.body.firstName;

  const phone = req.body.phone;

  const email = req.body.email;

  const payment = req.body.payment;

  if (!historique[phone]) {// If the phone number is not already in the history, create a new entry
    historique[phone] = {
      client: {
        firstName,
        lastName,
        address,
        postalCode,
        phone,
        email
      },

      orders: []// Initialize an empty array to store orders for this client
    };
  }

  historique[phone].orders.push({// Add the new order to the client's order history
    pizza,
    quantity,
    size,
    addIngredients,
    payment,
    date: new Date()
  });

  res.render('pages/orders', {
    pizza: pizza,
    quantity: quantity,
    size: size,
    addIngredients: addIngredients,
    address: address,
    postalCode: postalCode,
    lastName: lastName,
    firstName: firstName,
    phone: phone,
    email: email,
    payment: payment
  });
});


router.get('/history', function (req, res) {// Handle GET requests to the /history route
  res.render('pages/history', {
    client: null,
    orders: null,
    error: null
  });
});


router.post('/history', function (req, res) {// Handle POST requests to the /history route

  const phone = req.body.phone;
  const customerData = historique[phone];

  if (!customerData) {
    return res.render('pages/history', {
      client: null,
      orders: null,
      error: 'No client found with this phone number.'
    });
  }

  res.render('pages/history', {
    client: customerData.client,
    orders: customerData.orders,
    error: null
  });
});


module.exports = router;// Export the router object to be used in other parts of the application
