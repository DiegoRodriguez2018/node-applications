const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ingredientsInRecipe:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
});

module.exports = mongoose.model('Recipe', recipeSchema);