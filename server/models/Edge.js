const mongoose = require('mongoose');

const EdgeSchema = new mongoose.Schema({
  fromNodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: true,
  },
  toNodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: true,
  },
});

module.exports = mongoose.model('Edge', EdgeSchema);
