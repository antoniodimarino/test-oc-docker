const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

// Log base
app.use(morgan('combined'));
// Per testare readiness/liveness con un flag interno opzionale
let isReady = true;

// Endpoint base
app.get('/', (req, res) => {
  res.json({
    app: 'myapp',
    message: 'Hello from OpenShift!',
    version: process.env.APP_VERSION || '1.0.0',
    time: new Date().toISOString()
  });
});

// Liveness
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Readiness
app.get('/ready', (req, res) => {
  if (isReady) return res.status(200).send('ready');
  return res.status(503).send('not ready');
});

// Endpoint per simulare manutenzione (opzionale)
app.post('/admin/toggle-ready', (req, res) => {
  isReady = !isReady;
  res.json({ ready: isReady });
});

// Gestione SIGTERM per shutdown graceful sui Pod
process.on('SIGTERM', () => {
  console.log('SIGTERM ricevuto, chiusura server...');
  server.close(() => {
    console.log('Server chiuso correttamente');
    process.exit(0);
  });
});

const server = app.listen(port, () => {
  console.log(`myapp in ascolto su http://0.0.0.0:${port}`);
});