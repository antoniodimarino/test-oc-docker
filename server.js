const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const message = process.env.MESSAGE || 'Ciao da Docker!';

// endpoint principale
app.get('/', (req, res) => res.send(message));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => console.log(`App in ascolto su porta ${port}`));