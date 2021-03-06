const mongoose = require("mongoose");

const topWearSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A TopWear must have a name"],
  },
  subtitle: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  size: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  photos: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  description: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  sleveLength: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  neck: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  occasion: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  gender: {
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  },
  price:{
    type: Number,
    required: [true, "A TopWear must have a subtitle"],
  },
  category:{
    type: String,
    required: [true, "A TopWear must have a subtitle"],
  }
});

const TopWear = mongoose.model("TopWear", topWearSchema);

module.exports = TopWear;
