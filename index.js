const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require('dotenv');
const Database = require('./DB/Db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', todoRoutes);

// Start the server
const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
