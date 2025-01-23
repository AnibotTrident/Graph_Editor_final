const Graph = require('../models/Graph');

// Retrieve a graph by ID
const getGraph = async (req, res) => {
  try {
    const graph = await Graph.findById(req.params.id);
    if (!graph) return res.status(404).json({ error: 'Graph not found' });
    res.json(graph);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Save a new graph
const saveGraph = async (req, res) => {
  try {
    const newGraph = new Graph(req.body);
    const savedGraph = await newGraph.save();
    res.json(savedGraph);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing graph
const updateGraph = async (req, res) => {
  try {
    const updatedGraph = await Graph.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGraph) return res.status(404).json({ error: 'Graph not found' });
    res.json(updatedGraph);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a graph by ID
const deleteGraph = async (req, res) => {
  try {
    const deletedGraph = await Graph.findByIdAndDelete(req.params.id);
    if (!deletedGraph) return res.status(404).json({ error: 'Graph not found' });
    res.json({ message: 'Graph deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getGraph, saveGraph, updateGraph, deleteGraph };
