import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getEmails, setEmails, deleteEmails, emails } from './utils.js';
import { sender } from './controllers/nodeMailerInit.js';
import Customer from './schemas/customer.js';

dotenv.config();
mongoose.set('strictQuery', false);
const PORT = 8080;
const connString = process.env.CONNECTION;

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static('public'));

app.post('/upload', async (req, res) => {
  try {
    
    const newEmailUpload = new Customer(req.body);
    await newEmailUpload.save();
    console.log(newEmailUpload)
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).send({ error: 'Fill all fields!' });
  }
});

app.get('/getemails', async (req, res) => {
  try {
    const listOfEmails = await Customer.find();
    console.log(listOfEmails)
    res.status(200).send(listOfEmails);
  } catch (error) {
    res.status(500).json({ error: 'Info Not Found...' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const deletedEmails = await Customer.deleteMany({
      _id: { $in: ids },
    });

    res.status(200).json({
      deleted: deletedEmails.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

app.post('/auth/register', (req,res)=> {

})

app.post('/auth/login', (req,res)=> {
  
})

app.post('/auth/refresh', (req,res)=> {
  
})

app.post('/auth/logout', (req,res)=> {
  
})

const bootUpDb = async () => {
  await mongoose.connect(connString);
  app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });
};

bootUpDb();
