require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const users = [
    {
        id:1,
        username: "userp@dominio.pt",
        password: 123
    },
    {
        id:2,
        username: "user2@dominio.pt",
        password: 321
    },
    {
        id:3,
        username: "formacao",
        password: "123"
    }
];

const products = [
    {
        id: 1,
        nome: "Pizza Margherita",
        description: "tomatoes, sliced mozzarella, basil, and extra virgin olive oil",
        preco: "18,00",
        image: "pizza-Margherita.jpg",
        stock: "37"
    },
    {
        id: 2,
        nome: "Pizza Salami",
        description: " mozzarella cheese, olive oil extra virgin, sliced mozzarella and basil",
        preco: "15,00",
        image: "pizza-do-salame.jpg",
        stock: "21"
    }
];

app.get('/users', authenticateToken, (req, res) => {
  res.json(users.filter(user => user.username === req.user.name));
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const port = 4000;

//saida de dados nesta porta 4000
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
});