const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imagePath: { type: String, required: true },
  order: { type: Number, required: true }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
