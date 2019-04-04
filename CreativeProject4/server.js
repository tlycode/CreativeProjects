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
  dest: './public/entries/',
  limits: {
    fileSize: 100000000
  }
});

const entrySchema = new mongoose.Schema({
  date: String,
  title: String,
  description: String,
});

const Entry = mongoose.model('Entry', entrySchema);

app.post('/api/entries', async (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    title: req.body.title,
    description: req.body.description
  });
  try {
    await entry.save();
    res.send(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Entry.find();
    res.send(entries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  console.log("DELETE");
  try {
    await Entry.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/entries/:id', async (req, res) => {
  console.log("EDIT");
  try {
    const entry = await Entry.findOne({
      _id: req.params.id
    });
    entry.date = req.body.date;
    entry.title = req.body.title;
    entry.description = req.body.description;
    await entry.save();
    res.send(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
