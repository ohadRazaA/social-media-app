const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('./connection');

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(postRoutes);


app.listen(port, () => console.log('server is started'));