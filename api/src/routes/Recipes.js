require('dotenv').config();
const { KEY } = process.env;
const { Router } = require('express');
const { getAllRecipes, getDBInfo } = require('../services/index.js')
const router = Router();




//------------------ME TRAIGO TODOS LOS JUEGOS TANTO API COMO DB-------------//
// GET /recipes
// GET /recipes?tittle=value ---> query



router.get('/', async (req, res) => {
    
   try {
    
    const { title } = req.query

    let recipes = await getAllRecipes();
    let recipes2 = await getDBInfo()

    const AllRecipes = [...recipes, ...recipes2]
    
    

     if(title){

        let recipeByName = recipes.filter(r => r.title.toLowerCase().includes(title.toLowerCase()));

        recipeByName.length? 

        res.json(recipeByName)
        : 
        res.status(404).send(`La receta <strong>${title}</strong> no existe`)
        
    } else {
    
        res.json(AllRecipes);

    }
        
    
   } catch (error) {

    res.status(404).send("Error en alguno de los datos provistos")   
     
   }
});

module.exports = router;

