
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
//el force en true para que se me borre y cree la db
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT  || 3001,"0.0.0.0", () => {
    console.log('%s listening at 3001'); 
  });
});
