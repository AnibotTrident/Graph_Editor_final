const mongoose = require('mongoose');

const graphSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Change _id to a String type
  nodes: [
    {
      id: String,
      label: String,
      position: {
        x: Number,
        y: Number,
      },
    },
  ],
  edges: [
    {
      source: String,
      target: String,
    },
  ],
});

module.exports = mongoose.model('Graph', graphSchema);
