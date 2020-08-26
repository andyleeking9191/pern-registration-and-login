const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// register and login routes
app.use('/auth', require('./routes/jwtAuth'));

app.listen(5000, () => console.log('The server is listening on port 5000!'));