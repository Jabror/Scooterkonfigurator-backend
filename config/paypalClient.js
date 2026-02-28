
const paypal = require("@paypal/checkout-server-sdk");

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// LiveEnvironment
environment = new paypal.core.LiveEnvironment(
  clientId,
  clientSecret
);

const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;


