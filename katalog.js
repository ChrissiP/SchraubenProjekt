const express = require('express');
const router = express.Router();
const Schraube = require('./schraubenModel')
const mongoose = require('mongoose');
const json2xls = require('json2xls');
const fs = require('fs');
const cors = require('cors');

router.use(cors());

router.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

// Top 3 Hersteller: Präsentiert die drei Hersteller mit den höchsten Verkaufszahlen.
router.get('/sales/top3hersteller', async (_req, res) => {
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
router.get('/sales/besterTag', async (_req, res) => {
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
router.get('/sales/prozentual/:Hersteller', async (req, res) => {
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
    const prozentual = (herstellerTotal / total) * 100;

    res.json({ Hersteller, prozentual });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/sales/prozentual', async (req, res) => {
  try {
    // Prozentsätze für jeden Hersteller berechnen
    const herstellerData = await Schraube.aggregate([
      { $match: { VerkaufteMenge: { $gt: 0 } } },
      { $group: { _id: "$Hersteller", total: { $sum: "$VerkaufteMenge" } } }
    ]);

    const totalSum = herstellerData.reduce((sum, item) => sum + item.total, 0);
    const prozentual = herstellerData.map(item => ({
      Hersteller: item._id,
      Prozentual: ((item.total / totalSum) * 100).toFixed(2),
    }));

    res.json(prozentual);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz pro Schraubenart pro Monat an.
router.get('/sales/umsatzProSchraubenartProMonat', async (_req, res) => {
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

// Gesamtumsatz pro Hersteller für einen Monat:
router.get('/sales/m', async (_req, res) => {
  try {
    const umsatz = await Schraube.aggregate([
      {
        $group: {
          _id: {
            Hersteller: "$Hersteller",
            Schraube: "$Schraube",
            Monat: { $month: { $toDate: "$Datum" } }
          },
          Umsatz: { $sum: { $multiply: ["$Preis", "$VerkaufteMenge"] } }
        }
      },
      {
        $project: {
          _id: 0,
          Hersteller: "$_id.Hersteller",
          Schraube: "$_id.Schraube",
          Monat: "$_id.Monat",
          Umsatz: { $concat: [{ $toString: "$Umsatz" } , "€" ] }
        }
      }
    ]).allowDiskUse(true);

    res.json(umsatz);
    console.log(umsatz);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HECO 
router.get('/sales/HECO', async (_req, res) => {
  try {
    const umsatz = await Schraube.aggregate([
      {
        $match: {
          Hersteller: "HECO"
        }
      },
      {
        $group: {
          _id: {
            Schraube: "$Schraube",
            Monat: { $month: { $toDate: "$Datum" } }
          },
          Umsatz: { $sum: { $multiply: ["$Preis", "$VerkaufteMenge"] } }
        }
      },
      {
        $project: {
          _id: 0,
          Schraube: "$_id.Schraube",
          Monat: "$_id.Monat",
          Umsatz: { $concat: [ "€", { $toString: "$Umsatz" } ] }
        }
      }
    ]).allowDiskUse(true);

    res.json(umsatz);
    console.log(umsatz);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// SWG 
router.get('/sales/SWG', async (_req, res) => {
  try {
    const umsatz = await Schraube.aggregate([
      {
        $match: {
          Hersteller: "SWG"
        }
      },
      {
        $group: {
          _id: {
            Schraube: "$Schraube",
            Monat: { $month: { $toDate: "$Datum" } }
          },
          Umsatz: { $sum: { $multiply: ["$Preis", "$VerkaufteMenge"] } }
        }
      },
      {
        $project: {
          _id: 0,
          Schraube: "$_id.Schraube",
          Monat: "$_id.Monat",
          Umsatz: { $concat: [ "€", { $toString: "$Umsatz" } ] }
        }
      }
    ]).allowDiskUse(true);

    res.json(umsatz);
    console.log(umsatz);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Wuerth
router.get('/sales/Wuerth', async (_req, res) => {
  try {
    const startOfMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0);

    const umsatz = await Schraube.aggregate([
      {
        $match: {
          Hersteller: "Wuerth",
          Datum: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          Umsatz: { $sum: { $multiply: ["$Preis", "$VerkaufteMenge"] } }
        }
      },
      {
        $project: {
          _id: 0,
          Umsatz: { $concat: ["€", { $toString: "$Umsatz" }] }
        }
      }
    ]).allowDiskUse(true);

    

    res.json(umsatz);
    console.log(umsatz);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/sales/top3bt', async (_req, res) => {
    try {
        const top3 = await Schraube.aggregate([
            { $match: { VerkaufteMenge: { $gt: 0 } } }, // Filtert Dokumente mit einer Verkaufsmenge größer als 0
            { $group: { _id: "$Schraube", count: { $sum: "$VerkaufteMenge" } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]).allowDiskUse(true);

        const xls = json2xls(top3);
        const fileName = 'top3.xlsx';
        fs.writeFileSync(fileName, xls, 'binary');

        res.download(fileName);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/sales/top3', async (_req, res) => {
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

module.exports = router;