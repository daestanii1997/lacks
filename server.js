//import express, session, handlebars, routes, and any helper functions
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const seedAllTheThings = require('./seeds');

//boilerplate express, session, and handlebars setup
const sequelize = require('./config/config.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create();


//configuration for session/sequelize sync
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

//use handlebars as primary view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//use the routes defined in /controllers/
app.use(routes);

//start the server
//force:true will overwrite our db data with each restart, but will be reseeded with seedAllTheThings
sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
    // seedAllTheThings();

  });
});