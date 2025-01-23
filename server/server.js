const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const graphRoutes = require('./routes/graphRoutes'); // Import graph routes
const connectDB = require('./config/db'); // Import DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/graph', graphRoutes); // Use the graph routes for graph data handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
