// app.js

const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
// Load environment variables
require('dotenv').config();

// Import routes
// const userRoutes = require('./routes/users');

// Use the routes
// app.use('/users', userRoutes);

app.use("*", (req, res, next) => {
	console.log("=>", req.method, req.originalUrl);
	next();
});
app.use('/', require('./routes'))
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
