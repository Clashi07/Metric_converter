const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Loading modules...');

// Load routes
const apiRoutes = require('./routes/api.js');
console.log('✅ API routes loaded');

// Middleware
app.use(helmet({
  noSniff: true,
  xssFilter: true,
  noCache: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// API routes
apiRoutes(app);

// 404 Not Found
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
    console.log(`🧪 Test API: http://localhost:${PORT}/api/convert?input=5L`);
  });
} else {
  console.log('Server running in test mode');
}

module.exports = app;