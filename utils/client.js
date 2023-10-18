const axios = require('axios');

const client = axios.create({
  baseUrl: 'https://api.ravepay.co/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

module.exports = client;
