const { Router } = require('express');
const {getAllVideogames, getVideogameById, getMyDBvideogames,getAPIvideogames, filterGenres,getPlatforms, addVideogame} = require('./functions/artObjects.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/artobjects', getAllVideogames);//bien
router.post('/videogame', addVideogame);//bien
router.get('/myvideogames', getMyDBvideogames);//bien

module.exports = router;
