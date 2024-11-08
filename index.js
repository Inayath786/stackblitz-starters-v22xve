const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newitem = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newitem;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember == 'true') {
    let discount = (cartTotal * 10) / 100;
    result = cartTotal - discount;
  } else {
    result = 'Not eligible for Membership';
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * 5) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days;
  if (shippingMethod == 'express') {
    days = distance / 100;
  } else {
    days = distance / 50;
  }
  res.send(days + ' days for shipping');
});

app.get('/shipping-cost', (req, res) => {
  let weight = req.query.weight;
  let distance = req.query.distance;
  let cost = weight * distance * 0.1;
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchase = req.query.purchaseAmount;
  let loyalty = purchase * 2;
  res.send(loyalty.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
