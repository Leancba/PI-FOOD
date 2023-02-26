const axios = require('axios')
const { Recipe, Diet  } = require('../db');

const getAllRecipes = async () => {

    try {
        let info = await axios.get('https://run.mocky.io/v3/0037ee6c-36b1-4c4f-901e-242e02e3c120')

        

        let recipeDb = await Recipe.findAll ({

            include: [
                {
                    model: Diet,
                    attributes: ['name'], 
                    through: { attributes: [] },
                }
            ]    
        });

        console.log(recipeDb)

        let recipeApi = info.data.results
        

        const allRecipes = [...recipeApi, ...recipeDb]

        const allRecipesInfo = allRecipes.map(function (recipe, index)  {
            
            return {
                id: index,
                title: recipe?.title,
                image: recipe?.image,
                summary: recipe?.summary,
                healthScore: recipe?.healthScore,
                diets: recipe?.diets,
                steps: recipe.created === true?
                recipe.steps
                :
                (recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps ? recipe.analyzedInstructions[0].steps.map(e => e.step).join("| ") : 'No hay pasos'),
                created: recipe.created? recipe.created : false
                
                
                
            }
        });

        
        return allRecipesInfo;

    } catch (error) {

        console.log(error);

    }
};


module.exports = { getAllRecipes }