const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Importiere - Schrauben Model
const schraubenModel = require('./schraubenModel');

mongoose
  .connect('mongodb+srv://stefan:JZhdDNnSOFHEeuLA@cluster0.nrfdwae.mongodb.net/ha_schrauben?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sales/top3', async (req, res) => {
    try {
      const top3 = await schraubenModel.aggregate([
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
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
