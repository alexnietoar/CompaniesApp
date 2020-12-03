const { Schema, model } = require("mongoose");

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    nit: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamp: true
  }
);

module.exports = model('Company', CompanySchema);
