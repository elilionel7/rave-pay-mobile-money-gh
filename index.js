// Server setup integrating the GhMomo service for payment initiation and verification endpoints.

const Mobmo = require('./services/mobmo');
const express = require('express');
const app = express();
const port = 3000;
const statuscode = 500;

// Configuration for Ravepay (Flutterwave)
const raveRedirectUrl = 'http://127.0.0.1:3000/api/v1/payments/recievepay';
const ravePublicKey = 'FLWPUBK_TEST-352d05d1db792a7723959f5f5fb62fca-X';
const raveSecretKey = 'FLWSECK_TEST-53843f51526db031bc35c98571cd2b4d-X';

// Initialize Ghana MOMO service with the provided configuration
const momo = new Mobmo(raveSecretKey, ravePublicKey, raveRedirectUrl);

// Route to handle initiating a payment
app.post('/', async (req, res) => {
  // Sample payment payload
  const payload = {
    currency: 'GHS',
    payment_type: 'mobilemoneygh',
    country: 'GH',
    amount: '50',
    email: 'user@example.com',
    phonenumber: '0543343891',
    network: 'MTN',
    firstname: 'lio',
    lastname: 'gui',
    //voucher: '128373', // only needed for Vodafone users.
    IP: '355426087298442',
    txRef: 'MC-' + Date.now(),
    orderRef: 'MC_' + Date.now(),
    is_mobile_money_gh: 1,
    device_fingerprint: '69e6b7f0b72037aa8428b70fbe03986c'
  };

  try {
    const { data } = await momo.charge(payload);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(statuscode).json({ error: 'Failed to initiate payment. Please try again later.' });
  }
});

// Route to handle verifying a payment
app.post('/verifypay', async (req, res) => {
  const txRef = 'MC-1584415630221';  // Sample transaction reference
  try {
    const { data } = await momo.verifyPayment(txRef);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to verify payment. Please try again later.' });

  }
});

// Start the application on the defined port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
