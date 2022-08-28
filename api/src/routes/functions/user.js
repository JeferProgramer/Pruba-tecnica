const {User} = require('../../db')
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
async function getUserById(req, res)  {
    const idUser = req.params.id;
    Videogame.findByPk(idUser)
        //debe el tener una asociacion a generos
        .then(user => res.json(user))
        .catch(e => console.log(e))
}
async function login(req, res)  {
  const {  email, password } = req.body

  console.log(req.body)

  // if(req.body.name === "asfo" && req.body.password === "holamundo") {
  let user = await User.findOne({where:{email:email}} )
  if ( user && user.password === password ){


	const payload = {
      email,
      id: user.id,
			// token: token,
      name: user.name,
      email: email,
	};

    /// uso el secreto del .env
    console.log(process.env.TOKENSECRET)
		const token = jwt.sign(payload, process.env.TOKENSECRET, {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token,
            name: user.name,
            email: email,
		});
    } else {
        res.status(300).json({ mensaje: "Usuario o contraseña incorrectos"})
    }
};
module.exports = {
    getUserById,
    login
}