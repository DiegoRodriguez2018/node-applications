console.clear();
require('../config/db');

const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');

async function seedIngredients() {
    const ingredients = ["paprika", "tomato", "pasta", "beef", "salmon"];

    for (let index = 0; index < ingredients.length; index++) {
        const element = ingredients[index];
        await Ingredient.create({ id: index + 1, name: element });
        console.log('index', ': ', index);
    }

    p = new Promise((resolve, reject) => {
        resolve("Ingredients seeded.");
    })

    return p;
}



async function seedRecipe() {
    let ingredients = [];

    await Ingredient.find()
        .then(docs => {
            ingredients = docs;
        })

    console.log('ingredients', ': ', ingredients);

    async function getId(name) {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < ingredients.length; index++) {
                const element = ingredients[index];
                if (element.name == name) {
                    resolve(element._id);
                }
            }
        })
    }

    await Recipe.create({
        id: 1,
        name: "salmon salad",
        ingredientsInRecipe: [{ _id: await getId("tomato") }, { _id: await getId("salmon") }]
    })

    await Recipe.create({
        id: 2,
        name: "meat loaf",
        ingredientsInRecipe: [{ _id: await getId("beef") }, { _id: await getId("paprika") }]
    })

    p = new Promise((resolve, reject) => {
        resolve("Recipes seeded.");
    })

    return p;
}


async function seed() {
    console.log(await seedIngredients());
    console.log(await seedRecipe());
    process.exit();
}

seed();


// const ingredients = [{_id:"5c3c5f5d8b0f7028b2650904"},{_id:"5c3c5f5d8b0f7028b2650907"}]

// Recipe.create({id:1, name:"salmon-salad", ingredientsInRecipe:ingredients})














//Populate example
// Recipe.find({})
//       .populate('ingredients').exec((err, ingredients) => {
//         console.log("Populated recipe " + ingredients);
//       })