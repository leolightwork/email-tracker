import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Customer from './schemas/customer.js';
import { scheduleEmail, loadAndScheduleAll, cancelJob } from './controllers/scheduler.js';

dotenv.config();
mongoose.set('strictQuery', false);

const PORT = 8080;
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/upload', async (req, res) => {
  try {
    const newEmailUpload = new Customer(req.body);
    await newEmailUpload.save();
    scheduleEmail(newEmailUpload);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/getemails', async (req, res) => {
  try {
    const listOfEmails = await Customer.find();
    res.status(200).json(listOfEmails);
  } catch (error) {
    res.status(500).json({ error: 'Info Not Found...' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    ids.forEach(cancelJob);
    const result = await Customer.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ deleted: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/register', (req, res) => {});
app.post('/auth/login', (req, res) => {});
app.post('/auth/refresh', (req, res) => {});
app.post('/auth/logout', (req, res) => {});

const bootUpDb = async () => {
  await mongoose.connect(process.env.CONNECTION);
  await loadAndScheduleAll();
  app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
};

bootUpDb();
