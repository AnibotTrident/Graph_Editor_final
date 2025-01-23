const express = require('express');
const Graph = require('../models/Graph');
const router = express.Router();

// GET graph by ID
router.get('/:id', async (req, res) => {
  try {
    const graph = await Graph.findById(req.params.id);
    if (!graph) {
      return res.status(404).json({ error: 'Graph not found' });
    }
    res.json(graph);
  } catch (error) {
    console.error('Error fetching graph:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST graph (Save a new graph)
router.post('/', async (req, res) => {
  try {
    const graph = new Graph(req.body);
    await graph.save();
    res.status(201).json(graph);
  } catch (error) {
    console.error('Error saving graph:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
