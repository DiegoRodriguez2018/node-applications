const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);