require('dotenv').load();
console.clear();
require('./dbConfig');

const Ingredient = require('./models/Ingredient');
const Recipe = require('./models/Recipe');

async function emptyCollections() {
    await Recipe.deleteMany({}, () => {
        console.log("Recipe collection cleared.");
    })
    await Ingredient.deleteMany({}, () => {
        console.log("Ingredient collection cleared.");
    })

    const p = new Promise((resolve, reject) => {
        resolve('Collections are empty.');
    });

    return p;
}

async function drop(){
    console.log(await emptyCollections());
    console.log("Success");
    process.exit();
    // now wait for firstFunction to finish...
    // do something else
};
  
drop();