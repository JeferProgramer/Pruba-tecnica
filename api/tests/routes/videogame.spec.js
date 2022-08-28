/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame,Genres, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  id: 'c379c904-7f21-4438-a841-dbf6a814c98b',
  name: 'Red dead redemption',
  description:'The wester game best game ever',
  released: '2018-08-16',
  platforms: ['Xbox-one', 'Play-station 4','PC']
};

describe('Ruta Genre', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));
  beforeEach(() => Genres.sync({ force: true })
    .then(() => Genres.findAll()));
  describe('GET /genres', () => {
    it('deberia obtener 200', () =>
      agent.get('/genres').expect(200)
    );
  });
});

describe('Ruta Crear Juego', () => {
 before(() => conn.authenticate()
 .catch((err) => {
   console.log('No se puede conectar a la base de datos:', err);
 }));
 beforeEach(() => Videogame.sync({force:true})
  .then(() => Videogame.create(videogame)));
 describe('GET /myvideogames', () => {
   it('Deberial obtener 200', () => 
      agent.get('/myvideogames').expect(200)
   );
 });
});

describe('Ruta detalle del videojuego', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.log('No se puede conectar a la base de datos:',err)
  }));
  beforeEach(() => Videogame.sync({force:true})
    .then(() => Videogame.create(videogame))
    .then(() => Videogame.findOne(
      {
        where:{
          id:'c379c904-7f21-4438-a841-dbf6a814c98b'
        }
      }
    )));
  describe('GET /videogame/:id', () => {
    it('Deberia obtener 200', () =>
      agent.get('/videogame/c379c904-7f21-4438-a841-dbf6a814c98b').expect(200)
    )
  })
})
