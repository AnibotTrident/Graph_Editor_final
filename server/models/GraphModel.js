const mongoose = require('mongoose');

const GraphSchema = new mongoose.Schema({
  nodes: {
    type: Array,
    required: true,
  },
  edges: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Graph', GraphSchema);
