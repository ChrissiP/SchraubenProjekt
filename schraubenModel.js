const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerkaufSchema = new Schema ({
  Hersteller: { type: String, required: true, maxLength: 10 },
  Schraube: { type: String, required: true, maxLength: 30 },
  Preis: { type: Number },
  VerkaufteMenge: { type: Number },
  Datum: { type: Date }
});

VerkaufSchema.set('toObject', { virtuals: true });
VerkaufSchema.set('toJSON', { virtuals: true });


const Schraube = mongoose.model('Dashboard', VerkaufSchema, 'schrauben');

module.exports = Schraube;
