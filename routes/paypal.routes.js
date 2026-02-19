const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const paypalClient = require("../config/paypalClient");
const Order = require("../models/Order");


// ==========================
// ORDER ERSTELLEN
// ==========================
router.post("/create-order", async (req, res) => {
  try {
    const { produkte } = req.body;

    let total = 0;
    produkte.forEach(p => {
      const preis = Number(p);
      if (!isNaN(preis) && preis > 0) total += preis;
    });

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "CHF",
          value: total.toFixed(2)
        }
      }]
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });

  } catch (err) {
    console.error("PayPal CREATE Fehler:", err);
    res.status(500).json({ error: "Order konnte nicht erstellt werden" });
  }
});



// ==========================
// ZAHLUNG ABSCHLIESSEN
// ==========================
router.post("/capture-order", async (req, res) => {
  try {
    const { orderID, produkte} = req.body;
    const { Produkte} = req.body;
    const { KonfigurationenArray} = req.body;
    if (!orderID || !produkte) {
      return res.status(400).json({ error: "Daten fehlen" });
    }

    // 1️⃣ PayPal Capture
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await paypalClient.execute(request);

    // 2️⃣ Gesamtpreis neu berechnen (SICHER!)
    let total = 0;
    produkte.forEach(p => {
      const preis = Number(p);
      if (!isNaN(preis) && preis > 0) total += preis;
    });

    // 3️⃣ Bestellung speichern
    const neueBestellung = new Order({
      paypalOrderId: orderID,
      produkte: produkte,
      Produkte: Produkte,
      KonfigurationenArray: KonfigurationenArray,
      total: total,
      status: "PAID"
    });
    console.log("🚀 Bestellung wird gespeichert", neueBestellung);

    await neueBestellung.save();

    // 4️⃣ Antwort
    res.json({
      success: true,
      orderId: neueBestellung._id
    });

  } catch (error) {
    console.error("PayPal CAPTURE Fehler:", error);
    res.status(500).json({ error: "PayPal Capture fehlgeschlagen" });
  }
});

module.exports = router;
