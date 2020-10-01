const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/product', require('./routes/api/product'));
app.use('/api/category', require('./routes/api/category'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
