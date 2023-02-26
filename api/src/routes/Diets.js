require('dotenv').config();
const { KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Diet } = require('../db');

//TODO -----> GET a "/Diet" <--------

router.get('/', async (req, res) => {

   
    try {

        let DietsDB = await Diet.findAll();
        

        if (DietsDB.length) {
        
            return res.json(DietsDB)
        
        } else {
        
        
        const url = await axios.get('https://run.mocky.io/v3/0037ee6c-36b1-4c4f-901e-242e02e3c120')
        

        const typesDiets = [
        {
            diets: ["vegetarian"]
        }
        ];

        const dietsApi = url.data?.results.map(recipe => {

            return{
                diets: recipe.diets 
            }
        }); 

        const allDiets = [ ...typesDiets, ...dietsApi, ]
        console.log(allDiets)

        //aca mediante el metodo set, creo un array para crear las tablas en la base de datos
        //con todos los tipos de dietas distintos de todas las recetas
        const diets = allDiets.reduce((acum, dietObj) => {
            return [...new Set([...acum, ...dietObj.diets])];
          }, []
          ).map(function (recipe,index){
            return {
                id: index + 1,
                name: recipe   
            }}) 
        
          //aca le asignos id y name como propiedades, para que se adapte al modelo de la base
          // que tiene id y name.
         

        // aca creo el modelo en la base con la funcion findOrCreate

        diets.forEach(async r => {
            
            await Diet.findOrCreate({

                where: {
                    id: r.id,
                    name: r.name
                    
                }
            })
        })

        res.json(diets)
            
    }
        
    } catch (err) {

        return console.log(err)

    }
    
    


//data es igual al json original, bien.



  


})

module.exports = router;