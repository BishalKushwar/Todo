const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables

dotenv.config();

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
