/**
 * @file     index.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     September 22 2026
 * @brief    Skeleton for a Node.js application using Express framework
 */

var express = require('express');// Import the Express framework
var router = express.Router();// Create a new router object to handle routes


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
module.exports = router;// Export the router object to be used in other parts of the application
