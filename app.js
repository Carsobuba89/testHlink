const express = require('express');

const userLoginRouter = require("./routes/usersLogin");
const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

// ficheiros publicos
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('index')
});

app.get('/products', (req, res) => {
    res.render('products')
})

const port = 3000;

/* const jwt = require("jsonwebtoken"); */

//saida de dados nesta porta 3000
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})