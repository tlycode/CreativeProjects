const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);

// Creating comment schema
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  picture: {
    type: mongoose.Schema.ObjectId,
    ref: 'Picture'
  },
  comments: Array,
  comment: String,
  create: {
    type: Date,
    default: Date.now
  },
  path: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// upload photo
router.post("/", auth.verifyToken, User.verify, upload.single('photo'), async (req, res) => {
  // check parameters
  console.log("NEW PHOTO");
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const photo = new Photo({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  console.log("Getting my photos");
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  console.log("Getting all photos");
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get a photo

router.get("/id/:id", async (req, res) => {
  console.log("Getting single photo");
  try {
    let photo = await Photo.findOne({
      //FIX ME
      _id: req.params.id,
    });
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
})

module.exports = {
  model: Photo,
  routes: router,
}
