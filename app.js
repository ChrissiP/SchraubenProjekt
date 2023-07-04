const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

// Importiere - Schrauben Model
const Schraube = require('./schraubenModel');

// MongoDB connection // Dashboard = Database name, nicht die Collection Name!

mongoose.connect('mongodb+srv://karinpavic:1234567kmp@cluster0.ysd3g8i.mongodb.net/Dashboard?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Top 3 Schrauben: Zeigt die drei Schraubenarten, die die höchsten Verkaufszahlen aufweisen.
app.get('/sales/top3', async (_req, res) => {
    try {
      const top3 = await Schraube.aggregate([
        { $match: { VerkaufteMenge: { $gt: 0 } } }, // Filtert Dokumente mit einer Verkaufsmenge größer als 0
        { $group: { _id: "$Schraube", count: { $sum: "$VerkaufteMenge" } } },
        { $sort: { count: -1 } },
        { $limit: 3 }
      ]).allowDiskUse(true);
  
      res.json(top3);
      console.log(top3);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Top 3 Hersteller: Präsentiert die drei Hersteller mit den höchsten Verkaufszahlen.

app.get('/sales/top3hersteller', async (_req, res) => {
  try {
    const top3hersteller = await Schraube.aggregate([
      { $match: { VerkaufteMenge: { $gt: 0 } } }, // Filtert Dokumente mit einer Verkaufsmenge größer als 0
      { $group: { _id: "$Hersteller", count: { $sum: "$VerkaufteMenge" } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]).allowDiskUse(true);

    res.json(top3hersteller);
    console.log(top3hersteller);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

app.get('/sales/besterTag', async (_req, res) => {
  try { 
  const besterTag = await Schraube.aggregate([
     { $group: { _id: "$Datum", count: { $sum: "$VerkaufteMenge" } } },
     { $sort: { count: -1 } },
     { $limit: 1 }
]).allowDiskUse(true);

res.json(besterTag);
console.log(besterTag);
} catch (err) {
console.log('Error:', err);
res.status(500).json({ error: 'Internal server error' });
}
});

// Route zum Abrufen des prozentualen Anteils der verkauften Schrauben eines Herstellers
app.get('/sales/percentage/:Hersteller', async (req, res) => {
  try {
    const Hersteller = req.params.Hersteller;

    // GesamtverkaufteMenge aller Schrauben berechnen
    const totalSales = await Schraube.aggregate([
      { $group: { _id: null, total: { $sum: "$VerkaufteMenge" } } }
    ]);

    // VerkaufteMenge des spezifischen Herstellers berechnen
    const herstellerSales = await Schraube.aggregate([
      { $match: { Hersteller: Hersteller } },
      { $group: { _id: null, total: { $sum: "$VerkaufteMenge" } } }
    ]);

    if (totalSales.length === 0 || herstellerSales.length === 0) {
      res.status(404).json({ error: 'Hersteller oder Daten nicht gefunden' });
      return;
    }

    const total = totalSales[0].total;
    const herstellerTotal = herstellerSales[0].total;

    // Prozentualen Anteil berechnen
    const percentage = (herstellerTotal / total) * 100;

    res.json({ Hersteller, percentage });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
