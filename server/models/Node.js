const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Node', NodeSchema);
