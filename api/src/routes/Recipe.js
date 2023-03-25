require('dotenv').config();
const { KEY } = process.env;
const { Router } = require('express');
const router = Router()
const axios = require('axios').default;
const { getAllRecipes, getDBInfo } = require('../services/index.js')
const { Recipe, Diet  } = require('../db');


router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {
         
        let recipes = await getAllRecipes();
        let recipes2 = await getDBInfo()
    
        const AllRecipes = [...recipes, ...recipes2]
        
            let recipeByID = AllRecipes.find(r => r.id == id);
        
        
            let apiGamesById = {

                id: recipeByID.id,
                title: recipeByID.title,
                image: recipeByID.image,
                typeDiets: recipeByID.diets,
                healthScore: recipeByID.healthScore,
                summary: recipeByID.summary,
                steps: recipeByID.steps
    
            };

            return res.json(apiGamesById);

        
        
    } catch (error) {
        
        return res.status(404).send(`La receta solicitada mediante el id <strong>${id}</strong> no existe`)

    }

});


router.post('/', async (req, res, next) => {
        
    try {

        const { title, image, summary, healthScore , steps, diet } = req.body;

        // const { title, diet } = req.body;

        

        let newRecipe = await Recipe.create({ ...req.body });

        const DietDb = await Diet.findAll({ 

            where: {

                name: diet

            }});
        
           
        await newRecipe.addDiet(DietDb);

        res.status(200).json(newRecipe);

    } catch (error) {

        next(error);

    }

        
    


});





module.exports = router;