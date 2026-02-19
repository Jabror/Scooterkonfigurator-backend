
const paypal = require("@paypal/checkout-server-sdk");

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// ⛔ NICHT LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(
  clientId,
  clientSecret
);

const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
