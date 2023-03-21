const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

const recipe = require('./Recipe');
const recipes = require('./Recipes');
const diets = require('./Diets')
const login = require('./Login')



// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', recipe);
router.use('/recipes', recipes);
router.use('/diets', diets)
router.use('/login', login)



module.exports = router;
