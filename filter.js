const pug = require('pug');
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

// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz pro Schraubenart pro Monat an.
app.get('/sales/umsatzProSchraubenartProMonat', async (_req, res) => {
    try {
      const umsatzProSchraubenartProMonat = await Schraube.aggregate([
        {
          $match: { VerkaufteMenge: { $gt: 0 } }
        },
        {
          $addFields: {
            convertedDatum: {
              $dateFromString: {
                dateString: {
                  $concat: [
                    "$Datum", "T00:00:00Z"
                  ]
                }
              }
            }
          }
        },
        {
          $group: {
            _id: {
              Schraubenart: "$Schraube",
              Jahr: { $year: "$convertedDatum" },
              Monat: { $month: "$convertedDatum" }
            },
            Umsatz: { $sum: { $multiply: ["$VerkaufteMenge", "$Preis"] } }
          }
        },
        {
          $project: {
            _id: 0,
            Schraubenart: "$_id.Schraubenart",
            Jahr: "$_id.Jahr",
            Monat: "$_id.Monat",
            Umsatz: 1
          }
        },
        {
          $sort: { Jahr: 1, Monat: 1 }
        }
      ]).allowDiskUse(true);
  
      res.json(umsatzProSchraubenartProMonat);
      console.log(umsatzProSchraubenartProMonat);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  