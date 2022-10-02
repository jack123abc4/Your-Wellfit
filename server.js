
require('dotenv').config;
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const initializePassport = require('./public/js/passport-config');
const passport = require('passport');
const sequelize = require('./config/connection');
const cookieSession = require('cookie-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('./public/js/passport-setup')
// require('./config/passport/passport.js');

// initializePassport(passport, email => {
//   return users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// });

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess)); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}
app.get('/profile', isLoggedIn, (req, res) =>{
  res.render("profile",{name:req.user.displayName, email:req.user.emails[0].value})
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
