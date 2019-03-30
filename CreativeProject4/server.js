const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/journal', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '/public/entries',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for journal entries.
const entrySchema = new mongoose.Schema({
  date: String,
  entry: String,
  path: String,
});

// Create a model for items in the journal
const Entry = mongoose.model('Entry', entrySchema);

// Upload an entry. Uses multer middleware for the upload and then returns
// the path where the entry is stored in the file system.
app.post('/api/entries', upload.single('page'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/page/" + req.file.filename
  });
});

// Create a new entry.
app.post('/api/entries', async (req, res) => {
  const item = new Item({
    date: req.body.date,
    entry: req.body.entry,
    path: req.body.path,
  });

  try {
    await item.sve();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





app.listen(3000, () => console.log('Server listening on port 3000!'));
