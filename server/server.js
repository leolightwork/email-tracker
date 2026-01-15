import express from 'express';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { truncateSync } from 'fs';

const app = express();
const PORT = 5000;
const upload = multer({ dest: 'uploads/' });

//Will need further refactoring when db is introduced
//Locally based implementation for now
const emails = [];
const idSet = 1;

const getEmails = () => {
  return emails;
};

const deleteEmails = (id) => {
  const index = emails.findIndex((e) => e.id === id);

  if (index === -1) return false;
  emails.splice(index, 1);
  return true;
};

const setEmails = (email) => {
  const emailLoad = { id: idSet++, ...email };
  emails.push(emailLoad);
};

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.use(
  cors({
    origin: 'http://localhost:5173', //React dev server
    credentials: truncateSync,
  })
);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

// app.listen('/api/emails', () => {
//   console.log(`App is listening on port ${PORT}`);
// });

app.post(
  '/upload',
  asyncHandler((req, res) => {
    const emailContent = req.body;
    setEmails(emailContent);
    console.log(emailContent);

    if (
      !emailContent.recipients ||
      !emailContent.class ||
      !emailContent.date ||
      !emailContent.repeat
    ) {
      const err = new Error('Missing required fields!');
      err.status = 400;
      throw err;
    }

    res.status(201).json({ success: true });
  })
);

app.get('/getemails', (req, res) => {
  const emails = getEmails();
  res.json(emails);
});

// **** Refactoring ****
app.delete('/delete/:id', (req, res) => {
  const deleted = deleteEmails(req.params.id);

  if (!deleted) {
    const err = new Error('Email does not exist');
    err.status = 404;
    throw err;
  }

  res.status(204).send();
});

//Safe fallback request
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((err, req, res) => {
  const errUse = errUse.status || '500';
  res.status(errUse.status).json({ message: errUse.message });
});
