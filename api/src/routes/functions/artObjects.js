const {artObjects} = require('../../db')
const {Genres} = require('../../db')
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
async function getAllVideogames (req, res)  {
      const {name} = req.query
    if(name){ // get /artObjectss?name='algo'
        //busco en mi base de datos
        const DBartObjects = artObjects.findAll({
            where:{
                title: {
                    [Op.substring]: name
                    //like te encuntre todo lo parecido
                },
            }
        })
        //busco en mi api
        const APIartObjects = fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}x&involvedMaker=${name}`)
            .then(artObjects => artObjects.json())
        Promise.all([DBartObjects, APIartObjects])
            .then((results) => {
                const [DBartObjects, APIartObjects] = results;
                //uno ambas busquedas
                const responseTotal = DBartObjects.concat(APIartObjects.results);
                let juegos = [];
                //lleno el array con mis artObjects encontrados me traigo solo los primeros 15
                responseTotal.forEach((element, index) => {
                    if(index < 15){
                        juegos.push(element);
                    }
                });
                res.json(juegos);
            })
            .catch(e => console.log(e))
    }else{
        try {
            //const DBartObjects = await artObjects.findAll()
            const APIartObjects = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}`)
            const APIartObjectsJson = await APIartObjects.json()
            console.log(APIartObjectsJson)
            //console.log(DBartObjects)
            const resultado = APIartObjectsJson         
            res.send(resultado)
        } catch (error) {
            console.log(error)
        }
    }             
}

const getMyDBvideogames = (req, res) => {
    artObjects.findAll({include: Genres})//para traernos los generos de ese juego
        .then(videojuegos => res.json(videojuegos))
        .catch(e => console.log(e))
}

const addVideogame = async(req, res) => {
    const {name, description, released, rating,platforms, genres} = req.body
    console.log(name, description, released, rating,platforms, genres)
    try {
        //Creamos el juego
        let newGame = await artObjects.create({
            //le paso el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
            name,
            released,
            rating,
            platforms,
            description
        })
        const generos = await Genres.findAll({
            where: { //en donde el nombre sea a igual al nombre de ese genero
                name: genres
            }
        })
        await newGame.addGenre(generos);//a mi juego creado le agrego algun genero
        res.json(newGame);
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getAllVideogames,
    getMyDBvideogames,
    addVideogame
}