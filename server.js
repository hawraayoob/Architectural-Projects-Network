const express = require('express');
const app = express();
require('dotenv').config();
const app = require('./app');
const db = require('./models/db');
const PORT = process.env.PORT || 3000;


///////////HAWRRRRRARARARARARAR
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));
////////////////////


// Connect to the database
db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error(error.message);
});







// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

