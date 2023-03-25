const axios = require('axios')
const { API_KEY } = process.env;
const { Recipe, Diet  } = require('../db');
const   getAllRecipes = async () => {


    try {
        
        
        let info = await axios.get('https://run.mocky.io/v3/0037ee6c-36b1-4c4f-901e-242e02e3c120')
        console.log('probando', info)
        

        const AllRecipesApi = info.data.results.map(function (recipe, index)  {
            
            return {
                id: index,
                title: recipe?.title,
                image: recipe?.image,
                summary: recipe?.summary,
                healthScore: recipe?.healthScore,
                diets: recipe?.diets,
                steps: (recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps ? recipe.analyzedInstructions[0].steps.map(e => e.step) : ["No hay pasos en esta receta"])
                
            }
        });

        
        return AllRecipesApi;

    } catch (error) {

        console.log(error);

    }
};

const getDBInfo = async () => {
    
    try {
        const dbInfo = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });

        //aca lo que hacemos es convertir el objeto dbInfo que es un objeto sequelize en un
        // mediante el metodo stringify en una cadena de caracteres json,
        //luego se aplica el json.parse para convertir esa cadena en un objeto javascript y asi realizar el metodo
        // forEach que me devuelve las diets   

        var DbRecipes = JSON.parse(JSON.stringify(dbInfo, null, 2));
        
        DbRecipes.forEach((e) => (e.diets = e.diets.map((d) => d.name)));

        DbRecipes.forEach((recipe) => {

            recipe.steps = recipe.steps.split('.');
            
          });

        return DbRecipes;

    } catch (error) {

        console.log(error);
    }
};


module.exports = { getAllRecipes, getDBInfo }