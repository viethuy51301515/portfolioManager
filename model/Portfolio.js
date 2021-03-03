const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = Portfolio = mongoose.model("portfolio", PortfolioSchema);
