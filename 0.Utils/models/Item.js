const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: Number,
  item: String
});

module.exports = mongoose.model('Item', itemSchema);

//mongoose.model(modelName, schema):