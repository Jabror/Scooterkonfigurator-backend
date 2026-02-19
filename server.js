require("dotenv").config();

console.log("ENV CHECK:", {
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID?.slice(0, 6),
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET ? "OK" : "MISSING",
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB verbunden ✅"))
  .catch(err => console.error("MongoDB Fehler ❌", err));
// === Decks/Allgemeine Scooterteile ===
const scooterSchema = new mongoose.Schema({}, { strict: false });
const Scooter = mongoose.model('Scooter', scooterSchema, 'Scooterkonfigurator');

app.get('/api/scooterteile', async (req, res) => {
  try {
    const daten = await Scooter.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten.' });
  }
});

// === Bars ===
const barSchema = new mongoose.Schema({}, { strict: false });
const Bar = mongoose.model('Bar', barSchema, 'Bars');

app.get('/api/bars', async (req, res) => {
  try {
    const daten = await Bar.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Bar-Daten.' });
  }
});

// === Forks ===
const forkSchema = new mongoose.Schema({}, { strict: false });
const Fork = mongoose.model('Fork', forkSchema, 'Forks');

app.get('/api/forks', async (req, res) => {
  try {
    const daten = await Fork.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Fork-Daten.' });
  }
});

// === Räder ===
const wheelSchema = new mongoose.Schema({}, { strict: false });
const Wheel = mongoose.model('Wheel', wheelSchema, 'Rader');

app.get('/api/rader', async (req, res) => {
  try {
    const daten = await Wheel.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Räder-Daten.' });
  }
});

// === Griffe ===
const gripSchema = new mongoose.Schema({}, { strict: false });
const Grip = mongoose.model('Grip', gripSchema, 'Griffe');

app.get('/api/griffe', async (req, res) => {
  try {
    const daten = await Grip.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Griff-Daten.' });
  }
});

// === Headsets ===
const headsetSchema = new mongoose.Schema({}, { strict: false });
const Headset = mongoose.model('Headset', headsetSchema, 'Headset');  // 👈 Collection "Headset" in MongoDB

app.get('/api/headsets', async (req, res) => {
  try {
    const daten = await Headset.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Headset-Daten.' });
  }
});

// === Klemme ===
const clampSchema = new mongoose.Schema({}, { strict: false });
const Clamp = mongoose.model('Clamp', clampSchema, 'Klemme');  // 👈 Collection "Klemme" in MongoDB

app.get('/api/klemme', async (req, res) => {
  try {
    const daten = await Clamp.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Klemmen-Daten.' });
  }
});

// === Griptape ===
const griptapeSchema = new mongoose.Schema({}, { strict: false });
const Griptape = mongoose.model('Griptape', griptapeSchema, 'Griptape');  // 👈 Collection "Griptape" in MongoDB

app.get('/api/griptape', async (req, res) => {
  try {
    const daten = await Griptape.find();
    res.json(daten);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Griptape-Daten.' });
  }
});

const paypalRoutes = require("./routes/paypal.routes");
app.use("/api/paypal", paypalRoutes);

// Server starten
app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});

