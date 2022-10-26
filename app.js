if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

  
const express = require('express');

const userLoginRouter = require("./routes/login");
const productsRouter = require("./routes/products");

const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');

initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
    );

const users = [];

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
// ficheiros publicos
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

/* app.get('/users', (req, res) => {
    res.json(users);
}); */

/* app.get('/products', (req, res) => {
    res.json(products);
}); */

app.get('/login', (req, res) => { 
    res.render('login')
});

app.get('/products', checkAuthenticated, (req, res) => {
    res.render('products')
})

app.post('/register', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    console.log(users);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true
  }));

  

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }



const port = 3000;

//saida de dados nesta porta 3000
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
});