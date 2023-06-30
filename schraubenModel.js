const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerkaufSchema = new Schema({
    Schraube: { type: String, required: true, maxLength: 30 },
    Hersteller: { type: String, required: true, maxLength: 10 },
    Datum: { type: Date },
    Preis: { type: Number },
    VerkaufteMenge: {type: Number}
});

// VerkaufSchema.virtual("gesamtpreis").get(function () {
//     const gesamtpreis = this.menge * this.preis_pro_einheit;
//     return gesamtpreis.toFixed(2);
// });
  
VerkaufSchema.set('toObject', { virtuals: true });
VerkaufSchema.set('toJSON', { virtuals: true });

const Schraube = mongoose.model('ha_schrauben', VerkaufSchema, 'ha_schrauben');

module.exports = Schraube;
