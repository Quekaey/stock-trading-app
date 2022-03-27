require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'client/build'))); // Set build folder

app.use(express.json()) // access req.body 

const tradeRoutes = require('./server-routes/tradeRoutes');
app.use('/trade/', tradeRoutes);

const portfolioRoutes = require('./server-routes/portfolioRoutes');
app.use('/portfolio/', portfolioRoutes);

const authRoutes = require('./server-routes/authRoutes');
app.use('/auth/', authRoutes);

const apiRoutes = require('./server-routes/apiRoutes');
app.use('/api/', apiRoutes);

// Catch all
app.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "client", "build", "index.html")); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));