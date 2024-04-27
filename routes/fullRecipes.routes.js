const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  
    try{
        const recipes = await db.query('SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;');

        const recipeMap = {};
        for(const item of recipes.rows){
            const {recipename, instructions, ingredientname} = item;
            if(!recipeMap[recipename]) {
                recipeMap[recipename] ={
                    recipeName: recipename,
                    instructions: instructions,
                    ingredients: [] 
                }
            }
            recipeMap[recipename].ingredients.push(ingredientname);
        };
        const resultArray = Object.values(recipeMap);
        res.json(resultArray);
        //console.log(recipeMap);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({errorMessage: 'Internal Server error.'});
    }
});

router.get('/recipeIngredients', async (req, res) => {

    try{
        const recipes = await db.query('SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;');
        const recipeMap = {};
        for(const item of recipes.rows){
            const {recipename, ingredientname} = item;
    
            if(!recipeMap[recipename]) {
                recipeMap[recipename] =[];
            }
            recipeMap[recipename].push(ingredientname);
        };
        res.json(recipeMap);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({errorMessage: 'Internal Server error.'});
    }
    
});

router.get('/search', async (req, res) => {

    try{
        const searchString = req.query.recipeName;
        console.log(searchString);
    
        const recipe = await db.query('SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1', [searchString]);
    
        const recipeMap = {};
    
        for(const item of recipe.rows) {
            const {recipename,  instructions, ingredientname} = item;
            if(!recipeMap[recipename]) {
                recipeMap[recipename] = {
                    recipeName: recipename,
                    instructions: instructions,
                    ingredients: []
                }
            }
            recipeMap[recipename].ingredients.push(ingredientname);
        }
    
        const resultArray = Object.values(recipeMap);
        res.json(resultArray);
    }
    
    catch(error) {
        console.log(error);
        res.status(500).json({errorMessage: 'Internal Server error.'});
    }

});

module.exports = router;