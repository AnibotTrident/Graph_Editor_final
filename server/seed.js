const mongoose = require('mongoose');
const Graph = require('./models/Graph');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/graphDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedGraph = async () => {
  const graph = new Graph({
    _id: 'default', // String ID for the graph
    nodes: [
      { id: '1', label: 'Node 1', position: { x: 100, y: 200 } },
      { id: '2', label: 'Node 2', position: { x: 300, y: 400 } },
    ],
    edges: [
      { source: '1', target: '2' },
    ],
  });

  try {
    await graph.save();
    console.log('Graph seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding graph:', error);
    mongoose.connection.close();
  }
};

seedGraph();
