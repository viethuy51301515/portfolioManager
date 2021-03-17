const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AchivementSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  link: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = Achivement = mongoose.model("achivement", AchivementSchema);
