const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_koPtJVKaGwQKExNKCYUIP7kt");

exports.createPaymentIntent = functions.https.onRequest(
  async (request, response) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" }
    });
    response.send(paymentIntent);
  }
);
