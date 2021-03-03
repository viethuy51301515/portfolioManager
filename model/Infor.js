const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InforSchema = new Schema({
  cv: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});

module.exports = Infor = mongoose.model("Infor", InforSchema);
