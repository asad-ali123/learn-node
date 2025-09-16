const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [{ timestemp: { type: Number } }],
});
