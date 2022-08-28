const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('debería lanzar un error si name es nulo', (done) => {
        Videogame.create({})
          .then(() => done(new Error('Se requiere un name válido')))
          .catch(() => done());
      });
      it('debería lanzar un error si la description es nula', (done) => {
        Videogame.create({name: 'Red Dead'})
          .then(() => done(new Error('Se requiere una description valida')))
          .catch(() => done())
      })
      it('debería lanzar un error si la released es nula', (done) => {
        Videogame.create({
          name: 'Red Dead',
          description: 'A wester video game',
        })
          .then(() => done(new Error('Se requiere una released valida')))
          .catch(() => done())
      })
      it('debería lanzar un error si las platforms es nula', (done) => {
        Videogame.create({
          name: 'Red dead Redemption',
          description: 'A wester video game',
          released: '2019-01-08'
        })
          .then(() => done(new Error('Se requiere platforms valida')))
          .catch(() => done())
      })
      it('Debería funcionar cuando es un name válido, una description válida , platforms y released', () => {
        Videogame.create({
          name: 'Red dead Redemption',
          description: 'A wester video game',
          released: '2019-01-08',
          platforms: 'Xbox-One'
        })
      })
    });
  });
});
