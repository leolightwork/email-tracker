import express from 'express';
import path from 'path';

const app = express();
const PORT = 5000;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen('/api/emails', () => {
  console.log(`App is listening on port ${PORT}`);
});

// app.post('', (req, res) => {});
// app.put('', (req, res) => {});
// app.patch('', (req, res) => {});
// app.delete('', (req, res) => {});

//Safe fallback request
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
