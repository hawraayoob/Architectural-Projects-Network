require('dotenv').config();
const app = require('./app');
const db = require('./models/db');
const PORT = process.env.PORT || 3000;

// Connect to the database
db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error(error.message);
});


//upload projects
app.use('/uploads', express.static('uploads'));



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

